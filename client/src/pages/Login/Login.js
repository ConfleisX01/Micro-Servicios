import React, { useState } from 'react';
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'animate.css';

function Login() {
  const [numeroEmpleado, setNumeroEmpleado] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const iniciosesion = () => {
    if (numeroEmpleado !== password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El número de empleado y la contraseña deben ser iguales.'
      });
      return;
    }

    Axios.post("http://localhost:3001/login", {
      numeroEmpleado: numeroEmpleado
    }).then((response) => {
      const userData = response.data;
      const { idUsuario, nombreAreaEmpleado } = userData;

      localStorage.setItem("idUsuario", idUsuario);

      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: `Bienvenido, ${nombreAreaEmpleado}.`
      });

      switch (nombreAreaEmpleado) {
        case "Servicios Escolares":
          navigate("servicios-escolares"); 
          break;
        case "Recursos Humanos":
          navigate("/recursos_humanos"); 
          break;
        case "Alumno":
          navigate("/alumnos");
          break;
        case "Profesor":
          navigate("/profesores");
          break;
        default:
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Rol no conocido.'
          });
      }
    }).catch((error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al iniciar sesión.'
      });
    });
  };

  return (
    <div className="container animate__animated animate__fadeIn">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card border-dark">
            <div className="card-header bg-dark text-white">
              <h3>Inicio de sesión</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>Número de Empleado:</label>
                  <input type="text" className="form-control" value={numeroEmpleado} onChange={(event) => setNumeroEmpleado(event.target.value)} />
                </div>
                <div className="form-group">
                  <label>Contraseña:</label>
                  <input type="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} />
                </div>
                <button type="button" className="btn btn-dark" onClick={iniciosesion}>Iniciar sesión</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;