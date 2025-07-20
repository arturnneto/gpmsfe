import { useState } from "react";
import axios from "axios";
import {saleOrder, saleOrderItem} from "../types/types";

export function useSubmitSaleOrder() {
    const [customerId, setCustomerId] = useState<number | null>(null);
    const [items, setItems] = useState<saleOrderItem[]>([]);
    const [product, setProduct] = useState("");
    const [quantity, setQuantity] = useState<number>(NaN);
    const [price, setPrice] = useState<number>(NaN);
    const [description, setDescription] = useState("");
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [responseOrder, setResponseOrder] = useState<saleOrder | null>(null);

    const canSubmit = customerId !== null && customerId !== 0 && items.length > 0;
    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    function resetProductFields() {
        setProduct("");
        setQuantity(NaN);
        setPrice(NaN);
        setDescription("");
    }

    const addItem = () => {
        setResponseOrder(null);

        if (
            !product.trim() ||
            !description.trim() ||
            isNaN(quantity) ||
            quantity <= 0 ||
            isNaN(price) ||
            price <= 0
        ) {
            alert("Por favor, preencha todos os campos corretamente.");
            return;
        }

        const newItem: saleOrderItem = {
            product: product.trim(),
            quantity,
            price,
            description: description.trim(),
        };

        if (editIndex !== null) {
            const updatedItems = [...items];
            updatedItems.splice(editIndex, 0, newItem);
            setItems(updatedItems);
            setEditIndex(null);
        } else {
            setItems([...items, newItem]);
        }

        resetProductFields();
    };

    const submitOrder = async () => {
        const newOrder: saleOrder = {
            customerId,
            total,
            itemList: items as [saleOrderItem],
        };

        try {
            const response = await axios.post<saleOrder>(
                "http://localhost:8080/v1/orders",
                newOrder
            );
            setResponseOrder(response.data);
            setTimeout(() => setResponseOrder(null), 10000);
        } catch (error) {
            console.error("Erro ao enviar ordem de venda: ", error);
        }
    };

    const handleDeleteItem = (index: number) => {
        setResponseOrder(null);

        setItems(items.filter((_, i) => i !== index));
        if (editIndex === index) {
            setEditIndex(null);
            resetProductFields();
        }
    };

    const handleEditItem = (index: number) => {
        setResponseOrder(null);

        const item = items[index];
        setProduct(item.product);
        setQuantity(item.quantity);
        setPrice(item.price);
        setDescription(item.description);
        setEditIndex(index);
        setItems(items.filter((_, i) => i !== index));
    };

    return {
        customerId,
        setCustomerId,
        items,
        product,
        quantity,
        price,
        description,
        editIndex,
        responseOrder,
        canSubmit,
        total,
        addItem,
        submitOrder,
        handleDeleteItem,
        handleEditItem,
        setProduct,
        setQuantity,
        setPrice,
        setDescription,
    };
}