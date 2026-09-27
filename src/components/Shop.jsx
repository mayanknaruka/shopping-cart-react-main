import { useState, useEffect } from "react";
import styles from "../styles/Shop.module.css";
import { useOutletContext } from "react-router-dom";

export default function Shop() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setCart } = useOutletContext();

  const addToCart = (id, quantity) => {
    const finalQuantity = Number(quantity);

    if (isNaN(finalQuantity) || finalQuantity <= 0) {
      alert("Please enter a valid quantity of 1 or more.");
      return;
    }

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + finalQuantity }
            : item,
        );
      } else {
        return [...prevCart, { id, quantity: finalQuantity }];
      }
    });
  };

  const blockInvalidChar = (e) => {
    if (["e", "E", "+", "-", "."].includes(e.key)) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();

        const indices = [2, 3, 4, 6, 7, 8, 9, 10, 15, 18, 19, 20];
        const actual = products
          .filter((item) => indices.includes(item.id))
          .map((item) => ({ ...item, selectQuantity: 1 }));

        setData(actual);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleQtyChange = (id, changeOrValue) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === id) {
          let newQty;
          if (typeof changeOrValue === "object") {
            newQty = parseInt(changeOrValue.target.value, 10);
            if (isNaN(newQty) || newQty < 1) newQty = "";
          } else {
            const currentQty =
              typeof item.selectQuantity === "number" ? item.selectQuantity : 1;
            newQty = Math.max(1, currentQty + changeOrValue);
          }
          return { ...item, selectQuantity: newQty };
        }
        return item;
      }),
    );
  };

  if (loading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.spinner}></div>
        <p>Loading curated catalogue...</p>
      </div>
    );
  }

  return (
    <div className={styles.shopContainer}>
      <header className={styles.shopHeader}>
        <h1 className={styles.sectionTitle}>Featured Catalogue</h1>
        <p className={styles.sectionSubtitle}>
          Select your quantity and add items directly to your cart.
        </p>
      </header>

      <div className={styles.gridContainer}>
        {data.map((item) => (
          <article className={styles.productCard} key={item.id}>
            <div className={styles.imageContainer}>
              <img
                className={styles.productImage}
                src={item.image}
                alt={item.title}
                loading="lazy"
              />
            </div>
            <div className={styles.detailsContainer}>
              <span className={styles.categoryBadge}>{item.category}</span>
              <h2 className={styles.productName} title={item.title}>
                {item.title}
              </h2>
              <div className={styles.priceRow}>
                <span className={styles.priceLabel}>Price</span>
                <span className={styles.priceValue}>
                  ${Number(item.price).toFixed(2)}
                </span>
              </div>
              <div className={styles.actionsRow}>
                <div className={styles.stepper}>
                  <button
                    type="button"
                    onClick={() => handleQtyChange(item.id, -1)}
                    className={styles.stepperBtn}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <input
                    className={styles.stepperInput}
                    type="number"
                    name={`quantity-${item.id}`}
                    id={`quantity-${item.id}`}
                    min="1"
                    value={item.selectQuantity ?? ""}
                    onChange={(e) => handleQtyChange(item.id, e)}
                    onKeyDown={blockInvalidChar}
                  />
                  <button
                    type="button"
                    onClick={() => handleQtyChange(item.id, 1)}
                    className={styles.stepperBtn}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => addToCart(item.id, item.selectQuantity)}
                  className={styles.addToCartBtn}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
