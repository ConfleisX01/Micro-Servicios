import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Home() {
    return (
        <Navbar expand='lg' className='border shadow-sm'>
            <Container>
                <Navbar.Brand>
                    SNCM
                </Navbar.Brand>
                <Navbar.Toggle aria-controls='basic-navbar-nav' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='mb-auto'>
                        <Nav.Link>Resultados</Nav.Link>
                        <Nav.Link>Registros</Nav.Link>
                        <Nav.Link>Inicio de sesión</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}