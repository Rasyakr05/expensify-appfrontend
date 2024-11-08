import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import TableHead from '@mui/material/TableHead';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";
import { NavBar } from '../components/navbar';
import { Button } from '@mui/material';
import { MDBContainer, MDBTable, MDBTableHead, MDBTableBody, MDBBadge, MDBBtn } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useGetUserID } from "../hooks/useGetUserID";

export const Home = () => {
  const userID = useGetUserID();
  const navigate = useNavigate();
  const add = () => {
    navigate('/add');
  };
  const updateincome = () => {
    navigate('/updateincome');
  };
  const updateexpense = () => {
    navigate('/updateexpense');
  };
  const [incomeinfo, setIncomeinfo] = useState([]);
  useEffect(() => {
    axios.get('https://budget-tracker.rovn.me/api/add/incomeget')
    // axios.get('/api/add/incomeget')
    .then(resulti => {
      // Filter income information by comparing the user ID
      const filteredIncome = resulti.data.filter(income => income.userOwner === userID);
      setIncomeinfo(filteredIncome);
    })
    .catch(error => console.error(error));
  }, [])

  const [expenseinfo, setExpenseinfo] = useState([]);
  useEffect(() => {
    axios.get('https://budget-tracker.rovn.me/api/add/expenseget')
    // axios.get('/api/add/expenseget')
      .then(resulte => {
        // Filter expense information by comparing the user ID
        const filteredExpense = resulte.data.filter(expense => expense.userOwner === userID);
        setExpenseinfo(filteredExpense);
      })
      .catch(error => console.error(error));
  }, [])

  const handleDelete1 = (id) => {
    axios.delete('https://budget-tracker.rovn.me/api/add/incomedel/'+id)
    // axios.delete('/api/add/incomedel/'+id)
    .then(res=> {console.log(res)
      window.location.reload();
    })
    .catch(err  => console.log(err))
  };
  const handleDelete2 = (id) => {
    axios.delete('https://budget-tracker.rovn.me/api/add/expensedel/'+id)
    // axios.delete('/api/add/expensedel/'+id)
    .then(res=> {console.log(res)
    window.location.reload();
    })
    .catch(err  => console.log(err))
  };
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
    // Calculate the total income
    const totalIncome = incomeinfo.reduce((total, income) => total + Number(income.iamount), 0);

    // Calculate the total expense
    const totalExpense = expenseinfo.reduce((total, expense) => total + Number(expense.eamount), 0);
  
    // Calculate the current balance
    const currentBalance = totalIncome - totalExpense;

  return (
    <div >
         {/* <style>
      {`
        body {
          
          background-image: url("https://media.istockphoto.com/id/1326516070/vector/abstract-modern-background-with-hexagon-element-and-silver-white-gradient-color.jpg?s=612x612&w=0&k=20&c=pQuqvEqotCNng1vqOnTM9J02HdLLQfWzaqilC5cgR_c=");
          margin: 0;
          padding: 0;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}
    </style> */}
        <style>
      {`
        body {
          background-color: #001C30;
          margin: 0;
          padding: 0;
        }
      `}
    </style>
      <NavBar />
      <p style={{marginLeft:"5px",marginTop:"9px",fontSize:"40px", color:"#176B87", fontFamily:"sans-serif", fontWeight: "bold" }}>Manage Your Finances with Ease</p>
     
      <div style={{display:"flex",paddingRight:"30px",justifyContent: 'flex-end'}}>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{justifyContent:"start",paddingLeft:"30px"}}>
        <Grid item  sx={{justifyContent:"start"}}>
          
      {/* <p className="fw-bold" ></p> */}
      <Item sx={{backgroundColor:"#64CCC5",color:"#001C30"}}>Current Balance : {currentBalance}</Item>
        </Grid>
        </Grid>
        </Box>
      <Button onClick={add} style={{ display:"flex",marginBottom:"10px",justifyContent:"flex-end",  transform: 'scale(1)', transition: 'none',backgroundColor:"#176B87" }} type="submit" variant="contained">
        ADD Income/Expense
      </Button>
      </div>
      

<div style={{padding:"20px"}}>
<TableContainer style={{display:"flex"}}>
  
        <section style={{ flex: '1', marginRight: '45px', backgroundColor:"#F7FFE5bf", borderRadius:"12px" }}>
       
          <div className="shadow-4 rounded-3 overflow-hidden" >
            <Table>
              <TableHead style={{ color: 'white' }}>
                
                <TableRow>
                  <TableCell>Income</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ verticalAlign: 'middle' }}>
                {incomeinfo.map((income) => (
                  <TableRow key={income.id}>
                    <TableCell>
                      <p className="fw-bold mb-1">{income.iamount}</p>
                    </TableCell>
                    <TableCell>
                      <p className="fw-bold mb-1">{income.idescription}</p>
                    </TableCell>
                    <TableCell>
                      <Link to={`/updateincome/${income._id}`} ><Button  variant="outlined" style={{ color: '#027148', borderColor: ' #027148' }}>
                        Edit
                      </Button></Link>
                      <Button onClick={(e) => handleDelete1(income._id)} variant="outlined" color="error" style={{ marginLeft: '10px' }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                           
                
              </TableBody>
            </Table>
            
          </div>
          
        </section>
        
        <section style={{ flex: '1', marginLeft: '5px', backgroundColor:"#F7FFE5bf", borderRadius:"12px"  }}>
          <div className="shadow-4 rounded-3 overflow-hidden" >
            <Table>
              <TableHead >
                <TableRow>
                  <TableCell>Expense</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ verticalAlign: 'middle' }}>
                {expenseinfo.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>
                      <p className="fw-bold mb-1">{expense.eamount}</p>
                    </TableCell>
                    <TableCell>
                      <p className="fw-bold mb-1">{expense.edescription}</p>
                    </TableCell>
                    <TableCell>
                    <Link to={`/updateexpense/${expense._id}`} ><Button  variant="outlined" style={{ color: '#027148', borderColor: ' #027148' }}>
                        Edit
                      </Button></Link>
                      <Button onClick={(e) => handleDelete2(expense._id)} variant="outlined" color="error" style={{ marginLeft: '10px' }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                  
                ))}
                
              </TableBody>
            </Table>
          </div>
        </section>
        
      </TableContainer>
                  
     
      </div>
        <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2} sx={{justifyContent:"end",paddingTop:"30px",paddingRight:"30px"}}>
        <Grid item  sx={{justifyContent:"start",boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)"}}>
          
      {/* <p className="fw-bold" ></p> */}
      <Item  sx={{backgroundColor:"#64CCC5bf",color:"#001C30",fontWeight:"bold",padding:"10px",boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)"}}>
        <p style={{textAlign:"left"}}>Total   Income    : {totalIncome}</p>
        <p style={{textAlign:"left"}}>Total   Expense   : {totalExpense}</p>
        <p style={{textAlign:"left"}}>Current Balance : {currentBalance}</p>
      </Item>
        </Grid>
        </Grid>
        
        </Box>
 
    </div>
  );
};

























