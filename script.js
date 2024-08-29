// script.js
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const scrollUpButton = document.getElementById('scroll-up');
    const scrollDownButton = document.getElementById('scroll-down');
    const toCurrentCityButton = document.getElementById('to-current-city');
    const visitsList = document.getElementById('visits-list');
    let countdownElement = document.getElementById('countdown');

    let current_city_index = 2

    // Array of cities
    const cities = [
        {
            name: 'Санкт-Петербург',
            details: 'Красуйся град Петров и стой неколебимо как Россия &#x1f1f7;&#x1f1fa;',
            image:'spb',
            nextMove: Date.parse("2024-08-30 20:00:00"),
            visits: [
            ]
        },
        {
            name: 'Тула',
            details: 'Пряничный город',
            image:'tula',
            nextMove: Date.parse("2024-08-31 14:00:00"),
            visits: [
                {
                    id: 1,
                    name: 'Музей пряников(магаз)',
                    cost: 0,
                    startTime: '10:00 AM',
                    geoloc: 'Октябрьская улица, 45',
                    lat: 54.211387,
                    lng: 37.622091
                },
                {
                    id: 2,
                    name: 'Музей оружия',
                    cost: 550,
                    startTime: '1:00 PM',
                    geoloc: 'Октябрьская ул., 2',
                    lat: 54.204136,
                    lng: 37.616189
                },
                {
                    id: 3,
                    name: 'Музей оружия',
                    cost: 300,
                    startTime: '1:00 PM',
                    geoloc: 'Менделеевская улица, 12В',
                    lat: 54.195888,
                    lng: 37.619854
                },
                {
                    id: 4,
                    name: 'ЦПКИО Парк Белоусова',
                    cost: 0,
                    startTime: '1:00 PM',
                    geoloc: 'Первомайская улица, 13',
                    lat: 54.183671, 
                    lng: 37.585970
                },
                {
                    id: 5,
                    name: 'ресторан Шарден',
                    cost: ':D',
                    startTime: '1:00 PM',
                    geoloc: 'Советская ул., 11/5',
                    lat: 54.198263,  
                    lng: 37.613305
                }
            ]
        },
        {
            name: 'Воронеж',
            nextMove: Date.parse("2024-08-31 20:00:00"),
            details: 'Город строителей флота🤔 (так говорят)',
            image:'vrnz',
            visits: [
                {
                    id: 1,
                    name: 'Kорабль-музей Гото Предестинация',
                    cost: 100,
                    startTime: '10:00 AM',
                    geoloc: 'Петровская наб., 21А',
                    lat: 51.655763,
                    lng: 39.215621
                }
            ]
        },
        {
            name: 'Ростов',
            nextMove: Date.parse("2024-09-01 15:00:00"),
            details: 'Папа',
            image:'rst',
            visits: [
                {
                    id: 1,
                    name: 'Парамоновские склады',
                    cost: 100,
                    startTime: '10:00 AM',
                    geoloc: 'Береговая ул., 47А',
                    lat: 47.218310, 
                    lng: 39.726852
                },
                {
                    id: 2,
                    name: 'Ростовский цирк (ворота ;))',
                    cost: 0,
                    startTime: '10:00 AM',
                    geoloc: 'Будённовский проспект, 45',
                    lat: 47.218310, 
                    lng: 39.726852
                }
            ]
        },
        {
            name: 'Лазаревское (Сочи)',
            details: '',
            nextMove: Date.parse("2024-09-04 11:00:00"),
            image:'lazr',
            visits: [
                {
                    id: 1,
                    name: 'Чилл',
                    cost: 'бесценно',
                    startTime: '10:00 AM',
                    geoloc: 'Береговая ул., 47А'
                }
            ]
        },
        {
            name: 'Волгоград',
            details: '',
            nextMove: Date.parse("2024-09-06 11:00:00"),
            image:'stlngrd',
            visits: [
                {
                    id: 1,
                    name: 'Родина мать',
                    cost: 0,
                    startTime: '10:00 AM',
                    geoloc: 'Мамаев курган',
                    lat: 48.741583,
                    lng: 44.537209
                }
            ]
        },
        {
            name: 'Самара',
            details: '',
            nextMove: Date.parse("2024-09-06 15:00:00"),
            image:'smr',
            visits: [
            ]
        },
        {
            name: 'Тольятти',
            details: '',
            nextMove: Date.parse("2024-09-06 20:00:00"),
            image:'tlt',
            visits: [
            ]
        },
        {
            name: 'Казань',
            details: '? - брал',
            nextMove: Date.parse("2024-09-07 19:00:00"),
            image:'kzn',
            visits: [
            ]
        },
        {
            name: 'Нижний Новгород',
            details: '',
            nextMove: Date.parse("2024-09-07 22:00:00"),
            image:'nn',
            visits: [
            ]
        },
        {
            name: 'Санкт-Петербург',
            details: 'Красуйся град Петров и стой неколебимо как Россия &#x1f1f7;&#x1f1fa;',
            image:'spb',
            nextMove: Date.parse("2025-08-30 20:00:00"),
            visits: [
            ]
        }
    ];

    // Function to update city information
    function updateCityInfo() {
        // Clear existing carousel items
        carousel.innerHTML = '';

        // Add cities to carousel
        cities.forEach((city, index) => {
            const cityCard = document.createElement('div');
            cityCard.classList.add('carousel-item');
            if (index === current_city_index) cityCard.classList.add('current-city'); // Highlight the current city

            cityCard.style.backgroundImage = `url(cities/${city.image}.jpg)`;

            cityCard.innerHTML = `
                <div class="city-info">
                    <h1>${city.name}</h1>
                    <p>${city.details}</p>
                    ${index === current_city_index ? `<ul id="visits-list">${renderVisits(city.visits)}</ul>
                    <p>Время до поездки в следующий город: <span id="countdown">--</span></p>` : ''}
                </div>
            `;
            countdownElement = document.getElementById('countdown')
            countdownElement

            carousel.appendChild(cityCard);
        });

        // Start countdown for the current city
        if (cities[current_city_index].nextMove) {
            updateCountdown(cities[current_city_index].nextMove);
        }
    }

    // Function to render visits
    function renderVisits(visits) {
        return visits.map(visit => `
            <li>
                <span>
                    <input type="checkbox" class="checkbox" id="visit-${visit.id}" data-visit-id="${visit.id}">
                    ${visit.name} - ${visit.cost}₽ в ${visit.startTime}
                    <div class="geoloc">${visit.geoloc}</div>
                </span> 
                ${visit.lat ? `<img src="map_icon.png" class="map-icon" onclick="location.href='https://yandex.ru/maps/?ll=${visit.lng},${visit.lat}&z=19&l=map';" alt="Show on Map">`:''}
            </li>
        `).join('');
        
        //${visit.lat ? `<img src="map_icon.png" class="map-icon" onclick="openYandexMap(${visit.lat}, ${visit.lng})" alt="Show on Map">`:''}
    }

    // Function to update countdown timer
    function updateCountdown(nextMove) {
        const now = new Date().getTime();
        const distance = nextMove - now;

        if (distance < 0) {
            countdownElement.textContent = "Время двигаться!";
            changeCity();  // Update to next city
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        setTimeout(() => updateCountdown(nextMove), 1000);
    }

    function changeCity() {
        current_city_index++
        carouselIndex = current_city_index
        updateCityInfo()
        updateCarouselPosition()
    }

    // Function to open Yandex Maps with coordinates
    window.openYandexMap = function(lat, lng) {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        const url = `https://yandex.ru/maps/?ll=${lng},${lat}&z=19&l=map`;

        if (isMobile) {
            window.location.href = url;
        } else {
            window.open(url, '_blank');
        }
    }

    // Function to handle checkbox state saving and styling
    document.addEventListener('change', function (event) {
        if (event.target.classList.contains('checkbox')) {
            const visitId = event.target.dataset.visitId;
            const isChecked = event.target.checked;
            const visitItem = event.target.closest('li');

            if (isChecked) {
                visitItem.classList.add('checked-visit');
            } else {
                visitItem.classList.remove('checked-visit');
            }
        }
    });

    // Function to update carousel position
    carouselIndex = current_city_index
    function updateCarouselPosition() {
        const itemHeight = carousel.querySelector('.carousel-item').offsetHeight;
        carousel.style.transform = `translateY(-${carouselIndex * itemHeight}px)`;
    }

    scrollUpButton.addEventListener('click', function () {
        if (carouselIndex > 0) {
            carouselIndex--;
            updateCarouselPosition();
        }
    });

    scrollDownButton.addEventListener('click', function () {
        if (carouselIndex < carousel.children.length - 1) {
            carouselIndex++;
            updateCarouselPosition();
        }
    });

    toCurrentCityButton.addEventListener('click', function () {
        carouselIndex = current_city_index; // Index of the current city
        updateCarouselPosition();
    });

    updateCityInfo();
});
