import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.svg";

import "./SignIn.css";

const SignIn = ({ handleRegistration }) => {
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
      <div className="signin__header">
        <img src={logo} alt="Logo Around The US" className="signin__logo" />
        <Link to="login" className="signin__login-link">
          Registrate
        </Link>
      </div>

      <hr className="signin__line" />

      <div className="signin">
        <p className="signin__welcome">Iniciar sesión</p>

        <form className="signin__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="signin__input"
            value={data.email}
            onChange={handleChange}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="signin__input"
            value={data.password}
            onChange={handleChange}
          />
          <div className="signin__button-container">
            <button type="submit" className="signin__link">
              Iniciar sesión
            </button>
          </div>
        </form>

        <div className="signin__signin">
          <p>¿Aún no eres miembro?</p>
          <Link to="login" className="signin__login-link">
            Regístrate Aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default signin;
