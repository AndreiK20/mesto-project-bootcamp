import "./../pages/index.css"
//import "../src/pages/index.css"
import {enableValidation, disableSubmitButton} from "./validate.js";
import {
  openPopup,
  closePopup,
  popupTypeInfo,
  popupFormInfo,
  pageTitle,
  pageSubtitle,
  nameInput,
  jobInput
} from "./modal.js";
import { establishInitialCards } from "./card.js";
import { initialcards } from "./initialcards.js";
const popups = document.querySelectorAll(".popup");
const buttonInfo = document.querySelector(".button_size_small");
const buttonCard = document.querySelector(".button_size_big");
const popupTypeCard = document.querySelector(".popup_type_card");
const popupFormCard = popupTypeCard.querySelector(".form");
const newItemTitleinput = popupTypeCard.querySelector("#text");
const newItemImginput = popupTypeCard.querySelector("#picture");
const popupTypeImg = document.querySelector(".popup_type_imaged");
const popupImage = document.querySelector(".popup__picture");
const popupFigaption = document.querySelector(".popup__figaption");
const popupCloseButtonList = document.querySelectorAll(".popup_closed");
const placesContainer = document.querySelector(".elements__lists");
const buttonCardCreated = popupTypeCard.querySelector("#button-card-created");
const settings = {
  formSelector: ".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".button_size_save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorclass: "popup__text_type_error",
};

//открытие форм 
function openImgPopup(evt) {
  openPopup(popupTypeImg);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupFigaption.textContent = evt.target.alt;
}

function openPopupProfile(evt) {
  nameInput.value = pageTitle.textContent;
  jobInput.value = pageSubtitle.textContent;
  openPopup(popupTypeInfo);
}

/*function disableButtonAfterAdd() {
  buttonCardCreated.setAttribute("disabled", "");
}*/

function openPopupCard() {
  popupFormCard.reset();
  //disableButtonAfterAdd();
  disableSubmitButton(buttonCardCreated, settings);
  openPopup(popupTypeCard);
}

const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target);
  }
};

popups.forEach((popup) => {
  popup.addEventListener("mousedown", closeOverlay);
});

// создание новой карточки

function renderCard(item) {
  const cardCreated = establishInitialCards(item, openImgPopup);
  placesContainer.prepend(cardCreated);
}

function createdCard(evt) {
  evt.preventDefault();
  const cardInfo = {};
  cardInfo.name = newItemTitleinput.value;
  cardInfo.link = newItemImginput.value;
  renderCard(cardInfo);
  closePopup(popupTypeCard);
}
initialcards.forEach(renderCard, openImgPopup);

function handleFormSubmitPopupInfo(evt) {
  evt.preventDefault();
  pageTitle.textContent = nameInput.value;
  pageSubtitle.textContent = jobInput.value;
  closePopup(popupTypeInfo);
}

/*function handleFormSubmitPopupInfo(evt) {
  evt.preventDefault();
  pageTitle.textContent = nameInput.value;
  pageSubtitle.textContent = jobInput.value;
  closePopup(popupTypeInfo);
}*/

// слушатели
buttonInfo.addEventListener("click", openPopupProfile);
buttonCard.addEventListener("click", openPopupCard);
popupCloseButtonList.forEach((popupCloseButton) => {
  const popup = popupCloseButton.closest(".popup");
  popupCloseButton.addEventListener("click", () => closePopup(popup));
});
popupFormInfo.addEventListener("submit", handleFormSubmitPopupInfo);
popupFormCard.addEventListener("submit", createdCard);
//

//setOverlayListeners();

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".button_size_save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorclass: "popup__text_type_error",
});
