import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../shared/Loading";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useUserRole from "../../Hooks/useUserRole";

const PaymentForm = ({ id }) => {
  const { role } = useUserRole();

  const axiosSecure = useAxiosSecure();

  const { user } = useAuth();

  const navigate = useNavigate();

  const { data: parcel, isPending } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcel/${id}`);
      return res.data;
    },
  });

  const stripe = useStripe();
  const elements = useElements();

  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErr(error.message);
    } else {
      setErr("");
      // console.log(paymentMethod)
      const res = await axiosSecure.post("/createPaymentIntent", {
        amount: parcel?.cost,
      });

      const clientSecret = res.data.clientSecret;

      const { paymentIntent: confirmIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card,
            billing_details: {
              name: user?.displayName,
              email: user?.email,
            },
          },
        });

      if (confirmError) {
        setErr(confirmError.message);
      } else if (confirmIntent.status === "succeeded") {
        setErr("");
        const paymentInfo = {
          parcelId: id,
          amount: parcel.cost,
          transactionId: confirmIntent.id,
          email: user?.email,
          paid_date: new Date(),
          paid_date_string: new Date().toISOString(),
        };

        await axiosSecure.post("/payments", paymentInfo);

        const trackingId = parcel.tracking_id;
        
        // Save payment tracking log
        await axiosSecure.post(`/tracking/${trackingId}`, {
          stage: "paid",
          description: `Payment completed by ${user?.email}`,
          actorEmail: user?.email,
          actorRole: role,
        });

        Swal.fire({
          title: "Payment Successful 🎉",
          html: `Transaction ID:<br><strong>${confirmIntent.id}</strong>`,
          icon: "success",
          confirmButtonText: "OK",
        });

        navigate("/my-parcels");
      }
    }
  };

  if (isPending) return <Loading />;

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto">
        {err && <p className="text-red-500">{err}</p>}
        <CardElement />
        <button
          type="submit"
          disabled={!stripe}
          className="btn btn-primary mt-4"
        >
          Pay {parcel.cost} Taka
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
