import { useState } from "react"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

import axios, { Axios } from 'axios'

export default function Inscripcion() {
    const [periodName, setPeriodName] = useState('')
    const [periodDesc, setPeriodDesc] = useState('')
    const [periodStatus, setPeriodStatus] = useState(false)

    const data = {
        periodName: periodName,
        periodDesc: periodDesc,
        periodStatus: periodStatus
    }

    const savePeriod = () => {
        axios.post('http://localhost:3001/insertPeriod', {
            data
        })
            .then(function (response) {
                console.log(response)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <div className="p-2">
            <div className="mb-3">
                <h2>Periodos de inscripción</h2>
            </div>
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
    )
}