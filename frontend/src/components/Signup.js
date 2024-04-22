import {  useState } from "react"           //useContext,
import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { API } from '../api';
// import { AuthContext } from "../contexts/AuthContexts";
// import { useNavigate } from "react-router-dom"

export function Signup() {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    // const { login } = useContext(AuthContext)
    // const navigate = useNavigate()


    function handleSubmit(values, { resetForm }) {
        setLoading(true)
        axios.post(API.auth.signup, values)
            .then(res => {
                resetForm()
                setSuccess(true)

            })
            .finally(() => setLoading(false))

    }

    return (
        <div>
            {success && "You will receive a varification email."}
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    email: '',
                    password1: '',
                    password2: '',
                }}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                    <Form>

                        
                        
                        <Field name="email">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Email</span>
                                    <input {...field} type="email" className="mt-1 block w-full rounded-md" placeholder="Email"
                                        style={
                                            form.touched.email && form.errors.email ? (
                                                { border: '2px solid var(--primary-red' }
                                            ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                       

                        <Field name="password1">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Password</span>
                                    <input {...field} type="Password" className="mt-1 block w-full rounded-md"
                                        style={
                                            form.touched.password1 && form.errors.password1 ? (
                                                { border: '2px solid var(--primary-red' }
                                            ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>

                        <Field name="password2">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Confirm_Password</span>
                                    <input {...field} type="Password" className="mt-1 block w-full rounded-md"
                                        style={
                                            form.touched.password2 && form.errors.password2 ? (
                                                { border: '2px solid var(--primary-red' }
                                            ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                      


                        <div className="mt-2">
                            <button className="bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200" type="submit">Submit</button>
                        </div>
                    </Form>
                )}



            </Formik>
        </div>
    )
}
