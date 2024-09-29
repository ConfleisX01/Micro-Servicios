import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

export default function () {
    const [soliBecas, setSoliBecas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [comentarios, setComentarios] = useState({});  // Estado para almacenar los comentarios

    useEffect(() => {
        // Función que carga las becas desde la API
        const fetchBecas = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/info_becas');  // Petición a la API
                const becasFiltradas = response.data.filter(beca => beca.estatus === 1); // filtrar solo los datos con estatus 1
                setSoliBecas(becasFiltradas);  // Guardamos los datos en el estado
                setLoading(false);  // Dejamos de mostrar el estado de cargando
            } catch (error) {
                console.error("Error fetching becas:", error);
                setLoading(false);  // Dejamos de mostrar el estado de cargando en caso de error
            }
        };

        fetchBecas();
    }, []);

    // Manejar cambios en los comentarios
    const handleCommentChange = (folio, value) => {
        setComentarios({
            ...comentarios,
            [folio]: value  // Guardar el comentario para cada folio
        });
    };

    const handlerAprober = async (idBeca, Bestatus) => {
        try {
            const comen = comentarios[idBeca] || "";  // Obtener el comentario correspondiente al folio
            await axios.put(`http://localhost:5000/api/validacion_becas`, {
                id_beca: idBeca,
                estatus: Bestatus,
                comentarios: comen
            });

            // Actualizar la lista de becas filtrando la beca que se ha procesado
            setSoliBecas(prevBecas => prevBecas.filter(beca => beca.folio !== idBeca));

        } catch (error) {
            console.error("Error al validar la solicitud:", error);
            window.alert("Ya se ha validado");
        }
    };

    if (loading) {
        return <p>Cargando becas...</p>;
    }

    return (
        <div className="p-5">
            <div>
                <h1 className="p-2">Validación de Becas</h1>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Folio</th>
                        <th>Nombre</th>
                        <th>Comentarios</th>
                        <th>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {soliBecas.map((soliBeca, index) => (
                        <tr key={index}>
                            <td>{soliBeca.folio}</td>
                            <td>{soliBeca.nombre}</td>
                            <td className='text-center'>
                                {/* Campo de texto para los comentarios */}
                                <input 
                                    type="text"
                                    value={comentarios[soliBeca.folio] || ''}  // Mostrar el comentario actual
                                    onChange={(e) => handleCommentChange(soliBeca.folio, e.target.value)}  // Guardar el comentario
                                    placeholder="Escribe un comentario"
                                />
                            </td>
                            <td className="text-center">
                                <Button variant="success" className='px-3 mx-5' 
                                    onClick={() => handlerAprober(soliBeca.folio, 2)}>
                                    Validar
                                </Button>
                                <Button variant="danger" className='px-3 mx-5' 
                                    onClick={() => handlerAprober(soliBeca.folio, 3)}>
                                    Rechazar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
