document.addEventListener('DOMContentLoaded', async () => {
    try {
        //fetching country data's from rest countries API
        const countryResponse = await fetch('https://restcountries.com/v3.1/all');
        const countries = await countryResponse.json();

        const countriesContainer = document.getElementById('countries');

        for (let country of countries) {
            const { name, latlng, flags, region, capital, cca2 } = country;

            const col = document.createElement('div');

            const card = document.createElement('div');
            card.className = 'card';

            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-Header';
            cardHeader.textContent = name.common;

            const cardBody = document.createElement('div');
            cardBody.className = 'card-Body';

            const capitalElement = document.createElement('p');
            capitalElement.className = 'card-text';
            capitalElement.innerHTML = `<strong>Capital:</strong> ${capital}`;

            const latlngElement = document.createElement('p');
            latlngElement.className = 'card-text';
            latlngElement.innerHTML = `<strong>lat/lang:</strong> ${latlng.join(', ')}`;

            const flagElement = document.createElement('img');
            flagElement.src = flags.png;
            flagElement.alt = `${name.common} flag`;
            flagElement.className = 'card-img-top mb-3';

            const regionElement = document.createElement('p');
            regionElement.className = 'card-text';
            regionElement.innerHTML = `<strong>Region:</strong> ${region}`;

            const countryCodeElement = document.createElement('p');
            countryCodeElement.className = 'card-text';
            countryCodeElement.innerHTML = `<strong>Country Code:</strong> ${cca2}`;

            const button = document.createElement('button');
            button.className = 'btn btn-primary';
            button.textContent = 'Click for Weather';
            button.addEventListener('click', async () => {
                //fetch weathermap data from openweathermap API using the capital's coordinates
                const weatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=6aca2961f834d09b34a7c85f3a0af061`)
                const weatherData = await weatherResponse.json();

                const weatherElement = document.createElement('p');
                weatherElement.className = 'card-text';
                weatherElement.innerHTML = `<strong>Weather:</strong> ${weatherData.weather[0].description},temp: ${(weatherData.main.temp - 273.15).toFixed(2)} °C`;
                cardBody.appendChild(weatherElement);
            })
            card.appendChild(cardHeader);
            cardBody.appendChild(flagElement);
            cardBody.appendChild(capitalElement);
            cardBody.appendChild(regionElement);
            cardBody.appendChild(countryCodeElement);
            cardBody.appendChild(latlngElement);
            cardBody.appendChild(button);
            card.appendChild(cardBody);
            col.appendChild(card);
            countriesContainer.appendChild(card);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});