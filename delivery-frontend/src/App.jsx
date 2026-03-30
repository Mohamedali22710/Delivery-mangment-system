// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import './index.css'
import Home from './Pages/Home'
import { store } from "./store.js";
import { Provider } from "react-redux";
import AppRouter from "./routes/Approutes.jsx";
import Dashboard from './features/Shipment/shipmentService.js';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
   

     <Provider store={store}>
      <AppRouter />
      <Dashboard/>
    </Provider>
   
    </>
  )
}

export default App
