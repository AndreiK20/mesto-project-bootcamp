const placeTemplate = document
  .querySelector("#cards")
  .content.querySelector(".elements__list");


export function establishInitialCards(item, openImgPopup) {
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

  initialImage.addEventListener("click", (evt) => openImgPopup(evt));

  return initialElement;
}