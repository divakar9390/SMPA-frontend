import React from "react";

function Footer() {
  return (
    <footer style={{ backgroundColor: "black", color: "white", padding: "20px 0", textAlign: "center" }}>
      <div className="container">
        <div className="row">
        
          <div className="col-md-6">
            <h5>Privacy & Security</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li><a href="/privacy-policy" className="text-white">Privacy Policy</a></li>
              <li><a href="/terms" className="text-white">Terms of Service</a></li>
              <li><a href="/faqs" className="text-white">FAQs</a></li>
            </ul>
          </div>

         
          <div className="col-md-6">
            <h5>Follow Us</h5>

        
            
            <li><a href="https://www.facebook.com">https://www.facebook.com</a></li>
            <li><a href="https://www.instagram.com">https://www.instagram.com</a></li>
           <li> <a href="https://x.com">https://x.com</a></li>
            
           
          </div>
        </div>

        <hr style={{ backgroundColor: "white" }} />

        <p>© 2025 Social Media Privacy Analyzer. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;