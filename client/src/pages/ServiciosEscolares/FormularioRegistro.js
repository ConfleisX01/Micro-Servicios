import { useState } from "react"
import { useParams } from "react-router-dom"

import Form from 'react-bootstrap/Form'
import Button from "react-bootstrap/Button"
import axios from "axios"

import Swal from "sweetalert2"

export default function FormularioRegistro() {
    const periodData = useParams()
    const [carres, setCarres] = useState([])

    const [applicantName, setApplicantName] = useState('')
    const [applicantEmail, setApplicantEmail] = useState('')
    const [applicantNumber, setApplicantNumber] = useState(0)
    const [applicantUser, setApplicantUser] = useState('')
    const [applicantCurp, setApplicantCurp] = useState('')
    const [applicantCareer, setApplicantCareer] = useState('')

    const data = {
        applicantName: applicantName,
        applicantEmail: applicantEmail,
        applicantNumber: applicantNumber,
        applicantUser: applicantUser,
        applicantCurp: applicantCurp,
        applicantCareer: applicantCareer,
        applicantPeriod: periodData.id_periodo
    }

    const saveApplicant = () => {
        axios.post('http://localhost:3001/servicios_escolares/saveApplicant', data)
            .then(function (response) {
                Swal.fire({
                    icon: 'success',
                    title: 'El aspirante se registro con exito',
                    footer: response.status,
                    showCloseButton: true
                })
            })
            .catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error al registrar al aspirante',
                    footer: error,
                    showCloseButton: true
                })
            })
    }

    return (
        <>
            <div>
                <p className="fw-bold">Formulario de registro</p>
            </div>
            <div>
                <Form className="row">
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese el su nombre completo"
                                onInput={(e) => setApplicantName(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Correo</Form.Label>
                            <Form.Control type="email" placeholder="correo@correo.com"
                                onInput={(e) => setApplicantEmail(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Télefono</Form.Label>
                            <Form.Control type="number" placeholder="Ingrese su numero de télefono"
                                onInput={(e) => setApplicantNumber(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Usuario</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su usuario"
                                onInput={(e) => setApplicantUser(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>CURP</Form.Label>
                            <Form.Control type="text" placeholder="Ingrese su CURP"
                                onInput={(e) => setApplicantCurp(e.target.value)} />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group>
                            <Form.Label>Carrera Deseada</Form.Label>
                            <Form.Select onChange={(e) => setApplicantCareer(e.target.value)}>
                                <option value={"Carrera 1"}>Carrera 1</option>
                                <option value={"Carrera 2"}>Carrera 2</option>
                                <option value={"Carrera 3"}>Carrera 3</option>
                            </Form.Select>
                        </Form.Group>
                    </div>
                    <div className="col-md-12 text-end my-2">
                        <Button variant="outline-info"
                            onClick={saveApplicant}>Registrar</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}