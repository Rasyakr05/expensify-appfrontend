import axios from "axios";
import { NavBar } from '../components/navbar';
import { useCookies } from "react-cookie";
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import './auth.css'

export const Auth = () => {
    const [justifyActive, setJustifyActive] = useState("tab1");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState({
        name: '',
        email: '',
        phoneno: '',
        education: '',
        age: '',
        place: '',
    });
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
  
    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
  
      setJustifyActive(value);
    };
  


    const onSubmitLogin = async (event) => {
      if (username === "admin" && password === "admin") {
        navigate("/admin");
      } else {
        event.preventDefault();
        try {
          const response = await axios.post("http://localhost:3001/api/auth/login", {
            username,
            password,
          });
    
          // Check if the user is blocked
          if (response.data.block) {
            alert("User is blocked. Please contact the administrator.");
            return;
          }
    
          console.log(response.data);
          setCookies("access_token", response.data.token);
          window.localStorage.setItem("userID", response.data.userID);
          navigate("/home");
        } catch (err) {
          alert("Username or password is incorrect");
          console.error(err);
        }
      }
    };
    
    
  
    const onSubmitRegister = async (event) => {
      event.preventDefault();
      console.log({
        username,
        password,
        ...data,
      });
      try {
        await axios.post("http://localhost:3001/api/auth/register", {
          // await axios.post("/api/auth/register", {
          username,
          password,
          ...data,
        });
  
        alert("Successfully registered! Now login");
      } catch (err) {
        console.error(err);
        alert("User already exists!");
      }
    };

    const handleChange = React.useCallback((value) => {
        setData(state => ({
            ...state,
            ...value
        }));
    }, [setData]);

  return (
   <div >
    <style>
      {`
        body {
          background-color: #001C30;
          margin: 0;
          padding: 0;
        }
      `}
    </style>
    <NavBar/>
    <div className="formcss" >
    <div style={{ borderRadius: '20', width: '80%', height: '85%', display: 'flex', flexDirection: 'row', boxShadow: '0px 0px 1px 1px #DAFFFB', backgroundColor: '#DAFFFB' }}>
    <div style={{ width: '50%', height: '120%',  alignItems: 'center', justifyContent: 'center', borderRadius: '20' }}>
      <p style={{paddingTop:"250px",paddingLeft:"30px",fontSize:"50px",color:"#176B87",fontWeight:"bold"}}>TRACK-MYSPEND</p>
      <p style={{paddingLeft:"30px",fontSize:"clamp(0.3rem, 1vw, 1.2rem)",color:"#176B87",fontWeight:"bold"}}>"Your complete expense tracker"</p>
        <p style={{paddingLeft:"30px",fontSize:"clamp(0.5rem, 2vw, 1.1rem)",color:"#176B87",fontWeight:"bold"}}>Wondering where all your money mysteriously disappeared to? Let our budget tracker reveal the truth, one painfully accurate pie chart at a time—so you can laugh, cry, and maybe even save a little!</p>
    </div>
    <div style={{ width: '50%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '20' }}>
    <form onSubmit={justifyActive === "tab1" ? onSubmitLogin : onSubmitRegister}>
        <div style={{ width: '360' }}>
                <MDBContainer className="p-3 my-5 d-flex flex-column w-600">
                <MDBTabs
                pills
                justify
                className="mb-3 d-flex flex-row justify-content-between"
                >
                <MDBTabsItem>
                    <MDBTabsLink
                    onClick={() => handleJustifyClick("tab1")}
                    active={justifyActive === "tab1"}
                    >
                    Login
                    </MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem>
                    <MDBTabsLink
                    onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}
                    >
                    Register
                    </MDBTabsLink>
                </MDBTabsItem>
                </MDBTabs>

                <MDBTabsContent>
                <MDBTabsPane show={justifyActive === "tab1"}>
                    <MDBInput
                    wrapperClass="mb-4"
                    id="username"
                    value={username}
                    placeholder="Username"
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    id="password"
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    />


                    <Button className="mb-4 w-100" type="submit" variant="outlined" >
                    Sign in
                    </Button>
                    <p className="text-center">
                    Not a member? <a href="#!"  onClick={() => handleJustifyClick("tab2")}
                    active={justifyActive === "tab2"}>Register</a>
                    </p>
                </MDBTabsPane>

                <MDBTabsPane className="" show={justifyActive === "tab2"}>
                <MDBInput
                    wrapperClass="mb-4"
                    value={data.name}
                    placeholder="Name"
                    id="name"
                    type="text"
                    onChange={(e) => handleChange({ name: e.target.value })}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    value={data.place}
                    placeholder="Place"
                    id="place"
                    type="text"
                    onChange={(e) => handleChange({ place: e.target.value })}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    value={data.age}
                    placeholder="Age"
                    id="age"
                    type="number"
                    onChange={(e) => handleChange({ age: e.target.value })}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    value={data.email}
                    placeholder="Email id"
                    id="emailid"
                    type="email"
                    onChange={(e) => handleChange({ email: e.target.value })}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    value={data.phoneno}
                    placeholder="Phone no."
                    id="phoneno"
                    type="number"
                    onChange={(e) => handleChange({ phoneno: e.target.value })}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    value={data.education}
                    placeholder="Education"
                    id="education"
                    type="text"
                    multiple
                    onChange={(e) => handleChange({ education: e.target.value })}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    value={username}
                    placeholder="Username"
                    id="username"
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    />
                    <MDBInput
                    wrapperClass="mb-4"
                    id="password"
                    value={password}
                    placeholder="Password"
                    type="password"
                    onChange={(event) => setPassword(event.target.value)}
                    />
                    <div className="d-flex justify-content-center mb-4">
                    <MDBCheckbox
                        name="flexCheck"
                        id="flexCheckDefault"
                        label="I have read and agree to the terms"
                    />
                    
                     </div>

                    <Button className="mb-4 w-100" type="submit" variant="outlined">Sign up</Button>
                </MDBTabsPane>
                </MDBTabsContent>
            </MDBContainer>
        </div>
        </form>
    </div>
</div>
</div>
</div>
  );
};
