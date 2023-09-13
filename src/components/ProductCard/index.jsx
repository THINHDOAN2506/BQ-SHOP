import React, { useEffect } from "react";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useState } from "react";
import { formatNumber } from "../../utils/formatNumber";
import Button from "react-bootstrap/Button";
import { Popover } from "antd";
import "./style.scss";
import muahang from "../../assets/images/muahang.png";
import StarsReviews from "../RateStars/StarsReviews";
import { actFetchAllComments } from "../../redux/features/products/commentSlice";
import { actFetchAllOrder } from "../../redux/features/products/orderSlice";

const ProductCard = (props) => {
  const dispatch = useDispatch();

  const { product } = props;

  const navigate = useNavigate();

  const handRedirectToDetailPage = () => {
    const productId = props.product.id;
    navigate(generatePath(ROUTES.PRODUCT_DETAILS, { id: productId }));
  };
  const productSize = product?.size ? product?.size?.[0] : "";
  const productColor = product?.color ? product?.color?.[0] : "";
  const [size, setSize] = useState(productSize);
  const [color, setColor] = useState(productColor);

  useEffect(() => {
    dispatch(actFetchAllComments());
    dispatch(actFetchAllOrder());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?.id]);

  const { orders } = useSelector((state) => state.order);
  const ArrRenderHOTByProductId = (orders) => {
    return orders
      ?.map((order) => order?.carts?.map((cart) => cart.id))
      .filter((id) => Number(id) === props.product.id);
  };

  const { comments } = useSelector((state) => state.comment);

  const ArrRenderRateByProductId = (comments) => {
    return comments.filter((comment) => comment.productId === props.product.id);
  };
  const ArrRenderRate = (comments) => {
    return ArrRenderRateByProductId(comments).map((comment) => comment.rating);
  };

  const [renderRateMedium, setRenderRateMedium] = useState(0);

  useEffect(() => {
    setRenderRateMedium(
      Number(
        ArrRenderRate(comments).reduce((partialSum, a) => partialSum + a, 0)
      ).toFixed(1) / ArrRenderRateByProductId(comments).length
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comments]);

  const content = (
    <div>
      <div className="d-flex justify-content-between mb-3">
        <Button
          variant="warning"
          ripple={true}
          onClick={() =>
            dispatch(
              addToCart({
                id: product?.id,
                title: product?.title,
                images: product?.images,
                size: size,
                color: color,
                price: product?.price,
                product_type: product?.product_type,
                quantity: 1,
                totalPrice: product?.price,
                createAt: new Date().toLocaleString("en-US", {
                  timeZone: "Asia/Jakarta",
                }),
              })
            )
          }
        >
          Thêm Vào Giỏ
        </Button>
        <Link to={ROUTES.CART}>
          <Button
            variant="success"
            ripple={true}
            onClick={() =>
              dispatch(
                addToCart({
                  id: product?.id,
                  title: product?.title,
                  images: product?.images,
                  size: size,
                  color: color,
                  price: product?.price,
                  product_type: product?.product_type,
                  quantity: 1,
                  totalPrice: product?.price,
                  createAt: new Date().toLocaleString("en-US", {
                    timeZone: "Asia/Jakarta",
                  }),
                })
              )
            }
          >
            Mua Ngay
          </Button>
        </Link>
      </div>
      <div className="d-flex justify-content-between">
        <div className="d-flex">
          <strong>
            <p
              style={{ width: 50, fontSize: 16 }}
              className="mb-0 text-success"
            >
              M.Sắc:
            </p>
          </strong>
          <i>
            <select
              className="form-select border-0 text-danger p-0 ps-1"
              style={{ width: 123, height: 23, fontWeight: 700 }}
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              {product?.color?.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </i>
        </div>
        <div className="d-flex">
          <strong>
            <p
              style={{ width: 50, fontSize: 15.5 }}
              className="mb-0 text-success ps-2"
            >
              K.Cỡ:
            </p>
          </strong>
          <i>
            <select
              className="form-select border-0 text-danger p-0 ps-1"
              style={{ width: 50, height: 23, fontWeight: 700 }}
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              {product?.size?.map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
          </i>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="col-lg-3 col-md-6">
        <div
          className="card border-5"
          style={{
            borderRadius: 20,
            cursor: "pointer",
            backgroundImage:
              "linear-gradient(rgb(238, 13, 238), rgb(113, 235, 113))",
          }}
          key={product.id}
        >
          <div
            className="d-flex justify-content-around py-2"
            onClick={handRedirectToDetailPage}
          >
            {product?.createAt + 2592000000 >= new Date().getTime() ? (
              <strong>
                <i>
                  <p
                    className="lead mb-0 p-2 text-center text-white bg-success rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: 68, height: 68, fontWeight: 700 }}
                  >
                    Mới Nhất
                  </p>
                </i>
              </strong>
            ) : (
              <strong>
                <i>
                  <p
                    className="lead mb-0 p-2 text-center text-success bg-warning rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: 68, height: 68, fontWeight: 700 }}
                  >
                    Thời Trang
                  </p>
                </i>
              </strong>
            )}
            {renderRateMedium >= 3.5 || ArrRenderHOTByProductId(orders) > 10 ? (
              <strong>
                <i>
                  <p
                    className="lead mb-0 text-center text-white bg-danger rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: 68, height: 68, fontWeight: 700 }}
                  >
                    HOT
                  </p>
                </i>
              </strong>
            ) : (
              <strong>
                <i>
                  <p
                    className="lead mb-0 p-2 text-center text-success bg-warning rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{ width: 68, height: 68, fontWeight: 700 }}
                  >
                    Phong Cách
                  </p>
                </i>
              </strong>
            )}
            {product?.sale > 0 ? (
              <strong>
                <i>
                  <p
                    className="lead mb-0 text-center text-white bg-danger rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{
                      width: 68,
                      height: 68,
                      fontSize: 24,
                      fontWeight: 700,
                    }}
                  >
                    {-product?.sale}%
                  </p>
                </i>
              </strong>
            ) : (
              <strong>
                <i>
                  <p
                    className="lead mb-0 p-2 text-center text-success bg-warning rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                    style={{
                      width: 68,
                      height: 68,
                      fontWeight: 700,
                    }}
                  >
                    Hiện Đại
                  </p>
                </i>
              </strong>
            )}
          </div>
          <div onClick={handRedirectToDetailPage}>
            <img
              src={product?.images?.image}
              className="card-img-top"
              alt="product"
              style={{ height: 255 }}
            />
            <h6
              className="ms-2 text-success"
              style={{ position: "absolute", top: 83 }}
            >
              <strong>
                <u>
                  <i>Chi Tiết Sản Phẩm</i>
                </u>
              </strong>
            </h6>
          </div>
          <div className="card-body mb-1">
            <div
              className="d-flex justify-content-between small text-muted"
              style={{ height: 18 }}
            >
              <i>{product?.product_type}</i>
              <span>
                Còn Hàng:
                <span className="fw-bold ms-1">
                  <i>{product?.quantity}</i>
                </span>
              </span>
            </div>
            <div onClick={handRedirectToDetailPage}>
              <p className="col-12 mb-0 web-kit fw-bold hidden-p">
                <i>{product?.title}</i>
              </p>
              <div className="col-12 d-flex justify-content-between">
                <h5 className="mb-0 text-danger text-center">
                  {product?.sale <= 0 ? (
                    <span>
                      <strong>
                        <i>Giá sốc</i>
                      </strong>
                    </span>
                  ) : (
                    <span>
                      <s>
                        <strong>
                          <i>{formatNumber(product?.price)}đ</i>
                        </strong>
                      </s>
                    </span>
                  )}
                </h5>
                <h5 className="mb-0 text-danger text-center">
                  <i>
                    <strong>
                      {formatNumber(
                        (product?.price * (1 - 0.01 * product?.sale)).toFixed(
                          0
                        ) || 0
                      )}
                    </strong>
                  </i>
                  đ
                </h5>
              </div>
            </div>
            <Popover
              content={content}
              title={"Vui lòng chọn màu sắc và kích cỡ!"}
            >
              <div className="d-flex justify-content-between">
                <StarsReviews
                  stars={renderRateMedium}
                  reviews={ArrRenderRateByProductId(comments).length}
                />
                <img
                  style={{ height: 50, width: "43% " }}
                  src={muahang}
                  alt="muahangimg"
                ></img>
              </div>
            </Popover>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
