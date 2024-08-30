// script.js
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const scrollUpButton = document.getElementById('scroll-up');
    const scrollDownButton = document.getElementById('scroll-down');
    const toCurrentCityButton = document.getElementById('to-current-city');
    const visitsList = document.getElementById('visits-list');
    let countdownElement = document.getElementById('countdown');
    let max_height = 0

    let current_city_index = 0

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
                    geoloc: 'Октябрьская улица, 45',
                    lat: 54.211387,
                    lng: 37.622091
                },
                {
                    id: 2,
                    name: 'Музей оружия',
                    cost: 550,
                    geoloc: 'Октябрьская ул., 2',
                    lat: 54.204136,
                    lng: 37.616189
                },
                {
                    id: 3,
                    name: 'Музей оружия',
                    cost: 300,
                    geoloc: 'Менделеевская улица, 12В',
                    lat: 54.195888,
                    lng: 37.619854
                },
                {
                    id: 4,
                    name: 'ЦПКИО Парк Белоусова',
                    cost: 0,
                    geoloc: 'Первомайская улица, 13',
                    lat: 54.183671, 
                    lng: 37.585970
                },
                {
                    id: 5,
                    name: 'ресторан Шарден',
                    cost: ':D',
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
                    geoloc: 'Петровская наб., 21А',
                    lat: 51.655969,
                    lng: 39.215891
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
                    geoloc: 'Береговая ул., 47А',
                    lat: 47.218310, 
                    lng: 39.726852
                },
                {
                    id: 2,
                    name: 'Ростовский цирк (ворота ;))',
                    cost: 0,
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
                {
                    id: 1,
                    name: 'Казанский кремль',
                    cost: 80,
                    geoloc: 'проезд Шейнкмана',
                    lat: 55.797375, 
                    lng: 49.107347
                },
                {
                    id: 2,
                    name: 'Дворец земледельцев',
                    cost: 0,
                    geoloc: 'Федосеевская ул., 36',
                    lat: 55.800074,
                    lng: 49.112179
                },
                {
                    id: 3,
                    name: 'Колокольня Богоявленского собора',
                    cost: 0,
                    geoloc: 'ул. Баумана, 78, корп. 2',
                    lat: 55.788323, 
                    lng: 49.119554
                },
                {
                    id: 4,
                    name: 'Татарский государственный театр кукол Экият',
                    cost: 0,
                    geoloc: 'Петербургская ул., 57',
                    lat: 55.780296, 
                    lng: 49.138694
                }
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

        if (max_height == 0){
            const test = carousel.querySelectorAll('.carousel-item')
            test.forEach((a)=>max_height+= a.offsetHeight)
            max_height = max_height
        }

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
                ${visit.lat ? `<img src="map_icon.png" class="map-icon" onclick="javascript:Telegram.WebApp.openLink('https://yandex.ru/maps/?ll=${visit.lng},${visit.lat}&pt=${visit.lng},${visit.lat}&z=19&l=map');" alt="Открыть карту">`:''}
            </li>
        `).join('');
        
        //${visit.lat ? `<img src="map_icon.png" class="map-icon" onclick="openYandexMap(${visit.lat}, ${visit.lng})" alt="Show on Map">`:''}
        //https://yandex.ru/maps/?ll=${visit.lng},${visit.lat}&z=19&l=map
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

        countdownElement.textContent = `${days}д ${hours}ч ${minutes}м ${seconds}с`;

        setTimeout(() => updateCountdown(nextMove), 1000);
    }

    function changeCity() {
        current_city_index++
        carouselIndex = current_city_index
        updateCityInfo()
        updateCarouselPosition()
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
    current_height = 0
    function updateCarouselPosition() {
        const itemHeight = carousel.querySelectorAll('.carousel-item').offsetHeight;
        const test = carousel.querySelectorAll('.carousel-item')

         // test.forEach((a)=>console.log(a))

        let height = 0
        for (let i = 0; i < carouselIndex; i++) {
            height+= test[i].offsetHeight + 20;
            
        }
        console.log(`Carousel index is ${carouselIndex} and skipping height ${height}`)
        carousel.style.transform = `translateY(-${height}px)`;
        current_height = height
    }

    toCurrentCityButton.addEventListener('click', function () {
        carouselIndex = current_city_index; // Index of the current city
        updateCarouselPosition();
    });

    updateCityInfo();
    ///////////////////////////////////////////////////////////////////////
    let startPos = 0
    let sliderScroll = 0
    let prevPos = 0
    let currentPos = 0
    
    const slider = document.querySelector('.carousel-container')
    const slideHeight = document.querySelector('.carousel-item').getBoundingClientRect().height

    enable_blocks = true
    
    function getPositionY(event) {
        return event.touches[0].clientY
    }


    
    function touchStart(event) {
        startPos = getPositionY(event)

        slider.classList.remove("smoothscroll")

        if(enable_blocks){
            if (!event.srcElement || event.srcElement.id !== "to-current-city"){
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }
        last_point = startPos

    }
    last_point = 0
    function touchMove(event) {
        
        currentPos = getPositionY(event)

        current_height = CalculateHeight(last_point,currentPos)
        carousel.style.transform = `translateY(-${current_height}px)`;
        

        CalculateHeight(last_point,currentPos)
        last_point = currentPos

        if(enable_blocks){
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        
    }

    function CalculateHeight(pos_lst,pos_cur){
        const move_units = (pos_lst - pos_cur)* 1.5
        //console.log('Add ',move_units, 'Current',current_height,'MAx ',max_height)
        return Math.max( Math.min( current_height + move_units,max_height),0)
    }
    
    function touchEnd(event) {
        
        if(enable_blocks){
            if (!event.srcElement || event.srcElement.id !== "to-current-city"){
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }
    }
    
    let movable = false
    function mouseDown(event) {
        startPos = event.y
        sliderScroll = slider.scrollLeft
        slider.classList.remove("smoothscroll")
        movable = true
    }
    
    function mouseMove(event) {
        if(!movable)
            return
        currentPos = event.x
        slider.scrollLeft = sliderScroll + startPos - currentPos
    }
    
    function mouseWheel(e) {
        current_height = Math.max( Math.min( current_height+e.deltaY,max_height),0)
        
        carousel.style.transform = `translateY(-${current_height}px)`;
    }
    
    document.addEventListener('touchstart', touchStart,{ passive: false })
    document.addEventListener('touchmove', touchMove,{ passive: false })
    document.addEventListener('touchend', touchEnd,{ passive: false })
    document.addEventListener('wheel', mouseWheel,{ passive: false })
});
