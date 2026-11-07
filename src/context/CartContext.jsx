import {
  createContext,
  useContext,
  useState,
} from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Add a product to the cart
  const addToCart = (product) => {
    setCartItems((previousCart) => {
      const existingProduct = previousCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return previousCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...previousCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // Remove a product
  const removeFromCart = (id) => {
    setCartItems((previousCart) =>
      previousCart.filter((item) => item.id !== id)
    );
  };

  // Increase or decrease quantity
  const updateQuantity = (id, amount) => {
    setCartItems((previousCart) =>
      previousCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity + amount,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Total number of items in the cart
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Total price of all items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook for accessing cart data
export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}