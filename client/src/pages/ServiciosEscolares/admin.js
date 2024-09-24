import Navigation from "../../components/Nav/Navigation"
import Nav from 'react-bootstrap/Nav';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import Inscripcion from "./inscripcion";
import Resultados from "./resultados";

export default function Services() {
    const links = [
        { label: 'Periodos de inscripción', route: '/periodos_inscripcion' },
        { label: 'Validación de resultados', route: '/resultados' },
    ]

    return (
        <BrowserRouter>
            <Navigation>
                {links.map((link, index) => (
                    <Nav.Link as={Link}
                        to={link.route}
                        key={index}
                    >
                        {link.label}
                    </Nav.Link>
                ))}
            </Navigation>
            <Routes>
                <Route path="/periodos_inscripcion" element={<Inscripcion />} />
                <Route path="/resultados" element={<Resultados />} />
            </Routes>
        </BrowserRouter>
    )
}