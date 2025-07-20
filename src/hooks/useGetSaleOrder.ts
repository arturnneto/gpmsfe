import { useState } from "react";
import axios from "axios";
import { saleOrder } from "../types/types"; // fix casing if needed

export const useGetSaleOrder = () => {
    const [order, setOrder] = useState<saleOrder | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchOrder = async (orderIdInput: string) => {
        if (!orderIdInput.trim()) {
            setError("Por favor, insira um ID para buscar uma ordem");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get<saleOrder>(
                `http://localhost:8080/v1/orders/${orderIdInput}`
            );
            setOrder(response.data);
            setError(null);
        } catch (err: any) {
            if (err.response?.status === 404) {
                setError("Ordem de compra não encontrada.");
            } else {
                setError("Erro ao buscar a ordem. Verifique o ID e tente novamente.");
            }
            setOrder(null);
        } finally {
            setLoading(false);
        }
    };

    return { order, error, loading, fetchOrder };
};