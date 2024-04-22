import { useState, useContext } from "react"
import { Formik, Field, Form } from 'formik';

import axios from 'axios';
import { API } from '../api';
import { AuthContext } from "../contexts/AuthContexts"

export function JobCreate() {
    const [loading, setLoading] = useState(false)
    const { user: { token } } = useContext(AuthContext)


    function handleSubmit(values) {
        console.log(values)
        setLoading(true)
        axios.post(API.jobs.create, values, {
            headers: {
                "Authorization": `Token ${token}`
            }
        })
            .then(res => {
                console.log(res.data);
            })
            .finally(() => {
                setLoading(false)
            })


    }

    return (
        <div>
            {loading && "Loading..."}
            <Formik
                initialValues={{
                    title: '',
                    company_name: '',
                    company_website: '',
                    location: '',
                    salary: ''
                }}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                    <Form>

                        {/* <label htmlFor="title">Title</label>
                        <Field id="title" name="title" placeholder="Software developer" /> */}
                        <Field name="title">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Title</span>
                                    <input {...field} type="text" className="mt-1 block w-full rounded-md" placeholder="Software developer"
                                        style={
                                            form.touched.title && form.errors.title ? (
                                            { border: '2px solid var(--primary-red' }
                                        ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                        {/* {errors.title && touched.title ? (
                            <div>{errors.title}</div>
                        ) : null} */}

                        {/* <label htmlFor="company_name">Company Name</label>
                        <Field id="companyName" name="company_name" placeholder="Facebook" /> */}
                        <Field name="company_name">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Facebook</span>
                                    <input {...field} type="text" className="mt-1 block w-full rounded-md" placeholder="Facebook"
                                        style={
                                            form.touched.company_name && form.errors.company_name ? (
                                            { border: '2px solid var(--primary-red' }
                                        ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                        {/* {errors.company_name && touched.company_name ? (
                            <div>{errors.company_name}</div>
                        ) : null} */}

                        {/* <label htmlFor="company_website">Company Website URL</label>
                        <Field id="companyWebsite" name="company_website" placeholder="https://www..." /> */}
                        <Field name="company_website">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Company Website URL</span>
                                    <input {...field} type="text" className="mt-1 block w-full rounded-md" placeholder="https://www..."
                                        style={
                                            form.touched.company_website && form.errors.company_website ? (
                                            { border: '2px solid var(--primary-red' }
                                        ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                        {/* {errors.company_website && touched.company_website ? (
                            <div>{errors.company_website}</div>
                        ) : null} */}

                        {/* <label htmlFor="location">Location</label>
                        <Field id="location" name="location" placeholder="USA" /> */}
                        <Field name="location">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Location</span>
                                    <input {...field} type="text" className="mt-1 block w-full rounded-md" placeholder="USA"
                                        style={
                                            form.touched.location && form.errors.location ? (
                                            { border: '2px solid var(--primary-red' }
                                        ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                        {/* {errors.location && touched.location ? (
                            <div>{errors.location}</div>
                        ) : null} */}

                        {/* <label htmlFor="salary">Salary</label>
                        <Field type='number' id="salary" name="salary" /> */}
                        <Field name="salary">
                            {({ field, form }) => (
                                <label className="block mt-3">
                                    <span className="text-gray-700">Salary</span>
                                    <input {...field} type="number" className="mt-1 block w-full rounded-md"
                                        style={
                                            form.touched.salary && form.errors.salary ? (
                                            { border: '2px solid var(--primary-red' }
                                        ) : null
                                        }
                                    />

                                </label>
                            )}
                        </Field>
                        {/* {errors.salary && touched.salary ? (
                            <div>{errors.salary}</div>
                        ) : null} */}

                        <div className="mt-2">
                        <button className="bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200" type="submit">Submit</button>
                        </div>
                    </Form>
                )}



            </Formik>
        </div>
    )
}
