import "../src/pages/index.css"
import { enableValidation } from "./validate.js";
import {
  openPopup,
  closePopup,
  SetOverlayListeners,
  formElement,
  popupTypeInfo,
} from "./modal.js";
import { establishInitialCards } from "./card.js";
import { initialcards } from "./initialcards.js";
const popups = document.querySelectorAll(".popup");
const buttonInfo = document.querySelector(".button_size_small");
const buttonCard = document.querySelector(".button_size_big");
const pageTitle = document.querySelector(".profile__head");
const pageSubtitle = document.querySelector(".profile__text");

const nameInput = document.querySelector(".popup__text");
const jobInput = document.querySelector("#subtitle");
const popupTypeCard = document.querySelector(".popup_type_card");
const cardsElement = popupTypeCard.querySelector(".form");
const newItemTitleinput = popupTypeCard.querySelector("#text");
const newItemImginput = popupTypeCard.querySelector("#picture");
const popupTypeImg = document.querySelector(".popup_type_imaged");
const popupImage = document.querySelector(".popup__picture");
const popupFigaption = document.querySelector(".popup__figaption");
const popupCloseButtonList = document.querySelectorAll(".popup_closed");
const placesContainer = document.querySelector(".elements__lists");

//
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

function openPopupCard() {
  newItemTitleinput.value = "";
  newItemImginput.value = "";
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
  openImgPopup;
  renderCard(cardInfo);
  evt.target.reset();
  closePopup(popupTypeCard);
  disableButtonAfterAdd();
}
function disableButtonAfterAdd() {
  const buttonCardCreated = popupTypeCard.querySelector("#button-card-created");
  buttonCardCreated.setAttribute("disabled", "");

  buttonCard.classList.add();
}
initialcards.forEach(renderCard, openImgPopup);

// слушатели
buttonInfo.addEventListener("click", openPopupProfile);
buttonCard.addEventListener("click", openPopupCard);
popupCloseButtonList.forEach((popupCloseButton) => {
  const popup = popupCloseButton.closest(".popup");
  popupCloseButton.addEventListener("click", () => closePopup(popup));
});

cardsElement.addEventListener("submit", createdCard);
//

SetOverlayListeners();

enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".button_size_save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorclass: "popup__text_type_error",
});
