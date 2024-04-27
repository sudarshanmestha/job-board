import { useEffect, useState, useContext } from "react";
import { Formik, Field, Form } from "formik";

import axios from "axios";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContexts";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

export function JobUpdate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingJob, setLoadingJob] = useState(false);
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const {
    user: { token },
  } = useContext(AuthContext);

  useEffect(() => {
    if (job && !job.is_owner) {
      navigate("/");
    }
  });

  useEffect(() => {
    function fetchJob() {
      axios
        .get(API.jobs.retrieve(id), {
          headers: {
            Authorization: `Token ${token}`,
          },
        })
        .then((res) => {
          setJob(res.data);
        })
        .finally(() => {
          setLoadingJob(false);
        });
    }
    fetchJob();
    return () => null;
  }, [id, token]);
  console.log(job);

  function handleSubmit(values) {
    setLoadingJob(true);
    axios
      .put(API.jobs.update(id), values, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        navigate(`/jobs/${id}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {loading && "Submitting..."}
      {loadingJob && "Fetching Job Details...."}
      {job && (
        <Formik
          initialValues={{
            title: job.title,
            company_name: job.company_name,
            company_website: job.company_website,
            location: job.location,
            salary: job.salary,
            available: true,
            remote: false,
          }}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field name="title">
                {({ field, form }) => (
                  <label className="block mt-3">
                    <span className="text-gray-700">Title</span>
                    <input
                      {...field}
                      type="text"
                      className="mt-1 block w-full rounded-md"
                      placeholder="Software developer"
                      style={
                        form.touched.title && form.errors.title
                          ? { border: "2px solid var(--primary-red" }
                          : null
                      }
                    />
                  </label>
                )}
              </Field>

              <Field name="company_name">
                {({ field, form }) => (
                  <label className="block mt-3">
                    <span className="text-gray-700">Facebook</span>
                    <input
                      {...field}
                      type="text"
                      className="mt-1 block w-full rounded-md"
                      placeholder="Facebook"
                      style={
                        form.touched.company_name && form.errors.company_name
                          ? { border: "2px solid var(--primary-red" }
                          : null
                      }
                    />
                  </label>
                )}
              </Field>

              <Field name="company_website">
                {({ field, form }) => (
                  <label className="block mt-3">
                    <span className="text-gray-700">Company Website URL</span>
                    <input
                      {...field}
                      type="text"
                      className="mt-1 block w-full rounded-md"
                      placeholder="https://www..."
                      style={
                        form.touched.company_website &&
                        form.errors.company_website
                          ? { border: "2px solid var(--primary-red" }
                          : null
                      }
                    />
                  </label>
                )}
              </Field>

              <Field name="location">
                {({ field, form }) => (
                  <label className="block mt-3">
                    <span className="text-gray-700">Location</span>
                    <input
                      {...field}
                      type="text"
                      className="mt-1 block w-full rounded-md"
                      placeholder="USA"
                      style={
                        form.touched.location && form.errors.location
                          ? { border: "2px solid var(--primary-red" }
                          : null
                      }
                    />
                  </label>
                )}
              </Field>

              <Field name="salary">
                {({ field, form }) => (
                  <label className="block mt-3">
                    <span className="text-gray-700">Salary</span>
                    <input
                      {...field}
                      type="number"
                      className="mt-1 block w-full rounded-md"
                      style={
                        form.touched.salary && form.errors.salary
                          ? { border: "2px solid var(--primary-red" }
                          : null
                      }
                    />
                  </label>
                )}
              </Field>

              <Field name="available">
                {({ field, form }) => (
                  <div className="block">
                    <div className="mt-2">
                      <label class="inline-flex items-center">
                        <input
                          {...field}
                          type="checkbox"
                          checked={form.values.available}
                          class="rounded bg-gray-400 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                          style={
                            form.touched.available && form.errors.available
                              ? { border: "2px solid var(--primary-red" }
                              : null
                          }
                        />
                        <span class="ml-2">Available</span>
                      </label>
                    </div>
                  </div>
                )}
              </Field>

              <Field name="remote">
                {({ field, form }) => (
                  <div className="block">
                    <div className="mt-2">
                      <label class="inline-flex items-center">
                        <input
                          {...field}
                          type="checkbox"
                          class="rounded bg-gray-400 border-transparent focus:border-transparent focus:bg-gray-200 text-gray-700 focus:ring-1 focus:ring-offset-2 focus:ring-gray-500"
                          style={
                            form.touched.remote && form.errors.remote
                              ? { border: "2px solid var(--primary-red" }
                              : null
                          }
                        />
                        <span class="ml-2">remote</span>
                      </label>
                    </div>
                  </div>
                )}
              </Field>

              <div className="mt-2">
                <button
                  className="bg-blue-100 rounded-md shadow-sm text-lg px-5 py-3 hover:bg-blue-200"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
