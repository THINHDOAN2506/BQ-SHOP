import React from "react";
import { Card } from "react-bootstrap";
import giaythethao from "../../assets/images/productline/giaythethao.png";
import giaycaogot from "../../assets/images/productline/giaycaogot.png";
import giaytaynam from "../../assets/images/productline/giaytaynam.png";
import sandalpolo from "../../assets/images/productline/sandalpolo.png";
import botdacaocap from "../../assets/images/productline/botdacaocap.png";
import sandalda from "../../assets/images/productline/sandalda.png";

const ProductLine = () => {
  return (
    <div className="px-5">
      <section
        className="row my-5"
        style={{
          backgroundColor: "#eee",
          borderRadius: 15,
        }}
      >
        <h1
          className="text-center py-3"
          style={{
            fontWeight: 800,
            background: "#FF6347",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <i>Dòng sản phẩm</i>
        </h1>
        <div className="row d-flex justify-content-center mt-4">
          <div className="col-md-3 col-sm-6 mb-1 p-1">
            <Card
              className="p-0 mx-auto"
              style={{
                backgroundImage: "linear-gradient(purple, pink)",
                borderRadius: 30,
                cursor: "pointer",
                maxWidth: 350,
              }}
            >
              <Card.Img
                variant="center"
                src={giaythethao}
                style={{
                  borderRadius: 30,
                }}
              />
              <Card.ImgOverlay>
                <Card.Title className="text-center">
                  <strong>
                    <i>Giày Thể Thao</i>
                  </strong>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
          <div className="col-md-3 col-sm-6 mb-1 p-1">
            <Card
              className="p-0 mx-auto"
              style={{
                backgroundImage: "linear-gradient(purple, pink)",
                borderRadius: 30,
                cursor: "pointer",
                maxWidth: 350,
              }}
            >
              <Card.Img
                variant="center"
                src={botdacaocap}
                style={{
                  borderRadius: 30,
                }}
              />
              <Card.ImgOverlay>
                <Card.Title className="text-center text-nowrap">
                  <strong>
                    <i>Bốt Da Cao Cấp</i>
                  </strong>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
          <div className="col-md-3 col-sm-6 mb-1 p-1">
            <Card
              className="p-0 mx-auto"
              style={{
                backgroundImage: "linear-gradient(purple, pink)",
                borderRadius: 30,
                cursor: "pointer",
                maxWidth: 350,
              }}
            >
              <Card.Img
                variant="center"
                src={sandalpolo}
                style={{
                  borderRadius: 30,
                }}
              />
              <Card.ImgOverlay>
                <Card.Title className="text-center">
                  <strong>
                    <i>Sandal Polo</i>
                  </strong>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-3 col-sm-6  mb-1 p-1">
            <Card
              className="p-0 mx-auto"
              style={{
                backgroundImage: "linear-gradient(purple, pink)",
                borderRadius: 30,
                cursor: "pointer",
                maxWidth: 350,
              }}
            >
              <Card.Img
                variant="center"
                src={giaycaogot}
                style={{
                  borderRadius: 30,
                }}
              />
              <Card.ImgOverlay>
                <Card.Title className="text-center">
                  <strong>
                    <i>Giày Cao Gót</i>
                  </strong>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
          <div className="col-md-3 col-sm-6 mb-1 p-1">
            <Card
              className="p-0 mx-auto"
              style={{
                backgroundImage: "linear-gradient(purple, pink)",
                borderRadius: 30,
                cursor: "pointer",
                maxWidth: 350,
              }}
            >
              <Card.Img
                variant="center"
                src={sandalda}
                style={{
                  borderRadius: 30,
                }}
              />
              <Card.ImgOverlay>
                <Card.Title className="text-center">
                  <strong>
                    <i>Sandal Da</i>
                  </strong>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>

          <div className="col-md-3 col-sm-6  mb-1 p-1">
            <Card
              className="p-0 mx-auto"
              style={{
                backgroundImage: "linear-gradient(purple, pink)",
                borderRadius: 30,
                cursor: "pointer",
                maxWidth: 350,
              }}
            >
              <Card.Img
                variant="center"
                src={giaytaynam}
                style={{
                  borderRadius: 30,
                }}
              />
              <Card.ImgOverlay>
                <Card.Title className="text-center">
                  <strong>
                    <i>Giày Tây Nam</i>
                  </strong>
                </Card.Title>
              </Card.ImgOverlay>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductLine;
