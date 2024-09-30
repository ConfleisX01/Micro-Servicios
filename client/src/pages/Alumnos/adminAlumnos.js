
import Nav from 'react-bootstrap/Nav';
import { Outlet } from 'react-router-dom';
import NavigationAlumnos from '../../components/Nav/NavigationAlumnos';

export default function ServicesAlumnos() {
    const links = [
        { label: 'Solicitud de becas', route: '/alumnos/regsitro_becas' }
    ];

    return (
        <div>
            <NavigationAlumnos>
                {links.map((link, index) => (
                    <Nav.Link
                        as="a"
                        href={link.route}
                        key={index}
                    >
                        {link.label}
                    </Nav.Link>
                ))}
            </NavigationAlumnos>

            <div>
                <Outlet />
            </div>
        </div>
    );
}