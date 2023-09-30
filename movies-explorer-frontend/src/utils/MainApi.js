class MoviesApi {
    constructor (options) {
      this._baseUrl = options.baseUrl;
      this._headers = options.headers;
    }
  
    _checkResponse (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
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
}

const api = new MoviesApi({
    baseUrl: 'https://api.movies-explorer.iya.nomoreparties.co',
    headers: {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTE0NDYwZDJlM2YyMmVhNjcxM2NlYTEiLCJpYXQiOjE2OTU4Mjc0ODQsImV4cCI6MTY5NjQzMjI4NH0.r1FvQEdPba1i_sMnb5q_yGTUIYeeqqHYIW8KEdOnZ4Q`,
      'Content-Type': 'application/json'
    }
  }); 
  
export default api;