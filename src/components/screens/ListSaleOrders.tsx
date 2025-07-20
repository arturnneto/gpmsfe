import React from "react";
import {useListSaleOrders} from "../../hooks/useListSaleOrders";

const ListSaleOrders: React.FC = () => {
    const {
        orders,
        pagination,
        error,
        loading,
        fetchOrders,
        isFirstPage,
        isLastPage,
    } = useListSaleOrders();

    if (loading) return <p>Carregando ordens de venda</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!orders.length) return <p>Nenhuma ordem encontrada.</p>;

    return (
        <div className="max-w-8xl ml-4 p-4 space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Lista de ordens de venda</h1>

                <div className="flex items-center space-x-4">
                    <button
                        disabled={isFirstPage}
                        onClick={() => fetchOrders((pagination?.page ?? 0) - 1)}
                        className={`px-3 py-1 rounded bg-blue-600 text-white text-sm ${
                            isFirstPage ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Anterior
                    </button>

                    <span className="text-sm">
            Página {(pagination?.page ?? 0) + 1} de {pagination?.totalPages ?? 0}
          </span>

                    <button
                        disabled={isLastPage}
                        onClick={() => fetchOrders((pagination?.page ?? 0) + 1)}
                        className={`px-3 py-1 rounded bg-blue-600 text-white text-sm ${
                            isLastPage ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        Próxima
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {orders.map((order, index) => (
                    <div key={index} className="border p-4 rounded shadow bg-white">
                        <h2 className="font-semibold text-lg mb-2">
                            Ordem de venda: {order.customerId ?? "N/A"}
                        </h2>
                        <p>
                            <strong>Id do cliente: </strong> {order.customerId}{" "}
                        </p>
                        <p>
                            <strong>Total: </strong> R$ {order.total?.toFixed(2)}{" "}
                        </p>
                        <div className="mt-2">
                            <h3 className="font-semibold mb-1">Itens:</h3>
                            <ul className="list-disc list-inside max-h-32 overflow-y-auto text-sm break-words whitespace-normal ">
                                {order.itemList.map((item, i) => (
                                    <li key={i} className="capitalize">
                                        {item.quantity}x {item.product} - R${item.price.toFixed(2)} - Total: R${" "}
                                        {(item.price * item.quantity).toFixed(2)}
                                        <ul className="ml-6 list-disc text-sm text-gray-600 capitalize">
                                            <li>{item.description}</li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center space-x-4 mt-6">
                <button
                    disabled={isFirstPage}
                    onClick={() => fetchOrders((pagination?.page ?? 0) - 1)}
                    className={`px-4 py-2 rounded bg-blue-600 text-white ${
                        isFirstPage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Anterior
                </button>

                <span className="flex items-center">
          Página {(pagination?.page ?? 0) + 1} de {pagination?.totalPages ?? 0}
        </span>

                <button
                    disabled={isLastPage}
                    onClick={() => fetchOrders((pagination?.page ?? 0) + 1)}
                    className={`px-4 py-2 rounded bg-blue-600 text-white ${
                        isLastPage ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                    Próxima
                </button>
            </div>
        </div>
    );
};

export default ListSaleOrders;