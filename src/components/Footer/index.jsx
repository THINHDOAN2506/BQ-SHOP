import React from "react";
import { Card } from "react-bootstrap/esm";
import logoFooter from "../../assets/images/icon/logoFooter.png";

const Footer = () => {
  return (
    <div>
      <div className="d-flex justify-content-around align-items-center bg-secondary p-3 ">
        <blockquote>
          Copyright ©2022 | All rights reserved | Công ty TNHH Sản xuất - Thương
          mại BQ
        </blockquote>

        <Card.Img src={logoFooter} style={{ width: 150, cursor: "pointer" }} />
      </div>
    </div>
  );
};

export default Footer;
