

import React, { useState, useEffect,useCallback} from 'react';
import axios from 'axios'
import { Button,Card,Modal,Form } from 'react-bootstrap';
import{ActionCreators2} from '../redux/komReducer'
import {useSelector,useDispatch} from 'react-redux'

import 'react-day-picker/lib/style.css';

const DeleteExComponent=({data})=>{
  const dispatch = useDispatch();

  const DeleteComment=()=>{
    axios.delete("https://localhost:44310/Komentar?id="+data+"")
    dispatch(ActionCreators2.deleteComments(data));
  }
    return(
        <Button  variant="danger" onClick={DeleteComment}>Delete</Button>
    )
  }
const AddModal=({data,telefon})=>{
  console.log(telefon)
  const [show, setShow] = useState(false);
  const [tekst,setTekst]=useState('');
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleText=(e)=>{
    let em = e.target.value;
    setTekst(em)
  }

  const addComent=async()=>{
    const text={
      sobaID: data,
      tekst:tekst,
      gostID:telefon
    }
    await axios.post("https://localhost:44310/Komentar/AddKomentar",text);
    const response = await axios("https://localhost:44310/Komentar/All").then((response) => {
      dispatch(ActionCreators2.setComments(response.data))
      setShow(false);
    }, (error) => {
      console.log(error);
    });
    
  }
  return (
    <>
     <div style={{flex:'1'}}>
        <Button style={{float:'right'}} onClick={handleShow}>Add</Button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Soba edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control onChange={handleText} as="textarea" rows={3} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addComent}> 
            Post
          </Button>
        </Modal.Footer>
      </Modal>
      </>
  );
}
const CommentBy=({id})=>{

  const [gost,setGost]=useState({});
  const getGost=async()=>{
    const response = await axios("https://localhost:44310/Gost/Id?id="+id+"");
    setGost(response.data)
  };
  useEffect(() => {
    getGost();
  }, [id])

  return(
     
        <p>By: {gost.ime}</p>
      
  );
}
function Comments({data,role,telefon}){
  const comm = useSelector(state => state.komReducer.comments);
  const dispatch = useDispatch();
  console.log(telefon);
  const getKomentari=async()=>{
    const response = await axios("https://localhost:44310/Komentar/All");
    dispatch(ActionCreators2.setComments(response.data))
    
  };
  useEffect(() => {
    getKomentari();
  }, [])
 
    return(
      <div>
       
        <div style={{display:'flex',paddingTop:'20px'}}>
          <h5 style={{paddingBottom:'10px'}}>KOMENTARI:</h5>
          {role ? <div/> : <AddModal data={data} telefon={telefon}></AddModal>}   
        </div>
        {comm.map(k=>{ if(k.sobaID==data){ return(
          <div style={{paddingBottom:'20px'}} key={comm.komentarID}>
          <Card>
          <Card.Header as="h5"><CommentBy  id={k.gostID}></CommentBy ></Card.Header>
          <Card.Body >
            <Card.Text >
              {k.tekst}.
            </Card.Text>
            {role ? <DeleteExComponent  data={k.komentarID} /> : <div  />}
          </Card.Body>
          </Card>
          </div>
        );
          }
        }
        )}
      </div>
    );      
}
export default Comments;