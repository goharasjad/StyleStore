document.addEventListener("DOMContentLoaded", function () {
  // Get filter elements
  const categoryFilter = document.getElementById("category");
  const sortFilter = document.getElementById("sort");

  // Parse URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("category");

  // If category parameter exists, set the filter value
  if (categoryParam) {
    categoryFilter.value = categoryParam;
  }

  // Add event listeners to filters
  categoryFilter.addEventListener("change", applyFilters);
  sortFilter.addEventListener("change", applyFilters);

  // Function to apply filters
  function applyFilters() {
    const selectedCategory = categoryFilter.value;
    const selectedSort = sortFilter.value;

    // Get all product cards
    const products = document.querySelectorAll(".product-card");

    // Filter and sort products
    products.forEach((product) => {
      // Filter by category
      if (
        selectedCategory === "all" ||
        product.dataset.category === selectedCategory
      ) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
        return;
      }
    });

    // Sort visible products
    const visibleProducts = Array.from(products).filter(
      (product) => product.style.display !== "none"
    );
    sortProducts(visibleProducts, selectedSort);
  }

  // Function to sort products
  function sortProducts(products, sortBy) {
    const productGrid = document.querySelector(".product-grid");

    // Sort products
    products.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return parseFloat(a.data.price) - parseFloat(b.data.price);
        case "price-high":
          return parseFloat(b.data.price) - parseFloat(a.data.price);
        default: //
          return 0;
      }
    });

    // Re-append products in the sorted order
    products.forEach((product) => {
      productGrid.appendChild(product);
    });
  }

  // Initialize filters
  applyFilters();
});
