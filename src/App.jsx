import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import Titulo from "./components/Titulo";
import Formulario from "./components/Formulario";
import Resultado from "./components/Resultado";

import React from "react";

function App() {
  return (
    <>
      <Container>
        <Titulo />
        <Formulario />
        <Resultado />
      </Container>
    </>
  );
}

export default App;

