import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context_api";
import bgImage from "./re.png"; // your background image

function Login() {
  const [state, setState] = useState({ email: "", pass: "" });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`https://smpa-backend-2.onrender.com/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      const res_data = await response.json();

      if (response.ok && res_data.token) {
        storeTokenInLS(res_data.token);
        setState({ email: "", pass: "" });
        alert("Login successful!");
        navigate("/analyze");
      } else {
        alert("Invalid login credentials");
      }
    } catch (error) {
      alert("Login failed. Please try again.");
      console.error(error);
    }
  };

  return (
   <div
  className="d-flex align-items-center justify-content-center min-vh-100"
  style={{
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
  <div className="p-5 rounded shadow" style={{ width: "100%", maxWidth: "400px" }}>
    <h2 className="mb-4 text-center text-white">Login</h2>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleEmail" className="form-label text-white">Email address</label>
        <input
          name="email"
          type="email"
          className="form-control"
          id="exampleEmail"
          value={state.email}
          onChange={handleOnChange}
          autoComplete="off"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="examplePassword" className="form-label text-white">Password</label>
        <input
          name="pass"
          type="password"
          className="form-control"
          id="examplePassword"
          value={state.pass}
          onChange={handleOnChange}
          autoComplete="off"
          required
        />
      </div>
      <button type="submit" className="btn btn-light w-100">Login</button>
    </form>
  </div>
</div>

  );
}

export default Login;
