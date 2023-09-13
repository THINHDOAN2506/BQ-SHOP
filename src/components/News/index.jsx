import React from "react";
import { Card } from "react-bootstrap";
import poster_1 from "../../assets/images/news/poster_1.jpg";
import poster_2 from "../../assets/images/news/poster_2.jpg";
import poster_3 from "../../assets/images/news/poster_3.jpg";
import poster_4 from "../../assets/images/news/poster_4.jpg";

const News = () => {
  return (
    <div className="px-5">
      <h1
        className="text-center py-3 text-info"
        style={{
          fontWeight: 800,
          background: "purple",
          borderTopRightRadius: 15,
          borderTopLeftRadius: 15,
        }}
      >
        <i>Tin tức</i>
      </h1>
      <div className="d-flex justify-content-between px-3 mt-5 row">
        <div className="col-md-3 col-sm-6 d-flex justify-content-center">
          <Card
            style={{
              width: "22rem",
              cursor: "pointer",
              borderRadius: 30,
              backgroundImage:
                "linear-gradient(rgb(253, 94, 253), rgb(239, 249, 131))",
            }}
          >
            <Card.Img
              variant="center"
              src={poster_1}
              style={{ borderRadius: 30 }}
            />
            <Card.Body
              style={{
                borderBottomRightRadius: 30,
                borderBottomLelttRadius: 30,
                textAlign: "center",
              }}
            >
              <h6>ƯU ĐÃI GIỜ VÀNG TỪ 18H00: MUA 2 TẶNG 1</h6>
              <p style={{ fontSize: 14 }}>
                Lan tỏa sức nóng ngày hè, Giày BQ mang đến cho Quý khách hàng
                chương trình ưu đãi cực sốc khi mua...
              </p>
            </Card.Body>
          </Card>
        </div>
        <div className="col-md-3 col-sm-6 d-flex justify-content-center">
          <Card
            style={{
              width: "22rem",
              cursor: "pointer",
              borderRadius: 30,
              backgroundImage:
                "linear-gradient(rgb(253, 94, 253), rgba(120, 245, 158, 0.785))",
            }}
          >
            <Card.Img
              variant="center"
              src={poster_2}
              style={{ borderRadius: 30 }}
            />
            <Card.Body
              style={{
                borderBottomRightRadius: 30,
                borderBottomLelttRadius: 30,
                textAlign: "center",
              }}
            >
              <h6>CÙNG GIÀY BQ "LAN TỎA YÊU THƯƠNG" TẠI TRUNG TÂM BẢO ...</h6>
              <p style={{ fontSize: 14 }}>
                Từ thông điệp ý nghĩa của chương trình ''XUÂN YÊU THƯƠNG - SẺ
                CHIA HẠNH PHÚC'' diễn ra từ ngày 18/01...
              </p>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 col-sm-6 d-flex justify-content-center">
          <Card
            style={{
              width: "22rem",
              cursor: "pointer",
              borderRadius: 30,
              backgroundImage:
                "linear-gradient(rgb(253, 94, 253), rgb(239, 249, 131))",
            }}
          >
            <Card.Img
              variant="center"
              src={poster_3}
              style={{ borderRadius: 30 }}
            />
            <Card.Body
              style={{
                borderBottomRightRadius: 30,
                borderBottomLelttRadius: 30,
                textAlign: "center",
              }}
            >
              <h6>
                GIÀY BQ ĐỒNG HÀNH CÙNG VÒNG CHUNG KẾT CUỘC THI SINH VIÊN ...
              </h6>
              <p style={{ fontSize: 14 }}>
                THƯƠNG HIỆU GIÀY VIỆT - TÔN VINH VẺ ĐẸP VIỆT, Giày BQ hân hạnh
                là Nhà tài trợ Đồng hành cùng cuộc...
              </p>
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-3 col-sm-6 d-flex justify-content-center">
          <Card
            style={{
              width: "22rem",
              cursor: "pointer",
              borderRadius: 30,
              backgroundImage:
                "linear-gradient(rgb(253, 94, 253), rgba(120, 245, 158, 0.785))",
            }}
          >
            <Card.Img
              variant="center"
              src={poster_4}
              style={{ borderRadius: 30 }}
            />
            <Card.Body
              style={{
                borderBottomRightRadius: 30,
                borderBottomLelttRadius: 30,
                textAlign: "center",
              }}
            >
              <h6>ĐÓN HÈ NĂNG ĐỘNG, NGẬP TRÀN ƯU ĐÃI CÙNG GIÀY BQ</h6>
              <p style={{ fontSize: 14 }}>
                Mùa hè đã đến - thời điểm mà dòng sản phẩm giày thể thao đang
                rất được các tín đồ thời trang ưa...
              </p>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default News;
