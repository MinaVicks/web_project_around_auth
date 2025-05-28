import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.svg";

import "./register.css";

const Register = ({ handleRegistration }) => {
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
      <div className="register__header">
        <img src={logo} alt="Logo Around The US" className="register__logo" />
        <Link to="login" className="register__login-link">
          Inicia sesión
        </Link>
      </div>

      <hr className="register__line" />

      <div className="register">
        <p className="register__welcome">Regístrate</p>

        <form className="register__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="register__input"
            value={data.email}
            onChange={handleChange}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="register__input"
            value={data.password}
            onChange={handleChange}
          />
          <div className="register__button-container">
            <button type="submit" className="register__link">
              Regístrate
            </button>
          </div>
        </form>

        <div className="register__signin">
          <p>¿Ya eres miembro?</p>
          <Link to="login" className="register__login-link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
