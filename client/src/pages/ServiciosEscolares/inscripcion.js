import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"

export default function Inscripcion() {
    return (
        <div className="p-2">
            <div className="mb-3">
                <h2>Periodos de inscripción</h2>
            </div>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Nombre del periodo</Form.Label>
                    <Form.Control className="mb-4" type="text" placeholder="Ingresa el nombre del periodo" />
                    <Form.Label>Descripción</Form.Label>
                    <Form.Control className="mb-4" type="text" placeholder="Ingresa la descaripcion" />
                    <Form.Label>Estatus del periodo</Form.Label>
                    <Form.Check
                        type="switch"
                        id="estatus-switch"
                        label="Inactivo / Activo"
                    />
                    <div className="container-fluid p-0 my-4">
                        <Button>Guardar</Button>
                    </div>
                </Form.Group>
            </Form>
        </div>
    )
}

