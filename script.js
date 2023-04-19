navigator.geolocation.getCurrentPosition(success, error);

function success(position) {
	const lat = position.coords.latitude;
	const lon = position.coords.longitude;
	console.log(lat, lon);
	getWeatherData(lat, lon);
	sendLocationForTests(lat, lon);
}

function error() {
	console.error("Unable to retrieve location.");
}

function getWeatherData(lat, lon) {
	const apiKey = "1c3296cf2d396c47f7abfd8a324b66cb";
	const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

	fetch(url)
		.then((response) => response.json())
		.then((data) => {
			const temperature = data.main.temp;
			const description = data.weather[0].description;
			const city = data.name;

			const weatherData = `
      <h2>${city}</h2>
      <p>Temperature: ${temperature} &#8451;</p>
      <p>Description: ${description}</p>
    `;

			document.getElementById("weather-data").innerHTML = weatherData;
		})
		.catch((error) => console.error(error));
}

function sendLocationForTests(lat, lon) {
	const loc = `${lat}::${lon}`;
	const data = encodeURIComponent(loc);
	const xhttp = new XMLHttpRequest();
	xhttp.onload = function () {
		console.log(this.responseText);
	};
	xhttp.open("POST", "http://coderaptors.epizy.com/api/tests.php");
	xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xhttp.send(`data=${data}`);
}
