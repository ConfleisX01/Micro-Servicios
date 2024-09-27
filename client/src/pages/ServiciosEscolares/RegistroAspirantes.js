import Card from 'react-bootstrap/Card';

export default function RegistroAspirantes() {
    const periods = [
        {
            nombrePeriodo: 'Periodo Enero',
            descripcionPeriodo: 'Descripcion del periodo 1',
            estatus: true
        },
        {
            nombrePeriodo: 'Periodo Febrero',
            descripcionPeriodo: 'Descripcion del periodo 1',
            estatus: true
        },
        {
            nombrePeriodo: 'Periodo Marzo',
            descripcionPeriodo: 'Descripcion del periodo 1',
            estatus: true
        },
        {
            nombrePeriodo: 'Periodo Abril',
            descripcionPeriodo: 'Descripcion del periodo 1',
            estatus: true
        },
        {
            nombrePeriodo: 'Periodo Mayo',
            descripcionPeriodo: 'Descripcion del periodo 1',
            estatus: true
        }
    ]

    return (
        <>
            <div className="container-fluid">
                <h2>Registro de aspirantes</h2>
            </div>
            <div className='container-fluid d-flex'>
                {
                    periods.map((period, index) => {
                        return (
                            <PeriodCard
                                key={index}
                                nombrePeriodo={period.nombrePeriodo}
                                descripcionPeriodo={period.descripcionPeriodo}
                                estatus={period.estatus}
                            />
                        )
                    })
                }
            </div>
        </>
    )
}

function PeriodCard({ nombrePeriodo, descripcionPeriodo, estatus }) {
    return (
        <Card className='m-2' style={{ width: '18rem', marginBottom: '1rem' }}>
            <Card.Body>
                <Card.Title>{nombrePeriodo}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                    {estatus ? "Periodo Abierto" : "Periodo Cerrado"}
                </Card.Subtitle>
                <Card.Text>{descripcionPeriodo}</Card.Text>
            </Card.Body>
            <Card.Footer className='text-center'>
                <button className='btn btn-info'>Registrarse en este periodo</button>
            </Card.Footer>
        </Card>
    );
}