let search = document.querySelector('.search-box');
let navbar = document.querySelector('.navbar');
let cartBox = document.getElementById("cart-box");
let searchInput = document.getElementById('searchInput');
let productBoxes = document.querySelectorAll('.box');
document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
    cartBox.style.display = "none"; // Hide the cart when searching
}

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
    cartBox.style.display = "none"; // Hide the cart when toggling the menu
}

// Function to add items to the cart
function addToCart(productName, price) {
    var listItem = document.createElement("li");
    listItem.textContent = productName + " - $" + price.toFixed(2);

    document.getElementById("cart-list").appendChild(listItem);

    updateTotal(price);

    cartBox.style.display = "block";
}

// Function to update the total cost
function updateTotal(price) {
    var totalElement = document.getElementById("total");
    var currentTotal = parseFloat(totalElement.textContent);
    var newTotal = currentTotal + price;
    totalElement.textContent = newTotal.toFixed(2);
}

// Function to handle the Buy Now button click
function buyNow() {
    alert("Thank you for your purchase!");
    // You can add more functionality here, such as submitting the order to a server.
}

// Function to cancel and clear the cart list
function cancelCart() {
    document.getElementById("cart-list").innerHTML = "";
    document.getElementById("total").textContent = "0.00";
    cartBox.style.display = "none";
}

// Function to toggle the visibility of the cart box
function toggleCart() {
    cartBox.style.display = (cartBox.style.display === "block") ? "none" : "block";
}

window.onscroll = () => {
    navbar.classList.remove('active');
    search.classList.remove('active');
    cartBox.style.display = "none"; // Hide the cart when scrolling
}

// Add an input event listener to the search input
searchInput.addEventListener('input', function () {
    let searchTerm = searchInput.value.trim().toLowerCase();

    // Loop through each product box and check if it matches the search term
    productBoxes.forEach(function (box) {
        let keywords = box.getAttribute('data-search').toLowerCase();

        if (keywords.includes(searchTerm)) {
            box.style.display = 'block';
            // Scroll to the found box
            box.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            box.style.display = 'none';
        }
    });
});

let header = document.querySelector('header');

window.addEventListener('scroll', () => {
    header.classList.toggle('shadow', window.scrollY > 0);
});

// Add click event listeners to each 'Add to Cart' button
document.querySelectorAll('.buy-btn').forEach(function (button) {
    button.addEventListener('click', function () {
        // Extract product details from the clicked button's parent element
        var productContainer = button.closest('.box');
        var productName = productContainer.querySelector('h3').textContent;
        var productPrice = parseFloat(productContainer.querySelector('.content span').textContent.replace('$', ''));

        // Call the addToCart function with the extracted details
        addToCart(productName, productPrice);
    });
});

// Add click event listener to the 'Cancel' button
document.getElementById('cancel-btn').addEventListener('click', cancelCart);