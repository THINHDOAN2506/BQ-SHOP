import React from "react";
import banner_1 from "../../assets/images/collection/banner_1.jpg";
import banner_2 from "../../assets/images/collection/banner_2.jpg";
import banner_3 from "../../assets/images/collection/banner_3.jpg";
import { Card } from "react-bootstrap";

const Collection = () => {
  return (
    <div className="mt-5 px-5">
      <h1
        className="text-center py-3  text-success"
        style={{
          fontWeight: 800,
          background: "orange",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        <i>Bộ sưu tập</i>
      </h1>
      <div className="row d-flex justify-content-center mx-0 mt-5">
        <div className="col-md-5 mb-4">
          <Card.Img src={banner_1} />
        </div>

        <div className="col-md-5 mb-5">
          <Card.Img
            style={{ marginBottom: "5.3%", cursor: "pointer" }}
            src={banner_2}
          />
          <Card.Img src={banner_3} />
        </div>
      </div>
    </div>
  );
};

export default Collection;
