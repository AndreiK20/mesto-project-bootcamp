const buttonInfo = document.querySelector(".button_size_small");
const buttonCard = document.querySelector(".button_size_big");
const popupTypeInfo = document.querySelector(".popup_type_info");
const popupTypeCard = document.querySelector(".popup_type_card");
const buttonClosedInfo = popupTypeInfo.querySelector(".button_size_closed");
const buttonClosedCard = popupTypeCard.querySelector(".button_size_closed");
const formElement = popupTypeInfo.querySelector("#info");
const cardsElement = popupTypeCard.querySelector(".form");
const pageTitle = document.querySelector(".profile__head");
const pageSubtitle = document.querySelector(".profile__text");
const nameInput = popupTypeInfo.querySelector("#title");
const jobInput = popupTypeInfo.querySelector("#subtitle");
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
const placesContainer = document.querySelector(".elements__lists");
const placeTemplate = document
  .querySelector("#cards")
  .content.querySelector(".elements__list");
const newItemTitleinput = popupTypeCard.querySelector("#text");
const newItemimginput = popupTypeCard.querySelector("#picture");
const popupTypeImg = document.querySelector(".popup_type_imaged");
const popupImage = document.querySelector(".popup__picture");
const popupFigaption = document.querySelector(".popup__figaption");
const buttonClosedImg = popupTypeImg.querySelector(".button_size_closed");
//edit new card

function openImgPopup(evt) {
  openImg(popupTypeImg);
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupFigaption.textContent = evt.target.alt;
}

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
  closeCard(popupTypeCard);
}

initialcards.forEach(renderCard);

function openPopup() {
  nameInput.value = pageTitle.textContent;
  jobInput.value = pageSubtitle.textContent;
  popupTypeInfo.classList.add("popup_opened");
}
function closePopup() {
  popupTypeInfo.classList.remove("popup_opened");
}
function openCard() {
  popupTypeCard.classList.add("popup_opened");
}
function closeCard() {
  popupTypeCard.classList.remove("popup_opened");
  newItemTitleinput.value = "";
  newItemimginput.value = "";
}
function openImg() {
  popupTypeImg.classList.add("popup_opened");
}

function closeImg() {
  popupTypeImg.classList.remove("popup_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  pageTitle.textContent = nameInput.value;
  pageSubtitle.textContent = jobInput.value;
  closePopup(popupTypeInfo);
}

buttonInfo.addEventListener("click", openPopup);
buttonCard.addEventListener("click", openCard);
buttonClosedInfo.addEventListener("click", closePopup);
buttonClosedCard.addEventListener("click", closeCard);
formElement.addEventListener("submit", handleFormSubmit);
cardsElement.addEventListener("submit", createdCard);
buttonClosedImg.addEventListener("click", closeImg);
