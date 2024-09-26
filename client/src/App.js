import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './pages/ServiciosEscolares/admin';

import Inscripcion from './pages/ServiciosEscolares/inscripcion';
import Resultados from './pages/ServiciosEscolares/resultados';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path='/resultados_admision'>

          </Route>
          <Route path='/registro_aspirantes'>

          </Route>
        </Route>
        <Route path='/login' element={<Login />}>
        </Route>
        <Route path='/servicios-escolares' element={<Services />}>
          <Route path="periodos_inscripcion" element={<Inscripcion />} />
          <Route path="resultados" element={<Resultados />} />
        </Route>
        <Route path='/recursos_humanos'>

        </Route>
        <Route path='/alumnos'>

        </Route>
        <Route path='/profesores'>

        </Route>
      </Routes>
    </Router>
  );
}

export default App;