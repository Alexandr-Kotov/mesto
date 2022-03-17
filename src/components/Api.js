class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._resHandler = (res) => (res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`));
  }

  getProfile(){
    return fetch(`${this._baseUrl}/users/me`,{
      headers: this._headers
    })  
    .then((res) => this._resHandler(res))
  }

  patchProfile(name, about){
    return fetch(`${this._baseUrl}/users/me`,{
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
    })
    })

    .then((res) => this._resHandler(res))
  }

  getCardSever(){
    return fetch(`${this._baseUrl}/cards`,{
      headers: this._headers
    })
    .then((res) => this._resHandler(res))
  }

  postCardSever(name, link){
    return fetch(`${this._baseUrl}/cards`,{
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
    })
    })
    .then((res) => this._resHandler(res))
  }

  
  deleteCard(id){
    return fetch(`${this._baseUrl}/cards/${id}`,{
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => this._resHandler(res))
  }

  addLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: 'PUT',
      headers: this._headers,
    })
    .then((res) => this._resHandler(res))
  }

  deleteLike(id){
    return fetch(`${this._baseUrl}/cards/${id}/likes`,{
      method: 'DELETE',
      headers: this._headers,
    })
    .then((res) => this._resHandler(res))
  }

  patchAvatar(avatarLink) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ 
        avatar: avatarLink
      })
    })
    .then((res) => this._resHandler(res))
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-37',
  headers: {
    authorization: '4681c571-88f6-4ca4-b1b2-2741f41c35d8',
    'Content-Type': 'application/json'
  }
});