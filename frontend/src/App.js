import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';

import Precarga from './components/precarga';

import Container from 'react-bootstrap/Container';


function App() {
  
  return (
    <Container>
      <nav class="navbar navbar-light bg-light">
        <a class="navbar-brand" href="#">
                  <img src="./masterbus-log.png"  alt=""/>
        </a>
        <label>Sistema de arribo predictivo</label>
      </nav>
      <Precarga/>
    </Container>
          
  );
}

export default App;
