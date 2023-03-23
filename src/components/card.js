const placeTemplate = document
  .querySelector("#cards")
  .content.querySelector(".elements__list");
const cardImage = document.querySelector(".popup__picture");

export function establishInitialCards(card, openImgPopup) {
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



//initialImage.addEventListener("click", () => openImgPopup(item));
//initialImage.addEventListener("click", (evt) => openImgPopup(evt));