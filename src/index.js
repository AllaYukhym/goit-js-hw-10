import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import {
  fetchCountries,
  clearMarkup,
  renderCardMarkup,
  renderListMarkup,
} from './fetchCountries';

const inputRef = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

const debounceOnFormInput = debounce(onFormInput, DEBOUNCE_DELAY);
inputRef.addEventListener('input', debounceOnFormInput);

function onFormInput(e) {
  e.preventDefault();
  const country = e.target.value.trim().toLowerCase();
  if (!country) {
    clearMarkup();
    return;
  }

  fetchCountries(country)
    .then(data => {
      clearMarkup();
      if (data.length === 1) {
        renderCardMarkup(data);
      } else {
        if (data.length >= 2 && data.length <= 10) {
          renderListMarkup(data);
        } else {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        }
      }
    })
    .catch(error => {
      clearMarkup();
      Notify.failure('Oops, there is no country with that name');
      console.log(error.message);
    });
}
