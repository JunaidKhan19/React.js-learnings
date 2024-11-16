import React from 'react'
import Header from './components/header/header';
import { Outlet } from 'react-router-dom';
import Footer from './components/footer/footer';

function Layout() {
  return (
    <>
      <Header/>
      <Outlet/>
      <Footer/>
    </>
  )
}

//Outlet helps us to render child routes 
//eg: header and footer are provided for every page routed and the outlet serves as
//an empty route box where other routes like home, about us, contact page data renders
//thus outlet will define you a location to serve other components in place of it

export default Layout;