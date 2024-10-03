import React, { useEffect, useState } from 'react';
import axios, { all } from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import '../Login/login.css';

function Login() {
  const [numeroEmpleado, setNumeroEmpleado] = useState('');
  const [password, setPassword] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseniaAspirante, setContraseniaAspirante] = useState('');
  const [datosEmpleados, setDatosEmpleados] = useState([]);
  const [allData, setAllData] = useState([]); // Convertir allData en estado
  const navigate = useNavigate();

  useEffect(() =>{
    getEmpleados();
    getAspirantes();
  },[]);



  const getEmpleados = () =>{
    axios.get('https://82465d5v-3001.usw3.devtunnels.ms/empleado/getAllEmpleados/Completos')
    .then(function(response){
        console.log(response);
    })
}

const getAspirantes = () =>{
    axios.get('https://qdffwxc1-3001.usw3.devtunnels.ms/servicios_escolares/getApplicants')
    .then(function(response){
        console.log(response);
    })
}


  useEffect(() => {
    axios.get('https://82465d5v-3001.usw3.devtunnels.ms/empleado/getAllEmpleados/Completos')
      .then(function (response) {
        const empleadosData = response.data;
        setAllData(prevData => [...prevData, { listEmpleados: empleadosData }]); // Agregar los empleados a allData
        console.log(allData);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []); // allData ahora es estado y se manejará correctamente

  const iniciosesion = () => {
    if (numeroEmpleado !== password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error, Las credenciales no son correctas'
      });
      return;
    }

    try {
      const numeroEmpleados = { numeroEmpleado }; // Crear objeto con numeroEmpleado

      // Agregar numeroEmpleado a allData antes de hacer la petición
      const updatedData = [...allData, numeroEmpleados]; // Combina allData con numeroEmpleado

      console.log(updatedData); // Verifica que el array esté correctamente formado

      axios.post("https://m4xj94bw-3002.usw3.devtunnels.ms/login", updatedData)
        .then(function (response) {
          const userData = response.data;
          const { idUsuario, nombreAreaEmpleado } = userData;

          localStorage.setItem("idUsuario", idUsuario);

          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: `Bienvenido, ${nombreAreaEmpleado}.`
          });

          switch (nombreAreaEmpleado) {
            case "SE":
              navigate("/personal/servicios-escolares");
              break;
            case "RH":
              navigate("/personal/recursos_humanos");
              break;
            case "P":
              navigate("/personal/profesores");
              break;
            case "I":
              navigate("/alumnos/regsitro_becas");
              break;
            default:
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Rol no conocido.'
              });
          }
        })
        .catch(function (error) {
          Swal.fire({
            icon: "error",
            title: "Error de servidor"
          });
        });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al iniciar sesión.'
      });
    }
  };

//   const iniciosesionAspirante = async () => {
//     try {
//       const response = axios.post("https://m4xj94bw-3002.usw3.devtunnels.ms/login-aspirante", {
//         correo: correo,
//         curp: curp
//       });

//       const userData = response.data;
//       const { idUsuario, correo, curp } = userData;

//       localStorage.setItem("idUsuario", idUsuario);

//       Swal.fire({
//         icon: 'success',
//         title: 'Bienvenido',
//         text: `Bienvenido, su correo es: ${correo}.`
//       });

//       navigate("/alumnos");
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: 'Error al iniciar sesión.'
//       });
//     }
//   };


  
  return (
    <div className="login-page">
      <div className="auth_main">
        <input type="checkbox" id="auth_chk" aria-hidden="true" />


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

        {/* <div className="auth_aspirante">
          <form>
            <label htmlFor="auth_chk" aria-hidden="true" className="auth_label">Aspirante</label>
            <input
              type="email"
              name="correo"
              placeholder="Correo"
              value={correo}
              onChange={(event) => setCorreo(event.target.value)}
              className="auth_input"
              required
            />
            <input
              type="password"
              name="pswd"
              placeholder="Contraseña"
              value={curp}
              onChange={(event) => setCurp(event.target.value)}
              className="auth_input"
              required
            />
            <button type="button" onClick={iniciosesionAspirante} className="auth_button">In iciar sesión</button>
          </form>
        </div> */}
      </div>
    </div>
  );
}

export default Login;