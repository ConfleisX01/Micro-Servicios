import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'

import Swal from 'sweetalert2'

import axios from 'axios'

export default function Resultados() {
    const [applicantData, setApplicantData] = useState([])

    const getApplicantsList = () => {
        axios.get('https://qdffwxc1-3001.usw3.devtunnels.ms/servicios_escolares/getApplicants')
            .then(function (result) {
                console.log(result.data)
                setApplicantData(result.data)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: "Error al obtener la lista de aplicantes",
                    text: "Intentelo mas tarde",
                    footer: error,
                    showCloseButton: true
                })
            })
    }

    const updateApplicant = (applicantStatus, applicantId) => {
        const data = {
            applicantStatus: applicantStatus,
            applicantId: applicantId
        }

        axios.post('https://qdffwxc1-3001.usw3.devtunnels.ms/servicios_escolares/updateApplicant', data)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: "El aspirante se actualizo con exito",
                    footer: response.status,
                    showCloseButton: true
                })
                getApplicantsList()
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: "Error al rechazar al aspirante",
                    text: "Intentelo mas tarde",
                    footer: error,
                    showCloseButton: true
                })
            })
    }

    useEffect(() => {
        getApplicantsList()
    }, [])

    return (
        <>
            <div className='container-fluid p-4'>
                <h5 className='text-uppercase'>Validación de resultados</h5>
                <div className="container-fluid shadow-sm border rounded">
                    <Table hover>
                        <thead>
                            <tr>
                                <th className='text-uppercase'>Nombre del aspirante</th>
                                <th className='text-uppercase'>Correo</th>
                                <th className='text-uppercase'>Télefono</th>
                                <th className='text-uppercase'>Usuario</th>
                                <th className='text-uppercase'>CURP</th>
                                <th className='text-uppercase'>Carrera Deseada</th>
                                <th className='text-uppercase'>Nombre Periodo</th>
                                <th className='text-uppercase'>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                applicantData.map((aspirante, index) => {
                                    return (
                                        <tr className='align-middle' key={index}>
                                            <td>{aspirante.nombre_aspirante}</td>
                                            <td>{aspirante.correo_aspirante}</td>
                                            <td>{aspirante.telefono_aspirante}</td>
                                            <td>{aspirante.usuario_aspirante}</td>
                                            <td>{aspirante.curp_aspirante}</td>
                                            <td>{aspirante.carrera_aspirante}</td>
                                            <td className='fw-bold'>{aspirante.nombre_periodo}</td>
                                            <td>
                                                {
                                                    aspirante.estatus_aspirante === 'A' ? (
                                                        <td className='text-success fw-bold text-uppercase'>Aspirante Aceptado</td>
                                                    ) : aspirante.estatus_aspirante === 'R' ? (
                                                        <td className='text-muted fw-bold text-uppercase'>Aspirante Rechazado</td>
                                                    ) : aspirante.estatus_aspirante === 'P' ? (
                                                        <div className='d-flex'>
                                                            <Button className='mx-1' variant='outline-success'
                                                                onClick={() => updateApplicant('A', aspirante.id_aspirante)}>Aceptar</Button>
                                                            <Button className='mx-1' variant='outline-danger'
                                                                onClick={() => updateApplicant('R', aspirante.id_aspirante)}>Rechazar</Button>
                                                        </div>
                                                    ) : (
                                                        null
                                                    )
                                                }

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    )
}