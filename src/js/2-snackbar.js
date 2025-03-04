import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();
  console.log(event.target);

  const inputDelay = document.querySelector('.delay-input');
  const inputRadio = document.querySelector('input[name="state"]:checked');

  console.log(inputRadio.value);

  // Create promise
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputRadio.value === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${inputDelay.value}ms`);
      } else {
        reject(`❌ Rejected promise in ${inputDelay.value}ms`);
      }
    }, inputDelay.value);
  });

  // Обробка промісу
  promise
    .then(value => {
      iziToast.success({
        message: value,
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
      });
    });
});
