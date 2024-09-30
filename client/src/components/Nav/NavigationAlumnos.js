import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function NavigationAlumnos(props) {
  return (
    <Navbar expand="lg" className="border shadow-sm">
      <Container>
        <Navbar.Brand href="/alumnos">Alumnos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {props.children}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}