import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { useParams } from 'react-router';

const stripePromise = loadStripe("pk_test_6pRNASCoBOKtIshFeQd4XMUh");

const Payment = () => {

    const {id} = useParams();

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm id={id} />
        </Elements>
    );
};

export default Payment;