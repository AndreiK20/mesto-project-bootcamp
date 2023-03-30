// валидация

const showInputError = (formElement, formInput, errorMessage, settings) => {
    const errorElement = formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.add(settings.inputErrorclass);
    errorElement.textContent = errorMessage;
  };
const hideInputError = (formElement, formInput, settings) => {
    const errorElement = formElement.querySelector(`#${formInput.id}-error`);
    formInput.classList.remove(settings.inputErrorclass);
    errorElement.textContent = "";
  };
const isValid = (formElement, formInput, settings) => {
    if (!formInput.validity.valid) {
      showInputError(
        formElement,
        formInput,
        formInput.validationMessage,
        settings
      );
    } else {
      hideInputError(formElement, formInput, settings);
    }
  };
export function disableSubmitButton(buttonElement, settings) {
  buttonElement.disabled = true; 
  buttonElement.classList.add(settings.inactiveButtonClass);
}
//disableSubmitButton(buttonElement, settings);

const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, settings);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(settings.inactiveButtonClass);
    }
};  
const setEventListeners = (formElement, settings) => {
    const inputList = Array.from(
      formElement.querySelectorAll(settings.inputSelector) 
    );
    const buttonElement = formElement.querySelector(
      settings.submitButtonSelector
    );
    inputList.forEach((formInput) => {
      formInput.addEventListener("input", () => {
        isValid(formElement, formInput, settings);
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

  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};

