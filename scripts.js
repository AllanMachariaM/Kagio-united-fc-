document.addEventListener('DOMContentLoaded', () => {
    const matches = [
        { date: '2024-07-10', opponent: 'Team A', location: 'Home' },
        { date: '2024-07-17', opponent: 'Team B', location: 'Away' },
        // Add more matches as needed
    ];

    const news = [
        { date: '2024-07-09', title: 'Fixtures & Results', photo: '11.jpg' },
        { date: '2024-07-09', title: 'Fixtures & Results', photo: '10.jpg' },
        { date: '2024-06-25', title: 'Season Kickoff Event', photo: 'images/season-kickoff.jpg' },
        { date: '2024-06-20', title: 'Player Transfer Updates', photo: 'images/player-transfer.jpg' },
        { date: '2024-06-15', title: 'Training Camp Starts', photo: 'images/training-camp.jpg' },
        { date: '2024-06-10', title: 'New Sponsorship Deal', photo: 'images/sponsorship-deal.jpg' },
        { date: '2024-06-05', title: 'Community Outreach Program', photo: 'images/community-outreach.jpg' }
        // Add more news as needed
    ];    

    const matchList = document.getElementById('match-list');
    matches.forEach(match => {
        const listItem = document.createElement('li');
        listItem.textContent = `${match.date}: Kagio United vs. ${match.opponent} (${match.location})`;
        matchList.appendChild(listItem);
    });

    const newsList = document.getElementById('news-list');
    news.forEach(item => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${item.photo}" alt="${item.title}" class="news-photo">
            <strong>${item.date}</strong> - ${item.title}
        `;
        newsList.appendChild(listItem);
    });

    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your message!');
        contactForm.reset();
    });

    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.tab-content');

    tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const targetTab = event.target.dataset.tab;

            tabContents.forEach(content => {
                if (content.id === targetTab) {
                    content.classList.add('active');
                    content.style.display = 'block';
                } else {
                    content.classList.remove('active');
                    content.style.display = 'none';
                }
            });

            tabLinks.forEach(link => {
                if (link.dataset.tab === targetTab) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    });

    // Set the initial active tab
    document.querySelector('.tab-link[data-tab="overview"]').click();
});








