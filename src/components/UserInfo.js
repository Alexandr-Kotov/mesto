export default class UserInfo{
  constructor({userName, userAboutMe, userAvatar}){
    this._userName = userName;
    this._userAboutMe = userAboutMe;
    this._userAvatar = userAvatar;
  }

// Возвращает объект с данными пользователя.  
  getUserInfo(){
    return{
      profileName: this._userName.textContent,
      profileAboutme: this._userAboutMe.textContent
    }
  };

// Принимает новые данные пользователя и добавляет их на страницу.  
  setUserInfo({profileName, profileAboutme, avatarLink}){
    this._userName.textContent = profileName;
    this._userAboutMe.textContent = profileAboutme;
    if(avatarLink){
      this._userAvatar.src = avatarLink
    }else{
      this._userAvatar.src;
    }
  };
};