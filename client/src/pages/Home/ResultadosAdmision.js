import Table from 'react-bootstrap/Table'

export default function ResultadosAdminision() {
    const data = [
        { nombre: "Juan", estatus: false },
        { nombre: "Robe", estatus: true },
        { nombre: "Trokers", estatus: false }
    ]

    const mostrarInformacion = (index) => {
        const aspirante = data[index]
        alert(aspirante.estatus ? "Fuiste acpetado. Felicidades!!!" : "Intentalo la proxima convocatoria")
    }

    return (
        <>
            <Table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Estatus</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((aspirante, index) => {
                            return (
                                <tr>
                                    <td>{aspirante.nombre}</td>
                                    <td>{aspirante.estatus ? "Fuiste Aceptado" : "Fuiste Rechazado"}</td>
                                    <td><button className='btn btn-outline-info' onClick={
                                        () => mostrarInformacion(index)
                                    }>Informacion</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}