import Navigation from "../../components/Nav/Navigation";
import Nav from 'react-bootstrap/Nav';
import { Outlet } from 'react-router-dom';

export default function Services() {
    const links = [
        { label: 'Periodos de inscripción', route: '/servicios-escolares/periodos_inscripcion' },
        { label: 'Validación de resultados', route: '/servicios-escolares/resultados' },
    ];

    return (
        <div>
            <Navigation>
                {links.map((link, index) => (
                    <Nav.Link
                        as="a"
                        href={link.route}
                        key={index}
                    >
                        {link.label}
                    </Nav.Link>
                ))}
            </Navigation>

            <div>
                <Outlet />
            </div>
        </div>
    );
}
