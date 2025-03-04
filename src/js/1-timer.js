import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDateAndTime = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < Date.now()) {
      iziToast.show({
        message: 'Please choose a date in the future',
      });
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      userSelectedDate = selectedDates[0];
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.padStart(2, '0');
}

flatpickr('input#datetime-picker', options);

let userSelectedDate;

startButton.disabled = true;

startButton.addEventListener('click', event => {
  inputDateAndTime.disabled = true;
  startButton.disabled = true;
  const intervalId = setInterval(() => {
    let ms = userSelectedDate - Date.now();

    let timeLeft = convertMs(ms);
    const secondsSpan = document.querySelector('span[data-seconds]');
    secondsSpan.innerText = addLeadingZero(String(timeLeft.seconds));

    const daysSpan = document.querySelector('span[data-days]');
    daysSpan.innerText = addLeadingZero(String(timeLeft.days));

    const minutesSpan = document.querySelector('span[data-minutes]');
    minutesSpan.innerText = addLeadingZero(String(timeLeft.minutes));

    const hoursSpan = document.querySelector('span[data-hours]');
    hoursSpan.innerText = addLeadingZero(String(timeLeft.hours));

    if (
      timeLeft.days === 0 &&
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      clearInterval(intervalId);
      inputDateAndTime.disabled = false;
    }
  }, 1000);
});
