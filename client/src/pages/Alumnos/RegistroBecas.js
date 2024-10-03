import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function RegistroBecas() {
    const [becas, setBecas] = useState([]);
    const [infoBecas, setStatusBecas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBecas = async () => {
            try {
                const response = await axios.get('https://mmmv979p-5000.usw3.devtunnels.ms/api/becas');
                const becasActivas = response.data.filter(beca => beca.estatus === 1);
                setBecas(becasActivas);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching becas:", error);
                setLoading(false);
            }
        };

        const fetchInfoBecas = async (idUser) => {
            try {
                const response = await axios.get(`https://mmmv979p-5000.usw3.devtunnels.ms/api/info_becas/${idUser}`);
                const statusBecas = response.data;
                setStatusBecas(statusBecas);
            } catch (error) {
                console.error("error al obtener el estatus de las becas", error);
            }
        }


        // Obtener el idUser del Local Storage
        const idUser = localStorage.getItem('idUsuario'); // Asegúrate de que este key exista en el Local Storage

        fetchBecas();

        if (idUser) { // Verifica que idUser no sea null
            fetchInfoBecas(idUser);
        } else {
            fetchInfoBecas(1);
        }

    }, []);

    const handleRegister = async (idBeca) => {
        let idUser = localStorage.getItem('idUser');  // Usamos let para poder reasignar

        if (idUser == null) {
            idUser = 1;
        }

        console.log(idUser);
        console.log(idBeca);

        try {
            const response = await axios.post('https://mmmv979p-5000.usw3.devtunnels.ms/api/solicitud_becas', {
                id_usuario: idUser,
                id_becas: idBeca
            });
            // Mostramos el mensaje de éxito
            console.log("Registro exitoso:", response.data);
            window.alert(`Registro a beca exitoso, tu folio es: ${response.data.folio}`);

            // Actualizar el estatus de las solicitudes (GET en lugar de PUT)
            const updatedStatus = await axios.get(`https://mmmv979p-5000.usw3.devtunnels.ms/api/info_becas/${idUser}`);
            setStatusBecas(updatedStatus.data);  // Actualizamos el estado con los nuevos datos
        } catch (error) {
            console.error("Error al registrar la solicitud:", error);
            window.alert("YA EXISTE UNA SOLICITUD PARA ESA BECA")
        }
    };


    if (loading) {
        return <p>Cargando becas...</p>;
    }

    return (
        <div className="p-5">
            <div>
                <h1 className="p-2">Becas disponibles</h1>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {becas.map((beca, index) => (
                        <tr key={index}>
                            <td>{beca.nombre}</td>
                            <td>{beca.descripcion}</td>
                            <td className="text-center">
                                <Button variant="primary"
                                    onClick={() => handleRegister(beca.id)}>
                                    Registrarse
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                <div>
                    <h1 className="p-2">Estatus de solicitud</h1>
                </div>
                <div className='px-5'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Folio</th>
                                <th>Beca</th>
                                <th>Estatus</th>
                                <th>Comentarios</th>
                            </tr>
                        </thead>
                        <tbody>
                            {infoBecas.map((info, index) => (
                                <tr key={index}>
                                    <td>{info.folio}</td>
                                    <td>{info.nombre}</td>
                                    <td className="text-center">
                                        {info.estatus === 1 && ( // Estatus pendiente
                                            <Button variant="warning" disabled>Pendiente de aprobacion</Button>
                                        )}
                                        {info.estatus === 2 && ( // Estatus aprobada
                                            <Button variant="success" disabled>Beca aceptada</Button>
                                        )}
                                        {info.estatus === 3 && ( // Estatus rechazada
                                            <Button variant="secondary" disabled>Solicitud Rechazada</Button>
                                        )}
                                    </td>
                                    <td>{info.comentarios}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
