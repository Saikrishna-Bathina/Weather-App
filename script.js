document.addEventListener("DOMContentLoaded", function () {
    const apiKey = "945d825815207b47c61183228c9e22c0";

    fetchWeather("Machilipatnam");

    const form = document.querySelector("form");
    form.addEventListener("submit", function (e) {
        e.preventDefault(); 

        const input = form.querySelector("input[type='search']");
        const city = input.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    function fetchWeather(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        const request = new XMLHttpRequest();
        request.open("GET", url, true);

        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                const obj = JSON.parse(this.response);

                document.getElementById("location").innerText = " " + obj.name;
                document.getElementById("weather").innerText = obj.weather[0].description;
                document.getElementById("temp").innerText = obj.main.temp.toFixed(1);
                document.getElementById("icon").src = `https://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;

                document.getElementById("humidity").innerText = obj.main.humidity;
                document.getElementById("wind").innerText = obj.wind.speed;
            } else {
                alert("City not found.");
            }
        };

        request.onerror = function () {
            alert("Network error.");
        };

        request.send();
    }
});
