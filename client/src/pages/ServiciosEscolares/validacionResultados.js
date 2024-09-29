import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

export default function Resultados() {

    const data = [
        {
            nombre: "Juan Pablo Perez Fernandez",
            correo: "juan@gmail.com",
            telefono: "123456789",
            usuario: "confleis",
            curp: "CURPERRON",
            carrera: "Desarrollo y gestion de software"
        },
        {
            nombre: "Alejandra Hernandez Sauceda",
            correo: "ale@gmail.com",
            telefono: "123456789",
            usuario: "nosegit",
            curp: "CURPERRON",
            carrera: "Desarrollo y gestion de software"
        },
        {
            nombre: "Alonso Villaseñor",
            correo: "alonso@gmail.com",
            telefono: "123456789",
            usuario: "MARV",
            curp: "CURPERRON",
            carrera: "Desarrollo y gestion de software"
        },
        {
            nombre: "Luis Roberto Garcia",
            correo: "robe@gmail.com",
            telefono: "123456789",
            usuario: "robe",
            curp: "CURPERRON",
            carrera: "Desarrollo y gestion de software"
        },
        {
            nombre: "Antonio Cordova Leos",
            correo: "trokers@gmail.com",
            telefono: "123456789",
            usuario: "Trokers",
            curp: "CURPERRON",
            carrera: "Desarrollo y gestion de software"
        },
    ]

    return (
        <>
            <div className="container-fluid p-2">
                <Table striped hover>
                    <thead>
                        <tr>
                            <th>Nombre del aspirante</th>
                            <th>Correo</th>
                            <th>Télefono</th>
                            <th>Usuario</th>
                            <th>CURP</th>
                            <th>Carrera Deseada</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((aspirante, index) => {    
                                return (
                                    <tr className='align-middle'>
                                        <td>{aspirante.nombre}</td>
                                        <td>{aspirante.correo}</td>
                                        <td>{aspirante.telefono}</td>
                                        <td>{aspirante.usuario}</td>
                                        <td>{aspirante.curp}</td>
                                        <td>{aspirante.carrera}</td>
                                        <td>
                                            <div className='d-flex'>
                                                <Button className='mx-1' variant='outline-success'>Aceptar</Button>
                                                <Button className='mx-1' variant='outline-danger'>Rechazar</Button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}