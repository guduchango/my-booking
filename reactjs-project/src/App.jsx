import { useState } from 'react'
import { BrowserRouter } from 'react-router-dom';
import './App.css'
import RouteCustom from './RouteCustom/RouteCustom';


function App() {
  return (
    <>
     <BrowserRouter>
        <RouteCustom />
      </BrowserRouter>
    </>
  )
}

export default App
