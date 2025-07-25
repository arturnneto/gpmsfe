export type pagination = {
    page: number;
    pageSize: number;
    totalElements: number;
    totalPages: number;
};

export type SaleOrderResponse = {
    data: saleOrder[];
    pagination: pagination;
};

export type saleOrder = {
    customerId: number | null;
    total: number;
    itemList: [saleOrderItem];
}

export type saleOrderItem = {
    product: string
    quantity: number
    price: number
    description: string
}