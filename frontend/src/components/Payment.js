import { useContext, useEffect, useState } from "react";
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { API } from "../api";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContexts";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe('pk_test_51Nl8NlSHmWkafoW7YY8CoZdv2kVdwjIhmqEwj8cffzZj0OrZhydxH5oLgvlaqzkuOKuE1PuQWALKZCdcTnxbioLG00xtZ0rTFV');

export function Payment() {
  const { user: { token } } = useContext(AuthContext)
  const [clientSecret, setClientSecret] = useState("");
  console.log(clientSecret)

  useEffect(() => {
      // Create PaymentIntent as soon as the page loads
      axios.post(API.payment.createPayment, {}, {
          headers: {
              "Authorization": `Token ${token}`
          }
      })
          .then(res => setClientSecret(res.data.clientSecret))
  }, [token]);

  const appearance = {
      theme: 'stripe',
  };
  const options = {
      clientSecret,
      appearance,
  };
  
  return (
      <div>
          {clientSecret && (
              <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm />
              </Elements>
          )}
      </div>
  )
}