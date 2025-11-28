import { use, useState } from "react";
import registration from "./re.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context_api";

function Registration() {
    const [state, setState] = useState({
        username: "",
        email: "",
        phn_no: "",  
        pass: ""       
    });

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };
    const navigate= useNavigate();
    const storeTokenInLS=useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Form Submitted", state);

       
        const formattedData = {
            username: state.username,
            email: state.email,
            phn_no: Number(state.phn_no), 
            pass: state.pass 
        };

        try {
            const response = await fetch("https://smpa-backend-2.onrender.com/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) {
                throw new Error("Failed to submit the form");
            } else {
                console.log("Registration successful");
                setState({ email: "", username: "", phn_no: "", pass: "" });
                alert("Registration successful")
                navigate("/login")
                const  res_data = await response.token;
                storeTokenInLS(res_data)
                

            }
        } catch (error) {
            console.log("Fetch error:", error);
        }
    };

    return (
          <div
    className="d-flex justify-content-center align-items-center min-vh-100"
    style={{
      backgroundImage: `url(${registration})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <form
      onSubmit={handleSubmit}
      className="p-4 text-white"
      style={{
        width: "100%",
        maxWidth: "350px",
        backgroundColor: "transparent",
        border: "none",
        marginTop:"10px"
      }}
    >
      <h2 className="text-center mb-4">REGISTER</h2>

      <div className="mb-3">
        <label className="form-label text-white">Username</label>
        <input
          name="username"
          type="text"
          className="form-control bg-transparent text-white border-white"
          value={state.username}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-white">Email</label>
        <input
          name="email"
          type="email"
          className="form-control bg-transparent text-white border-white"
          value={state.email}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-white">Phone</label>
        <input
          name="phn_no"
          type="number"
          className="form-control bg-transparent text-white border-white"
          value={state.phn_no}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label text-white">Password</label>
        <input
          name="pass"
          type="password"
          className="form-control bg-transparent text-white border-white"
          value={state.pass}
          onChange={handleOnChange}
          required
        />
      </div>

      <div className="text-center">
        <button type="submit" className="btn btn-light w-100">
          Submit
        </button>
      </div>
    </form>
  </div>
    );
}

export default Registration;
