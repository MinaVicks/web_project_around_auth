import logo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/Avatar.png";
import iconEditProfile from "../../assets/images/Edit_off.svg";
import addCard from "../../assets/images/Add.svg";
import iconEditAvatar from "../../assets/images/edit_avatar.svg";
import Popup from "../Main/components/Popup/Popup";
import NewCard from "../Main/components/NewCard/NewCard";
import EditAvatar from "../Main/components/EditAvatar/EditAvatar";
import EditProfile from "../Main/components/EditProfile/EditProfile";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";

function Header() {
  const {
    currentUser,
    handleUpdateUser,
    handleUpdateAvatar,
    handleAppPlaceSubmit,
  } = useContext(CurrentUserContext);

  const [popup, setPopup] = useState(null);

  const closePopup = () => setPopup(null);

  const newCardPopup = {
    title: "Nuevo lugar",
    children: <NewCard onSubmitSuccess={closePopup} />,
  };
  const editProfile = {
    title: "Editar perfil",
    children: <EditProfile onSubmitSuccess={closePopup} />,
  };
  const editAvatar = {
    title: "Cambiar avatar",
    children: <EditAvatar onSubmitSuccess={closePopup} />,
  };

  function handleOpenPopup(popup) {
    setPopup(popup);
  }
  function handleClosePopup() {
    setPopup(null);
  }

  useEffect(() => {
    console.log("CurrentUser actualizado:", currentUser);
  }, [currentUser]);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <img src={logo} alt="Logo Around The US" className="header__logo" />
        </div>
        <Link to="/signup" className="profile__login-link">
          Cerrar sesión
        </Link>
      </div>
      <hr className="header__line" />

      <section className="profile">
        <div className="profile__container">
          <img
            src={iconEditAvatar}
            alt="Edit pencil"
            className="profile__avatar-edit"
            onClick={() => handleOpenPopup(editAvatar)}
          />
          <div className="profile__avatar-opacity"></div>
          <img
            src={currentUser?.avatar || avatar}
            alt="Profile picture"
            className="profile__avatar"
          />
        </div>

        <div className="profile__info">
          <div className="profile__info-title">
            <h1 className="profile__info-name">
              {currentUser?.name || "Nombre"}
            </h1>

            <button
              className="profile__info-edit"
              onClick={() => handleOpenPopup(editProfile)}
            >
              <img src={iconEditProfile} alt="Edit button" />
            </button>
          </div>
          <h2 className="profile__info-subtitle">
            {currentUser?.about || "Descripción"}
          </h2>
        </div>

        <button
          className="profile__add"
          onClick={() => handleOpenPopup(newCardPopup)}
        >
          <img src={addCard} alt="Add new item" className="profile__add-img" />
        </button>
      </section>
      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}
    </header>
  );
}
export default Header;
