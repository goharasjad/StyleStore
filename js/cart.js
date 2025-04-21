document.addEventListener("DOMContentLoaded", function () {
  // Initialize cart if it doesn't exist
  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  // Add event listeners to "Add to Cart" buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const id = this.getAttribute("data-id");
      const name = this.getAttribute("data-name");
      const price = parseFloat(this.getAttribute("data-price"));
      const image = this.getAttribute("data-image");

      // Add item to cart
      addToCart(id, name, price, image);

      // Show confirmation message
      showAlert(`${name} has been added to your cart!`);
    });
  });

  // Check if we're on cart page
  if (window.location.pathname.includes("cart.html")) {
    displayCartItems();

    // Add event listener to checkout button
    document
      .getElementById("checkout-btn")
      .addEventListener("click", processCheckout);

    // Add event listener to continue shopping button
    document
      .getElementById("continue-shopping")
      .addEventListener("click", function () {
        window.location.href = "products.html";
      });
  }

  // Function to add item to cart
  function addToCart(id, name, price, image) {
    const cart = JSON.parse(localStorage.getItem("cart"));

    // Check if item already exists in cart
    const existingItem = cart.find((item) => item.id === id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: id,
        name: name,
        price: price,
        image: image,
        quantity: 1,
      });
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // Function to display cart items
  function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem("cart"));

    // Clear container
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<div class="empty-cart"><p>Your cart is empty.</p></div>';
      document.getElementById("checkout-btn").disabled = true;
      document.getElementById("cart-total").textContent = "$0.00";
      return;
    }

    // Create HTML for cart items
    let total = 0;
    let cartHTML =
      '<div class="cart-item-headers">' +
      "<div>Product</div>" +
      "<div>Price</div>" +
      "<div>Quantity</div>" +
      "<div>Subtotal</div>" +
      "<div></div>" +
      "</div>";

    cart.forEach((item) => {
      const subtotal = item.price * item.quantity;
      total += subtotal;

      cartHTML += `
        <div class="cart-item" data-id="${item.id}">
          <div class="cart-item-info">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
          </div>
          <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          <div class="cart-item-quantity">
            <button class="quantity-btn decrease">-</button>
            <span class="quantity">${item.quantity}</span>
            <button class="quantity-btn increase">+</button>
          </div>
          <div class="cart-item-subtotal">$${subtotal.toFixed(2)}</div>
          <div class="cart-item-remove">
            <button class="remove-btn">Remove</button>
          </div>
        </div>
      `;
    });

    cartItemsContainer.innerHTML = cartHTML;
    document.getElementById("cart-total").textContent = `$${total.toFixed(2)}`;

    // Add event listeners to quantity and remove buttons
    const decreaseButtons = document.querySelectorAll(".quantity-btn.decrease");
    const increaseButtons = document.querySelectorAll(".quantity-btn.increase");
    const removeButtons = document.querySelectorAll(".remove-btn");

    decreaseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const cartItem = this.closest(".cart-item");
        const id = cartItem.getAttribute("data-id");
        updateCartItemQuantity(id, -1);
      });
    });

    increaseButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const cartItem = this.closest(".cart-item");
        const id = cartItem.getAttribute("data-id");
        updateCartItemQuantity(id, 1);
      });
    });

    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const cartItem = this.closest(".cart-item");
        const id = cartItem.getAttribute("data-id");
        removeCartItem(id);
      });
    });
  }

  // Function to update cart item quantity
  function updateCartItemQuantity(id, change) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    const item = cart.find((item) => item.id === id);

    if (item) {
      item.quantity += change;

      if (item.quantity <= 0) {
        removeCartItem(id);
        return;
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      displayCartItems();
    }
  }

  // Function to remove item from cart
  function removeCartItem(id) {
    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCartItems();
  }

  // Function to process checkout
  function processCheckout() {
    // Confirm order
    const isConfirmed = confirm("Confirm your order?");

    if (isConfirmed) {
      // Show thank you message
      alert("Order has been placed! Thank you for shopping with StyleStore.");

      // Clear cart
      localStorage.setItem("cart", JSON.stringify([]));

      // Redirect to home page
      window.location.href = "index.html";
    }
  }

  // Function to show alert message
  function showAlert(message) {
    // Create alert element
    const alertElement = document.createElement("div");
    alertElement.className = "alert";
    alertElement.textContent = message;

    // Add to body
    document.body.appendChild(alertElement);

    // Show alert
    setTimeout(() => {
      alertElement.className = "alert show";
    }, 10);

    // Remove after 3 seconds
    setTimeout(() => {
      alertElement.className = "alert";
      setTimeout(() => {
        document.body.removeChild(alertElement);
      }, 300);
    }, 3000);
  }
});
