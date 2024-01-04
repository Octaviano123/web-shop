let search = document.querySelector('.search-box');
let navbar = document.querySelector('.navbar');
let cartBox = document.getElementById("cart-box");
let searchInput = document.getElementById('searchInput');
let productBoxes = document.querySelectorAll('.box');

document.querySelector('#search-icon').onclick = () => {
    search.classList.toggle('active');
    navbar.classList.remove('active');
    cartBox.style.display = "none";
};

document.querySelector('#menu-icon').onclick = () => {
    navbar.classList.toggle('active');
    search.classList.remove('active');
    cartBox.style.display = "none";
};

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
    cartBox.style.display = "none";
};

searchInput.addEventListener('input', function () {
    let searchTerm = searchInput.value.trim().toLowerCase();

    productBoxes.forEach(function (box) {
        let keywords = box.getAttribute('data-search').toLowerCase();

        if (keywords.includes(searchTerm)) {
            box.style.display = 'block';
            box.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            box.style.display = 'none';
        }
    });
});

var remainingQuantity = localStorage.getItem("remainingQuantity") || 11;
updateRemainingQuantity();

function buyNow() {
    if (remainingQuantity > 0) {
        remainingQuantity--;
        updateRemainingQuantity();
    } else {
        alert("Sorry, the product is out of stock!");
    }
}

function updateRemainingQuantity() {
    var remainingSpan = document.getElementById("remaining");
    if (remainingSpan) {
        remainingSpan.textContent = remainingQuantity;
        localStorage.setItem("remainingQuantity", remainingQuantity);
    }
}

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

document.getElementById('cancel-btn').addEventListener('click', cancelCart);

function submitComment() {
    var commentInput = document.getElementById('comment-input');
    var nameInput = document.getElementById('name-input');
    var ratingInput = document.getElementById('rating-input');
    var commentList = document.getElementById('comment-list');

    var commentText = commentInput.value;
    var userName = nameInput.value || 'Anonymous';
    var userRating = parseInt(ratingInput.value) || 0;

    if (commentText.trim() === "") {
        alert("Please enter a comment.");
        return;
    }

    var listItem = document.createElement('li');
    listItem.className = 'comment';
    listItem.textContent = userName + ': ' + commentText + ' (Rating: ' + userRating + '/5)';

    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        deleteComment(listItem);
    };

    listItem.appendChild(deleteButton);
    commentList.appendChild(listItem);

    saveCommentToLocalStorage({ user: userName, text: commentText, rating: userRating });

    commentInput.value = '';
    nameInput.value = '';
    ratingInput.value = '';
}

function deleteComment(commentElement) {
    var commentList = document.getElementById('comment-list');
    commentList.removeChild(commentElement);
    updateLocalStorage();
}

function saveCommentToLocalStorage(comment) {
    var comments = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [];
    comments.push(comment);
    localStorage.setItem('comments', JSON.stringify(comments));
}

function updateLocalStorage() {
    var commentList = document.getElementById('comment-list');
    var comments = [];

    for (var i = 0; i < commentList.children.length; i++) {
        var commentText = commentList.children[i].textContent;
        var userName = commentText.split(':')[0].trim();
        var textAndRating = commentText.split(':')[1].trim().split('(Rating:');
        var text = textAndRating[0].trim();
        var rating = parseInt(textAndRating[1]) || 0;

        comments.push({ user: userName, text: text, rating: rating });
    }

    localStorage.setItem('comments', JSON.stringify(comments));
}

window.onload = function () {
    var comments = localStorage.getItem('comments');

    if (comments) {
        comments = JSON.parse(comments);
        var commentList = document.getElementById('comment-list');

        comments.forEach(function (comment) {
            var listItem = document.createElement('li');
            listItem.className = 'comment';
            listItem.textContent = comment.user + ': ' + comment.text + ' (Rating: ' + comment.rating + '/5)';

            var deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.onclick = function () {
                deleteComment(listItem);
            };

            listItem.appendChild(deleteButton);
            commentList.appendChild(listItem);
        });
    }
};

