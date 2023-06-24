import './add.css';
import axios from "axios";
import { NavBar } from '../components/navbar';
import React,{useState} from 'react';
import { useCookies } from "react-cookie";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

export const Add = () => {
  

    const navigate = useNavigate();


    const [loginRegisterActive, setLoginRegisterActive] = React.useState('Income');
    const handleLoginRegisterClick = (tab) => {
        setLoginRegisterActive(tab);
    };

        const userID = useGetUserID();
        const [cookies, _] = useCookies(["access_token"]);
        const [incomeinfo, setIncomeinfo] = useState({
          iamount: '',
          idescription: "",
          userOwner: userID,
        });
        const [expenseinfo, setExpenseinfo] = useState({
            eamount: '',
            edescription: "",
            userOwner: userID,
          });
        const handleChange = React.useCallback((value) => {
            setIncomeinfo(state => ({
                ...state,
                ...value,
            }));
        }, [setIncomeinfo]);
        const handleChange2 = React.useCallback((value) => {
            setExpenseinfo(state => ({
                ...state,
                ...value,
            }));
        }, [setExpenseinfo]);

          const handleSubmit = async (event) => {
            event.preventDefault();
            try {
              // await axios.post("http://localhost:3001/add/incomeadd",
              await axios.post("/api/add/incomeadd",
                { ...incomeinfo },
                {
                  headers: { authorization: cookies.access_token },
                }
              );
        
              alert("income added successfully");
              navigate('/home');

            } catch (error) {
              console.error(error);
            }
          };
          const handleSubmit2 = async (event) => {
            event.preventDefault();
            try {
              // await axios.post("http://localhost:3001/add/expenseadd",
              await axios.post("/api/add/expenseadd",
               
              { ...expenseinfo },
                {
                  headers: { authorization: cookies.access_token },
                }
              );
        
              alert("expense added successfully");
              navigate('/home');
            } catch (error) {
              console.error(error);
            }
          };

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
        {/* <p style={{marginLeft:"5px",marginTop:"15px",fontSize:"40px",color:"#5A96E3", fontFamily:"sans-serif", fontWeight: "bold" }}>Add Your Income/Expenditure</p> */}
       <div style={{marginTop:"100px"}}>
        <div className='add' >
        <p style={{fontSize:"40px", color:"#001C30", fontFamily:"sans-serif", fontWeight: "bold" }}>ADD YOUR INCOME/EXPENSE </p>
        <MDBTabs pills justify className='mb-3' style={{padding:"10px"}}>
            <MDBTabsItem>
            <MDBTabsLink
                onClick={() => handleLoginRegisterClick('Income')}
                active={loginRegisterActive === 'Income'}
            >
                Income
            </MDBTabsLink>
            </MDBTabsItem>
            <MDBTabsItem>
            <MDBTabsLink
                onClick={() => handleLoginRegisterClick('Expense')}
                active={loginRegisterActive === 'Expense'}
            >
                Expense
            </MDBTabsLink>
            </MDBTabsItem>
        </MDBTabs>

        <MDBTabsContent style={{padding:"10px"}}>
            <MDBTabsPane show={loginRegisterActive === 'Income'}>
            <form method='Post' onSubmit={handleSubmit}>
                {/* Income */}
                <div>
                <TextField fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                variant="filled"
                onChange={e => handleChange({ iamount: e.target.value })} 
                value={incomeinfo.iamount}
                name='iamount' 
                label='AMOUNT'  
                className='mb-3' 
                type='number' 
                id='form7Example1'
                />
                </div>
                <div>
                
                <TextField fullWidth={true}
                className='mb-3' 
                onChange={e => handleChange({ idescription: e.target.value })}  
                value={incomeinfo.idescription} 
                type='text' 
                label='DESCRIPTION'
                name='idescription' 
                id='form7Example2'  />
                </div>
                <Button variant="contained"  type='submit' className='mb-3'  sx={{backgroundColor:"#176B87",color:"white"}}>
                ADD
                </Button>
            </form>
            </MDBTabsPane>
            <MDBTabsPane show={loginRegisterActive === 'Expense'}>
            <form method='Post' onSubmit={handleSubmit2}>
                {/* Income */}
                <TextField fullWidth={true}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
                variant="filled"
                label="AMOUNT"
                onChange={e => handleChange2({ eamount: e.target.value })} 
                value={expenseinfo.iamount}
                name='eamount' 
                className='mb-3' 
                type='number' 
                id='form7Example1'/>
               <TextField fullWidth={true}
               label="DESCRIPTION"
                className='mb-3' 
                onChange={e => handleChange2({ edescription: e.target.value })}  
                value={expenseinfo.edescription} 
                type='text' 
                name='edescription' 
                id='form7Example2'  />
                <Button variant="contained"  type='submit' className='mb-3' sx={{backgroundColor:"#176B87",color:"white"}} >
                ADD
                </Button>
            </form>
            </MDBTabsPane>
        </MDBTabsContent>
        
        </div>
        </div>
        </div>
    
    );

};

