import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Services from './pages/ServiciosEscolares/admin';
import Inscripcion from './pages/ServiciosEscolares/inscripcion';
import Resultados from './pages/ServiciosEscolares/validacionResultados';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Welcome from './pages/Home/Welcome';
import RegistroAspirantes from './pages/ServiciosEscolares/RegistroAspirantes';
import ServiciosEscolares from './pages/Personal/serviciosEscolares';
import RecursosHumanos from './pages/Personal/recursosHumanos';
import Profesores from './pages/Personal/profesores';
import Informatica from './pages/Personal/informatica';
import ResultadosAdminision from './pages/Home/ResultadosAdmision';
import FormularioRegistro from './pages/ServiciosEscolares/FormularioRegistro';
import CatalagoBecas from './pages/ServiciosEscolares/catalagoBecas';
import RegistroBecas from './pages/Alumnos/alumnos';
import ServicesAlumnos from './pages/Alumnos/adminAlumnos';
import ValidacionBecas from './pages/ServiciosEscolares/validacionBecas';
import ResultadosBecas from './pages/ServiciosEscolares/resultadosBecas';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />,
      children: [
        {
          path: '/',
          element: <Welcome />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: '/resultados_admision',
          element: <ResultadosAdminision />
        },
        {
          path: '/registro_aspirantes',
          element: <RegistroAspirantes />,
          children: [
            {
              path: 'formulario_registro/:id_periodo',
              element: <FormularioRegistro />
            }
          ]
        },
        {
          path: '/resultados_becas',
          element: <ResultadosBecas />
        }
      ]
    },
    {
      path: '/servicios_escolares',
      element: <Services />,
      children: [
        {
          path: '/servicios_escolares/periodos_inscripcion',
          element: <Inscripcion />
        },
        {
          path: '/servicios_escolares/validacion_resultados',
          element: <Resultados />
        },
        {
          path: '/servicios_escolares/catalogo_carreras',
        },
        {
          path: '/servicios_escolares/registro_grupos',
        },
        {
          path: '/servicios_escolares/catalogo_becas',
          element: <CatalagoBecas />
        },
        {
          path: '/servicios_escolares/validacion_becas',
          element: <ValidacionBecas />
        },
      ]
    },
    {
      path: '/personal',
      children: [
        {
          path: '/personal/profesores',
          element: <Profesores />
        },
        {
          path: '/personal/servicios_escolares',
          element: <ServiciosEscolares />
        },
        {
          path: '/personal/informatica',
          element: <Informatica />
        },
        {
          path: '/personal/recursos_humanos',
          element: <RecursosHumanos />
        },
      ]
    },
    {
      path: '/alumnos',
      element: <ServicesAlumnos />,
      children:
        [
          {
            path: '/alumnos/regsitro_becas',
            element: <RegistroBecas />
          }

        ]
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;