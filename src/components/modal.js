//открытие и закрытие
export const popupTypeInfo = document.querySelector(".popup_type_info");
export const popupFormInfo = popupTypeInfo.querySelector("#info");
export const pageTitle = document.querySelector(".profile__head");
export const pageSubtitle = document.querySelector(".profile__text");
export const nameInput = document.querySelector("#title");
export const jobInput = document.querySelector("#subtitle");
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", closeExit);
}
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeExit);
}
const closeExit = (evt) => {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === "Escape") {
    closePopup(popup);
  }
};





