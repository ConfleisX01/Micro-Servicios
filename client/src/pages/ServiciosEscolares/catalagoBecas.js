import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'; // Importar el componente Button de Bootstrap
import axios from 'axios';

export default function CatalogoBecas() {
    const [becas, setBecas] = useState([]);  // Estado para almacenar las becas
    const [loading, setLoading] = useState(true);  // Estado para controlar si está cargando

    useEffect(() => {
        // Función que carga las becas desde la API
        const fetchBecas = async () => {
            try {
                const response = await axios.get('https://mmmv979p-5000.usw3.devtunnels.ms/api/becas');  // Petición a la API
                setBecas(response.data);  // Guardamos los datos en el estado
                setLoading(false);  // Dejamos de mostrar el estado de cargando
            } catch (error) {
                console.error("Error fetching becas:", error);
                setLoading(false);  // Dejamos de mostrar el estado de cargando en caso de error
            }
        };

        fetchBecas();
    }, []);  // El array vacío significa que este useEffect se ejecuta al montar el componente

    const toggleEstatus = async (becaId, currentStatus) => {
        console.log(becaId);
        try {
            const newStatus = currentStatus === 1 ? 0 : 1;  // Cambiar estatus de activo a inactivo o viceversa
            await axios.put(`https://mmmv979p-5000.usw3.devtunnels.ms/api/becas/${becaId}`, { estatus: newStatus });  // Petición PUT a la API para actualizar el estatus
            setBecas(prevBecas =>
                prevBecas.map(beca =>
                    beca.id === becaId ? { ...beca, estatus: newStatus } : beca
                )
            );  // Actualizar el estado local de becas
        } catch (error) {
            console.error("Error updating beca status:", error);
        }
    };

    if (loading) {
        return <p>Cargando becas...</p>;  // Mostramos un mensaje mientras los datos se cargan
    }

    return (
        <div className="p-5">
            <div>
                <h1 className="p-2">Catálogo de becas</h1>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Descripción</th>
                        <th>Estatus</th>
                        <th>Acciones</th> 
                    </tr>
                </thead>
                <tbody>
                    {becas.map((beca, index) => (
                        <tr key={index}>
                            <td>{beca.nombre}</td>
                            <td>{beca.descripcion}</td>
                            <td>{beca.estatus === 1 ? 'Activo' : 'Inactivo'}</td>
                            <td>
                                <Button
                                    variant={beca.estatus === 1 ? "danger" : "success"}
                                    onClick={() => toggleEstatus(beca.id, beca.estatus)}>
                                    {beca.estatus === 1 ? 'Desactivar' : 'Activar'}
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
