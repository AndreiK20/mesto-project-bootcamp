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
    .catch(console.log("ошибка"))
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(handleResponse)
    .catch(console.log("ошибка"))
} 








