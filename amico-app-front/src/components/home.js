
import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Sobe from './sobe'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useLocation } from 'react-router-dom';

function Home(params) {
const location = useLocation();
console.log(location.state.role)


const [hotel,setHotel]=useState({});

const getHotel = async () => {
  const response = await axios("https://localhost:44310/Hotel");
  console.log(response.data);
  setHotel(response.data[0]);
};
useEffect(() => {
  getHotel();
  
}, []);



  return (
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',flexDirection:'column'}} >
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
        <h1>{hotel.ime}</h1>
        <h3>{hotel.adresa}</h3>
        <h3>{hotel.telefon}</h3>
      </div>
      <Sobe data={location.state.role}></Sobe>
    </div>
  );
}

export default Home;