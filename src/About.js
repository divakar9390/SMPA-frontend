import React from "react";
import aboutImage from "./components/About.jpg"; 
import Footer from "./components/Footer";

function About() {
    return (
        <>
        <div className="container-fluid bg-black text-white min-vh-100 d-flex justify-content-center align-items-center">
            <div className="row w-75 align-items-center">
            <div className="col-md-6 text-center">
                    <img src={aboutImage} alt="About Us" width={500} height={500} className="img-fluid rounded" />
                </div>
                
                
                <div className="col-md-6">
                    <h1 className="fw-bold fs-1">About us</h1>
                    <h1 className="fw-bold fs-2">Want to Secure Your Online Presence?</h1>
                    <p className="fs-3">
                    Try our Social Media Privacy Analyzer today and take control of your privacy!
                    </p>
                    <p className="fs-4">
                    The Social Media Privacy Analyzer is a tool designed to help users evaluate their online presence and identify privacy risks. Many social media platforms collect vast amounts of personal data, and users often unknowingly share sensitive information. This analyzer scans your social media profiles to provide insights on:
                    <ul>
                   <li> ✔ Data Exposure: What information about you is publicly visible?</li>
                   <li>  ✔ Privacy Settings: Are your account settings protecting your personal data? </li>
                   <li>✔ Third-Party Tracking: Who can access your data beyond the platform?</li>
                   <li>✔ Risk Factors: Identifies possible privacy vulnerabilities in your profile. </li>
                    </ul>


                    </p>
                </div>

                
                

            </div>
            </div>
            <div className="sticky-sm-bottom"><Footer/></div>
        
        </>
    );
}

export default About;