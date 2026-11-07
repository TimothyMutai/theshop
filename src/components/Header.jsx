import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Header() {
  const { cartCount } = useCart();

  return (
    <header className="header">

      <div className="logo">
        <Link to="/home">MyShop.</Link>
      </div>

      <nav className="navigation">
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
      </nav>

      <div className="cart">
        <Link to="/cart">
          🛒 Cart ({cartCount})
        </Link>
      </div>

    </header>
  );
}

export default Header;