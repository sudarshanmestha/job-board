import { useContext, useEffect, useState } from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { API } from "../api";
import axios from "axios";
import { AuthContext } from "../contexts/AuthContexts";
import { useParams } from "react-router"
import { useNavigate } from "react-router-dom"
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export function Payment() {
  const [job, setJob] = useState(null)
  const navigate = useNavigate()
  const [clientSecret, setClientSecret] = useState("");
  const [canSponsor, setCansponsor] = useState(false)
  const { user: { token } } = useContext(AuthContext)
  const { id } = useParams()

  useEffect(() => {
    if (job && !job.is_owner) {
      navigate('/')
    }
    return () => null
  })




  useEffect(() => {
    async function fetchJob() {
      try {
        axios.get(API.jobs.retrieve(id), {
          headers: {
            "Authorization": `Token ${token}`
          }
        })
        .then((res) => {
          setJob(res.data);
        }) 

      } catch (e) {
        console.log(e)
      }
    }
    // Create PaymentIntent as soon as the page loads
    async function createPayment() {
      try {
        const res = await axios.post(
          API.payment.createPayment,
          { job_id: id },
          {
            headers: { "Authorization": `Token ${token}` }
          })
        setClientSecret(res.data.clientSecret)
      } catch (e) {
        console.log(e)
      }
    }

    async function fetchSponsoredJobCount() {
      try {
        const res = await axios.get(
          API.jobs.sponsoredJobCount,
          {
            headers: { "Authorization": `Token ${token}` }
          })
        setCansponsor(res.data.job_count < 3)
        console.log(res.data)
      }
      catch (e) {
        console.log(e)
      }
    }

    createPayment()
    fetchSponsoredJobCount()
    fetchJob();
    return () => null
  }, [token, id]);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      {!canSponsor && (
        <div className="text-gray-600">
          <p>We already have 3 sponsored post . Please check back in a few days for an open slot.</p>
        </div>
      )}
      {clientSecret && canSponsor && (
        <Elements stripe={stripePromise} options={options}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}