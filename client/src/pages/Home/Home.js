import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

import { Outlet } from 'react-router-dom'

export default function Home() {
    return (
        <>
            <div className='container-fluid p-0'>
                <Navbar expand='lg' className='border shadow-sm'>
                    <Container>
                        <Navbar.Brand>
                            SNCM
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls='basic-navbar-nav' />
                        <Navbar.Collapse id='basic-navbar-nav'>
                            <Nav className='mb-auto'>
                                <Nav.Link>Resultados</Nav.Link>
                                <Nav.Link href='/registro_aspirantes'>Registros de nuevos aspirantes</Nav.Link>
                                <Nav.Link href='/login'>Inicio de sesión</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
            <div className='container-fluid'>
                <Outlet />
            </div>
        </>
    )
}