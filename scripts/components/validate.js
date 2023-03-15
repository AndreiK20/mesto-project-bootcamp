// валидация
const formsElement = document.querySelector(".form");
const formInput = formsElement.querySelector(".popup__text");


const setEventListeners = (formsElement, settings) => {
    const inputList = Array.from(
      formsElement.querySelectorAll(settings.inputSelector) 
    );
    const buttonElement = formsElement.querySelector(
      settings.submitButtonSelector
    );
    inputList.forEach((formInput) => {
      toggleButtonState(inputList, buttonElement, settings);
      formInput.addEventListener("input", () => {
        isValid(formsElement, formInput);
      });
    });
  };
const showInputError = (formsElement, formInput, errorMessage, settings) => {
  const errorElement = formsElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.add(settings.inputErrorclass);
  console.log(settings.inputErrorclass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formsElement, formInput, settings) => {
  const errorElement = formsElement.querySelector(`#${formInput.id}-error`);
  formInput.classList.remove(settings.inputErrorclass);
  errorElement.textContent = "";
};

const isValid = (formsElement, formInput, settings) => {
  if (!formInput.validity.valid) {
    showInputError(
      formsElement,
      formInput,
      formInput.validationMessage,
      settings
    );
  } else {
    hideInputError(formsElement, formInput, settings);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};


const toggleButtonState = (inputList, buttonElement, settings) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
};


  

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formsElement) => {
    setEventListeners(formsElement, settings);
  });
};
