import React, { useState } from "react";
import axios from "axios";
import { saleOrder, saleOrderItem} from "../../types/types";

const SubmitSaleOrder = () => {

    const [customerId, setCustomerId] = useState<number | null>(null);
    const [items, setItems] = useState<saleOrderItem[]>([]);
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState(NaN);
    const [price, setPrice] = useState(NaN);
    const [description, setDescription] = useState('');
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [responseOrder, setResponseOrder] = useState<saleOrder | null>(null);

    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const addItem = () => {
        if (!product || isNaN(quantity) || quantity <= 0 || isNaN(price) || price <= 0) {
            alert("Por favor, preencha produto, quantidade e preço corretamente.");
            return;
        }

        const newItem: saleOrderItem = { product, quantity, price, description };

        if (editIndex !== null) {
            const updatedItems = [...items];
            updatedItems.splice(editIndex, 0, newItem);
            setItems(updatedItems);
            setEditIndex(null);
        } else {
            setItems([...items, newItem]);
        }

        setItems([...items, { product, quantity, price, description }])
        setProduct('')
        setQuantity(0)
        setPrice(0)
        setDescription('')
    }

    const submitOrder = async () => {
        const newOrder: saleOrder = {
            customerId,
            total,
            itemList: items as [saleOrderItem]
        };

        try {
            const response = await axios.post<saleOrder>('http://localhost:8080/v1/orders', newOrder);
            setResponseOrder(response.data);
        } catch (error) {
            console.error("Erro ao enviar ordem de venda: ", error)
        }
    };

    const handleDeleteItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
        if (editIndex === index) {
            setEditIndex(null);
            setProduct('');
            setQuantity(NaN);
            setPrice(NaN);
            setDescription('');
        }
    };

    const handleEditItem = (index: number) => {
        const item = items[index];
        setProduct(item.product);
        setQuantity(item.quantity);
        setPrice(item.price);
        setDescription(item.description);
        setEditIndex(index);
        setItems(items.filter((_, i) => i !== index));
    };


    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Cadastrar ordem de venda</h2>

            <div className="mb-4">
                <label className="block">Id do cliente:</label>
                <input
                    type="number"
                    placeholder="Digite o id do cliente"
                    value={customerId ?? ''}
                    onChange={(e) => setCustomerId(Number(e.target.value))}
                    className="border p-1 rounded "
                />
            </div>

            <div className="mb-2">
                    <h3 className="font-semibold">Adicionar itens</h3>
                    <label className="block mb-1 font-medium">Nome do produto</label>
                    <input placeholder="Insira o nome do produto" value={product} onChange={e => setProduct(e.target.value)} className="border p-1 mr-2" />

                    <label className="block mb-1 font-medium">Quantidade de produtos</label>
                    <input type="number" min="1" placeholder="Insira a quantidade de produtos" value={quantity} onChange={e => setQuantity(Number(e.target.value))} className="border p-1 mr-2 w-64" />

                    <label className="block mb-1 font-medium">Preço do produto</label>
                    <input type="number" min="1" placeholder="Insira o preço do produto" value={price} onChange={e => setPrice(Number(e.target.value))} className="border p-1 mr-2 w-64" />

                    <label className="block mb-1 font-medium">Descrição do produto</label>
                    <input placeholder="Insira a descrição do produto" value={description} onChange={e => setDescription(e.target.value)} className="border p-1 mr-2 w-64" /> <br/>
                    <button onClick={addItem} className="bg-blue-500 text-white px-2 py-1 rounded mt-2">{editIndex !== null ? 'Salvar edição' : 'Adicionar'}</button>
            </div>


            <div className="mb-4">
                <h3 className="font-semibold mb-1">Itens</h3>
                <ul className="space-y-2">
                    {items.map((item, index) => (
                        <li key={index} className="flex justify-between items-center border p-3 rounded shadow-sm bg-white">
                            <div>
                                <p className="font-semibold">Nome do produto: {item.product}</p>
                                <p>Quantidade: {item.quantity}</p>
                                <p>Preço: R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p>Valor total: R$ {(item.quantity * item.price).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                <p className="text-sm text-gray-600">Descrição: {item.description}</p>
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => handleEditItem(index)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    Editar
                                </button>
                                <button
                                    onClick={() => handleDeleteItem(index)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    Apagar
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mb-4">
                <strong> Total: R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
            </div>

            <div>
                <button onClick={submitOrder} className="bg-green-600 text-white px-4 py-2 rounded">Enviar ordem de venda</button>
                {responseOrder && (
                    <h3 className="font-bold text-lime-600">Ordem cadastrada com sucesso!</h3>
                )}
            </div>

        </div>
    )
}

export default SubmitSaleOrder;