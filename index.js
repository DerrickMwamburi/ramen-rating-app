document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

// Sample ramen data
const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "images/shoyu.jpg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "images/kojiro.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "images/tonkotsu.jpg", rating: 3, comment: "Rich broth!" }
];

// Function to display all ramen images in the menu
function displayRamens() {
    const ramenMenu = document.getElementById("ramen-menu");
    ramenMenu.innerHTML = ""; // Clear existing content

    ramens.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.classList.add("ramen-thumbnail");

        // Add hover effect
        img.addEventListener("mouseover", () => img.style.transform = "scale(1.1)");
        img.addEventListener("mouseout", () => img.style.transform = "scale(1)");

        // Click event to show details
        img.addEventListener("click", () => displayRamenDetails(ramen));
        ramenMenu.appendChild(img);
    });

    // Automatically display the first ramen on page load
    if (ramens.length > 0) {
        displayRamenDetails(ramens[0]);
    }
}

// Function to display ramen details when clicked
function displayRamenDetails(ramen) {
    document.getElementById("ramen-name").textContent = ramen.name;
    document.getElementById("ramen-restaurant").textContent = ramen.restaurant;
    document.getElementById("ramen-image").src = ramen.image;

    // Make rating and comments editable
    document.getElementById("ramen-rating").innerHTML = `<input type="number" value="${ramen.rating}" min="1" max="5" id="edit-rating">`;
    document.getElementById("ramen-comment").innerHTML = `<input type="text" value="${ramen.comment}" id="edit-comment">`;

    // Save changes dynamically
    document.getElementById("edit-rating").addEventListener("change", (e) => ramen.rating = e.target.value);
    document.getElementById("edit-comment").addEventListener("change", (e) => ramen.comment = e.target.value);
}

// Function to add a new ramen dish
function addSubmitListener() {
    document.getElementById("new-ramen-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Capture form values
        const newRamen = {
            id: ramens.length + 1,
            name: document.getElementById("new-name").value,
            restaurant: document.getElementById("new-restaurant").value,
            image: document.getElementById("new-image").value,
            rating: document.getElementById("new-rating").value,
            comment: document.getElementById("new-comment").value
        };

        // Add to data and update display
        ramens.push(newRamen);
        displayRamens();

        // Show success message
        showPopup("🎉 Ramen Added Successfully!");

        // Scroll to ramen menu
        document.getElementById("ramen-gallery").scrollIntoView({ behavior: "smooth" });

        // Reset form
        this.reset();
    });
}

// Function to delete a ramen dish
function deleteRamen(ramenId) {
    const index = ramens.findIndex(ramen => ramen.id === ramenId);
    if (index !== -1) {
        ramens.splice(index, 1);
        displayRamens();
        showPopup("❌ Ramen Removed!");
    }
}

// Function to initialize the app
function initializeApp() {
    displayRamens();
    addSubmitListener();
}

// Function to show pop-up notifications
function showPopup(message) {
    const popup = document.createElement("div");
    popup.textContent = message;
    popup.classList.add("popup");
    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 500);
    }, 2000);
}
