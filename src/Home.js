import React from "react";
import image from "./components/homeimg.jpg";
import Footer from "./components/Footer";

function Home() {
    return (
        <>
        <div className="container-fluid bg-black text-white min-vh-100 d-flex justify-content-center align-items-center pt-2">
            <div className="row w-75 align-items-center">
                
                
                <div className="col-md-6 text-center">
                    <img src={image} alt="Welcome" width={400} height={400} className="img-fluid rounded" />
                </div>

               
                <div className="col-md-6">
                    <h1 className="fw-bold fs-1">Social Media Privacy Analyzer</h1>
                    <h2 className="fw-bold fs-3">   🔍 Protect Your Privacy Online with Our Social Media Privacy Analyzer </h2>
                    
                    <p className="fs-5">
                    Are You Sharing Too Much Information Online?
                 In today’s digital world, social media platforms collect and expose more personal data than ever. Many users unknowingly share sensitive information that can be used for identity theft, cyberstalking, targeted ads, and even fraud.

                  Our Social Media Privacy Analyzer helps you take control of your online privacy by scanning your profile and providing insights on potential risks. 
                    </p>
                  
                </div>

            </div>
        </div>
        
        <div className="sticky-sm-bottom"><Footer/></div>
        </>
    );
}

export default Home;