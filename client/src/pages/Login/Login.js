import React, { useState } from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../Login/login.css';


function Login() {
  const [numeroEmpleado, setNumeroEmpleado] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const iniciosesion = async () => {
    if (numeroEmpleado !== password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al ingressar usuario o contraseña'
      });
      return;
    }

    try {
      const response = await Axios.post("https://m4xj94bw-3002.usw3.devtunnels.ms/login", {
        numeroEmpleado: numeroEmpleado
      });
      const userData = response.data;
      const { idUsuario, nombreAreaEmpleado } = userData;

      localStorage.setItem("idUsuario", idUsuario);

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: `Bienvenido, ${nombreAreaEmpleado}. Su contraseña es: ${numeroEmpleado}.`
      });

      switch (nombreAreaEmpleado) {
        case "Servicios Escolares":
          navigate("servicios-escolares"); 
          break;
        case "Recursos Humanos":
          navigate("/recursos_humanos"); 
          break;
        case "Profesores":
          navigate("/profesores");
          break;
        default:
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Rol no conocido.'
          });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al iniciar sesión.'
      });
    }
  };

  const iniciosesionAspirante = async () => {
    try {
      const response = await Axios.post("https://m4xj94bw-3002.usw3.devtunnels.ms/login-aspirante", {
        correo: correo
      });
      const userData = response.data;
      const { idUsuario, contrasenia } = userData;

      localStorage.setItem("idUsuario", idUsuario);

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: `Bienvenido, su contraseña es: ${contrasenia}.`
      });

      navigate("/alumnos");
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al iniciar sesión.'
      });
    }
  };

  return (
    <div className="login-page">
      <div className="auth_main">  	
        <input type="checkbox" id="auth_chk" aria-hidden="true" />

        {/* Personal login */}
        <div className="auth_personal">
          <form>
            <label htmlFor="auth_chk" aria-hidden="true" className="auth_label">Personal</label>
            <input
              type="text"
              name="numeroEmpleado"
              placeholder="Número de Empleado"
              maxLength="9"
              pattern="\d{9}"
              value={numeroEmpleado}
              onChange={(event) => setNumeroEmpleado(event.target.value)}
              className="auth_input"
              required
            />
            <input
              type="password"
              name="pswd"
              placeholder="Contraseña"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="auth_input"
              required
            />
            <button type="button" onClick={iniciosesion} className="auth_button">Iniciar sesión</button>
          </form>
        </div>

        {/* Aspirante login */}
        <div className="auth_aspirante">
          <form>
            <label htmlFor="auth_chk" aria-hidden="true" className="auth_label">Aspirante</label>
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              className="auth_input"
              required
            />
            <input
              type="password"
              name="pswd"
              placeholder="Contraseña"
              className="auth_input"
              required
            />
            <button type="button" onClick={iniciosesionAspirante} className="auth_button">Iniciar sesión</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;