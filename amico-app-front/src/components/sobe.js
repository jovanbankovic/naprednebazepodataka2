
import React, { useState, useEffect,useCallback} from 'react';
import axios from 'axios'
import { Button,FormControl,InputGroup,Modal,Card } from 'react-bootstrap';
import{ActionCreators} from '../redux/appReducer'
import{ActionCreators2} from '../redux/komReducer'
import{ActionCreators3} from '../redux/guestReducer'
import {useSelector,useDispatch} from 'react-redux'
import DatePicker from "react-datepicker";
import 'react-day-picker/lib/style.css';

import "react-datepicker/dist/react-datepicker.css";
import Comments from './comments';



const Example=({data})=> {

  const [show, setShow] = useState(false);
  const [updateTip,SetUpdateTip]=useState(data.tip);
  const [updateTv,SetUpdateTv]=useState(data.tv);
  const [updateInternet,SetUpdateInternet]=useState(data.internet);
  const [updateKlima,SetUpdateKlima]=useState(data.klima);
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleTip=(e)=>{
    let em = e.target.value;
    SetUpdateTip(em)
  }
  const handleTV=(e)=>{
    let em = e.target.value;
    SetUpdateTv(em)
  }
  const handleInternet=(e)=>{
    let em = e.target.value;
    SetUpdateInternet(em)
  }
  const handleKlima=(e)=>{
    let em = e.target.value;
    SetUpdateKlima(em)
  }
  const updateSoba= async () => {

    const soba={
      sobaID:data.sobaID,
      tip:updateTip,
      klima:updateKlima,
      tv:updateTv,
      internet:updateInternet
    }
    
    await axios.put("https://localhost:44310/Soba/UpdateSobe",soba);
    dispatch(ActionCreators.editClient(soba));
  }
 

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Soba edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>TIP:</p>
          <InputGroup>
            <FormControl placeholder={data.tip} onChange={handleTip}></FormControl>
          </InputGroup>
          <p style={{paddingTop:"15px"}}>TV:</p>
          <InputGroup>
            <FormControl placeholder={data.tv} onChange={handleTV}></FormControl>
          </InputGroup>
          <p style={{paddingTop:"15px"}}>INTERNET:</p>
          <InputGroup>
            <FormControl placeholder={data.internet} onChange={handleInternet}></FormControl>
          </InputGroup>
          <p style={{paddingTop:"15px"}}>KLIMA:</p>
          <InputGroup>
            <FormControl placeholder={data.klima} onChange={handleKlima}></FormControl>
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={updateSoba}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}
const RezComponent=({data,userid})=>{
  const [show, setShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  
  
  const [datumiString,setDatumiString]=useState();
  const [datumi,setDatumi]=useState([]);



  const handleShow = () => {
    setShow(true);
    fetchDates();
    
  };
  const handleClose = () => setShow(false);

  const fetchDates= async()=>{
    const response = await axios("https://localhost:44310/Rezervacija/Get?id="+data+"");
    console.log(response.data)
    setDatumi(response.data);
  }
  const addAll=async()=>{
    //da pribavim usera
    
    const rezervacija={
      sobaID: data,
      gostID: userid,
      datumdolaska: startDate,
      datumodlaska: endDate
    }

    const response = axios.post("https://localhost:44310/Rezervacija/Add",rezervacija);
    setShow(false);
  }

 
 return(
   <>
  <Button variant="primary" onClick={handleShow}>
    Rezervisi
  </Button>

<Modal show={show} onHide={handleClose}>
  <Modal.Header closeButton>
    <Modal.Title>Rezervacija{data}</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <p style={{paddingTop:"15px"}}>Datum dolaska:</p>
    <DatePicker selected={startDate} onChange={date => setStartDate(date)} minDate={new Date()}
     excludeDates={ datumi.map(el=>new Date(el)) }/>

    <p style={{paddingTop:"15px"}}>Datum odlaska:</p>
    <DatePicker minDate={new Date()} selected={endDate} onChange={date => setEndDate(date)}
      excludeDates={ datumi.map(el=>new Date(el))} />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleClose}>
      Close
    </Button>
  <Button variant="primary" onClick={addAll}>
      Save Changes
    </Button>
  </Modal.Footer>
</Modal>
</>
 );
}

const DRoom=({data})=>{
  console.log(data)
  const dispatch = useDispatch();
  //https://localhost:44310/Soba?id=1
  const deleteRoom=()=>{
    axios.delete("https://localhost:44310/Soba?id="+data+"")
    dispatch(ActionCreators.deleteClient(data));
  }

  return(<Button variant="danger" onClick={deleteRoom}>
      Delete room
    </Button>)
}

