import React from 'react'
import Navbar from '../../components/navbar/Navbar';
import  Header from '../../components/header/Header';
import Loginfield from '../../components/watchvideo/Loginfield'
import Trello101 from '../../components/trello101/Trello101';
import Footer from '../../components/footer/Footer';

function Home() {
  return (
    <div>
        <Navbar></Navbar>
        <Header></Header>
        <Loginfield></Loginfield>
        <Trello101></Trello101>

        <Footer></Footer>
       
    </div>
  )
}

export default Home
