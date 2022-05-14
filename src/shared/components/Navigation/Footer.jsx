import React from 'react';
import "./Footer.css";
import { FiInstagram, FiFacebook, FiTwitter } from "react-icons/fi";
import logo from "./navimage/logo.png"
const Footer = () => {
    return (
        <div className="center footerCtl" >
            <div className='testtt'>
            <h2 className="testt">Come find us on <FiInstagram/>, <FiFacebook/> and <FiTwitter/> </h2>
            <p className="testt">Copyright © Steven Garman </p>
            </div>
        </div>
    );
};

export default Footer;