import {useState }from 'react';
import contact from "./contact.jpg"
import { useAuth } from '../Context_api';
import Footer from './Footer';




function Contact() {
    const [state, setState] = useState({
        email: "", 
        username: "" ,
        msg: "",      
    });

    const handleOnChange = (e) => {
        let { name, value } = e.target;
        setState({
            ...state,
            [name]: value
        });
    };

     const [userdata , setuserdata] = useState(true)
    const {storeTokenInLS}  = useAuth();
    const {user} = useAuth();

    if (userdata && user ){
        setState({ 
            username:user.username,
            email:user.email,
            msg: ""
        })
        setuserdata(false)
        

 }
    
    const handleSubmit = async (e) => {
        e.preventDefault(); 
        console.log("Form Submitted", state);
        try{
        const response =  await  fetch(`http://localhost:8080/api/form/contactForm`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(state)
            
        });
        if (!response.ok) {
            throw new Error("Failed to submit the form");
          }
         else{
            setState({ email: "", username: "", msg: "" });
            const res_data = await response.json();
            console.log('token',res_data.token);
            storeTokenInLS(res_data.token);
            alert('Thank you for contacting us')


         }
          
        }
      catch(error){
        console.log("fetch error",error)

       }
    };

  return (
    <>
    <div className="bg-black text-white min-vh-100 d-flex align-items-center">
  <div className="container">
    <div className="row align-items-center">

      <div className="col-md-6 text-center">
        <img src={contact} alt="Contact" width={600} height={700} />
      </div>

      
      <div className="col-md-3">
        <h1 className="fs-1">Contact Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleUsername" className="form-label fs-5">Username</label>
            <input
              name="username"
              type="text"
              className="form-control"
              id="exampleUsername"
              value={state.username}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleEmail" className="form-label fs-5">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleEmail"
              value={state.email}
              onChange={handleOnChange}
              autoComplete="off"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleMessage" className="form-label fs-5">Comment</label>
            <textarea
              name="msg"
              className="form-control"
              id="exampleMessage"
              value={state.msg}
              onChange={handleOnChange}
              autoComplete="off"
              rows="5"
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary fs-5">Submit</button>
        </form>
      </div>
    </div>
  </div>
</div>

</>

  )
}

export default Contact
