const config = {
  baseUrl: "https://nomoreparties.co/v1/wbf-cohort-6",
  headers: {
    authorization: "c3f955df-509e-4494-b0c0-2f68a177bfc2",
    "Content-Type": "application/json",
  },
};
const handleResponse = (res) => {                             
  if (res.ok) {
    return  res.json(); 
  } 
  return Promise.reject(`Ошибка: ${res.status}`);
};


export const  getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(handleResponse)
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse)
} 

export const updateInform = (newInfoAboutUser) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    body: JSON.stringify(newInfoAboutUser),
    headers: config.headers,
  }) 
  .then(handleResponse)
}


export const createNewCardforApi = (newCard) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    body: JSON.stringify(newCard),
    headers: config.headers,
  }) 
  .then(handleResponse)
}


export const sendRequestDeleteCard = (id) => {
  return  fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(handleResponse)
}

export const  addLikeCard =(id) => {
  return  fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "PUT",
    headers: config.headers,
  })
  .then(handleResponse)
}

export const  deleteLikeCard = (id) => {
  return fetch(`${config.baseUrl}/cards/likes/${id}`, {
    method: "DELETE",
    headers: config.headers,
  })
  .then(handleResponse)
}

export  const sendRequestToUpdateAvatar = (link) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    body: JSON.stringify({avatar:link}),
    headers: config.headers,
  })
  .then(handleResponse)
}