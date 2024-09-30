import { useState, useEffect } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Table from "react-bootstrap/Table"

import Swal from "sweetalert2"

import axios, { Axios } from 'axios'

export default function Inscripcion() {
    const [periodName, setPeriodName] = useState('')
    const [periodDesc, setPeriodDesc] = useState('')
    const [periodStatus, setPeriodStatus] = useState(false)

    const [periodData, setPeriodData] = useState([])

    useEffect(() => {
        getPeriodsList()
    }, [])

    const data = {
        periodName: periodName,
        periodDesc: periodDesc,
        periodStatus: periodStatus
    }

    const getPeriodsList = () => {
        axios.get('http://localhost:3001/servicios_escolares/listPeriods')
            .then(function (response) {
                setPeriodData(response.data)
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: "Error al obtener los periodos registrados",
                    text: "Intentelo nuevamente mas tarde",
                    showCloseButton: true
                })
            })
    }

    const closePeriod = (idPeriod) => {
        const data = {
            idPeriod: idPeriod
        }

        axios.post('http://localhost:3001/servicios_escolares/closePeriod', data)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: "Periodo cerrado con exito",
                    showCloseButton: true,
                    footer: response.status
                })
                getPeriodsList()
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: "Error al cerrar el periodo deseado",
                    text: "Intentelo nuevamente mas tarde",
                    showCloseButton: true
                })
            })
    }

    const savePeriod = () => {
        axios.post('http://localhost:3001/servicios_escolares/insertPeriod', {
            data
        })
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: "Registro creado con exito",
                    showCloseButton: true,
                    footer: response.status
                })
                getPeriodsList()
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: "Error al crear el nuevo periodo",
                    text: "Intentelo nuevamente mas tarde",
                    showCloseButton: true
                })
            })
    }

    return (
        <div className="p-2">
            <div className="mb-3">
                <h2>Periodos de inscripción</h2>
            </div>
            <div className="container-fluid row">
                <div className="col-md-6">
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre del periodo</Form.Label>
                            <Form.Control className="mb-4" type="text" placeholder="Ingresa el nombre del periodo" onInput={
                                (e) => setPeriodName(e.target.value)
                            } />
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control className="mb-4" type="text" placeholder="Ingresa la descaripcion" onInput={
                                (e) => setPeriodDesc(e.target.value)
                            } />
                            <Form.Label>Estatus del periodo</Form.Label>
                            <Form.Check
                                type="switch"
                                id="estatus-switch"
                                label={periodStatus ? "Activo" : "Inactivo"}
                                onChange={(e) => setPeriodStatus(e.target.checked)}
                            />
                            <div className="container-fluid p-0 my-4">
                                <Button onClick={savePeriod}>Guardar</Button>
                            </div>
                        </Form.Group>
                    </Form>
                </div>
                <div className="col-md-6">
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th>Nombre del periodo</th>
                                <th>Descripcion del periodo</th>
                                <th>Estatus del periodo</th>
                                <th>Acciones del periodo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                periodData.map((period, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{period.nombre_periodo}</td>
                                            <td>{period.descripcion}</td>
                                            <td>{period.estatus ? "Periodo Abierto" : "Periodo Cerrado"}</td>
                                            <td>{period.estatus ? <button className="btn btn-danger"
                                                onClick={() => closePeriod(period.id_periodo)}>Cerrar Periodo</button> :
                                                <button className="btn btn-outline-dark disabled">Sin acciones</button>}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </div>
    )
}