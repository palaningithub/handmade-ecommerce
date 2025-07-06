console.log("Handmade Crafts page loaded!");
let cartCount = 0;

// ====== Simple Cart Data ======
let cart = [];

// ====== Add Item ======
function addToCart(productName) {
  const priceMap = {
    "Handmade Bracelet": 150,
    "Clay Pottery": 300,
    "Mini Painting": 200,
  };

  cart.push({ name: productName, price: priceMap[productName] });
  saveCartToStorage();
  updateCartUI();
}


// ====== Update Cart UI ======
function updateCartUI() {
  const cartCountEl = document.getElementById("cart-count");
  const cartSectionEl = document.getElementById("cart-section");
  const cartItemsEl = document.getElementById("cart-items");
  const cartTotalEl = document.getElementById("cart-total");

  // Update count
  cartCountEl.textContent = cart.length;
  cartSectionEl.hidden = cart.length === 0;

  // Clear list
  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
      <span>${item.name}</span>
      <span>₹${item.price}</span>
      <button class="remove-btn" onclick="removeFromCart(${index})">🗑️</button>
    `;
    cartItemsEl.appendChild(li);
  });

  cartTotalEl.innerHTML = `<strong>Total:</strong> ₹${total}`;
}

// New function to remove item by index
function removeFromCart(index) {
  cart.splice(index, 1);
  saveCartToStorage();
  updateCartUI();
}



// ====== Debug Info ======
console.log("Handmade Crafts page loaded!");

// Checkout functionality
document.getElementById("checkout-btn").addEventListener("click", function () {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Clear cart
  cart = [];
  updateCartUI();

  // Show thank you message
  document.getElementById("checkout-message").textContent =
    "✅ Thank you for your purchase! Your order is being processed.";
});

function saveCartToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCartFromStorage() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartUI();
  }
}

loadCartFromStorage();

