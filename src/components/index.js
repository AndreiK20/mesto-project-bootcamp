import "./../pages/index.css";
import { enableValidation, disableSubmitButton } from "./validate.js";
import {
  openPopup,
  closePopup,
  popupTypeInfo,
  popupFormInfo,
  pageTitle,
  pageSubtitle,
  nameInput,
  jobInput,
} from "./modal.js";
//import { establishInitialCards } from "./card.js";
//import { initialcards } from "./initialcards.js";
import { getUser, getInitialCards } from "./api";
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
const profileNameCard = document.querySelector(".profile__head");
const profileJobCard = document.querySelector(".profile__text");
const settings = {
  formSelector: ".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".button_size_save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorclass: "popup__text_type_error",
};
const placeTemplate = document
  .querySelector("#cards")
  .content.querySelector(".elements__list");
const cardImage = document.querySelector(".popup__picture");


//
Promise.all([getUser(), getInitialCards()])
  .then(([userInfo, cards]) => {
  profileNameCard.textContent = userInfo.name;
  profileJobCard.textContent = userInfo.about;
  cards.forEach((card) => {
    const newCard = establishInitialCards(card, userInfo._id);
    renderCard(newCard);
  });
});

function renderCard(card, ID) {
  const cardCreated = establishInitialCards(card, ID);
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




//открытие форм


function  openImgPopup(evt) {
  openPopup(popupTypeImg);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupFigaption.textContent = evt.target.alt;
}
// перенес временно 
function establishInitialCards(card, openImgPopup) {
  const initialElement = placeTemplate.cloneNode(true);
  const initialImage = initialElement.querySelector(".elements__photo");
  initialElement.querySelector(".elements__title").textContent = card.name;
  initialImage.src = card.link;
  initialImage.alt = card.name;
  initialElement
    .querySelector(".button_size_trash")
    .addEventListener("click", function (evt) {
      evt.target.closest(".elements__list").remove();
    });
  initialElement
    .querySelector(".button__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("button__like_active");
    });
  initialImage.addEventListener("click", (evt) => openImgPopup(evt));
  return initialElement;
}

function openPopupProfile(evt) {
  nameInput.value = pageTitle.textContent;
  jobInput.value = pageSubtitle.textContent;
  openPopup(popupTypeInfo);
}

/*function disableButtonAfterAdd() {
  buttonCardCreated.setAttribute("disabled", "");
}
*/

function openPopupCard() {
  popupFormCard.reset();
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

function handleFormSubmitPopupInfo(evt) {
  evt.preventDefault();
  pageTitle.textContent = nameInput.value;
  pageSubtitle.textContent = jobInput.value;
  closePopup(popupTypeInfo);
}

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



enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".button_size_save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorclass: "popup__text_type_error",
});

//setOverlayListeners();