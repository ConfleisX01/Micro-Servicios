import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Rcalificaiones() {
  const [grupos, setGrupos] = useState([]);
  const [selectedGrupo, setSelectedGrupo] = useState(null);
  const [alumnos, setAlumnos] = useState([]);
  const [newCalificaciones, setNewCalificaciones] = useState({}); // Nuevo estado para calificaciones





  
  // Llamada a la API para obtener los grupos
  useEffect(() => {
    axios.get('https://srwzfnp0-3001.usw3.devtunnels.ms/grupos')
      .then(response => {
        setGrupos(response.data); // Guarda los grupos en el estado
      })
      .catch(error => {
        console.error('Error al obtener los grupos:', error);
      });
  }, []);

  // Llamada a la API para obtener los alumnos cuando se selecciona un grupo
  const handleGrupoSelect = (id_grupo) => {
    axios.get(`https://srwzfnp0-3001.usw3.devtunnels.ms/grupo/${id_grupo}`)
      .then(response => {
        setSelectedGrupo(id_grupo);
        setAlumnos(response.data.alumnos); // Guarda los alumnos en el estado
        setNewCalificaciones({}); // Reinicia las calificaciones al cambiar de grupo
      })
      .catch(error => {
        console.error('Error al obtener los alumnos:', error);
      });
  };

  // Manejar la inserción de calificaciones
  const handleInputChange = (id_alumno, index, value) => {
    setNewCalificaciones({
      ...newCalificaciones,
      [id_alumno]: {
        ...newCalificaciones[id_alumno],
        [index]: value
      }
    });
  };

  const handleSaveCalificaciones = (id_alumno) => {
    const calificaciones = Object.values(newCalificaciones[id_alumno] || {}).map((cal, index) => ({
      calificacion: cal,
      periodo: `Periodo ${index + 1}`, // Asigna periodos por defecto
      comentario: 'Sin comentario'     // Asigna un comentario por defecto
    }));
  
    // Revisa los datos antes de enviarlos
    console.log({
      id_alumno,
      id_grupo: selectedGrupo,
      calificaciones
    });
  
    // Llamada a la API para insertar calificaciones
    axios.post('https://srwzfnp0-3001.usw3.devtunnels.ms/insertCalificacion', {
      id_alumno,
      id_grupo: selectedGrupo,
      calificaciones
    })
    .then(response => {
      alert('Calificaciones guardadas exitosamente');
    })
    .catch(error => {
      console.error('Error al insertar calificaciones:', error);
    });
  };
  

  return (
    <div className="container mt-5">
      <h1>REGISTRO DE CALIFICACIONES </h1>
      <h2 className="mb-4">Selecciona un grupo</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID Grupo</th>
            <th>Nombre del Grupo</th>
            <th>ID Profesor</th>
            <th>Seleccionar</th>
          </tr>
        </thead>
        <tbody>
          {grupos.map((grupo) => (
            <tr key={grupo.id_grupo}>
              <td>{grupo.id_grupo}</td>
              <td>{grupo.nombre_grupo}</td>
              <td>{grupo.id_profesor}</td>
              <td>
                <button className="btn btn-primary" onClick={() => handleGrupoSelect(grupo.id_grupo)}>
                  Ver alumnos
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedGrupo && (
        <>
          <h2 className="mt-5">Alumnos del grupo {selectedGrupo}</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Nombre del Alumno</th>
                <th>Calificación 1</th>
                <th>Calificación 2</th>
                <th>Calificación 3</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {alumnos.map((alumno) => (
                <tr key={alumno.id_alumno}>
                  <td>{alumno.nombre}</td>
                  <td>
                    <input
                      type="number"
                      value={newCalificaciones[alumno.id_alumno]?.[0] || ''}
                      onChange={(e) => handleInputChange(alumno.id_alumno, 0, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newCalificaciones[alumno.id_alumno]?.[1] || ''}
                      onChange={(e) => handleInputChange(alumno.id_alumno, 1, e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={newCalificaciones[alumno.id_alumno]?.[2] || ''}
                      onChange={(e) => handleInputChange(alumno.id_alumno, 2, e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-success"
                      onClick={() => handleSaveCalificaciones(alumno.id_alumno)}
                    >
                      Guardar Calificaciones
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
