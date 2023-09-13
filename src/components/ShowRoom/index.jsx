import React from "react";
import { Button, Card } from "react-bootstrap";
import { CgPlayTrackNext } from "react-icons/cg";
import rectangle_1 from "../../assets/images/showroom/rectangle_1.png";
import rectangle_2 from "../../assets/images/showroom/rectangle_2.png";

const ShowRoom = () => {
  return (
    <div>
      <div className="row my-4 mx-5">
        <div
          className="d-flex justify-content-around"
          style={{
            background: "#6A5ACD",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <h1
            className="text-center py-3 text-danger"
            style={{ fontWeight: 800 }}
          >
            <i>Hệ Thống Showroom</i>
          </h1>

          <div className="d-flex align-items-center">
            <Button variant="outline-dark" className="border-0">
              Xem địa chỉ hệ thống showroom
              <CgPlayTrackNext />
            </Button>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center mx-5">
        <div className="row d-flex justify-content-around mx-0">
          <div className="col-md-8 col-sm-12 mb-3">
            <Card.Img
              src={rectangle_1}
              style={{
                height: 500,
                padding: 5,
              }}
            />
          </div>
          <div className="col-md-4 col-sm-8 mx-auto">
            <Card.Img
              style={{
                height: 500,
                padding: 5,
                borderRadius: 25,
              }}
              src={rectangle_2}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowRoom;
