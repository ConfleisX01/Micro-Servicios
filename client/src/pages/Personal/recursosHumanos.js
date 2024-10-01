import '../../App.css';
import Nav from 'react-bootstrap/Nav'
import CloseButton from 'react-bootstrap/CloseButton';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import logo from '../Personal/img/imgLogo.png';
import icon_logout from '../Personal/img/icon_logout.png';
import icon_ojo from '../Personal/img/icon_ojo.png';
import icon_activar from '../Personal/img/icon_activar.png';
import icon_opcion from '../Personal/img/icon_opcion.png';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import icon_editar from '../Personal/img/icon_editar.png';
import icon_delete from '../Personal/img/icon_delete.png';
import flecha from '../Personal/img/icon_flecha.png';
import iconRegistrar from '../Personal/img/icon_registrar.png';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
let rutaRH = '../Personal/img/recursosHumanos.js';

export default function RecursosHumanos() {
    const [profesores, setProfesores] = useState([]);
    const [isModalOpenRegistrar, setIsModalOpenRegistrar] = useState(false);
    const [isModalOpenOpcionesActivo, setIsModalOpenOpcionesActivo] = useState(false);
    const [isModalOpenOpcionesInactivo, setIsModalOpenOpcionesInactivo] = useState(false);
    const [isModalOpenVerDetalles, setIsModalOpenVerDetalles] = useState(false);
    const [isModalOpenVerEditar, setIsModalOpenVerEditar] = useState(false);
    const [nombreEmpleado, setNombreEmpleado] = useState('');
    const [apellidoPaternoEmpleado, setApellidoPaternoEmpleado] = useState('');
    const [apellidoMaternoEmpleado, setApellidoMaternoEmpleado] = useState('');
    const [correoEmpleado, setCorreoEmpleado] = useState('');
    const [telefonoEmpleado, setTelefonoEmpleado] = useState('');
    const [curpEmpleado, setCurpEmpleado] = useState('');
    const [fechaIngresoEmpleado, setFechaIngresoEmpleado] = useState('');
    const [nombreAreaEmpleado, setNombreAreaEmpleado] = useState('RH');
    const [areaEmpleado, setAreaEmpleado] = useState('');
    const [contratoEmpleado, setContratoEmpleado] = useState('');
    const [estatusEmpleado, setEstatusEmpleado] = useState('');
    const [numeroEmpleado, setNumeroEmpleado] = useState(0);
    const [titulo, setTitulo] = useState(nombreAreaEmpleado === 'RH' ? "Recursos Humanos" : "No identificado");

    const llenarDatosCelda = (profesor) => {
        setNumeroEmpleado(profesor.numeroEmpleado);
        setNombreEmpleado(profesor.nombreEmpleado);
        setApellidoPaternoEmpleado(profesor.apellidoPaternoEmpleado);
        setApellidoMaternoEmpleado(profesor.apellidoMaternoEmpleado);
        setCorreoEmpleado(profesor.correoEmpleado);
        setTelefonoEmpleado(profesor.telefonoEmpleado);
        setCurpEmpleado(profesor.curpEmpleado);
        setFechaIngresoEmpleado(profesor.fechaIngresoEmpleado);
        setNombreAreaEmpleado(profesor.nombreAreaEmpleado);
        setTitulo('Recursos Humanos');
        setAreaEmpleado(profesor.areaEmpleado);
        setContratoEmpleado(profesor.contratoEmpleado);
        setEstatusEmpleado(profesor.estatusEmpleado);
        if (profesor.estatusEmpleado === 1)
            toggleModalOpcionesActivo();
        if (profesor.estatusEmpleado === 0)
            toggleModalOpcionesInactivo();
    }

    const asignarTitulo = (titulos) => {
        if (titulos === 'P')
            setTitulo('Profesor');
        if (titulos === 'RH')
            setTitulo('Recursos Humanos');
        if (titulos === 'SE')
            setTitulo('Servicios Escolares');
        if (titulos === 'I')
            setTitulo('Informática');
        setNombreAreaEmpleado(titulos);
    }

    const getProfesores = () => {
        axios.get('https://82465d5v-3001.usw3.devtunnels.ms/empleado/getAllEmpleadosRecursosHumanos')
            .then(function (response) {
                console.log(response);
                setProfesores(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const verDetallesProfesorActivo = () => {
        toggleModalOpcionesActivo();
        toggleModalVerDetalles();
    }

    const verEditarProfesorActivo = () => {
        toggleModalOpcionesActivo();
        toggleModalVerEditar();
    }

    const eliminarProfesor = () => {
        showSwalConfirmar();
    }

    const verDetallesProfesorInactivo = () => {
        toggleModalOpcionesInactivo();
        toggleModalVerDetalles();
    }

    const verEditarProfesorInactivo = () => {
        toggleModalOpcionesInactivo();
        toggleModalVerEditar();
    }

    const activarProfesor = () => {
        showSwalConfirmarDelete();
    }

    const showSwalConfirmar = () => {
        withReactContent(Swal).fire({
            title: `¿Está seguro de Esto?, Esta acción es irreversible!`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteProfesor();
            }
        })
    }

    const showSwalCerrarSesion = () => {
        withReactContent(Swal).fire({
            title: `¿Estas seguro de cerrar sesión?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
        }).then(async (result) => {
            if (result.isConfirmed) {
                window.location.href = '/login'
            }
        })
    }   

    const showSwalConfirmarDelete = () => {
        withReactContent(Swal).fire({
            title: `¿Está seguro de Esto?, Esta acción es irreversible!`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Si",
        }).then(async (result) => {
            if (result.isConfirmed) {
                activateProfesor();
            }
        })
    }

    const showSwalRealizado = () => {
        withReactContent(Swal).fire({
            position: "center",
            icon: "success",
            title: "¡¡Acción Realizada Exitosamente!!",
            showConfirmButton: false,
            timer: 3000
        })
    }

    const showSwalActualizado = () => {
        withReactContent(Swal).fire({
            position: "center",
            icon: "success",
            title: "¡¡Datos del Empleado Actualizados Exitosamente!!",
            showConfirmButton: false,
            timer: 3000
        })
    }

    const insertProfesor = () => {
        const data = {
            nombreEmpleado: nombreEmpleado,
            apellidoPaternoEmpleado: apellidoPaternoEmpleado,
            apellidoMaternoEmpleado: apellidoMaternoEmpleado,
            correoEmpleado: correoEmpleado,
            telefonoEmpleado: telefonoEmpleado,
            curpEmpleado: curpEmpleado,
            nombreAreaEmpleado: 'RH',
            areaEmpleado: areaEmpleado,
            contratoEmpleado: contratoEmpleado
        };

        axios.post('https://82465d5v-3001.usw3.devtunnels.ms/empleado/insertEmpleado', {
            data
        }).then(function (response) {
            limpiarFormulario();
            showSwalRealizado();
            setTimeout(() => {
                window.location.reload();
            }, 3100);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const updateProfesor = () => {
        console.log('departamento' + nombreAreaEmpleado);
        const data = {
            numeroEmpleado: numeroEmpleado,
            nombreEmpleado: nombreEmpleado,
            apellidoPaternoEmpleado: apellidoPaternoEmpleado,
            apellidoMaternoEmpleado: apellidoMaternoEmpleado,
            correoEmpleado: correoEmpleado,
            telefonoEmpleado: telefonoEmpleado,
            curpEmpleado: curpEmpleado,
            nombreAreaEmpleado: nombreAreaEmpleado,
            areaEmpleado: areaEmpleado,
            contratoEmpleado: contratoEmpleado
        };

        axios.post('https://82465d5v-3001.usw3.devtunnels.ms/empleado/updateEmpleado', {
            data
        }).then(function (response) {
            limpiarFormulario();
            showSwalActualizado();
            setTimeout(() => {
                window.location.reload();
            }, 3100);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const deleteProfesor = () => {
        axios.post('https://82465d5v-3001.usw3.devtunnels.ms/empleado/deleteEmpleado', {
            numeroEmpleado
        }).then(function (response) {
            showSwalRealizado();
            setTimeout(() => {
                window.location.reload();
            }, 3100);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const activateProfesor = () => {
        axios.post('https://82465d5v-3001.usw3.devtunnels.ms/empleado/activateEmpleado', {
            numeroEmpleado
        }).then(function (response) {
            showSwalRealizado();
            setTimeout(() => {
                window.location.reload();
            }, 3100);
        }).catch(function (error) {
            console.log(error);
        })
    }

    const limpiarFormulario = () => {
        setNombreEmpleado("");
        setApellidoPaternoEmpleado("");
        setApellidoMaternoEmpleado("");
        setCorreoEmpleado("");
        setTelefonoEmpleado("");
        setCurpEmpleado("");
        setNombreAreaEmpleado("");
        setAreaEmpleado("");
        setContratoEmpleado("");
    };

    const toggleModal = () => {
        limpiarFormulario();
        setIsModalOpenRegistrar(!isModalOpenRegistrar);
    };
    const toggleModalOpcionesActivo = () => {
        setIsModalOpenOpcionesActivo(!isModalOpenOpcionesActivo);
    };
    const toggleModalOpcionesInactivo = () => {
        setIsModalOpenOpcionesInactivo(!isModalOpenOpcionesInactivo);
    };
    const toggleModalVerDetalles = () => {
        setIsModalOpenVerDetalles(!isModalOpenVerDetalles);
    };
    const toggleModalVerEditar = () => {
        setIsModalOpenVerEditar(!isModalOpenVerEditar);
    };

    useEffect(() => {
        getProfesores();
        setNombreAreaEmpleado('RH');
    }, []);

    return (
        <div className="fondo">
            <nav className="BarraNavegacion">
                <div className="contenedorBarra b1">
                    <img src={flecha} alt="Flechita" className="iconFlecha" />
                    <ul>
                        <li><a onClick={() => { window.location.reload(); }}>Recursos Humanos</a></li>
                    </ul>
                </div>
                <div className="contenedorBarra b2">
                    <img src={logo} alt="Logo" className="imgLogo" />
                </div>
                <div className="contenedorBarra b3">
                    <ul>
                        <Nav.Link href='/personal/profesores' className='liNav'>Profesores</Nav.Link>
                        <Nav.Link href='/personal/servicios_escolares' className='liNav'>Servicios Escolares</Nav.Link>
                        <Nav.Link href='/personal/informatica' className='liNav'>Informática</Nav.Link>
                    </ul>
                    <img onClick={showSwalCerrarSesion} src={icon_logout} alt="Logo" className="icon_logout" style={{width:'8%', height:'40%', marginLeft: '1em', marginRight:'1em'}}/>
                </div>
            </nav>
            <div className="contenido">
                <div className="titulo">
                    <h1>GESTIÓN DE RECURSOS HUMANOS</h1>
                </div>
            </div>
            <div className='containerBotones'>
                <div className='btn1'>
                    <a className="btnfos btnfos-4" onClick={toggleModal}><span>Registrar</span></a>
                </div>
                <div className='btn2'>
                    <input type="search" placeholder="Ingresa la palabra a buscar" id="Buscador" className='btn2' />
                </div>
            </div>
            <div className="containerTabla">
                <table>
                    <thead>
                        <tr>
                            <th>N° Empleado</th>
                            <th>Nombre</th>
                            <th>Apellidos</th>
                            <th>Area</th>
                            <th>Telefono</th>
                            <th>Estatus</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            profesores.map((profesor, index) => {
                                return (
                                    <tr key={index} onClick={() => llenarDatosCelda(profesor)}>
                                        <td>{profesor.numeroEmpleado}</td>
                                        <td>{profesor.nombreEmpleado}</td>
                                        <td>{profesor.apellidoPaternoEmpleado + ' ' + profesor.apellidoMaternoEmpleado}</td>
                                        <td>{profesor.areaEmpleado}</td>
                                        <td>{profesor.telefonoEmpleado}</td>
                                        <td>{profesor.estatusEmpleado === 1 ? "Activo" : "Inactivo"}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

            {isModalOpenRegistrar && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='headerModal'>
                            <img src={iconRegistrar} alt="icono de registro" className="imgRegistro" />
                            <h2>Registrar RH</h2>
                            <CloseButton className='close' onClick={toggleModal} />
                        </div>
                        <div className='registro1'>
                            <div style={{ width: '50%', paddingRight: '0.5em', textAlign: 'center' }}>
                                <h2 style={{ marginBottom: '1em' }}>Datos Personales</h2>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Nombre(s)
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={nombreEmpleado}
                                        onChange={(e) => setNombreEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Nombre'
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1">Apellidos</InputGroup.Text>
                                    <Form.Control
                                        value={apellidoPaternoEmpleado}
                                        onChange={(e) => setApellidoPaternoEmpleado(e.target.value)}
                                        aria-label="Apellido Paterno"
                                        placeholder='Apellido Paterno'
                                    />
                                    <Form.Control
                                        value={apellidoMaternoEmpleado}
                                        onChange={(e) => setApellidoMaternoEmpleado(e.target.value)}
                                        aria-label="Apellido Materno"
                                        placeholder='Apellido Materno'
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Correo
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={correoEmpleado}
                                        onChange={(e) => setCorreoEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Ej. correo@gmail.com'
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Telefono
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={telefonoEmpleado}
                                        onChange={(e) => setTelefonoEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Ej. 477 165 4859'
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Curp
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={curpEmpleado}
                                        onChange={(e) => setCurpEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Ej. HSTE302015USRTLSA6'
                                    />
                                </InputGroup>
                            </div>
                            <div style={{ width: '50%', paddingLeft: '0.5em', textAlign: 'center' }}>
                                <h2 style={{ marginBottom: '1em' }}>Datos De Contrato</h2>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Area
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={areaEmpleado}
                                        onChange={(e) => setAreaEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Ej. Reclutamiento'
                                    />
                                </InputGroup>
                                <InputGroup style={{ display: 'block' }}>
                                    <InputGroup.Text id="inputGroup-sizing-default" style={{ width: '100%', marginBottom: '2.5%' }} >
                                        Selecciona el tipo de contrato
                                    </InputGroup.Text>
                                    <div style={{ display: 'flex', marginBottom: '2.5%' }}>
                                        <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default" style={{ display: 'flex' }} >
                                            Contrato Base
                                        </InputGroup.Text>
                                        <Form.Check
                                            type="radio"
                                            id="contratoBase"
                                            name="contratoOptions"
                                            aria-label="Contrato base radio button"
                                            style={{ display: 'flex', marginLeft: '0.5em', marginTop: '0.5em' }}
                                            className='seleccionarRadio'
                                            onChange={() => setContratoEmpleado('B')}
                                        />
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default" style={{ display: 'flex' }}>
                                            Contrato por honorarios
                                        </InputGroup.Text>
                                        <Form.Check
                                            type="radio"
                                            id="contratoHonorario"
                                            name="contratoOptions"
                                            aria-label="Contrato por honorario radio button"
                                            style={{ display: 'flex', marginLeft: '0.5em', marginTop: '0.5em' }}
                                            className='seleccionarRadio'
                                            onChange={() => setContratoEmpleado('H')}
                                        />
                                    </div>
                                </InputGroup>
                            </div>
                        </div>
                        <div className='footerModal'>
                            <div className='btnRegistrar'>
                                <a className="btnfos btnfos-4" onClick={insertProfesor}><span>Registrar</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpenOpcionesActivo && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='headerModal'>
                            <img src={icon_opcion} alt="icono de registro" className="imgRegistro" style={{ width: '4em', height: '4em' }} />
                            <h2>Opciones RH</h2>
                            <CloseButton className='close' onClick={toggleModalOpcionesActivo} />
                        </div>
                        <div className='registro'>
                            <Card onClick={verDetallesProfesorActivo} style={{ display: 'flex', width: '18rem', margin: 'auto', padding: '2em', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={icon_ojo} style={{ display: 'flex', margin: 'auto', width: '7em', height: '7em' }} />
                                <Card.Body style={{ display: 'flex', margin: 'auto' }}>
                                    <Card.Title>Ver Detalles</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card onClick={verEditarProfesorActivo} style={{ display: 'flex', width: '18rem', margin: 'auto', padding: '2em', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={icon_editar} style={{ display: 'flex', margin: 'auto', width: '7em', height: '7em' }} />
                                <Card.Body style={{ display: 'flex', margin: 'auto' }}>
                                    <Card.Title>Editar Datos</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card onClick={eliminarProfesor} style={{ display: 'flex', width: '18rem', margin: 'auto', padding: '2em', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={icon_delete} style={{ display: 'flex', margin: 'auto', width: '7em', height: '7em' }} />
                                <Card.Body style={{ display: 'flex', margin: 'auto' }}>
                                    <Card.Title>Eliminar RH</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpenOpcionesInactivo && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='headerModal'>
                            <img src={icon_opcion} alt="icono de registro" className="imgRegistro" style={{ width: '4em', height: '4em' }} />
                            <h2>Opciones RH</h2>
                            <CloseButton className='close' onClick={toggleModalOpcionesInactivo} />
                        </div>
                        <div className='registro'>
                            <Card onClick={verDetallesProfesorInactivo} style={{ display: 'flex', width: '18rem', margin: 'auto', padding: '2em', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={icon_ojo} style={{ display: 'flex', margin: 'auto', width: '7em', height: '7em' }} />
                                <Card.Body style={{ display: 'flex', margin: 'auto' }}>
                                    <Card.Title>Ver Detalles</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card onClick={verEditarProfesorInactivo} style={{ display: 'flex', width: '18rem', margin: 'auto', padding: '2em', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={icon_editar} style={{ display: 'flex', margin: 'auto', width: '7em', height: '7em' }} />
                                <Card.Body style={{ display: 'flex', margin: 'auto' }}>
                                    <Card.Title>Editar Datos</Card.Title>
                                </Card.Body>
                            </Card>
                            <Card onClick={activarProfesor} style={{ display: 'flex', width: '18rem', margin: 'auto', padding: '2em', cursor: 'pointer' }}>
                                <Card.Img variant="top" src={icon_activar} style={{ display: 'flex', margin: 'auto', width: '7em', height: '7em' }} />
                                <Card.Body style={{ display: 'flex', margin: 'auto' }}>
                                    <Card.Title>Activar RH</Card.Title>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpenVerDetalles && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='headerModal'>
                            <img src={icon_ojo} alt="icono de registro" className="imgRegistro" style={{ width: '4em', height: '4em' }} />
                            <h2>Ver Detalles RH</h2>
                            <CloseButton className='close' onClick={toggleModalVerDetalles} />
                        </div>
                        <div className='datos'>
                            <div className='grupoDatos'>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Numero de Empleado</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{numeroEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Nombre</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{nombreEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Apellido Paterno</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{apellidoPaternoEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Apellido Materno</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{apellidoMaternoEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </div>
                            <div className='grupoDatos'>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Correo</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{correoEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Telefono</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{telefonoEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Curp</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{curpEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Fecha de ingreso</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{fechaIngresoEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </div>
                            <div className='grupoDatos3'>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Departamento</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{nombreAreaEmpleado === 'RH' ? "Recursos Humanos" : "No identificado"}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Area</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{areaEmpleado}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Tipo de Contrato</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{contratoEmpleado === 'B' ? "Base" : "Por Honorarios"}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                                <Card style={{ width: '18rem', margin: '1em' }}>
                                    <Card.Header>Estatus</Card.Header>
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>{estatusEmpleado === 1 ? "Activo" : "Inactivo"}</ListGroup.Item>
                                    </ListGroup>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {isModalOpenVerEditar && (
                <div className="modal">
                    <div className="modal-content">
                        <div className='headerModal'>
                            <img src={icon_editar} alt="icono de editar" className="imgRegistro" style={{ width: '4em', height: '4em' }} />
                            <h2>Editar RH</h2>
                            <CloseButton className='close' onClick={toggleModalVerEditar} />
                        </div>
                        <div className='registro1'>
                            <div style={{ width: '50%', paddingRight: '0.5em', textAlign: 'center' }}>
                                <h2 style={{ marginBottom: '1em' }}>Datos Personales</h2>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Numero de Empleado
                                    </InputGroup.Text>
                                    <InputGroup.Text className="datoEmpleado2" id="inputGroup-sizing-default">
                                        {numeroEmpleado}
                                    </InputGroup.Text>
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Nombre(s)
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={nombreEmpleado}
                                        onChange={(e) => setNombreEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Nombre'
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1">Apellidos</InputGroup.Text>
                                    <Form.Control
                                        value={apellidoPaternoEmpleado}
                                        onChange={(e) => setApellidoPaternoEmpleado(e.target.value)}
                                        aria-label="Apellido Paterno"
                                        placeholder='Apellido Paterno'
                                    />
                                    <Form.Control
                                        value={apellidoMaternoEmpleado}
                                        onChange={(e) => setApellidoMaternoEmpleado(e.target.value)}
                                        aria-label="Apellido Materno"
                                        placeholder='Apellido Materno'
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Correo
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={correoEmpleado}
                                        onChange={(e) => setCorreoEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Ej. correo@gmail.com'
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Telefono
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={telefonoEmpleado}
                                        onChange={(e) => setTelefonoEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Ej. 477 165 4859'
                                    />
                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Curp
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={curpEmpleado}
                                        onChange={(e) => setCurpEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Ej. HSTE302015USRTLSA6'
                                    />
                                </InputGroup>
                            </div>
                            <div style={{ width: '50%', paddingLeft: '0.5em', textAlign: 'center' }}>
                                <h2 style={{ marginBottom: '1em' }}>Datos De Contrato</h2>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Departamento
                                    </InputGroup.Text>
                                    <div className='btnDropdown'>
                                        <DropdownButton variant="Secondary" title={titulo} style={{ width: '100%' }}>
                                            <Dropdown.Item onClick={() => asignarTitulo("P")}>Profesor</Dropdown.Item>
                                            <Dropdown.Item onClick={() => asignarTitulo("RH")}>Recursos Humanos</Dropdown.Item>
                                            <Dropdown.Item onClick={() => asignarTitulo("SE")}>Servicios Escolares</Dropdown.Item>
                                            <Dropdown.Item onClick={() => asignarTitulo("I")}>Informática</Dropdown.Item>
                                        </DropdownButton>
                                    </div>

                                </InputGroup>
                                <InputGroup className="mb-3 custom-input-group">
                                    <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default">
                                        Area
                                    </InputGroup.Text>
                                    <Form.Control
                                        value={areaEmpleado}
                                        onChange={(e) => setAreaEmpleado(e.target.value)}
                                        aria-label="Default"
                                        aria-describedby="inputGroup-sizing-default"
                                        placeholder='Ej. Reclutamiento'
                                    />
                                </InputGroup>
                                <InputGroup style={{ display: 'block' }}>
                                    <InputGroup.Text id="inputGroup-sizing-default" style={{ width: '100%', marginBottom: '2.5%' }} >
                                        Selecciona el tipo de contrato
                                    </InputGroup.Text>
                                    <div style={{ display: 'flex', marginBottom: '2.5%' }}>
                                        <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default" style={{ display: 'flex' }} >
                                            Contrato Base
                                        </InputGroup.Text>
                                        <Form.Check
                                            type="radio"
                                            id="contratoBase"
                                            name="contratoOptions"
                                            aria-label="Contrato base radio button"
                                            style={{ display: 'flex', marginLeft: '0.5em', marginTop: '0.5em' }}
                                            className='seleccionarRadio'
                                            onChange={() => setContratoEmpleado('B')}
                                        />
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <InputGroup.Text className="datoEmpleado1" id="inputGroup-sizing-default" style={{ display: 'flex' }}>
                                            Contrato por honorarios
                                        </InputGroup.Text>
                                        <Form.Check
                                            type="radio"
                                            id="contratoHonorario"
                                            name="contratoOptions"
                                            aria-label="Contrato por honorario radio button"
                                            style={{ display: 'flex', marginLeft: '0.5em', marginTop: '0.5em' }}
                                            className='seleccionarRadio'
                                            onChange={() => setContratoEmpleado('H')}
                                        />
                                    </div>
                                </InputGroup>
                            </div>
                        </div>
                        <div className='footerModal'>
                            <div className='btnRegistrar'>
                                <a className="btnfos btnfos-4" onClick={updateProfesor}><span>Actualizar Datos</span></a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
