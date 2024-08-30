// script.js
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('carousel');
    const scrollUpButton = document.getElementById('scroll-up');
    const scrollDownButton = document.getElementById('scroll-down');
    const toCurrentCityButton = document.getElementById('to-current-city');
    const visitsList = document.getElementById('visits-list');
    const url = 'https://my-custom-trip-data-default-rtdb.europe-west1.firebasedatabase.app';
    let countdownElement = document.getElementById('countdown');
    let max_height = 0

    let current_city_index = 0
    let cities = [];

    const userAction = async () => {
        const response = await fetch(url+'/data.json');
        const myJson = await response.json(); //extract JSON from the http response
        // do something with myJson

        current_city_index = myJson.currentID

        const resp = await fetch(url+'/trip_route.json');
        const myTripJson = await resp.json(); //extract JSON from the http response
        console.log(myTripJson)
        cities = myTripJson
        updateCityInfo()
        updateCarouselPosition()
      }
      userAction()

    // Array of cities


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
                    ${index === current_city_index ? `<ul id="visits-list">${renderVisits(city.visits ? city.visits : [])}</ul>
                    <p>Время до выезда: <span id="countdown">--</span></p>` : ''}
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
            if (!event.srcElement || event.srcElement.id !== "to-current-city"){
                event.preventDefault();
                event.stopImmediatePropagation();
            }
        }
        
    }

    function CalculateHeight(pos_lst,pos_cur){
        const move_units = (pos_lst - pos_cur)* 1.5
        //console.log('Add ',move_units, 'Current',current_height,'MAx ',max_height)
        return Math.max( Math.min( current_height + move_units,max_height),0)
    }

    function mouseWheel(e) {
        current_height = Math.max( Math.min( current_height+e.deltaY,max_height),0)
        
        carousel.style.transform = `translateY(-${current_height}px)`;
    }
    
    document.addEventListener('touchstart', touchStart)
    document.addEventListener('touchmove', touchMove,{ passive: false })
    document.addEventListener('wheel', mouseWheel,{ passive: false })

    window.Telegram.WebApp.MainButton.text = 'Инфо'
});
