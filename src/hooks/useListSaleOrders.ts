import { useState, useEffect } from "react";
import axios from "axios";
import {saleOrder, SaleOrderResponse, pagination} from "../types/types";

export function useListSaleOrders(initialPage = 0, pageSize = 9) {
    const [orders, setOrders] = useState<saleOrder[]>([]);
    const [pagination, setPagination] = useState<pagination | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const fetchOrders = (pageNumber: number) => {
        setLoading(true);
        axios
            .get<SaleOrderResponse>(
                `http://localhost:8080/v1/orders?page=${pageNumber}&size=${pageSize}`
            )
            .then((response) => {
                setOrders(response.data.data);
                setPagination(response.data.pagination);
                setError(null);
            })
            .catch((err) => {
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
        fetchOrders(initialPage);
    }, [initialPage]);

    const isFirstPage = pagination ? pagination.page === 0 : true;
    const isLastPage =
        pagination ? pagination.page >= (pagination.totalPages - 1) : true;

    return {
        orders,
        pagination,
        error,
        loading,
        fetchOrders,
        isFirstPage,
        isLastPage,
    };
}