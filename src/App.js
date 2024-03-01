import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './componente/login/Login';
import Signup from './componente/signup/Signup';
import Home from './componente/homepage/Home';
import Produse from './componente/lista_mea/Produse';
import Prieteni from './componente/prieteni/Prieteni';
import ModalComponent from './componente/lista_mea/Modal';
import Prod from './componente/produse/Prod';

import { useState } from 'react';


function App() {
  const [modalOpen, setModalOpen] = useState(false);
 
  const [rows, setRows] = useState([
  ]);

  const [rows_p, setRows_p] = useState([
  ]);

  const handleDeleteRow = (targetIndex) => {
    setRows(rows.filter((_,idx) => idx !== targetIndex));
  };

  const handleSubmit = (newRow) => {
    setRows([...rows, newRow])
  }

  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/lista_mea" element={<><Produse  rows={rows} deleteRow = {handleDeleteRow}/> 
                                          <button className='buton' onClick={() => setModalOpen(true)}>Adauga produs</button>
                                      {modalOpen && <ModalComponent 
                                      closeModal={()=>{setModalOpen(false);}
                                      }
                                      onSubmit = {handleSubmit}/>}</>} />
        <Route path="/prieteni" element={<> <Prieteni rows={rows_p}/> </> } />
        <Route path="/produse" element={<Prod />} />
      </Routes>
    </Router>

  );
}

export default App;
