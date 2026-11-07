import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { addToCart } = useCart();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products",
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products.");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="home-page">
        <h2 className="loading">Loading products...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-page">
        <h2 className="error">{error}</h2>
      </div>
    );
  }

  return (
    <div className="home-page">

      <h1>Our Products</h1>

      <div className="products-container">

        {products.map((product) => (
          <div className="product-card" key={product.id}>

            <img
              src={product.image}
              alt={product.title}
            />

            <h3>{product.title}</h3>

            <p className="price">
              ${product.price.toFixed(2)}
            </p>

            <p className="category">
              {product.category}
            </p>

            <p className="description">
              {product.description}
            </p>

            <p className="rating">
              ★★★★★
              <span>
                ({product.rating?.count ?? 0})
              </span>
            </p>

            <button onClick={() => addToCart(product)}>
              Add to Cart
            </button>

          </div>
        ))}

      </div>
    </div>
  );
}

export default Home;