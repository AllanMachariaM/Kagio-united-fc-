document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const playerId = urlParams.get('id'); // Get player ID from URL

    if (playerId) {
        fetch(`http://localhost:3000/api/player/${playerId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Player not found');
                }
                return response.json();
            })
            .then(player => {
                document.getElementById('player-image').src = player.image_url;
                document.getElementById('player-name').textContent = player.name;
                document.getElementById('player-position').textContent = player.position;
                document.getElementById('player-jersey').textContent = player.jersey_number;
                document.getElementById('player-dob').textContent = player.date_of_birth;
                document.getElementById('player-bio').textContent = player.bio;
            })
            .catch(error => {
                console.error('Error fetching player data:', error);
                alert('Player not found. Please try again.');
            });
    } else {
        console.error('Player ID not found in URL');
    }
});