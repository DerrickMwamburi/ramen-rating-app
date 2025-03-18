document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});


const ramens = [
    { id: 1, name: "Shoyu Ramen", restaurant: "Ichiran", image: "images/shoyu.jpg", rating: 5, comment: "Delicious!" },
    { id: 2, name: "Miso Ramen", restaurant: "Menya", image: "images/kojiro.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 3, name: "Tonkotsu Ramen", restaurant: "Ramen-ya", image: "images/tonkotsu.jpg", rating: 3, comment: "Rich broth!" },
    { id: 4, name: "Naruto Ramen", restaurant: "Naruto-ya", image: "images/naruto.jpg", rating: 4, comment: "Very flavorful!" },
    { id: 5, name: "Nirvana Ramen", restaurant: "Nirvana-ya", image: "images/nirvana.jpg", rating: 5, comment: "Delicious!" },
];


function displayRamens() {
    const ramenMenu = document.getElementById("ramen-menu");
    ramenMenu.innerHTML = "";

    ramens.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.classList.add("ramen-thumbnail");


        img.addEventListener("mouseover", () => img.style.transform = "scale(1.1)");
        img.addEventListener("mouseout", () => img.style.transform = "scale(1)");

        
        img.addEventListener("click", () => displayRamenDetails(ramen));
        ramenMenu.appendChild(img);
    });

    
    if (ramens.length > 0) {
        displayRamenDetails(ramens[0]);
    }
}


function displayRamenDetails(ramen) {
    document.getElementById("ramen-name").textContent = ramen.name;
    document.getElementById("ramen-restaurant").textContent = ramen.restaurant;
    document.getElementById("ramen-image").src = ramen.image;

    
    document.getElementById("ramen-rating").innerHTML = `<input type="number" value="${ramen.rating}" min="1" max="5" id="edit-rating">`;
    document.getElementById("ramen-comment").innerHTML = `<input type="text" value="${ramen.comment}" id="edit-comment">`;

    
    document.getElementById("edit-rating").addEventListener("change", (e) => ramen.rating = e.target.value);
    document.getElementById("edit-comment").addEventListener("change", (e) => ramen.comment = e.target.value);
}


function addSubmitListener() {
    document.getElementById("new-ramen-form").addEventListener("submit", function (event) {
        event.preventDefault(); 

        
        const newRamen = {
            id: ramens.length + 1,
            name: document.getElementById("new-name").value,
            restaurant: document.getElementById("new-restaurant").value,
            image: document.getElementById("new-image").value,
            rating: document.getElementById("new-rating").value,
            comment: document.getElementById("new-comment").value
        };

        
        ramens.push(newRamen);
        displayRamens();

        
        showPopup("🎉 Ramen Added Successfully!");

        
        document.getElementById("ramen-gallery").scrollIntoView({ behavior: "smooth" });

        
        this.reset();
    });
}



function initializeApp() {
    displayRamens();
    addSubmitListener();
}


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
