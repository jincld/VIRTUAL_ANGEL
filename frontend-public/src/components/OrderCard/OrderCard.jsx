import './OrderCard.css';

const OrderCard = ({ order }) => {
  return (
    <div className="order-card">
      <h4>Order #{order._id.slice(-6).toUpperCase()}</h4>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
      <p><strong>Address:</strong> {order.address}</p>

      <div className="order-products">
        {order.products.map((item, index) => (
          <div key={index} className="product-info">
            <img src={item.idProduct?.image || '/default-image.png'} alt={item.idProduct?.name} />
            <div>
              <p><strong>{item.idProduct?.name}</strong></p>
              <p>Quantity: {item.quantity}</p>
              <p>Subtotal: ${item.subtotal.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
