import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'
import '@popperjs/core/dist/cjs/popper.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
//import MenuPublico from './componentes/MenuPublico'
import Home from './componentes/telas/Home'
import Sobre from "./componentes/telas/Sobre";
import Tamanho from "./componentes/telas/tamanho/Tamanho";
import Sorvete from "./componentes/telas/sorvete/Sorvete";
import Cliente from "./componentes/telas/cliente/Cliente";
//import Pedidos from "./componentes/telas/pedidos/Pedidos";
import Usuarios from "./componentes/telas/usuarios/Usuarios";
import MenuPublico from "./componentes/MenuPublico";
import MenuPrivado from "./componentes/MenuPrivado";
import Login from "./componentes/telas/login/Login";


const router = createBrowserRouter([
  {
    path : "/",
    element : <MenuPublico/>,
    children : [
      {
        index : true,
        element : <Home/>
      },
      {
        path : "/sobre",
        element : <Sobre/>
      }	,  
      {
        path : "login",
        element :  <Login/>
      }              
    ]
  },
  {
    path: "/admin",
    element: <MenuPrivado />,
    children: [
      {
        index: true,
        element: <Home/>,
      },
      {
        path : "sobre",
        element : <Sobre/>
      }, 
      {
        path: "tamanho",
        element: <Tamanho/>,
      }
      ,
      {
        path: "sorvete",
        element: <Sorvete/>,
      }
      ,
      {
        path: "cliente",
        element: <Cliente/>,
      } ,
      {
        path: "usuarios",
        element: <Usuarios/>,
      }      
    ]
  }
]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}

export default App;


/* {
  path: "pedidos",
  element: <Pedidos/>,
}, */
/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/