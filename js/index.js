const BASE_URL = "https://my-json-server.typicode.com/levismunene01/MY-PROJECT/PC-GAMES";

document.addEventListener("DOMContentLoaded", () => {
    fetchGames();
    const form = document.querySelector('#search-form')
    form.addEventListener('submit', (e) => {
        // prevent default behavior
        e.preventDefault()
        const input = document.querySelector('#search')
        
        // If search input is empty, fetch all games
        if(input.value) {
            fetchGames(input.value)
        } else {
            fetchGames(); 
        }
    }); 

    // Dropdown toggle 
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle')
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const dropdownMenu = toggle.nextElementSibling;
            dropdownMenu.classList.toggle('show')
        })
    })
})

function fetchGames(searchTerm = '') {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };

    fetch(`${BASE_URL}`, options)
        .then((response) => response.json())
        .then((games) => {
            // Filter games based on the search term
            const filteredGames = games.filter((game) => game.title.includes(searchTerm))

            // Clear the game container before displaying filtered games
            const gameContainer = document.querySelector("#games")
            gameContainer.innerHTML = ''

            // Display filtered games
            filteredGames.forEach((game) => pcGame(game))
        })
        .catch((err) => console.error(err))
}

function pcGame(game) {
    const gameContainer = document.querySelector("#games");

    const parentDiv = document.createElement("div")
    parentDiv.classList.add("card")

    // Set background image
    parentDiv.style.backgroundImage = `url('https://i.pinimg.com/236x/87/8d/34/878d348a2f820bdb9e9692ed23c3454e.jpg')`
    parentDiv.style.backgroundSize = "cover"
    parentDiv.style.backgroundPosition = "center"
    parentDiv.style.gap = '2px'

    const cardBody = document.createElement("div")
    cardBody.classList.add("card-body")

     // Game image
     const gameImage = document.createElement("img")
     gameImage.classList.add("card-img-top")
     gameImage.src = game.poster
     gameImage.alt = game.title
 
     // Append game image to card body
     cardBody.appendChild(gameImage)

    // Game title
    const title = document.createElement("h5")
    title.className = "card-title"
    title.innerText = game.title
    title.style.minHeight = "50px"

    cardBody.appendChild(title)

    // Game developers
    const developers = document.createElement("p")
    developers.classList.add("card-text")
    developers.textContent = `Developers: ${game.developers}`

    // Game publisher(s)
    const publishers = document.createElement("p")
    publishers.classList.add("card-text")
    publishers.textContent = `Publisher(s): ${game["Publisher(s)"]}`

    // Game category
    const category = document.createElement("p")
    category.classList.add("card-text")
    category.textContent = `Category: ${game.category}`

    // Game description
    const description = document.createElement("p");
    description.classList.add("card-text", "description");
    description.textContent = game.description;

    // Game price
    const price = document.createElement("p");
    price.classList.add("card-text", "price");
    price.textContent = `$${game.price.toFixed(2)}`;

    // Games sold
    const gamesSold = document.createElement("p");
    gamesSold.classList.add("card-text");
    gamesSold.textContent = `Games Sold: ${game.games_sold}`;



 // Button
 const purchaseButton = document.createElement("button");
 purchaseButton.classList.add("btn", "btn-primary", "show-price");
 purchaseButton.textContent = "PURCHASE GAME";
 purchaseButton.addEventListener("click", () => {
     // Display alert for payment information
     alert("Please proceed with the payment for purchasing the game.");
     // Trigger offcanvas when "OK" is clicked
     const offcanvasElement = document.getElementById('offcanvasExample');
  
 });

 // Append button to body
 document.body.appendChild(purchaseButton);

    // Set text color to white for specified elements
    [title, purchaseButton, price, developers, publishers, category, gamesSold, description].forEach((elem) => {
        elem.style.color = "white";
    });

    cardBody.append(title, purchaseButton, price, developers, publishers, category, gamesSold, description);
    parentDiv.appendChild(cardBody);

    // Append the parent div to the game container
    gameContainer.appendChild(parentDiv);
}

// An autohiding  until one agree the terms and condition
document.getElementById("showTerms").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("termsAndConditions").style.display = "block";
});