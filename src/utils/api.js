class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInformation() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }
  updateUserInformation(body) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify(avatarUrl),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Error: ${res.status}`);
        }
        return res.json();
      })
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  createCard(body) {
    return fetch(`${this._baseUrl}/cards/`, {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  deleteLikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }

  changeLikeCardStatus(cardId, like) {
    return like ? this.likeCard(cardId) : this.deleteLikeCard(cardId);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err); // registra el error en la consola
      });
  }
}
const api = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "baa82528-b162-4561-afed-0ee517d16cde",
    "Content-Type": "application/json",
  },
});

export default api;
