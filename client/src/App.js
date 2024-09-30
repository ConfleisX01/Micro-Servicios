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
        },
        {
          path: '/servicios_escolares/validacion_becas',
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
          element:<Informatica />
        },
        {
          path: '/personal/recursos_humanos',
          element:<RecursosHumanos />
        },
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