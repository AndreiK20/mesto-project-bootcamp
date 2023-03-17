// валидация
const formsElement = document.querySelector(".form");
const formInput = formsElement.querySelector(".popup__text");

const showInputError = (formsElement, formInput, errorMessage, settings) => {
    const errorElement = formsElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(settings.inputErrorclass);
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


const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};  
const setEventListeners = (formsElement, settings) => {
    const inputList = Array.from(
      formsElement.querySelectorAll(settings.inputSelector) 
    );
    const buttonElement = formsElement.querySelector(
      settings.submitButtonSelector
    );
    inputList.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        isValid(formsElement, formInput, settings);
        toggleButtonState(inputList, buttonElement, settings);
      });
    });
  };


const hasInvalidInput = (inputList) => {
  return inputList.some((formInput) => {
    return !formInput.validity.valid;
  });
};



  

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));

  formList.forEach((formsElement) => {
    setEventListeners(formsElement, settings);
  });
};
