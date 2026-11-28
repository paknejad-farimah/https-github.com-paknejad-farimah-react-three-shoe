import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import Footer from '../footer/Footer';
import { clearCart, getCartItems, getDemoUser, removeFromCart, updateCartQuantity } from '../../cartStorage';
import './cart.css';

const formatPrice = (price) => `${Number(price || 0).toLocaleString('EN')} `;

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState(() => getCartItems());
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    const refresh = () => setCartItems(getCartItems());
    window.addEventListener('shoe-cart-updated', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('shoe-cart-updated', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);

  const handleCheckout = () => {
    if (!getDemoUser()) {
      navigate('/login?returnTo=%2Fcart');
      return;
    }
    if (!cartItems.length) return;

    // Demo checkout only: no real payment or server-side order is created.
    clearCart();
    setCartItems([]);
    setOrderComplete(true);
  };

  return (
    <>
      <Navbar />
      <main className="cart-page" dir="rtl">
        <h1>shopping cart</h1>
        {orderComplete && (
          <div className="cart-notice success" role="status">
            your order has been registered
          </div>
        )}

        {!cartItems.length ? (
          <section className="cart-empty">
            <p>your shopping cart is empty</p>
            <Link className="cart-primary-link" to="/">Back to shoe customization</Link>
          </section>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <h2>{item.productName}</h2>
                    <p>size: {item.size || ' Not selected'}</p>
                    <p>body color : {item.colors?.Aroundshoe || 'default'}</p>
                    
                    <p>unit prise : {formatPrice(item.price)}</p>
                  </div>
                  <div className="cart-item-actions">
                    <label>
                      Number
                      <input
                        aria-label={`Number ${item.productName}`}
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(event) => setCartItems(updateCartQuantity(item.id, event.target.value))}
                      />
                    </label>
                    <button type="button" className="cart-remove" onClick={() => setCartItems(removeFromCart(item.id))}>
                      clean
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <section className="cart-summary">
              <p> total sum <strong>{formatPrice(subtotal)}</strong></p>
              <p className="cart-demo-note">The order was placed.</p>
              <button type="button" className="cart-checkout" onClick={handleCheckout}>Place a trial order  </button>
            </section>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}
