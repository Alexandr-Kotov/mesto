export default class UserInfo{
  constructor({userName, userAboutMe}){
    this._userName = userName;
    this._userAboutMe = userAboutMe;
  }

// Возвращает объект с данными пользователя.  
  getUserInfo(){
    return{
      profileName: this._userName.textContent,
      profileAboutme: this._userAboutMe.textContent
    }
  };

// Принимает новые данные пользователя и добавляет их на страницу.  
  setUserInfo({profileName, profileAboutme}){
    this._userName.textContent = profileName;
    this._userAboutMe.textContent = profileAboutme;
  };
};