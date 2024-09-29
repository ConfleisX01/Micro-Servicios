import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link, Outlet } from 'react-router-dom';

export default function RegistroAspirantes() {
    const [periods, setPeriods] = useState([])

    const getAllPeriods = () => {
        axios.get('http://localhost:3001/servicios_escolares/listPeriods')
            .then(function (response) {
                setPeriods(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        getAllPeriods()
    }, [])

    return (
        <>
            <div className="container-fluid">
                <p className='fw-bold'>Registro de nuevos aspirantes</p>
            </div>
            <div className='container-fluid row'>
                <div className='col-md-6'>
                    {
                        periods.map((period, index) => {
                            return (
                                period.estatus ?
                                    <PeriodCard
                                        key={index}
                                        nombrePeriodo={period.nombre_periodo}
                                        descripcionPeriodo={period.descripcion}
                                        estatus={period.estatus}
                                        id_periodo={period.id_periodo}
                                    /> :
                                    null
                            )
                        })
                    }
                </div>
                <div className='col-md-6'>
                    <Outlet />
                </div>
            </div>
        </>
    )
}

function PeriodCard({ nombrePeriodo, descripcionPeriodo, estatus, id_periodo }) {
    return (
        <Card className='m-2 shadow-sm' style={{ width: 'auto', marginBottom: '1rem' }}>
            <Card.Body>
                <Card.Title>{nombrePeriodo}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                    {estatus ? "Periodo Abierto" : "Periodo Cerrado"}
                </Card.Subtitle>
                <Card.Text>{descripcionPeriodo}</Card.Text>
            </Card.Body>
            <Card.Footer className='text-center'>
                <Link to={`/registro_aspirantes/formulario_registro/${id_periodo}`}>Registrarse en este periodo</Link>
            </Card.Footer>
        </Card>
    );
}