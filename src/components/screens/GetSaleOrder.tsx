import React, {useState} from "react";
import {useGetSaleOrder} from "../../hooks/useGetSaleOrder";

const GetSaleOrder: React.FC = () => {
    const [orderIdInput, setOrderIdInput] = useState("");
    const {order, error, loading, fetchOrder} = useGetSaleOrder();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderIdInput(e.target.value);
    };

    const handleSearchClick = () => {
        fetchOrder(orderIdInput);
    };

    return (
        <div className="p-4 space-y-4 max-w-6xl">
            <div className="flex space-x-2">
                <input
                    type="text"
                    placeholder="Digite o ID da ordem de compra"
                    value={orderIdInput}
                    onChange={handleInputChange}
                    className="border px-2 py-1 flex-grow"
                />
                <button
                    onClick={handleSearchClick}
                    className="bg-blue-600 text-white px-4 py-1 rounded"
                >
                    Buscar
                </button>
            </div>

            {loading && <p className="text-blue-500">Carregando...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {order && (
                <div className="border p-4 rounded bg-white">
                    <h2><strong>Ordem de venda:</strong> {orderIdInput}</h2>
                    <p><strong>ID do cliente:</strong> {order.customerId}</p>
                    {order.total !== undefined && (
                        <p><strong>Total do pedido:</strong> R$ {order.total.toLocaleString("pt-BR", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}</p>
                    )}

                    <div className="mt-4">
                        <h3 className="text-md font-bold mb-2">Itens da ordem de venda:</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {order.itemList.map((item, index) => (
                                <div key={`${item.product}-${item.quantity}-${index}`}
                                     className="border p-2 rounded bg-white shadow mt-2">
                                    <h4 className="font-semibold text-blue-700 break-words whitespace-normal capitalize">{item.product}</h4>
                                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                                    <p><strong>Valor:</strong> R$ {item.price.toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}</p>
                                    <p><strong>Total:</strong> R$ {(item.price * item.quantity).toLocaleString("pt-BR", {
                                        minimumFractionDigits: 2,
                                        maximumFractionDigits: 2,
                                    })}</p>
                                    <p className="text-sm text-gray-600 break-words whitespace-normal capitalize">{item.description}</p>
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