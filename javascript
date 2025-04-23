function getCountryData() {
    const countryInput = document.getElementById("countryInput").value.trim();
    const resultDiv = document.getElementById("result");

    if (countryInput === "") {
        resultDiv.innerHTML = "<p>Please enter a country name.</p>";
        return;
    }

    fetch(`https://restcountries.com/v3.1/name/${countryInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Country not found");
            }
            return response.json();
        })
        .then(data => {
            // Prefer exact match if found
            const exactMatch = data.find(
                country => country.name.common.toLowerCase() === countryInput.toLowerCase()
            );
            const info = exactMatch || data[0];

            const name = info.name.common;
            const flag = info.flags.svg;
            const capital = info.capital?. [0] || "N/A";
            const continent = info.continents?. [0] || "N/A";
            const currency = info.currencies ?
                Object.values(info.currencies)[0] :
                {
                    name: "N/A",
                    symbol: ""
                };
            const languages = info.languages ?
                Object.values(info.languages).join(", ") :
                "N/A";

            resultDiv.innerHTML = `
        <img src="${flag}" alt="Flag of ${name}">
        <h2>${name}</h2>
        <p><strong>Capital:</strong> ${capital}</p>
        <p><strong>Continent:</strong> ${continent}</p>
        <p><strong>Languages:</strong> ${languages}</p>
        <p><strong>Currency:</strong> ${currency.name} (${currency.symbol})</p>
      `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
