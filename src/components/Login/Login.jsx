import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.svg";

import "./Login.css";

const LogIn = ({ handleRegistration }) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <div className="page">
      <div className="login__header">
        <img src={logo} alt="Logo Around The US" className="login__logo" />
        <Link to="login" className="login__login-link">
          Registrate
        </Link>
      </div>

      <hr className="login__line" />

      <div className="login">
        <p className="login__welcome">Iniciar sesión</p>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="login__input"
            value={data.email}
            onChange={handleChange}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="login__input"
            value={data.password}
            onChange={handleChange}
          />
          <div className="login__button-container">
            <button type="submit" className="login__link">
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="login__login">
          <p>¿Aún no eres miembro?</p>
          <Link to="login" className="login__login-link">
            Regístrate Aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
