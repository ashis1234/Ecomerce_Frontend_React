import React from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';
import { Container } from '@material-ui/core';
import axios from 'axios';
import { useHistory } from 'react-router';
import messageArr from '../utils/message';

export default function Payment(props){
    const price = props.price;
    const orderId = props.orderId;
    const AddressId = props.AddressId 
    const history = useHistory()
    const SetCartCount = props.SetCartCount
    console.log(props)

    const onSuccess = (payment) => {
        axios.post('http://127.0.0.1:8000/orders/transaction/',{
            username:localStorage.getItem('username'),
            order_id:orderId,
            address_id:AddressId,
            paymentID:payment.paymentID,
            paymentToken:payment.paymentToken,
        }).then((response)=>{
            console.log(response.data);
            messageArr.push({"status":'success','body':'Transaction Succesfully Completed!!'})
            history.push('/');
        });
    }


    const onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
        console.log("Error!", err);
    }
    let env = 'sandbox'; 
    let currency = 'USD'; 
    const client = {
        sandbox:    'Aak1YmiKDS5oOx8pnZbVYkBXy-8ANxyRt-Cglt8Nt8KrNiJd4Cya1lrmK0mZrBBNEsz34Jgv1lbJdODY',
        production: 'YOUR-PRODUCTION-APP-ID',
    }
    return (
        <Container>
        <PaypalExpressBtn style= {{
                size: 'large',
                color: 'gold',
                shape: 'pill',
                label: 'checkout'
            }}
            env={env} 
            client={client} 
            currency={currency} 
            total={price} 
            onError={onError} 
            onSuccess={onSuccess} 
            onCancel={onCancel} />
        </Container>
     );
    
}