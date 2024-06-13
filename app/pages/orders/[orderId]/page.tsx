interface OrderDetailsPageProps {
    params: { orderId: number };
}

export default function OrderDetailsPage({ params }: OrderDetailsPageProps) {
    return (
        <div>
            <h1>Detalhes do Pedido</h1>
            <p>Order ID: {params.orderId}</p>
        </div>
    );
}