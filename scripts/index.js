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
const closeExit = (evt) => {
  const popup = document.querySelector('.popup_opened');
  if (evt.key === 'Escape'){
  closePopup(popup);
  }
};

const closeOverlay = (evt) => {
  if (evt.target === evt.currentTarget){
  closePopup(evt.target);
  }
};


// валидация 

const userNameSpan = popupTypeInfo.querySelector(".name-input-error");
const subtitleSpan = popupTypeInfo.querySelector(".subtitle-input-error");

const pictureSpan = popupTypeCard.querySelector(".picture-input-error");
const referenceSpan = popupTypeCard.querySelector(".reference-input-error");



function showValidationTitle(){
  userNameSpan.textContent = nameInput.validationMessage;
}

function showValidationSubtitle(){
  subtitleSpan.textConten = jobInput.validationMessage;
}

function showValidationPicture(){
  pictureSpan.textContent = newItemTitleinput.validationMessage;
}

function showValidationReference(){
  referenceSpan.textContent = newItemImginput.validationMessage;
}

nameInput.addEventListener("input", showValidationTitle);
jobInput.addEventListener("input", showValidationSubtitle);
newItemTitleinput.addEventListener("input", showValidationPicture);
newItemImginput.addEventListener("input", showValidationReference);































/*const showInputError = (element) => {
  element.classList.add('popup__text_type_error');
  userNameSpan.textContent = nameInput.validationMessage;
};


function showInputError(nameInput){
  const formErrorSelector = `#error-${nameInput.id}`;  
  const spanElement = document.querySelector(formErrorSelector);
  spanElement.textContent = errorMessage;
}


const hideInputError = (element) => {
  element.classList.remove('popup__text_type_error');
};

const isValid = () => {
  if (!nameInput.validity.valid){
    showInputError(nameInput, nameInput.validationMessage);
  }else {
    hideInputError(nameInput);
  }
}
const inputList = document.querySelectorAll("popup__text");

inputList.forEach(nameInput => {
  nameInput.addEventListener("input", () => isValid());
});



//
//nameInput.addEventListener("input", isValid);



formElement.addEventListener("input", function (evt){
  console.log(evt.target.validity.valid);
});
*/


//открытие и закрытие 

function openPopup(popup){
 popup.classList.add("popup_opened");
 document.addEventListener("keydown", closeExit);
 popup.addEventListener("click", closeOverlay);
}


function closePopup(popup){
  popup.classList.remove("popup_opened")
  document.removeEventListener("keydown", closeExit);
  popup.removeEventListener("click", closeOverlay);
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

function openImgPopup(evt) {
  openPopup(popupTypeImg);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupFigaption.textContent = evt.target.alt;
}
// ввод данных 


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

  initialImage.addEventListener("click", openImgPopup);

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
  closePopup(popupTypeCard);
}

initialcards.forEach(renderCard);


// слушатели 

popupCloseButtonList.forEach(popupCloseButton => {
  const popup = popupCloseButton.closest('.popup');
  popupCloseButton.addEventListener('click', () => closePopup(popup))
})
buttonInfo.addEventListener("click", openPopupProfile);
buttonCard.addEventListener("click", openPopupCard);
formElement.addEventListener("submit", handleFormSubmit,);
cardsElement.addEventListener("submit", createdCard);
