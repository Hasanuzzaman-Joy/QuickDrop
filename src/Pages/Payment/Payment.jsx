import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import PaymentForm from './PaymentForm';
import { useParams } from 'react-router';

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Payment = () => {

    const {id} = useParams();

    return (
        <Elements stripe={stripePromise}>
            <PaymentForm id={id} />
        </Elements>
    );
};

export default Payment;