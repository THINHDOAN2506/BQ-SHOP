import React from "react";
import Card from "react-bootstrap/Card";
import support_1 from "../../assets/images/cardimage/support_1.png";
import support_2 from "../../assets/images/cardimage/support_2.png";
import support_3 from "../../assets/images/cardimage/support_3.png";
import support_4 from "../../assets/images/cardimage/support_4.png";
const CardImage = () => {
  return (
    <>
      <div className="row d-flex justify-content-around mx-5 mt-5 mb-3">
        <div className="col-md-3 col-sm-5 d-flex justify-content-center justify-content-center p-0">
          <Card
            style={{
              width: "98%",
              borderRadius: 20,
              backgroundImage:
                "repeating-conic-gradient(rgb(131, 131, 226) 40%, rgb(249, 130, 249) 60%)",
            }}
            className="mt-2 p-3 bg-light "
          >
            <div className="d-flex justify-content-center ">
              <Card.Img
                className="p-3 border border-2 border-danger rounded-circle"
                variant="top"
                src={support_1}
                style={{ width: "98px" }}
              />
            </div>
            <Card.Body>
              <Card.Title className="fw-bold text-center">
                Giao hàng toàn quốc
              </Card.Title>
              <Card.Text className="text-center">63 tỉnh thành</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 col-sm-5 d-flex justify-content-center p-0">
          <Card
            style={{
              width: "98%",
              borderRadius: 20,
              backgroundImage:
                "repeating-conic-gradient(rgb(131, 131, 226) 40%, rgb(249, 130, 249) 60%)",
            }}
            className="mt-2 p-3 bg-light "
          >
            <div className="d-flex justify-content-center ">
              <Card.Img
                className="p-3 border border-2 border-danger rounded-circle"
                variant="top"
                src={support_2}
                style={{ width: "98px" }}
              />
            </div>
            <Card.Body>
              <Card.Title className="fw-bold text-center">
                Thử giày tại nhà
              </Card.Title>
              <Card.Text className="text-center">
                Trước khi thanh toán
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 col-sm-5 d-flex justify-content-center p-0">
          <Card
            style={{
              width: "98%",
              borderRadius: 20,
              backgroundImage:
                "repeating-conic-gradient(rgb(131, 131, 226) 40%, rgb(249, 130, 249) 60%)",
            }}
            className="mt-2 p-3 bg-light"
          >
            <div className="d-flex justify-content-center ">
              <Card.Img
                className="p-3 border border-2 border-danger rounded-circle"
                variant="top"
                src={support_3}
                style={{ width: "98px" }}
              />
            </div>
            <Card.Body>
              <Card.Title className="fw-bold text-center">
                Đổi trả linh hoạt
              </Card.Title>
              <Card.Text className="text-center">Trong vòng 30 ngày</Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 col-sm-5 d-flex justify-content-center p-0">
          <Card
            style={{
              width: "98%",
              borderRadius: 20,
              backgroundImage:
                "repeating-conic-gradient(rgb(131, 131, 226) 40%, rgb(249, 130, 249) 60%)",
            }}
            className="mt-2 p-3 bg-light"
          >
            <div className="d-flex justify-content-center ">
              <Card.Img
                className="p-3 border border-2 border-danger rounded-circle"
                variant="top"
                src={support_4}
                style={{ width: "98px" }}
              />
            </div>
            <Card.Body>
              <Card.Title className="fw-bold text-center">
                Bảo hành miễn phí
              </Card.Title>
              <Card.Text className="text-center">
                Suốt quá trình sử dụng
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CardImage;