const DeleteGuest=({data})=>{
  const dispatch = useDispatch();
  const handleDelete= async()=>{
    await axios.delete("https://localhost:44310/Gost?telefon="+data+"");
    dispatch(ActionCreators2.deleteCommentsTelefon(data));
    dispatch(ActionCreators3.deleteGuests(data));
  }
  return(<Button variant="danger" onClick={handleDelete}>Delete</Button>)
}
const GostModal=()=>{
    
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const gosti = useSelector(state => state.guestReducer.guests);


  const getGuests=async()=>{
    const res=await axios.get("https://localhost:44310/Gost")
    dispatch(ActionCreators3.setGuests(res.data));
  }
  useEffect(() => {
    getGuests();
  }, [])
  
 

  return (
    <>
      <Button variant="danger" onClick={handleShow}>
        Delete Guest
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Guest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {gosti.map((gost)=>
          <div>
            <Card>
              <Card.Header as="h5">{gost.ime}</Card.Header>
              <Card.Body>
                <DeleteGuest data={gost.telefon}></DeleteGuest>
              </Card.Body>
            </Card>
          </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );

}

const RezervacijaModal=()=>{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const [rezercije,SetRezervacije]=useState([]);
  
  

  const getRezervacije=async()=>{
    const res=await axios.get("https://localhost:44310/Rezervacija");
    SetRezervacije(res.data);
  }
  useEffect(() => {
    getRezervacije(); 
  }, [])
 
  
 

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Rezervacije
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pregled rezercija</Modal.Title>
        </Modal.Header>
          <Modal.Body>
            {rezercije.map((rez)=>
            <div style={{border:'1px solid black',marginBottom:'20px'}}>
              <div style={{padding:'10px'}}>
                <p>Rezervacija za sobu: {rez.sobaID}</p>
                <p>Datum dolaska: {rez.datumdolaska}</p>
                <p>Datum odlaska: {rez.datumodlaska}</p>
                <p>Broj telefona gosta: {rez.gostID}</p>
              </div>
            </div>
            )}
          </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

const RoomModal=()=>{
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  const [tip,SetTip]=useState('');
  const [tv,SetTv]=useState('');
  const [internet,SetInternet]=useState('');
  const [klima,SetKlima]=useState('');

  const handleTip=(e)=>{
    let em = e.target.value;
    SetTip(em)
  }
  const handleTV=(e)=>{
    let em = e.target.value;
    SetTv(em)
  }
  const handleInternet=(e)=>{
    let em = e.target.value;
    SetInternet(em)
  }
  const handleKlima=(e)=>{
    let em = e.target.value;
    SetKlima(em)
  }

  const postSoba=async()=>{
    const soba={
      tip:tip,
      tv:tv,
      internet:internet,
      klima:klima
    }
    await axios.post("https://localhost:44310/Soba/AddSoba",soba);
    const res=await axios.get("https://localhost:44310/Soba");
    
    dispatch(ActionCreators.setClients(res.data));
  }
 
  
 

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add new room
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup>
          <FormControl placeholder='TIP' onChange={handleTip}></FormControl>
        </InputGroup>
        <InputGroup>
          <FormControl placeholder='TV' onChange={handleTV}></FormControl>
        </InputGroup>
        <InputGroup>
          <FormControl placeholder='INTERNET' onChange={handleInternet}></FormControl>
        </InputGroup>
        <InputGroup>
          <FormControl placeholder='KLIMA' onChange={handleKlima}></FormControl>
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={postSoba}>
            Add room
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}

function Sobe({data}) {
 
   
    const [allowed,SetAllowed]=useState(false);
    const [allowed2,SetAllowed2]=useState(false)
    const clients = useSelector(state => state.appReducer.clients);
    const dispatch = useDispatch();

    const getSobe = async () => {
        const response = await axios("https://localhost:44310/Soba"); 
        dispatch(ActionCreators.setClients(response.data));
      };
      
      useEffect(() => {
        getSobe();
        if(data=="radnik"){
          SetAllowed(true)}
        else if(data=="vlasnik"){
          SetAllowed(true);
          SetAllowed2(true);
        }
      }, [])
     
      return(
          <div style={{width:'50%',display:'flex',flexDirection:'column',justifyContent: 'space-between'}}>
              <div style={{marginBottom:'20px'}}>
                {allowed2 ? <RoomModal /> : <div  />}
              </div>
              <div style={{marginBottom:'20px'}}>
                {allowed2 ? <GostModal /> : <div  />}
              </div>
              <div style={{marginBottom:'20px'}}>
                {allowed ? <RezervacijaModal /> : <div  />}
              </div>
              {clients.map((soba)=>
              <div style={{border:'1px solid black',marginBottom:20,padding:'20px',flex:'1',display:'flex',flexDirection:'column'}} key={soba.sobaID}>
                <div style={{justifyContent:'center', alignItems:'center',display:'flex',flexDirection:'column'}}>
                  <h4>SOBA{soba.sobaID}</h4> 
                  <h4>{soba.tip}</h4>
                  <p>TV: {soba.tv}</p>
                  <p>INTERNET: {soba.internet}</p>
                  <p>KLIMA: {soba.klima}</p>
                </div>
                  {allowed ? <Example data={soba} /> : <div  />}
                  {allowed2 ? <DRoom data={soba.sobaID} /> : <div  />}
                  {allowed ? <div /> : <RezComponent data={soba.sobaID} userid={data}></RezComponent>}
                  <Comments key={soba.sobaID} data={soba.sobaID} role={allowed} telefon={data}></Comments>
              </div>   
              )}
          </div>
      );
}

export default Sobe;