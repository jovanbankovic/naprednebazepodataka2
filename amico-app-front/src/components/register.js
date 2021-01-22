import { useState } from 'react';
import { Form,Button,Alert } from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

function Register() {
    const [email,setEmail]=useState('');
    const [pw,setPw]=useState('');
    const [ime,setIme]=useState('');
    const [prezime,setPrezime]=useState('');
    const [telefon,setTelefon]=useState('');
    const history = useHistory();
    const handleIme=(e)=>{
    let em = e.target.value;
        setIme(em)
    }
    const handlePrezime=(e)=>{
        let em = e.target.value;
        setPrezime(em)
    }
    const handleTelefon=(e)=>{
        let em = e.target.value;
        setTelefon(em)
    }
    const handleEmail=(e)=>{
        let em = e.target.value;
        setEmail(em)
    }
    
    const handleSifra=(e)=>{
        let sif = e.target.value;
        setPw(sif)
    }

    const registerGost=async()=>{
        const gost={
            ime:ime,
            prezime:prezime,
            telefon:telefon,
            email:email
        }
        const login={
            email:email,
            sifra:pw,
            tip:'gost',
            telefon:telefon
        }

        await axios.post("https://localhost:44310/Gost/AddGost",gost);
        await axios.post("https://localhost:44310/Login/Add",login);
        history.push("/")
    }
    
    return(
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh',flexDirection:'column'}}>
    <Form style={{width:'25%'}}>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <h1>Register</h1>
        </div>
        <Form.Group>
        <Form.Label>Ime</Form.Label>
            <Form.Control onChange={handleIme}></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label>Prezime</Form.Label>
            <Form.Control onChange={handlePrezime}></Form.Control>
        </Form.Group>
        <Form.Group>
        <Form.Label>Telefon</Form.Label>
            <Form.Control onChange={handleTelefon}></Form.Control>
        </Form.Group>
        <Form.Group controlId="formBasicEmail">   
        <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" onChange={handleEmail} />
            <Form.Text className="text-muted">
                 We'll never share your email with anyone else.
            </Form.Text>
        </Form.Group>      
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={handleSifra}  />
        </Form.Group>
        <Form.Group style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingTop:'10px'}}>
            <Button variant="primary" onClick={registerGost}>
                Register
            </Button>
        </Form.Group>
    </Form>
    </div>);
}
export default Register;