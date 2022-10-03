const refs = {
  buttonStart: document.querySelector('[data-start]'),
  buttonStop: document.querySelector('[data-stop]'),
  intervalID: null,
};

refs.buttonStart.addEventListener('click', onColorHandler);
refs.buttonStop.addEventListener('click', stopColorChange);

function stopColorChange() {
  clearInterval(refs.intervalID);
  refs.buttonStop.setAttribute('disabled', 'disabled');
  refs.buttonStart.removeAttribute('disabled');
}

function onColorHandler() {
  refs.intervalID = setInterval(handleColorOnBody, 1000);
  refs.buttonStart.setAttribute('disabled', 'disabled');

  const isDisabled = refs.buttonStop.hasAttribute('disabled');
  if (isDisabled) {
    refs.buttonStop.removeAttribute('disabled');
  }
}

function handleColorOnBody() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
