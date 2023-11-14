class MoviesApi {
    constructor (options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _checkResponse (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res);
    }

    getSavedMovies () {
        return fetch(`${this._baseUrl}/movies`, {
          headers: this._headers
        })
        .then(this._checkResponse);
    }
  
    createMovie ({
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        movieId
    }) {
      return fetch(`${this._baseUrl}/movies`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
            "country": country,
            "director": director,
            "duration": duration,
            "year": year,
            "description": description,
            "image": image,
            "trailerLink": trailerLink,
            "nameRU": nameRU,
            "nameEN": nameEN,
            "thumbnail": thumbnail,
            "movieId": movieId
        })
      })
      .then(this._checkResponse);
    }

    deleteMovie (movieId) {
      return fetch(`${this._baseUrl}/movies/${movieId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    getCurrentUser () {
      this._headers.authorization = `Bearer ${localStorage.getItem('jwt')}`;
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      })
      .then(this._checkResponse);
    }

    updateUserInfo ({ name, email }) {
      return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            "name": name,
            "email": email,
        })
      })
      .then(this._checkResponse);
    }
}

const api = new MoviesApi({
    baseUrl: 'https://api.movies-explorer.iya.nomoreparties.co',
    headers: {
      authorization: `Bearer ${localStorage.getItem('jwt')}`,
      'Content-Type': 'application/json'
    }
  }); 
  
export default api;