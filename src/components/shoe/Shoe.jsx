
import { Suspense, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { Leva } from 'leva';
import { Html, useProgress } from '@react-three/drei';

import Geos from '../../geos';
import {
  addToCart,
  getDemoUser,
  savePendingCartItem,
} from '../../cartStorage';

import './shoe.css';

function ShoeLoader() {
  const { progress } = useProgress();

  return (
    <Html fullscreen>
      <div className="shoe-loader-overlay">
        <div className="shoe-loader-content">
          <div className="shoe-loader-ring">
            <div className="shoe-loader-inner">
              <span className="shoe-loader-icon">👟</span>
            </div>
          </div>

          <div className="shoe-loader-percent">
            {Math.round(progress)}%
          </div>

          <h2>
            Preparing Your <span>Experience</span>
          </h2>

          <p>Loading your 3D shoe...</p>

          <div
            className="shoe-loader-progress"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="shoe-loader-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="shoe-loader-wait">
            <span className="shoe-loader-dot" />
            PLEASE WAIT
          </div>
        </div>
      </div>
    </Html>
  );
}

function Shoe() {
  const navigate = useNavigate();
  const [selectedSize, setSelectedSize] = useState('42');

  const handleAddToCart = () => {
    let colors = {};

    try {
      const saved = localStorage.getItem('shoeSettings');
      colors = saved ? JSON.parse(saved) : {};
    } catch {
      colors = {};
    }

    const cartItem = {
      productName: 'Custom 3D shoes  ',
      price: 500000,
      quantity: 1,
      size: selectedSize,
      colors,
      color:
        Object.values(colors).filter(Boolean).join(' / ') ||
        'رنگ پیش‌فرض',
      addedAt: new Date().toISOString(),
    };

    if (!getDemoUser()) {
      savePendingCartItem(cartItem);
      navigate('/login?returnTo=%2Fcart');
      return;
    }

    addToCart(cartItem);
    window.alert('custom shoe add to cart.');
  };

  return (
    <main className="shoe-experience" dir="rtl">

      <section
        className="shoe-stage"
        aria-label=" 3D rendering of shoes "
      >
        <Canvas
          camera={{
            position: [1, 1, 1],
            fov: 35,
            near: 0.01,
            far: 10,
          }}
        >
          <Suspense fallback={<ShoeLoader />}>
            <Geos />
          </Suspense>
        </Canvas>
      </section>

      <section
        className="shoe-purchase-area"
        aria-label="Size selection and purchase"
      >
        <div className="shoe-purchase-controls">

          <div className="shoe-size-control">
            <label htmlFor="shoe-size">
              shoe size
            </label>

            <select
              id="shoe-size"
              value={selectedSize}
              onChange={(event) =>
                setSelectedSize(event.target.value)
              }
            >
              {['38', '39', '40', '41', '42', '43', '44', '45'].map(
                (size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                )
              )}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="btn-price"
            type="button"
          >
            Add to cart
          </button>

        </div>
      </section>

      <div className="shoe-color-controls" dir="ltr">
        <Leva
          collapsed={false}
          titleBar={{ title: 'Change Color' }}
          oneLineLabels
          theme={{
            sizes: {
              rootWidth: '220px',
            },
          }}
        />
      </div>

    </main>
  );
}

export default Shoe;
