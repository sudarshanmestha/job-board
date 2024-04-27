import { useState, useContext, useEffect } from "react";
import { Formik, Field, Form } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API } from "../api";
import { AuthContext } from "../contexts/AuthContexts";

function ImagePreview({ file }) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }, [file]);

  return (
    <div>
      {!imageSrc && "Loading..."}
      {imageSrc && (
        <img src={imageSrc} className="h-20 w-20 px-3 py-3" alt={file.name} />
      )}
    </div>
  );
}

export function JobCreate() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const {
    user: { token },
  } = useContext(AuthContext);

  function handleSubmit(values) {
    setLoading(true);
    const data = new FormData();
    data.append("company_logo", file);
    data.append("title", values.title);
    data.append("company_name", values.company_name);
    data.append("company_website", values.company_website);
    data.append("location", values.location);
    data.append("salary", values.salary);
    data.append("available", values.available); 
    data.append("remote", values.remote); 
    axios
      .post(API.jobs.create, data, {
        headers: {
          Authorization: `Token ${token}`,
        },
      })
      .then((res) => {
        navigate("/");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div>
      {loading && "Loading..."}
      <Formik
        initialValues={{
          title: "sotfware developer",
          company_name: "JustPython",
          company_logo: "",
          company_website: "https://justpython.in",
          location: "Udupi",
          salary: "18000",
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

            <div className="flex item-center">
              <label className="block mt-3">
                <span className="text-gray-700">Company Logo</span>
                <input
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  className="mt-1 block w-full rounded-md"
                />
              </label>
              <div className="flex">{file && <ImagePreview file={file} />}</div>
            </div>

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
                <label className="block mt-3 mb-3">
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
    </div>
  );
}
