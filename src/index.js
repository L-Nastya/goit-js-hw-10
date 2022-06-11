import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from "lodash.debounce"
import Notiflix from 'notiflix';
const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

input.addEventListener("input", debounce(searchCountry, DEBOUNCE_DELAY));

function searchCountry(e) {
    e.preventDefault
    const search = input.value;
    const searchTrim = search.trim();

    if (!searchTrim) {
        countryInfo.innerHTML = "";
        countryList.innerHTML = "";
        return
    }

    fetchCountries(searchTrim)
        .then(countryLimit)
        .catch(err => {
        Notiflix.Notify.failure("Oops, there is no country with that name")
        })
}
        
function countryLimit(country) {
    let markup = "";
    if (country.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return;
            } else if (country.length === 1) {
        markup = country
            .map(({ name, flags, capital, population, languages }) => {
        const language = Object.values(languages);
      return  `<h2><img src="${flags.svg}" alt = "flag" width = 35px> <span class="title">${name.official}</span></h2>
          <p class="country-text"><b>Capital</b>: ${capital}</p>
          <p class="country-text"><b>Population</b>: ${population}</p>
          <p class="country-text"><b>Languages</b>: ${language}</p>`
            }).join('');
            countryList.innerHTML = "";
            countryInfo.innerHTML = markup;
            } else {
        markup = country
            .map(({ name, flags }) => {
            return `<h2><img src="${flags.svg}" alt = "flag" width = 35px> ${name.official}</h2>`
            }).join('');
         countryInfo.innerHTML = "";
         countryList.innerHTML = markup;
    }
    return markup;
  
}

