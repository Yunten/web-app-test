document.addEventListener('DOMContentLoaded', function () {
    const visitsList = document.getElementById('visits-list');
    const countdownElement = document.getElementById('countdown');
    const nextCityElement = document.getElementById('next-city');

    // Placeholder data mimicking a dynamic Google Sheet data fetch
    const tripData = {
        currentCity: {
            name: 'Placeholder City',
            nextMove: new Date(new Date().getTime() + 1000 * 60 * 60 * 2), // 2 hours from now
            visits: [
                {
                    id: 1,
                    name: 'Visit Museum',
                    cost: 15,
                    startTime: '10:00 AM',
                    geoloc: 'Museum Street 5, City Center',
                    lat: 40.730610,
                    lng: -73.935242
                },
                {
                    id: 2,
                    name: 'Botanical Garden Tour',
                    cost: 20,
                    startTime: '1:00 PM',
                    geoloc: 'Garden Ave, City Outskirts',
                    lat: 40.730410,
                    lng: -73.935542
                },
                // More visits...
            ]
        },
        nextCity: {
            name: 'Next Placeholder City',
        }
    };

    // Function to update city information
    function updateCityInfo() {
        document.getElementById('city-name').textContent = `Current City: ${tripData.currentCity.name}`;
        nextCityElement.textContent = `Next City: ${tripData.nextCity.name}`;
    }

    updateCityInfo();

    // Function to update countdown timer
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = tripData.currentCity.nextMove - now;

        if (distance < 0) {
            countdownElement.textContent = "Time to move!";
            changeCity();  // Function to update city
            return;
        }

        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

        setTimeout(updateCountdown, 1000);
    }

    updateCountdown();

    // Function to render visits
    function renderVisits() {
        visitsList.innerHTML = '';  // Clear existing visits
        tripData.currentCity.visits.forEach(visit => {
            const visitItem = document.createElement('li');
            visitItem.innerHTML = `
                <span>
                    <input type="checkbox" class="checkbox" id="visit-${visit.id}" data-visit-id="${visit.id}">
                    ${visit.name} - $${visit.cost} at ${visit.startTime}
                    <div class="geoloc">${visit.geoloc}</div>
                </span>
                <img src="map_icon.png" class="map-icon" onclick="openYandexMap(${visit.lat}, ${visit.lng})" alt="Show on Map">
            `;
            visitsList.appendChild(visitItem);
        });
    }

    renderVisits();

    // Function to open Yandex Maps with coordinates
    function openYandexMap(lat, lng) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const url = `https://yandex.com/maps/?ll=${lng},${lat}&z=14&l=map`;

        if (isMobile) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }
    }

    // Function to handle checkbox state saving
    document.addEventListener('change', function (event) {
        if (event.target.classList.contains('checkbox')) {
            const visitId = event.target.dataset.visitId;
            const isChecked = event.target.checked;
            // Save the state to the server or handle Telegram-specific logic
            console.log(`Visit ID ${visitId} checked: ${isChecked}`);
        }
    });

    // Function to dynamically change city data
    function changeCity() {
        // Placeholder for changing the city when time is up
        // In a real-world scenario, you'd update the tripData to the next city data
        tripData.currentCity = {
            name: tripData.nextCity.name,
            nextMove: new Date(new Date().getTime() + 1000 * 60 * 60 * 2), // 2 hours from now
            visits: [
                {
                    id: 3,
                    name: 'City Park Walk',
                    cost: 0,
                    startTime: '3:00 PM',
                    geoloc: 'Park Street, City Center',
                    lat: 40.735610,
                    lng: -73.935842
                },
                {
                    id: 4,
                    name: 'Art Gallery Visit',
                    cost: 25,
                    startTime: '5:00 PM',
                    geoloc: 'Gallery Ave, Downtown',
                    lat: 40.736610,
                    lng: -73.934242
                },
                // More visits...
            ]
        };

        tripData.nextCity = {
            name: 'Another Placeholder City'
        };

        updateCityInfo();  // Update UI with new city
        renderVisits();  // Render new visits
        updateCountdown();  // Reset countdown
    }
});



let tg = window.Telegram.WebApp; //получаем объект webapp телеграма 

tg.expand(); //расширяем на все окно  