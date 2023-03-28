import { addLikeCard, deleteLikeCard, sendRequestDeleteCard } from "./api";

const placeTemplate = document
  .querySelector("#cards")
  .content.querySelector(".elements__list");

function removeCard(cardInfo) {
  cardInfo.remove();
}

export function establishInitialCards(cardInfo, openImgPopup, userId) {
  const initialElement = placeTemplate.cloneNode(true);
  const initialImage = initialElement.querySelector(".elements__photo");
  const quantitylike = initialElement.querySelector(".elements__like-counter");
  const buttonTrashCard = initialElement.querySelector(".button_size_trash");
  const buttonlikeOfPicture = initialElement.querySelector(".button__like");
  const cardOwner = cardInfo.owner._id;
  const checklikes = cardInfo.likes;
  initialElement.querySelector(".elements__title").textContent = cardInfo.name;
  initialImage.src = cardInfo.link;
  initialImage.alt = cardInfo.name;
  /*initialElement
    .querySelector(".button_size_trash")
    .addEventListener("click", function (evt) {
      evt.target.closest(".elements__list").remove();
    });
  initialElement
    .querySelector(".button__like")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("button__like_active");
    });
  */
  initialImage.addEventListener("click", (evt) => openImgPopup(evt));
  quantitylike.textContent = cardInfo.likes.length;

  if (cardOwner !== userId) {
    buttonTrashCard.disabled = true;
    buttonTrashCard.classList.add("button__disabled");
  }
  buttonTrashCard.addEventListener("click", () => {
    sendRequestDeleteCard(cardInfo._id)
      .then((res) => {
        removeCard;
      })
      .catch(console.log("ошибка"));
  });
  buttonlikeOfPicture.addEventListener("click", () => {
    islike(cardInfo._id, buttonlikeOfPicture, quantitylike);
  });

  function islike(evt) {
    const likeCard = buttonlikeOfPicture.classList.contains(
      "button__like_active"
    );
    if (!likeCard) {
      addLikeCard(cardInfo._id)
        .then((res) => {
          quantitylike.textContent = res.likes.length;
          buttonlikeOfPicture.classList.add("button__like_active");
        })
        .catch(console.log("ошибка"));
    } else {
      deleteLikeCard(cardInfo._id)
        .then((res) => {
          quantitylike.textContent = res.likes.length;
          buttonlikeOfPicture.classList.remove("button__like_active");
        })
        .catch(console.log("ошибка"));
    }
  }

  checklikes.forEach((like) => {
    if (like._id === userId) {
      buttonlikeOfPicture.classList.add("button__like_active");
    }
  });

  return initialElement;
}
