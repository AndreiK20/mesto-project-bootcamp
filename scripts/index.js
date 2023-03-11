const buttonInfo = document.querySelector(".button_size_small");
const buttonCard = document.querySelector(".button_size_big");
const pageTitle = document.querySelector(".profile__head");
const pageSubtitle = document.querySelector(".profile__text");
const popupTypeInfo = document.querySelector(".popup_type_info");
const formElement = popupTypeInfo.querySelector("#info");
const nameInput = popupTypeInfo.querySelector("#title");
const jobInput = popupTypeInfo.querySelector("#subtitle");
const popupTypeCard = document.querySelector(".popup_type_card");
const cardsElement = popupTypeCard.querySelector(".form");
const newItemTitleinput = popupTypeCard.querySelector("#text");
const newItemimginput = popupTypeCard.querySelector("#picture");
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
  newItemimginput.value = "";
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
  cardInfo.link = newItemimginput.value;
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

