//открытие и закрытие 

export function openPopup(popup){
 popup.classList.add("popup_opened");
 document.addEventListener("keydown", closeExit);
}


export function closePopup(popup){
  popup.classList.remove("popup_opened")
  document.removeEventListener("keydown", closeExit);
}
const closeExit = (evt) => {
  const popup = document.querySelector(".popup_opened");
  if (evt.key === 'Escape'){
  closePopup(popup);
  }
};

