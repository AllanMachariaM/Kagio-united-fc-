// Base URL for the backend API
const API_BASE_URL = "http://localhost:5000/api";

// Tab Navigation
document.addEventListener("DOMContentLoaded", function () {
    const tabLinks = document.querySelectorAll(".tab-link");
    const sections = document.querySelectorAll(".section");

    // Hide all sections except the first one (Home)
    sections.forEach((section, index) => {
        if (index !== 0) {
            section.style.display = "none";
        }
    });

    // Add click event listeners to tab buttons
    tabLinks.forEach((tab) => {
        tab.addEventListener("click", function () {
            const targetTab = this.getAttribute("data-tab");

            // Hide all sections
            sections.forEach((section) => {
                section.style.display = "none";
            });

            // Show the target section
            document.getElementById(targetTab).style.display = "block";

            // Optional: Add active class to the clicked tab
            tabLinks.forEach((tab) => tab.classList.remove("active"));
            this.classList.add("active");
        });
    });

    // Fetch players when the page loads
    fetchPlayers();
});

// Fetch and display players from the backend
async function fetchPlayers() {
    try {
        const response = await fetch(`${API_BASE_URL}/players`);
        const players = await response.json();
        const playerList = document.getElementById("player-profiles-list");

        // Clear existing content
        playerList.innerHTML = "";

        // Display each player
        players.forEach((player) => {
            const playerProfile = document.createElement("div");
            playerProfile.classList.add("player-profile");

            // Add player name
            const nameElement = document.createElement("h3");
            nameElement.textContent = player.name;
            playerProfile.appendChild(nameElement);

            // Add player image
            const imageElement = document.createElement("img");
            imageElement.src = player.image;
            imageElement.alt = player.name;
            playerProfile.appendChild(imageElement);

            // Append the profile to the player list
            playerList.appendChild(playerProfile);
        });
    } catch (err) {
        console.error("Failed to fetch players:", err);
    }
}

// Add a new player
document.getElementById("playerForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const playerName = document.getElementById("playerName").value;
    const playerImage = document.getElementById("playerImage").files[0];

    // Validate inputs
    if (!playerName || !playerImage) {
        alert("Please fill out all fields!");
        return;
    }

    // Convert image to base64 for backend storage
    const reader = new FileReader();
    reader.readAsDataURL(playerImage);
    reader.onload = async () => {
        const imageBase64 = reader.result;

        try {
            // Send player data to the backend
            const response = await fetch(`${API_BASE_URL}/players`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: playerName, image: imageBase64 }),
            });

            if (response.ok) {
                // Refresh the player list after adding a new player
                fetchPlayers();
                // Clear the form
                document.getElementById("playerForm").reset();
            } else {
                alert("Failed to add player");
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };
});