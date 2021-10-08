import { useEffect,useState } from 'react';
import axios from 'axios';
import React from 'react';
import { withStyles,makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import { Button,ButtonGroup,Modal,Tooltip,LinearProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ToastContainer } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function rand() {
    return Math.round(Math.random() * 20) - 10;
}
  
function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  

export default function AddressList() {
  const classes = useStyles();
  const [Apidata, setApiData] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open,setOpen]= useState(false);
  const [deleteId,setDeleteId] = useState(0);
  const [deletedProductName,setDeletedProductName] = useState('')
  const [ok,setok] = useState(false);
  const [change,setChange] = useState(false);
  
  useEffect(() => {
      axios.get('http://127.0.0.1:8000/shipping/ashis/',{
      }).then((response) => {
            setApiData(response.data);
     })
  })
  console.log(Apidata)

  const handleClose = ()=>{
      setOpen(false);
  }
  
    const deleteProduct = ()=>{
      
      setok(true);
      axios.delete(`http://127.0.0.1:8000/shipping/${deleteId}`)
      .then((response)=>{
        console.log(response);
        setok(false);
        setChange(true);
    }).catch((error)=>{
            console.log(error);
      });
      handleClose();
    }

  return (
      <div> 
        <ToastContainer/> 
        <Link
            to={`/adress/create`}
            style={{
                boxShadow: 'none',
                textTransform: 'none',
                textDecoration:'none',
                fontSize: 16,
                padding: '6px 12px',
                border: '1px solid',
                lineHeight: 1.5,
                float:'right',
                paddingBottom:10,
                marginBottom:30,
                fontFamily: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    '"Helvetica Neue"',
                    'Arial',
                    'sans-serif',
                    '"Apple Color Emoji"',
                    '"Segoe UI Emoji"',
                    '"Segoe UI Symbol"',
                ].join(','),
                '&:hover': {
                    backgroundColor: '#0069d9',
                    borderColor: '#0062cc',
                    boxShadow: 'none',
                },
                '&:active': {
                    boxShadow: 'none',
                    backgroundColor: '#0062cc',
                    borderColor: '#005cbf',
                },
                '&:focus': {
                    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
                },
            }}    
        >
            ADD New Adress
        </Link>

        <br/><br/>
        <TableContainer component={Paper}>
        {ok && <LinearProgress/>}

        <Table className={classes.table} aria-label="customized table">

            <TableHead>
            <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="right">Name</StyledTableCell>
                <StyledTableCell align="right">Locality</StyledTableCell>
                <StyledTableCell align="right">Mobile</StyledTableCell>
                <StyledTableCell align="right">City</StyledTableCell>
                <StyledTableCell align="right">State</StyledTableCell>
                <StyledTableCell align="right">Landmark</StyledTableCell>
                <StyledTableCell align="right">Pincode</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {Apidata.map((row) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.name}</StyledTableCell>
                <StyledTableCell align="right">{row.locality}</StyledTableCell>
                <StyledTableCell align="right">{row.mobile}</StyledTableCell>
                <StyledTableCell align="right">{row.city}</StyledTableCell>
                <StyledTableCell align="right">{row.state}</StyledTableCell>
                <StyledTableCell align="right">{row.landmark}</StyledTableCell>
                <StyledTableCell align="right">{row.pincode}</StyledTableCell>
                
                <StyledTableCell align="right">
                      <Tooltip title="edit Item" arrow placement='top'>
                        <Link to={`/adresses/edit/${row.id}`}><EditIcon color = 'secondary'/></Link>
                      </Tooltip>
                      <Tooltip title="delete Item" arrow>
                        <span style={{cursor:'pointer'}} onClick = {()=>{setDeleteId(row.id); setDeletedProductName(row.name); setOpen(true)}}><DeleteIcon color = 'secondary'/></span>
                      </Tooltip>
                </StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
        <Modal
            open = {open}
            onClose = {handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <div style={modalStyle} className={classes.paper}>
                <h2 id="simple-modal-title">Delete Adress</h2>
                <p id="simple-modal-description">
                    Are you sure want to delete the Adress with Name: <b>{deletedProductName}</b>.
                </p>
                <ButtonGroup>
                    <Button variant = 'outlinedSecondary' onClick={handleClose}>No</Button>
                    <Button startIcon={<DeleteIcon />} variant="contained" color="secondary" onClick={deleteProduct}>Yes</Button>
                </ButtonGroup>
            </div>
        </Modal>
    </div>

  );
}


