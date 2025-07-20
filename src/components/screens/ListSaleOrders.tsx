import React, {useEffect, useState} from "react";
import axios from "axios";
import { saleOrder, saleOrderResponse, pagination } from "../../types/types";


const ListSaleOrders: React.FC = () => {
    const [orders, setOrders] = useState<saleOrder[]>([]);
    const [pagination, setPagination] = useState<pagination | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchOrders = (pageNumber: number) => {
        setLoading(true);
        axios.get<saleOrderResponse>(
            `http://localhost:8080/v1/orders?page=${pageNumber}&size=10`
        )
            .then(response => {
                setOrders(response.data.data);
                setPagination(response.data.pagination);
                setError(null);
            })
            .catch(err => {
                setError("Erro ao carregar ordens de venda");
                setOrders([]);
                setPagination(null);
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchOrders(0);
    }, []);

    const isFirstPage = pagination ? pagination.page === 1 : true;
    const isLastPage = pagination ? pagination.page === pagination.totalPages : true;

    if (loading) return <p>Carregando ordens de venda</p>;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!orders.length) return <p>Nenhuma ordem encontrada.</p>;

    return (
        <div className="max-w-4xl mx-auto p-4 space-y-4">
            <h1 className="text-2xl font-bold mb-4">Lista de ordens de venda</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {orders.map((order, index) => (
                    <div key={index} className="border p-4 rounded shadow bg-white">
                        <h2 className="font-semibold text-lg mb-2">Ordem de venda: {order.customerId ?? "N/A"}</h2>
                        <p><strong>Id do cliente: </strong> {order.customerId} </p>
                        <p><strong>Total: </strong> R$ {order.total?.toFixed(2)} </p>
                        <div className="mt-2">
                            <h3 className="font-semibold mb-1">Itens:</h3>
                            <ul className="list-disc list-inside max-h-32 overflow-y-auto text-sm">
                                {order.itemList.map((item, i) => (
                                    <li key={i}>
                                        {item.quantity}x {item.product} - R${item.price.toFixed(2)}
                                        <ul className="ml-6 list-disc text-sm text-gray-600">
                                            <li>
                                                {item.description}
                                            </li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))}

                <div className="flex justify-center space-x-4 mt-6">
                    <button
                        disabled={isFirstPage}
                        onClick={() => fetchOrders((pagination?.page ?? 1) - 1)}
                        className={`px-4 py-2 rounded bg-blue-600 text-white ${isFirstPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Anterior
                    </button>

                    <span className="flex items-center">
                        Página {(pagination?.page ?? 0)} de {pagination?.totalPages ?? 0}
                    </span>

                    <button
                        disabled={isLastPage}
                        onClick={() => fetchOrders((pagination?.page ?? 1) + 1)}
                        className={`px-4 py-2 rounded bg-blue-600 text-white ${isLastPage ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        Próxima
                    </button>

                </div>

            </div>
        </div>
    )

}

export default ListSaleOrders;