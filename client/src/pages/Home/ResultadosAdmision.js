import axios from 'axios'
import { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'

export default function ResultadosAdminision() {
    const [applicantList, setApplicantList] = useState([])

    const getApplicantsList = () => {
        axios.get('https://qdffwxc1-3001.usw3.devtunnels.ms/servicios_escolares/getApplicants')
            .then(function (response) {
                setApplicantList(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    useEffect(() => {
        getApplicantsList()
    }, [])

    return (
        <>
            <div>
                <h2>Resultados de admision</h2>
            </div>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Telefono</th>
                        <th>Periodo</th>
                        <th>Carrera Deseada</th>
                        <th>Estatus</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        applicantList.map((aspirante, index) => {
                            return (
                                <tr>
                                    <td>{aspirante.nombre_aspirante}</td>
                                    <td>{aspirante.telefono_aspirante}</td>
                                    <td>{aspirante.nombre_periodo}</td>
                                    <td>{aspirante.carrera_aspirante}</td>
                                    <td>{
                                        aspirante.estatus_aspirante === 'A' ? (
                                            <p className='fw-bold text-success'>Aspirante Aceptado</p>
                                        ) : aspirante.estatus_aspirante === 'R' ? (
                                            <p className='fw-bold text-danger'>Aspirante Rechazado</p>
                                        ) : (
                                            null
                                        )
                                    }</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}