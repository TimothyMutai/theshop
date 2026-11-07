function CartItem({
  item,
  updateQuantity,
  removeFromCart,
}) {
  return (
    <div className="cart-item">

      <img
        src={item.image}
        alt={item.title}
      />

      <div className="cart-details">

        <h3>{item.title}</h3>

        <p>
          ${item.price.toFixed(2)}
        </p>

        <div className="quantity-controls">

          <button
            onClick={() => updateQuantity(item.id, -1)}
          >
            -
          </button>

          <span>{item.quantity}</span>

          <button
            onClick={() => updateQuantity(item.id, 1)}
          >
            +
          </button>

        </div>

        <button
          className="remove-btn"
          onClick={() => removeFromCart(item.id)}
        >
          Remove
        </button>

      </div>

    </div>
  );
}

export default CartItem;