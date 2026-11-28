const CART_KEY = 'shoeCart';
const PENDING_ITEM_KEY = 'pendingShoeCartItem';
const DEMO_USER_KEY = 'demoUser';

export function getCartItems() {
  try {
    const value = localStorage.getItem(CART_KEY);
    const parsed = value ? JSON.parse(value) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event('shoe-cart-updated'));
}

export function addToCart(item) {
  const items = getCartItems();
  const matchingIndex = items.findIndex((existing) =>
    existing.productName === item.productName &&
    existing.size === item.size &&
    JSON.stringify(existing.colors) === JSON.stringify(item.colors)
  );

  if (matchingIndex >= 0) {
    items[matchingIndex] = {
      ...items[matchingIndex],
      quantity: (Number(items[matchingIndex].quantity) || 1) + (Number(item.quantity) || 1),
    };
  } else {
    items.push({
      ...item,
      id: item.id || (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`),
      quantity: Number(item.quantity) || 1,
    });
  }

  saveCartItems(items);
  return items;
}

export function removeFromCart(id) {
  const items = getCartItems().filter((item) => item.id !== id);
  saveCartItems(items);
  return items;
}

export function updateCartQuantity(id, quantity) {
  const items = getCartItems()
    .map((item) => item.id === id ? { ...item, quantity: Math.max(1, Number(quantity) || 1) } : item);
  saveCartItems(items);
  return items;
}

export function clearCart() {
  saveCartItems([]);
}

export function getDemoUser() {
  try {
    const value = localStorage.getItem(DEMO_USER_KEY);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

export function setDemoUser(user) {
  localStorage.setItem(DEMO_USER_KEY, JSON.stringify(user));
  window.dispatchEvent(new Event('shoe-user-updated'));
}

export function savePendingCartItem(item) {
  localStorage.setItem(PENDING_ITEM_KEY, JSON.stringify(item));
}

export function addPendingCartItemIfAny() {
  try {
    const value = localStorage.getItem(PENDING_ITEM_KEY);
    if (!value) return false;
    const item = JSON.parse(value);
    localStorage.removeItem(PENDING_ITEM_KEY);
    if (item) addToCart(item);
    return true;
  } catch {
    localStorage.removeItem(PENDING_ITEM_KEY);
    return false;
  }
}
