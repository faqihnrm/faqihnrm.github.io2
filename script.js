// Ambil elemen DOM
const cityInput = document.getElementById("city");
const getWeatherButton = document.getElementById("getWeather");
const weatherDisplay = document.getElementById("weather");
const locationDisplay = document.getElementById("location");
const temperatureDisplay = document.getElementById("temperature");
const descriptionDisplay = document.getElementById("description");
const iconDisplay = document.getElementById("icon");

// API Key OpenWeather (ganti dengan API key kamu sendiri)
const API_KEY = "d302f7f70ffd76d45c0c722fa2ab03c5";

// Fungsi untuk mengambil data cuaca
async function getWeather(city) {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    );

    if (!response.ok) throw new Error("Kota tidak ditemukan");

    const data = await response.json();

    // Tampilkan DOM dengan data cuaca
    locationDisplay.textContent = `${data.name}, ${data.sys.country}`;
    temperatureDisplay.textContent = `Suhu: ${data.main.temp}°C`;
    descriptionDisplay.textContent = `Kondisi: ${data.weather[0].description}`;
    iconDisplay.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    iconDisplay.alt = data.weather[0].description;

    weatherDisplay.classList.remove("hidden");
}

// Event listener tombol
getWeatherButton.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city).catch(error => alert(error.message));
    } else {
        alert("Harap masukkan nama kota!");
    }
});