const apiKey = "d102ce6f8a7f8c61a416505fdeb98697";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const options = {
    method: 'GET',
    headers: {
    'X-RapidAPI-Key': 'bbc1a8fd7fmsh1be64261e3a4d4dp196befjsne50f49ef161e',
    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};

const url = (city) => `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

async function getWeatherByLocation(city) {
    try {
        const response = await fetch(url(city));
        const responseData = await response.json();
        addWeatherToPage(responseData);
    } catch (error) {
        alert('NOT A CITY. PLEASE RE-ENTER');
    }
}

function addWeatherToPage(data) {
    const temp = data.main && data.main.temp ? Ktoc(data.main.temp) : 'N/A';
    const maxTemp = data.main && data.main.temp_max ? Ktoc(data.main.temp_max) : 'N/A';
    const minTemp = data.main && data.main.temp_min ? Ktoc(data.main.temp_min) : 'N/A';
    const K = data.main && data.main.feels_like ? Ktoc(data.main.feels_like) : 'N/A';
    const a = data.main && data.main.humidity ? data.main.humidity : 'N/A';
    const b = data.wind && data.wind.speed ? data.wind.speed : 'N/A';
    const c = data.wind && data.wind.deg ? data.wind.deg : 'N/A';
    
    const weather = document.createElement('div');
    weather.classList.add('weather');
    weather.innerHTML = `
    <h2>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        ${temp}°C
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
        <bold>${data.weather[0].main}</bold>
    </h2>
    
    <br>
    <br>
    <div><strong>Max Temperature:</strong> ${maxTemp}°C</div>
    <div><strong>Min Temperature:</strong> ${minTemp}°C</div>
    <div><strong>Temperature Feels Like:</strong> ${K}°C</div>
    <div><strong>Humidity:</strong> ${a}%</div>
    <div><strong>Wind Speed:</strong> ${b}m/s</div>
    <div><strong>Wind Degrees:</strong> ${c} SW</div>
    `;

    main.innerHTML = ""; // Clear previous content
    main.appendChild(weather);
}

function Ktoc(K) {
    return K ? Math.floor(K - 273.15) : 'N/A';
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = search.value;
    if (city) {
        getWeatherByLocation(city);
    } 
});
