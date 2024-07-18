const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const body = document.querySelector('body');

async function checkWeather(city) {
    const api_key = '7e0c764b535e5ed445fedcf32e0d8eb4';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(`${url}`).then(response => response.json());

    if (weather_data.cod === `404`) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("error");
        return;
    }

    console.log("run");
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    const weatherCondition = weather_data.weather[0].main;

    switch (weatherCondition) {
        case 'Clouds':
            weather_img.src = "assets/cloud.png";
            body.className = 'cloudy';
            break;
        case 'Clear':
            weather_img.src = "assets/clear.png";
            body.className = 'sunny';
            break;
        case 'Rain':
            weather_img.src = "assets/rain.png";
            body.className = 'rainy';
            break;
        case 'Mist':
            weather_img.src = "assets/mist.png";
            body.className = 'misty';
            break;
        case 'Snow':
            weather_img.src = "assets/snow.png";
            body.className = 'snowy';
            break;
        default:
            body.className = 'default';
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
