  import './App.css'
  import { createBrowserRouter } from 'react-router-dom'
  import Home from '../src/components/pages/Home'
  import Menu from '../src/components/pages/Menu'
  import Checking from "../src/components/body/Checking"
  import List from "../src/components/body/List";
  import Register from "../src/components/body/Register";
  import Setting from "../src/components/body/Setting";

  const page = createBrowserRouter([
    {
      path: '/kraken/',
      element: (
          <Home />
      ),
      children: [
        { path: '', element: <Menu /> },
        { path: 'list', element: <List />},
        { path: 'setting', element: <Setting />},
        { path: 'checking', element: <Checking />},
        { path: 'register', element: <Register />}
      ]
    },
    { path: "*", element: <div>404 - Página não encontrada</div> } 
  ])

  export { page }