import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Footer from '../../components/footer/Footer';
import './aboutus.css' 
function AboutUs() {
  return (
    <div>
        <Navbar/>
        <div className="about">
    <h2>About us</h2>
    <h3>  Leading in the 3D world  </h3>
    <p> Welcome to your brand name! We've revolutionized the world of footwear by combining 3D technology and innovative design. Here you'll examine every shoe model from every angle and in unparalleled detail, 
      as if you were holding it in your hand! </p>
    
    <ul>why us?
    <li>Interactive shopping experience: Touch the shoes up close with 360-degree technology and 3D viewing.</li>
    <li>Precision and quality: Every stitch, texture, and material is displayed with high precision.</li>
    <li>Unparalleled variety: From sporty to classic, every taste can be found here.</li>
    </ul>
</div>
     <Footer/>
    </div>
  );
}

export default AboutUs;
