//открытие и закрытие
export const popupTypeInfo = document.querySelector(".popup_type_info");
export const popupFormInfo = popupTypeInfo.querySelector("#info");
export const pageTitle = document.querySelector(".profile__head");
export const pageSubtitle = document.querySelector(".profile__text");
export const nameInput = document.querySelector("#title");
export const jobInput = document.querySelector("#subtitle");
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}
const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    closePopup(popup);
  }
};





