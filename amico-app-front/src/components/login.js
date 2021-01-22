
import { useState } from 'react';
import { Form,Button,Alert } from 'react-bootstrap';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

function Login() {

const history = useHistory();
const [email,setEmail]=useState("");
const [sifra,setSifra]=useState("");
const SignIn= ()=>{
    const user={
        email:email,
        sifra:sifra
    }
    console.log(user)
    axios.post('https://localhost:44310/Login',  user )
      .then(res => {
        console.log(res.data);
        if(res.data.tip=="radnik"){
          history.push("/home",{role:res.data.tip})
        }
        else if(res.data.tip=='gost')
        {
          history.push("/home",{role:res.data.telefon})
        }
        else if(res.data.tip=='vlasnik')
        {
          console.log("ULAZI LI OVDE ???")
          history.push("/home",{role:res.data.tip})
        }
      })
  }
  const GostSignIn=()=>{
    history.push("/register")
  }
  const handleEmail=(e)=>{
    let em = e.target.value;
    setEmail(em)
  }

    const handleSifra=(e)=>{
        let sif = e.target.value;
        setSifra(sif)
    }

    return( 
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh',flexDirection:'column'}}>
    <Form style={{width:'25%'}}>
        <Form.Group controlId="formBasicEmail">
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
            <h1>Sign in</h1>
          </div>
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
            <Button variant="primary" onClick={SignIn}>
                Submit
            </Button>
        </Form.Group>
        <Form.Group style={{display: 'flex',  justifyContent:'center', alignItems:'center',paddingTop:'10px'}}>
            Nemas nalog?<Alert.Link href="#"><span onClick={GostSignIn}>Nastavi ka registraciji</span></Alert.Link>
        </Form.Group>
    </Form>
    </div>
    );
}
export default Login;