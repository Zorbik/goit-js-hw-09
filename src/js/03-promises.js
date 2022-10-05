import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  button: document.querySelector('[type="submit"]'),
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', handlerValue);

function handlerValue(e) {
  e.preventDefault();
  let delay = Number(document.querySelector('[name="delay"]').value);
  const step = Number(document.querySelector('[name="step"]').value);
  const amount = Number(document.querySelector('[name="amount"]').value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(` Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// ✅ ❌
