const BASE_URL = 'https://restcountries.com/v3.1/';
const searchParams = new URLSearchParams({
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
});
const countryListRef = document.querySelector('.country-list');
const countryInfoRef = document.querySelector('.country-info');

export function fetchCountries(nameOfCountry) {
  return fetch(`${BASE_URL}name/${nameOfCountry}?${searchParams}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    }
  );
}

export function clearMarkup() {
  countryInfoRef.innerHTML = '';
  countryListRef.innerHTML = '';
}

export function renderCardMarkup(data) {
  const markup = createCardMarkup(data);
  countryInfoRef.innerHTML = markup;
}

export function renderListMarkup(data) {
  data.forEach(country => {
    countryListRef.insertAdjacentHTML('beforeend', createListMarkup(country));
  });
}

function createCardMarkup(data) {
  const { name, capital, population, flags, languages } = data[0];
  const languagesOfCountry = Object.values(languages).join(', ');
  return `<div class="country-info">
                  <img width="30px" hieght="20px" src=${flags.svg}></img>
                  <h1>${name.official}</h1>
                  <p>Capital: ${capital[0]}</p> 
                  <p>Population: ${population}</p>
                  <p>Languages: ${languagesOfCountry}</p>
              </div>`;
}

function createListMarkup({ flags, name }) {
  return `
  <li class="country-list_item">
    <img class="country-list_img" width="30px" hieght="20px" src=${flags.svg}></img>
    <p class="country-list_title">${name.official}</p>
  </li>`;
}
