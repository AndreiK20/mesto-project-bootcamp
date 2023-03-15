import {enableValidation} from "./components/validate.js"
import {openPopup, closePopup} from "./components/modal.js"
const popups = document.querySelectorAll(".popup");
const buttonInfo = document.querySelector(".button_size_small");
const buttonCard = document.querySelector(".button_size_big");
const pageTitle = document.querySelector(".profile__head");
const pageSubtitle = document.querySelector(".profile__text");
const popupTypeInfo = document.querySelector(".popup_type_info");
const formElement = popupTypeInfo.querySelector("#info");
const nameInput = popupTypeInfo.querySelector(".popup__text");
const jobInput = popupTypeInfo.querySelector("#subtitle");
const popupTypeCard = document.querySelector(".popup_type_card");
const cardsElement = popupTypeCard.querySelector(".form");
const newItemTitleinput = popupTypeCard.querySelector("#text");
const newItemImginput = popupTypeCard.querySelector("#picture");
const popupTypeImg = document.querySelector(".popup_type_imaged");
const popupImage = popupTypeImg.querySelector(".popup__picture");
const popupFigaption = popupTypeImg.querySelector(".popup__figaption");
const popupCloseButtonList = document.querySelectorAll(".popup_closed");
const placesContainer = document.querySelector(".elements__lists");
const placeTemplate = document
  .querySelector("#cards")
  .content.querySelector(".elements__list");
const initialcards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];












const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget){
  closePopup(evt.target);
  }
};

popups.forEach(popup => {
  popup.addEventListener("mousedown", closeOverlay)
});



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

function openImgPopup(item) {
  openPopup(popupTypeImg);
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupFigaption.textContent = item.name;
}



function handleFormSubmit(evt) {
  evt.preventDefault();
  pageTitle.textContent = nameInput.value;
  pageSubtitle.textContent = jobInput.value;
  closePopup(popupTypeInfo);
}

// создание новой карточки 

function establishInitialCards(item) {
  const initialElement = placeTemplate.cloneNode(true);
  const initialImage = initialElement.querySelector(".elements__photo");
  initialElement.querySelector(".elements__title").textContent = item.name;
  initialImage.src = item.link;
  initialImage.alt = item.name;
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

  initialImage.addEventListener("click",() => openImgPopup(item));

  return initialElement;
}

function renderCard(item) {
  const cardCreated = establishInitialCards(item);
  placesContainer.prepend(cardCreated);
}

function createdCard(evt) {
  evt.preventDefault();
  const cardInfo = {};
  cardInfo.name = newItemTitleinput.value;
  cardInfo.link = newItemImginput.value;
  renderCard(cardInfo);
  evt.target.reset();
  closePopup(popupTypeCard);
  disableButtonAfterAdd();
}
function disableButtonAfterAdd(){
  const buttonCardCreated = popupTypeCard.querySelector("#button-card-created");
  buttonCardCreated.setAttribute("disabled", "");

  buttonCard.classList.add()
}

initialcards.forEach(renderCard);


// слушатели 

popupCloseButtonList.forEach(popupCloseButton => {
  const popup = popupCloseButton.closest(".popup");
  popupCloseButton.addEventListener("click", () => closePopup(popup))
})
buttonInfo.addEventListener("click", openPopupProfile);
buttonCard.addEventListener("click", openPopupCard);
formElement.addEventListener("submit", handleFormSubmit,);
cardsElement.addEventListener("submit", createdCard);


// валидация 


enableValidation({
  formSelector:".form",
  inputSelector: ".popup__text",
  submitButtonSelector: ".button_size_save",
  inactiveButtonClass: ".form__submit_inactive",
  inputErrorclass: ".popup__text_type_error",
});

 