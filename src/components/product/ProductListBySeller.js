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
import VisibilityIcon from '@material-ui/icons/Visibility';
import { Link } from 'react-router-dom';
import { Button,ButtonGroup,Modal,Tooltip,LinearProgress } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Date1 from '../utils/date'
import Tag from './Tag'


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
  

export default function ProductListSeller() {
  const classes = useStyles();
  const [Apidata, setApiData] = useState([]);
  const [modalStyle] = React.useState(getModalStyle);
  const [open,setOpen]= useState(false);
  const [deleteId,setDeleteId] = useState(0);
  const [deletedProductName,setDeletedProductName] = useState('')
  const [ok,setok] = useState(false);
  const [change,setChange] = useState(false);
  
  useEffect(() => {
    const name = localStorage.getItem('username')
      axios.get(`http://127.0.0.1:8000/products/seller/${name}`)
          .then((response) => {
              setApiData(response.data);
          })
  }, [change])
  console.log(Apidata)

  const handleClose = ()=>{
      setOpen(false);
  }
  
    const deleteProduct = ()=>{
      
      setok(true);
      axios.delete(`http://127.0.0.1:8000/products/product/${deleteId}`)
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
            to={`/product/create`}
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
            Create Product
        </Link>

        <br/><br/>
        <TableContainer component={Paper}>
        {ok && <LinearProgress/>}

        <Table className={classes.table} aria-label="customized table">

            <TableHead>
            <TableRow>
                <StyledTableCell>ProductID</StyledTableCell>
                <StyledTableCell align="right">productName</StyledTableCell>
                <StyledTableCell align="right">ProductDescription</StyledTableCell>
                <StyledTableCell align="right">Tags</StyledTableCell>
                <StyledTableCell align="right">Created At</StyledTableCell>
                <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {Apidata.map((row) => (
                <StyledTableRow key={row.id}>
                <StyledTableCell align="right">{row.id}</StyledTableCell>
                <StyledTableCell align="right">{row.title}</StyledTableCell>
                <StyledTableCell align="right">{row.description}</StyledTableCell>
                <StyledTableCell align="right"><Tag tags={row.tags}/></StyledTableCell>
                <StyledTableCell align="right"><Date1 date={row.created_at}/></StyledTableCell>
                
                <StyledTableCell align="right">
                      <Tooltip title="View Item" arrow>
                        <Link to={`/products/view/${row.id}`}><VisibilityIcon color = 'secondary'/></Link>
                      </Tooltip>
                      <Tooltip title="edit Item" arrow placement='top'>
                        <Link to={`/products/edit/${row.id}`}><EditIcon color = 'secondary'/></Link>
                      </Tooltip>
                      <Tooltip title="delete Item" arrow>
                        <span style={{cursor:'pointer'}} onClick = {()=>{setDeleteId(row.id); setDeletedProductName(row.title); setOpen(true)}}><DeleteIcon color = 'secondary'/></span>
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
                <h2 id="simple-modal-title">Delete Product</h2>
                <p id="simple-modal-description">
                    Are you sure want to delete the product with Name: <b>{deletedProductName}</b>.
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


