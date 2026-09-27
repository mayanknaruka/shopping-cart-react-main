import { useOutletContext, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const { cart, setCart } = useOutletContext();
  const [productDetails, setProductDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const products = await response.json();
        setProductDetails(products);
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  const cartItems = cart.map((cartItem) => {
    const details = productDetails.find(
      (product) => product.id === cartItem.id,
    );
    return {
      ...cartItem,
      title: details ? details.title : "Loading product...",
      price: details ? details.price : 0,
      image: details ? details.image : "",
      category: details ? details.category : "",
    };
  });

  const deleteItem = (id) =>
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const handleQuantity = (id, change) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + change;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  if (loading) {
    return (
      <div className={styles.loadingState}>
        <p>Syncing cart details...</p>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyIcon}>🛍️</div>
        <h2 className={styles.emptyTitle}>Your shopping cart is empty</h2>
        <p className={styles.emptySubtitle}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link to="/shop" className={styles.shopNowBtn}>
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.cartPage}>
      <h1 className={styles.cartTitle}>Shopping Bag</h1>

      <div className={styles.layoutGrid}>
        <section className={styles.itemsList}>
          {cartItems.map((item) => (
            <div className={styles.horizontalCard} key={item.id}>
              <div className={styles.imageCol}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.itemImg}
                />
              </div>

              <div className={styles.infoCol}>
                <div className={styles.headerRow}>
                  <div>
                    <span className={styles.categoryText}>{item.category}</span>
                    <h3 className={styles.itemTitle}>{item.title}</h3>
                  </div>
                  <button
                    className={styles.removeBtn}
                    onClick={() => deleteItem(item.id)}
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>

                <div className={styles.bottomRow}>
                  <div className={styles.stepper}>
                    <button
                      className={styles.stepperBtn}
                      onClick={() => handleQuantity(item.id, -1)}
                    >
                      -
                    </button>
                    <span className={styles.quantityCount}>
                      {item.quantity}
                    </span>
                    <button
                      className={styles.stepperBtn}
                      onClick={() => handleQuantity(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className={styles.priceTag}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <aside className={styles.orderSummary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Estimated Shipping</span>
            <span className={styles.freeShipping}>Free</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.totalRow}`}>
            <span>Total</span>
            <span className={styles.finalPrice}>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className={styles.checkoutBtn}
            onClick={() => alert("Proceeding to checkout!")}
          >
            Checkout
          </button>
        </aside>
      </div>
    </div>
  );
}
