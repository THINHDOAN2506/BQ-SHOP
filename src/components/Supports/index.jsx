import React from "react";
import { Button, Card } from "react-bootstrap";
import logobq from "../../assets/images/logobq.png";
import footer_baner from "../../assets/images/footer_baner.png";
import {
  FaFacebook,
  FaInstagramSquare,
  FaTiktok,
  FaYoutubeSquare,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { AiOutlineVerticalAlignTop } from "react-icons/ai";

const Supports = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div>
      <div className="row mx-0 mt-3 p-3">
        <div className="col-md-1 col-sm-0"></div>
        <div className="col-md-4 col-sm-8 mb-2">
          <Card.Img src={logobq} style={{ width: 92, marginLeft: -18 }} />
          <p className="me-2 pe-3">
            Giày BQ trân trọng được mang đến trải nghiệm tự tin, khơi gợi cảm
            hứng và cùng đồng hành kiến tạo mái ấm gia đình Việt
          </p>
          <div className="d-flex flex-nowrap">
            <FaFacebook
              style={{
                width: 30,
                height: 30,
                cursor: "pointer",
                marginRight: 5,
              }}
            />
            <FaInstagramSquare
              style={{
                width: 30,
                height: 30,
                cursor: "pointer",
                marginRight: 5,
              }}
            />
            <FaYoutubeSquare
              style={{
                width: 30,
                height: 30,
                cursor: "pointer",
                marginRight: 5,
              }}
            />
            <SiZalo
              style={{
                width: 30,
                height: 30,
                cursor: "pointer",
                marginRight: 5,
              }}
            />
            <FaTiktok
              style={{
                width: 30,
                height: 30,
                cursor: "pointer",
                marginRight: 5,
              }}
            />
          </div>
        </div>
        <div className="col-md-3 col-sm-6 mx-auto px-1 d-flex justify-content-start">
          <ul
            style={{
              listStyle: "none",
              whiteSpace: "nowrap",
              padding: "20px 0 0",
            }}
          >
            <h5>
              <strong>Hỗ trợ khách hàng</strong>
            </h5>
            <li>Chính sách vận chuyển</li>
            <li>Chính sách đổi trả</li>
            <li>Chính sách bảo hành</li>
            <li>Chính sách KH thân thiết</li>
          </ul>
        </div>

        <div className="col-md-3 col-sm-6 mx-auto px-1 d-flex justify-content-start">
          <ul
            style={{
              listStyle: "none",
              whiteSpace: "nowrap",
              padding: "20px 0 0",
            }}
          >
            <h5>
              <strong>Về chúng tôi</strong>
            </h5>
            <li>Giới thiệu</li>
            <li>Tất cả sản phẩm</li>
            <li>Thông tin liên hệ</li>
            <li>Thông tin tuyển dụng</li>
          </ul>
          <div
            className="mx-auto d-flex align-items-center"
            onClick={scrollToTop}
            style={{ cursor: "pointer" }}
          >
            <h6 className="p-2 text-nowrap text-success small border border-3 rounded-pill border-warning bg-warning">
              Đầu Trang
              <AiOutlineVerticalAlignTop
                fontSize={35}
                className="d-block mx-auto"
              />
            </h6>
          </div>
        </div>
      </div>
      <div className="row mx-0 p-3">
        <div className="col-lg-1 col-md-0 col-sm-0"></div>
        <div className="col-lg-4 col-md-12 col-sm-12">
          <div className="row mx-auto">
            <div className="col-lg-12 col-md-6 col-sm-6">
              <Button variant="outline-danger mb-3">
                <h1 className="text-nowrap">
                  <strong>1800 6879</strong>
                </h1>
              </Button>
              <h6>Tổng đài CSKH, Góp ý & Khiếu nại (08:00 - 17:00)</h6>
              <p className="text-secondary">
                Từ thứ Hai đến thứ Bảy (trừ tết Âm Lịch)
              </p>
            </div>
            <div className="col-lg-12 col-md-6 col-sm-6 mb-5">
              <Button variant="outline-danger mb-3">
                <h1 className="text-nowrap">
                  <strong>090 545 7252</strong>
                </h1>
              </Button>
              <h6>Hỗ trợ đơn hàng online (08:00 - 17:00)</h6>
              <p className="text-secondary">
                Từ thứ Hai đến thứ Bảy (trừ tết Âm Lịch)
              </p>
            </div>
          </div>
        </div>
        <div
          className="col-lg-6 col-md-12 col-sm-12"
          style={{ cursor: "pointer" }}
        >
          <Card.Img src={footer_baner} />
        </div>
      </div>
    </div>
  );
};

export default Supports;
