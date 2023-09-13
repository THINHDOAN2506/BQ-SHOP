import React, { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../ProductCard";
import { Spin, Statistic } from "antd";
import { actfetchAllProduct } from "../../redux/features/products/productSlice";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    />
  );
}

const SlickCarouselSale = () => {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);
  const productSale = products?.filter((product) => product?.sale >= 20);
  useEffect(() => {
    dispatch(actfetchAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { Countdown } = Statistic;
  const deadline = Date.now() + 1000 * 60 * 60 * 6 * 2 + 1000 * 30;
  const onFinish = () => {
    console.log("finished!");
  };
  const onChange = (val) => {
    if (typeof val === "number" && 4.95 * 1000 < val && val < 5 * 1000) {
      console.log("changed!");
    }
  };

  var settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    initialSlide: 0,
    dots: true,
    centerPadding: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    speed: 5000,
    autoplay: true,
    autoplaySpeed: 1500,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
          infinite: true,
          dots: true,
        },
      },
    ],
  };
  if (isLoading) {
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    );
  }
  return (
    <div className="mx-5 mb-5">
      <div>
        <h1
          className="text-center py-3 text-danger"
          style={{
            fontWeight: 800,
            background: "Gold",
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
          }}
        >
          <i>
            <span>
              Siêu Sale - Cực Hot <span>9.9</span>
            </span>
            <Countdown
              title=""
              value={deadline}
              onFinish={onFinish}
              onChange={onChange}
            />
          </i>
        </h1>
        <Slider {...settings}>
          <div>
            {
              <div className="row">
                {productSale?.slice(0, 4).map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            }
          </div>
          <div>
            {
              <div className="row">
                {productSale?.slice(5, 9).map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            }
          </div>
          <div>
            {
              <div className="row">
                {productSale?.slice(10, 14).map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
            }
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default SlickCarouselSale;
