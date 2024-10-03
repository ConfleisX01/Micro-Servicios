import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function Welcome() {
    const options = [
        {
            image: "https://img.freepik.com/foto-gratis/amigos-corriendo-sala-universidad_23-2147679019.jpg?t=st=1727647125~exp=1727650725~hmac=4ebd85eef996b2f316329af76c13e0cc68bf74dc19ca61a31b58f63e7ccb6d7d&w=1380",
            title: "Resultados de admisión",
            text: "Consulta los resultados de admisión de los diferentes periodos.",
            link: "/resultados_admision"
        },
        {
            image: "https://img.freepik.com/foto-gratis/estudiantes-desconcertados-biblioteca_23-2147678902.jpg?t=st=1727648177~exp=1727651777~hmac=98569786143091252892cd0c855943826ab6a5065754748ada2a0b77e6200b90&w=1380",
            title: "Inicio de sesión",
            text: "Accede al sistema para el personal de la institución.",
            link: "/login"
        },
        {
            image: "https://img.freepik.com/foto-gratis/nina-sonriente-biblioteca_23-2147678806.jpg?t=st=1727648275~exp=1727651875~hmac=e381527b3a5fd2eba8f72f08dc621cd4687e6154a41c03baae4f31676103a46d&w=1380",
            title: "Registro de aspirantes",
            text: "Consulta los periodos disponibles para el registro de nuevos aspirantes.",
            link: "/registro_aspirantes"
        },
        {
            image: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/D3E5GKMSXFD5FNDWDOL2YDKVLI.jpeg",
            title: "Resultados de becas 2024",
            text: "Revisa los resultados del proceso de becas para 2024.",
            link: "/resultados_becas"
        }
    ]

    return (
        <>
            <div className="container-fluid text-center p-4">
                <div className="row">
                    {
                        options.map((period, index) => {
                            return (
                                <CardInfo key={index}
                                    image={period.image}
                                    title={period.title}
                                    text={period.text}
                                    link={period.link}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

function CardInfo({ image, title, text, link }) {
    return (
        <div className='col-md-3 d-flex p-1'>
            <Card style={{ width: 'auto' }}>
                <Card.Img className='img-responsive' src={image} />
                <Card.Body>
                    <Card.Title className='text-start fw-bold'>{title}</Card.Title>
                    <Card.Text className='text-start'>{text}</Card.Text>
                    <div className='text-end'>
                        <Button variant='outline-info' href={link}>Abrir</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}