import Navigation from "../../components/Nav/Navigation";
import Nav from 'react-bootstrap/Nav';
import { Outlet } from 'react-router-dom';

export default function Services() {
    const links = [
        { label: 'Períodos de inscripción', route: '/servicios_escolares/periodos_inscripcion' },
        { label: 'Validación de resultados', route: '/servicios_escolares/validacion_resultados' },
        { label: 'Catálogo de carreras', route: '/servicios_escolares/catalogo_carreras' },
        { label: 'Catálogo de registro de grupos', route: '/servicios_escolares/registro_grupos' },
        { label: 'Catálogo de becas', route: '/servicios_escolares/catalogo_becas' },
        { label: 'Validación de becas', route: '/servicios_escolares/validacion_becas' }
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
