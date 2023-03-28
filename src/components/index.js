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
import { establishInitialCards } from "./card.js";
//import { initialcards } from "./initialcards.js";
import { getUser, getInitialCards, updateInform, createNewCardforApi,sendRequestDeleteCard, sendRequestToUpdateAvatar} from "./api";
const popups = document.querySelectorAll(".popup");
const buttonInfo = document.querySelector(".button_size_small");
const buttonCard = document.querySelector(".button_size_big");
const popupTypeCard = document.querySelector(".popup_type_card");
const popupFormCard = popupTypeCard.querySelector(".form");
//const newItemTitleinput = popupTypeCard.querySelector("#text");
//const newItemImginput = popupTypeCard.querySelector("#picture");
const popupTypeImg = document.querySelector(".popup_type_imaged");
const popupImage = document.querySelector(".popup__picture");
const popupFigaption = document.querySelector(".popup__figaption");
const popupCloseButtonList = document.querySelectorAll(".popup_closed");
const placesContainer = document.querySelector(".elements__lists");
const buttonCardCreated = popupTypeCard.querySelector("#button-card-created");
const buttomInfoCreated = document.querySelector("#newInfo");
const profileNameCard = document.querySelector(".profile__head");
const profileJobCard = document.querySelector(".profile__text");
const profileAvatar = document.querySelector(".profile__avatar");
const pictureLike = document.querySelector(".elements__like-counter"); 
const inputName = document.querySelector("#text");
const inputLink = document.querySelector("#picture");
const popupTypeAvatar = document.querySelector(".popup_type_avatar")
const popupFormAvatar = document.querySelector("#avatar");
const buttonOpenAvatar = document.querySelector(".button_size_avatar");
const buttonAvatar = document.querySelector("#newAvatar");
const avatarlink = document.querySelector("#link");

const settings = {
  formSelector: ".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".button_size_save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorclass: "popup__text_type_error",
};
const newCard  = {
  name: inputName.value, 
  link: inputLink.value
};

const newInfoAboutUser = {
  name: nameInput.value,
  about: jobInput.value
}

const newPictureForUser ={
  avatar: avatarlink.value
}


//
Promise.all([getUser(), getInitialCards()])
  .then(([userInfo, cards]) => {
  profileNameCard.textContent = userInfo.name;
  profileJobCard.textContent = userInfo.about;
  profileAvatar.src = userInfo.avatar;
  cards.forEach((card) => {
    const newCard = establishInitialCards(card, openImgPopup, userInfo._id);
    renderCard(newCard);
  });
});


//открытие форм


function  openImgPopup(evt) {
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
}
*/

function openPopupCard() {
  popupFormCard.reset();
  disableSubmitButton(buttonCardCreated, settings);
  openPopup(popupTypeCard);
}

function openPopupAvatar() {
  popupFormAvatar.reset()
  openPopup(popupTypeAvatar);
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
function renderCard(newCard) {
  placesContainer.prepend(newCard);
}

/*function createdCard(evt) {
  evt.preventDefault();
  const cardInfo = {};
  cardInfo.name = newItemTitleinput.value;
  cardInfo.link = newItemImginput.value;
  const cardCreated = establishInitialCards(cardInfo, openImgPopup);
  renderCard(cardCreated);
  closePopup(popupTypeCard);
}*/

function createCardApi(evt) {
  evt.preventDefault();
  buttonCardCreated.textContent = 'Сохранение....';
  createNewCardforApi({name: inputName.value, link: inputLink.value})
  .then(res => {
    const newCard = establishInitialCards(res, res.owner._id);
    renderCard(newCard);
    closePopup(popupTypeCard);
  })
  .catch(console.log("ошибка"))
  .finally(() => {buttonCardCreated.textContent = 'Создать';})
 }
//////////


function handleFormSubmitPopupInfoApi(evt){
  evt.preventDefault();
  buttomInfoCreated.textContent = 'Сохранение....';
  updateInform({ name: nameInput.value, about: jobInput.value})
  .then((res) => {
    pageTitle.textContent = res.name;
    pageSubtitle.textContent = res.about
    closePopup(popupTypeInfo);
  })
    .catch(console.log("ошибка"))
    .finally(() => {buttomInfoCreated.textContent = 'Сохранить';})
}




function submitNewAvatar(evt){
  evt.preventDefault();
  buttonAvatar.textContent = 'Сохранение....';
  sendRequestToUpdateAvatar(avatarlink.value) 
  .then((res) =>{
  profileAvatar.link = res.avatar
  closePopup(popupTypeAvatar);
  })
  .catch(console.log("ошибка"))
  .finally(() => {buttonAvatar.textContent = 'Сохранить';})
}
 

// слушатели
buttonInfo.addEventListener("click", openPopupProfile);
buttonCard.addEventListener("click", openPopupCard);
buttonOpenAvatar.addEventListener("click", openPopupAvatar )
popupCloseButtonList.forEach((popupCloseButton) => {
  const popup = popupCloseButton.closest(".popup");
  popupCloseButton.addEventListener("click", () => closePopup(popup));
});
popupFormInfo.addEventListener("submit", handleFormSubmitPopupInfoApi);
popupFormCard.addEventListener("submit", createCardApi);
popupFormAvatar.addEventListener("submit", submitNewAvatar);





enableValidation({
  formSelector: ".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".button_size_save",
  inactiveButtonClass: "form__submit_inactive",
  inputErrorclass: "popup__text_type_error",
});

