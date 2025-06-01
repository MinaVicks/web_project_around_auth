import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import api from "../../utils/api";
import LogIn from "../Login/Login";
import Register from "../Register/Register";
import ProtectedRoute from "../ProtectedRoute";
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

import * as auth from "../../utils/auth.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [cards, setCards] = useState([]);
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleRegistration = async ({ email, password }) => {
    return auth
      .register(email, password)
      .then((data) => {
        console.log("Registration successful:", data);
        setUserData({ email });
        setIsLoggedIn(true);
        return data;
      })
      .catch((err) => {
        console.error("Registration error: at app.jsx", err);
        throw err;
      });
  };

  useEffect(() => {
    setIsLoggedIn(auth.isAuthenticated());
  }, []);

  const handleLogout = () => {
    auth.logout();
    localStorage.removeItem("registeredEmail");
    localStorage.removeItem("loginEmail");
    setIsLoggedIn(false);
    navigate("/signin");
  };

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
        setCards(data);
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
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <div className="page">
                <Header onLogout={handleLogout} />
                <Main
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
              </div>
            </ProtectedRoute>
          }
        />

        <Route
          path="/signin"
          element={<LogIn setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Register handleRegistration={handleRegistration} />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/main" : "/signin"} />}
        />
      </Routes>
    </CurrentUserContext.Provider>
  );
}

export default App;
