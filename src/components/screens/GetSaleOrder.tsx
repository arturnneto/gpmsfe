import React, { useState} from "react";
import axios from "axios";
import {saleOrder} from "../../types/types";

const GetSaleOrder: React.FC = () => {
    const [orderIdInput, setOrderIdInput] = useState<string>("");
    const [order, setOrder] = useState<saleOrder | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchOrder = () => {
        if (!orderIdInput.trim()) {
            setError("Por favor, insira um ID para buscar uma ordem");
            return;
        }

        axios.get<saleOrder>(`http://localhost:8080/v1/orders/${orderIdInput}`)
            .then(response => {
                setOrder(response.data);
                setError(null);
            })
            .catch(err => {
                if (err.response && err.response.status === 404) {
                    setError('Ordem de compra não encontrada.');
                } else {
                    setError('Erro ao buscar a ordem. Verifique o ID e tente novamente.');
                }
                setOrder(null);
                console.error(err);
            });
    }

    return (
        <div className="p-4 space-y-4 max-w-xl">
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Digite o ID da ordem de compra"
                    value={orderIdInput}
                    onChange={(e) => setOrderIdInput(e.target.value)}
                    className="border px-2 py-1 flex-grow"
                />
                <button
                    onClick={fetchOrder}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                    Buscar
                </button>
            </div>

                {error && <p className="text-red-500"> {error} </p>}

                {order && (
                    <div className="border p-4 rounded bg-gra-100">
                        <h2><strong>Ordem de venda:</strong> {orderIdInput}</h2>
                        <p><strong>ID do cliente:</strong> {order.customerId}</p>
                        <p><strong>Total do pedido:</strong> R$ {order.total?.toFixed(2)}</p>

                        <div className="mt-4">
                            <h3 className="text-md font-bold mb-2">Itens da ordem de venda:</h3>
                            <div className="grid grid-cols-2 gap-4">
                            {order.itemList.map((item, index) => (
                                <div key={index} className="border p-2 rounded bg-white shadow mt-2">
                                    <h4 className="font-semibold text-blue-700 break-words whitespace-normal">{item.product}</h4>
                                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                                    <p><strong>Preço:</strong> R$ {item.price.toFixed(2)}</p>
                                    <p className="text-sm text-gray-600 break-words whitespace-normal">{item.description}</p>
                                </div>
                            ))}
                        </div>
                        </div>

                    </div>
                )}
        </div>
    )
}

export default GetSaleOrder;