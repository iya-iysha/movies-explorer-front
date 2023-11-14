export const BASE_URL = 'https://api.movies-explorer.iya.nomoreparties.co';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res);
};

export const signup = ({ email, password, name }) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify ({
      "password": password,
      "email": email,
      "name": name
    })
  })
  .then(checkResponse)
};

export const singin = ({ password, email }) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify ({
      "password": password,
      "email": email
    })
  })
  .then(checkResponse)
};

export const checkToken = ( jwt ) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${jwt}`
    }
  })
  .then(checkResponse)
}
