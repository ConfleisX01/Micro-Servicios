import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function ResultadosBecas() {
    const [becasA, setStatusBecas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda

    // Función para obtener la información de becas
    const fetchInfoBecas = async () => {
        try {
            const response = await axios.get(`https://mmmv979p-5000.usw3.devtunnels.ms/api/info_becas`);
            const becasAceptadas = response.data.filter(beca => beca.estatus === 2);
            setStatusBecas(becasAceptadas);
        } catch (error) {
            console.error("Error al obtener el estatus de las becas", error);
            setError("Error al cargar los resultados de las becas.");
        } finally {
            setLoading(false);
        }
    };

    // useEffect para cargar los datos cuando el componente se monta
    useEffect(() => {
        fetchInfoBecas();
    }, []);

    // Filtrar los resultados de las becas con base en el término de búsqueda
    const filteredBecas = becasA.filter(beca => 
        beca.folio.toString().toLowerCase().includes(searchTerm.toLowerCase()) || 
        beca.id_usuario.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Si hay un error, mostrarlo
    if (error) {
        return <p>{error}</p>;
    }

    // Mientras está cargando, mostrar un mensaje de "Cargando..."
    if (loading) {
        return <p>Cargando resultados...</p>;
    }

    return (
        <div className="p-5">
            <div>
                <h1 className="p-2">Resultados de Becas</h1>
            </div>

            {/* Campo de búsqueda para filtrar resultados */}
            <Form.Group controlId="search" className="mb-3">
                <Form.Control 
                    type="text" 
                    placeholder="Buscar por folio o matrícula de alumno..." 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                />
            </Form.Group>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Folio</th>
                        <th>Matrícula Alumno</th>
                        <th>Resultado</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBecas.length > 0 ? (
                        filteredBecas.map((beca, index) => (
                            <tr key={index}>
                                <td>{beca.folio}</td>
                                <td>{beca.id_usuario}</td>
                                <td className="text-center">
                                    <Button variant="success">
                                        Beca aceptada
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className="text-center">No se encontraron resultados</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}
