import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import CartItem from "../components/CartItem.jsx";

function Cart() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
  } = useCart();

  return (
    <div className="cart-page">

      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty!</h2>

          <Link to="/home">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-container">

            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                updateQuantity={updateQuantity}
                removeFromCart={removeFromCart}
              />
            ))}

          </div>

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <h3>
              Total: ${totalPrice.toFixed(2)}
            </h3>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;