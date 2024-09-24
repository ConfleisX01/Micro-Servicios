import 'bootstrap/dist/css/bootstrap.min.css';
import Services from './pages/ServiciosEscolares/admin';
import { useState } from 'react';

function App() {
  const [currentPage, setCurrentPage] = useState(0) // Identacion de las paginas

  return (
    <>
      {currentPage == 0 ? <Services></Services> : null}
    </>
  );
}

export default App;