import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import Loading from '../shared/Loading';

const PaymentForm = ({id}) => {

    const axiosSecure = useAxiosSecure();
    
    const{data:parcel, isPending} = useQuery({
        queryKey:["parcel", id],
        queryFn: async() =>{
            const res = await axiosSecure.get(`/parcel/${id}`)
            return res.data;
        }
    })

    console.log(parcel)

    const stripe = useStripe();
    const elements = useElements();

    const[err, setErr] = useState("")

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type:"card",
            card
        })
        
        if(error){
            setErr(error.message);
        }
        else{
            setErr("");
            // console.log(paymentMethod)
            const res = await axiosSecure.post("/paymentIntent",{
                amount : parcel?.cost
            })
            console.log(res.data)
        }
    }

    if(isPending) return <Loading />

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
            {err && <p className='text-red-500'>{err}</p>}
                <CardElement />
                <button type='submit' disabled={!stripe} className="btn btn-primary mt-4">
                    Pay {parcel.cost} Taka
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;