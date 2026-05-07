var CART_KEY = 'bishop_cart';

function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e) { return []; }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(item) {
  var cart = getCart();
  var existing = null;
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].id === item.id) { existing = cart[i]; break; }
  }
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    cart.push({ id: item.id, name: item.name, brand: item.brand, price: item.price, img: item.img || '', qty: 1 });
  }
  saveCart(cart);
}

function removeFromCart(id) {
  saveCart(getCart().filter(function(i) { return i.id !== id; }));
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function getCartTotal() {
  return getCart().reduce(function(sum, i) { return sum + i.price * (i.qty || 1); }, 0);
}

function getCartCount() {
  return getCart().reduce(function(sum, i) { return sum + (i.qty || 1); }, 0);
}

function updateCartBadge() {
  var badge = document.getElementById('cart-count');
  if (badge) {
    var count = getCartCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function handleAddToCart(btn) {
  var card = btn.closest('.watch-card');
  addToCart({
    id: card.dataset.id,
    name: card.dataset.name,
    brand: card.dataset.brand,
    price: parseFloat(card.dataset.price),
    img: card.dataset.img || ''
  });
  var orig = btn.textContent;
  btn.textContent = 'Added \u2713';
  btn.classList.add('added');
  setTimeout(function() {
    btn.textContent = orig;
    btn.classList.remove('added');
  }, 1500);
}

document.addEventListener('DOMContentLoaded', updateCartBadge);
