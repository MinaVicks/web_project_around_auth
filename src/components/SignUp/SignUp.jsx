import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/images/logo.svg";

import "./SignUp.css";

const SignUp = ({ handleRegistration }) => {
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
      <div className="signup__header">
        <img src={logo} alt="Logo Around The US" className="signup__logo" />
        <Link to="login" className="signup__login-link">
          Inicia sesión
        </Link>
      </div>

      <hr className="signup__line" />

      <div className="signup">
        <p className="signup__welcome">Regístrate</p>

        <form className="signup__form" onSubmit={handleSubmit}>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Correo electrónico"
            className="signup__input"
            value={data.email}
            onChange={handleChange}
          />

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Contraseña"
            className="signup__input"
            value={data.password}
            onChange={handleChange}
          />
          <div className="signup__button-container">
            <button type="submit" className="signup__link">
              Regístrate
            </button>
          </div>
        </form>

        <div className="signup__signin">
          <p>¿Ya eres miembro?</p>
          <Link to="login" className="signup__login-link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
