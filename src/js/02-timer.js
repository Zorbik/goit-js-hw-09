import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

// Дополнительный импорт стилей
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  buttonStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  choosenDate: null,
  intervalID: null,

  options: {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
    },
  },
};
refs.buttonStart.setAttribute('disabled', 'disabled');

const fp = flatpickr(refs.inputDate, refs.options);

refs.inputDate.addEventListener('input', setTimer);
refs.buttonStart.addEventListener('click', startTimer);

function setTimer() {
  refs.choosenDate = Date.parse(refs.inputDate.value);

  if (refs.choosenDate < Date.now()) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  refs.buttonStart.removeAttribute('disabled');
}

function startTimer() {
  handlerValue();
  refs.intervalID = setInterval(handlerValue, 1000);
  refs.buttonStart.setAttribute('disabled', 'disabled');
  refs.inputDate.setAttribute('disabled', 'disabled');
}
function handlerValue() {
  const delta = refs.choosenDate - Date.now();
  if (delta <= 1000) {
    clearInterval(refs.intervalID);
  }
  const timeObject = convertMs(delta);
  refs.days.textContent = timeObject.days;
  refs.hours.textContent = timeObject.hours;
  refs.minutes.textContent = timeObject.minutes;
  refs.seconds.textContent = timeObject.seconds;
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
