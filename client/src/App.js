import 'bootstrap/dist/css/bootstrap.min.css';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'

import Services from './pages/ServiciosEscolares/admin';
import Inscripcion from './pages/ServiciosEscolares/inscripcion';
import Resultados from './pages/ServiciosEscolares/resultados';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Welcome from './pages/Home/Welcome';
import RegistroAspirantes from './pages/ServiciosEscolares/RegistroAspirantes';
import CatalagoBecas from './pages/ServiciosEscolares/catalagoBecas';

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
          element: <Resultados />
        },
        {
          path: '/registro_aspirantes',
          element: <RegistroAspirantes />
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