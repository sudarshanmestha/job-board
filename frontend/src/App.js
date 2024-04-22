
import { React, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route, 
  Navigate
} from "react-router-dom";

import { JobList } from "./components/JobList";
import { JobDetail } from "./components/JobDetail";
import { JobCreate } from "./components/JobCreate";
import { AuthContext, AuthContextProvider } from './contexts/AuthContexts';
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { ConfirmEmail } from "./components/ConfirmEmail";
import { Navbar } from "./components/Navbar";
import {JobUpdate} from "./components/JobUpdate"
import {JobDelete} from "./components/JobDelete"
import { Payment } from "./components/Payment";





function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext)
  return user ? children : <Navigate replace to="/login" />
}





export default function App() {




  return (
    <Router>
      <AuthContextProvider>
          <div>
            <Navbar />

            <hr />

            {/*
            A <Switch> looks through all its children <Route>
            elements and renders the first one whose path
            matches the current URL. Use a <Switch> any time
            you have multiple routes, but you want only one
            of them to render at a time
          */}
            <div className="max-w-4xl mx-auto py-5 px-4">
            <Routes>
              <Route path="/" element={<JobList />} exact />
              <Route path="/login" element={<Login />} exact />
              <Route path="/signup" element={<Signup />} exact />
              <Route path="/accounts/confirm-email/:key" element={<ConfirmEmail />} exact />
              <Route path="/create-job" element={<PrivateRoute><JobCreate /></PrivateRoute>} exact />
              <Route path="/jobs/:id" element={<PrivateRoute><JobDetail /></PrivateRoute>} exact />
              <Route path="/jobs/:id/update" element={<PrivateRoute><JobUpdate /></PrivateRoute>} exact />
              <Route path="/jobs/:id/delete" element={<PrivateRoute><JobDelete /></PrivateRoute>} exact />

              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/payment" element={<PrivateRoute><Payment /></PrivateRoute>} />
            </Routes>
            </div>
          </div>
      </AuthContextProvider>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.



function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
