import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './pages/ServiciosEscolares/admin';

import Inscripcion from './pages/ServiciosEscolares/inscripcion';
import Resultados from './pages/ServiciosEscolares/resultados';
import Home from './pages/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/servicios-escolares' element={<Services />}>
          <Route path="periodos_inscripcion" element={<Inscripcion />} />
          <Route path="resultados" element={<Resultados />} />
        </Route>
        <Route path='/home' element={ <Home /> }>
          
        </Route>
      </Routes>
    </Router>
  );
}

export default App;