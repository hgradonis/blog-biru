import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Menu from "./Menu";
import Users2 from "./Users";
import Publicaciones from './Publicaciones';
import Tareas from './Tareas';
import TareasGuardar from './Tareas/Guardar';


const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path="/" component={Users2} />
      <Route exact path="/tareas2" component={Tareas} />
      <Route exact path="/publicaciones/:key" component={Publicaciones} />
      <Route exact path="/tareas/guardar" component={TareasGuardar} />
      <Route exact path="/tareas/guardar/:usu_id/:tar_id" component={TareasGuardar}  />
    </div>
  </BrowserRouter>
);
export default App;
