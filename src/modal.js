//открытие и закрытие
export const formElement = document.querySelector("#info");
export const popupTypeInfo = document.querySelector(".popup_type_info");
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



function handleFormSubmit(evt) {
    evt.preventDefault();
    pageTitle.textContent = nameInput.value;
    pageSubtitle.textContent = jobInput.value;
    closePopup(popupTypeInfo);
  }
export function SetOverlayListeners(){
    formElement.addEventListener("submit", handleFormSubmit,); 
}
