const ButtonInfo = document.querySelector('.button_size_small');
const ButtonCard = document.querySelector('.button_size_big');
const PopupTypeInfo = document.querySelector('.popup_type_info')
const PopupTypeCard = document.querySelector('.popup_type_card')
const ButtonClosedInfo = PopupTypeInfo.querySelector('.button_size_closed');
const ButtonClosedCard = PopupTypeCard.querySelector('.button_size_closed');
const FormElement = PopupTypeInfo.querySelector('#info');
const CardsElemen = PopupTypeCard.querySelector('.form');
const PageTitle = document.querySelector('.profile__head');
const PageSubtitle = document.querySelector('.profile__text');
const NameInput = PopupTypeInfo.querySelector('#title');
const JobInput = PopupTypeInfo.querySelector('#subtitle');
const NewCards = PopupTypeInfo.querySelector('#text')
const NewPhoto = PopupTypeCard.querySelector('#picture')
const InitialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
const PlacesContainer = document.querySelector('.elements__lists');
const PlaceTemplate = document.querySelector('#cards').content; 
const PlaceInfo = InitialCards.map(function (item) {
  return {
    name: item.name,
    link: item.link
  };
});
const NewitemtitleInput = document.querySelector('.elements__group')
const NewitemImgInput = document.querySelector('.elements__photo')



function EstablishInitialCards() {
  PlaceInfo.forEach(PutInitialCards);
}

function PutInitialCards(item) {
  const PlaceElement = PlaceTemplate.querySelector('.elements__list').cloneNode(true);
  PlaceElement.querySelector('.elements__title').textContent = item.name;
  PlaceElement.querySelector('.elements__photo').src = item.link;
  PlacesContainer.append(PlaceElement);
}
EstablishInitialCards();

function CardSubmit(evt) {
    evt.preventDefault();
    const PlaceElement = PlaceTemplate.querySelector('.elements__list').cloneNode(true);
    NewitemtitleInput.value = NewCards.textContent
    NewitemImgInput.link = NewPhoto.value

    PlacesContainer.append(PlaceElement);
    CloseCard(PopupTypeCard);
}



function OpenPopup() {
    NameInput.value = PageTitle.textContent;
    JobInput.value = PageSubtitle.textContent;
    PopupTypeInfo.classList.add('popup_opened');
}
function ClosePopup() {
    PopupTypeInfo.classList.remove('popup_opened');
}
function OpenCard() {
    PopupTypeCard.classList.add('popup_opened');
}
function CloseCard() {
    PopupTypeCard.classList.remove('popup_opened');
}
function handleFormSubmit(evt) {
    evt.preventDefault();
    PageTitle.textContent = NameInput.value;
    PageSubtitle.textContent = JobInput.value;
    ClosePopup(PopupTypeInfo);
}


ButtonInfo.addEventListener('click', OpenPopup); 
ButtonCard.addEventListener('click', OpenCard);
ButtonClosedInfo.addEventListener('click', ClosePopup);
ButtonClosedCard.addEventListener('click', CloseCard);
FormElement.addEventListener('submit', handleFormSubmit);
CardsElemen.addEventListener('submit', CardSubmit);
