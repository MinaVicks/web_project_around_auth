import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/api";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import SignUp from "../SignUp/SignUp";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    (async () => {
      await api.getUserInformation().then((data) => {
        setCurrentUser(data);
      });
    })();
  }, []);

  useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data); // Actualizamos el estado con las tarjetas recibidas
      })
      .catch((err) => {
        console.error("Error al cargar las tarjetas:", err);
      });
  }, []);

  async function handleAppPlaceSubmit(data, onSuccess) {
    await api
      .createCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        if (onSuccess) onSuccess();
      })
      .catch((error) => console.error(error));
  }

  async function handleCardLike(card) {
    const isLiked = card.isLiked;

    await api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((currentCard) =>
            currentCard._id === card._id ? newCard : currentCard
          )
        );
      })
      .catch((error) => console.error(error));
  }

  async function handleCardDelete(card) {
    console.log("click delete");
    try {
      await api.deleteCard(card._id);
      setCards((state) => state.filter((c) => c._id !== card._id));
    } catch (error) {
      console.error("Error al eliminar la tarjeta:", error);
    }
  }

  const handleUpdateUser = (data, onSuccess) => {
    (async () => {
      await api.updateUserInformation(data).then((newData) => {
        setCurrentUser(newData);
        if (onSuccess) onSuccess();
      });
    })();
  };

  const handleUpdateAvatar = (data, onSuccess) => {
    (async () => {
      await api.updateAvatar(data).then((newData) => {
        setCurrentUser(newData);
        if (onSuccess) onSuccess();
      });
    })();
  };

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        handleUpdateUser,
        handleUpdateAvatar,
        handleAppPlaceSubmit,
      }}
    >
      <Routes>
        <Route
          path="/main"
          element={
            <div className="page">
              <Header />
              <Main
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
              <Footer />
            </div>
          }
        />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
