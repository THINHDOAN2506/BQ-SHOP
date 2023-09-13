import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { Input } from "antd";
import Button from "react-bootstrap/Button";
import { useEffect, useState } from "react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import {
  actCreateNewOrder,
  actFetchAllOrder,
} from "../../redux/features/products/orderSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearAllCarts } from "../../redux/features/cart/cartSlice";
import { formatNumber } from "../../utils/formatNumber";
import useScrollToTop from "../../hooks/useScrollToTop";
import Address from "../../components/Address";
import { DiscountCodeData, FreeShipCodeData } from "./DiscountCodeData";
import {
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";

const initialFormValue = {
  username: "",
  email: "",
  phonenumber: "",
  address: "",
};

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;

const resgisterSchema = Yup.object({
  username: Yup.string().required("Vui lòng nhập tên của bạn!"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email của bạn!"),
  phonenumber: Yup.string()
    .required("Vui lòng nhập số điện thoại của bạn!")
    .min(10, "Số điện thoại không hợp lệ!")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
  address: Yup.string()
    .required("Vui lòng nhập lại địa chỉ đúng với nơi bạn nhận hàng!")
    .min(10, "Địa chỉ phải có ít nhất 10 ký tự và đúng với nơi bạn nhận hàng"),
});

const CheckOutPage = () => {
  useScrollToTop();
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state?.cart
  );
  const { userInfo, isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(resgisterSchema),
  });
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors: errorsValidate },
  } = methods;

  const onValid = (values) => {
    const orderInfo = {
      userId: userInfo?.id,
      carts: cartItems,
      totalPrice: totalPrice,
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
      discount: discount,
      freeShip: freeShip,
      payload: payloadAddress,
      ...values,
    };
    if (!isLoggedIn)
      return toast(
        <div className="text-center fw-bold text-danger">
          Vui lòng ĐĂNG NHẬP trước khi HOÀN TẤT ĐƠN HÀNG?
        </div>
      );
    if (orderInfo?.totalPrice === 0)
      return toast(
        <div className="text-center fw-bold text-danger">
          Vui lòng kiểm tra GIỎ HÀNG có RỖNG hay không?
        </div>
      );
    if (payloadAddress?.province === "")
      return toast(
        <div className="text-center fw-bold text-danger">
          Vui lòng nhập địa chỉ TỈNH, THÀNH PHỐ, QUẬN, HUYỆN, PHƯỜNG, XÃ!
        </div>
      );

    if (
      (Number.isFinite(discount) || discount === "") &&
      (Number.isFinite(freeShip) || freeShip === "")
    ) {
      dispatch(actCreateNewOrder(orderInfo));
      dispatch(actFetchAllOrder(orderInfo));
      dispatch(clearAllCarts(orderInfo));
      navigate(ROUTES.SHOPPING_COMPLETE);
      toast(
        <div className="text-center fw-bold text-success">
          <div>Đơn hàng của bạn đã hoàn tất</div>
          <div>Vui lòng vào TRANG THÔNG TIN CÁ NHÂN để xem chi tiết!</div>
        </div>
      );
    } else {
      toast(
        <div className="text-center fw-bold text-danger">
          Vui lòng bấm vào nút SỬ DỤNG để xác nhận MÃ GIẢM GIÁ
        </div>
      );
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    setValue("email", userInfo?.email || "");
    setValue("username", userInfo?.username || "");
    setValue("phonenumber", userInfo?.phonenumber || "");
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const [payloadAddress, setPayloadAddress] = useState("");

  const [discount, setDiscount] = useState("");

  const handleClickDisCount = (items) => {
    const ExistDiscountCode = DiscountCodeData.find(
      (items) =>
        items.id === discount &&
        items.exp_date.getTime() >= new Date().getTime()
    );
    if (ExistDiscountCode) {
      items = ExistDiscountCode.price;
      setDiscount(items);
      toast(
        <div className="text-center fw-bold text-success">
          <div>MÃ GIẢM GIÁ được sử dụng</div>{" "}
          <div>
            Chúc mừng quý khách tiền đã được trừ trực tiếp
            <span className="text-danger ms-1">
              {formatNumber(ExistDiscountCode.price)}
            </span>
            đ vào hóa đơn thanh toán!
          </div>
        </div>
      );
      delete ExistDiscountCode.id;
    } else {
      items = 0;
      setDiscount("");

      toast(
        <div className="text-center fw-bold text-danger">
          <div> MÃ GIẢM GIÁ không hợp lệ</div>
          <div>Vui lòng tìm MÃ GIẢM GIÁ hợp lệ khác!</div>
        </div>
      );
    }
  };

  const [freeShip, setFreeShip] = useState("");
  const handleClickFreeShip = (items) => {
    const ExistFreeShipCode = FreeShipCodeData.find(
      (items) =>
        items.id === freeShip &&
        items.exp_date.getTime() >= new Date().getTime()
    );
    if (ExistFreeShipCode) {
      items = ExistFreeShipCode.price;
      setFreeShip(items);
      toast(
        <div className="text-center fw-bold text-success">
          <div>MÃ GIẢM GIÁ được sử dụng</div>
          <div>
            Chúc mừng quý khách tiền đã được trừ trực tiếp
            <span className="text-danger ms-1">
              {formatNumber(ExistFreeShipCode.price)}
            </span>
            đ vào hóa đơn thanh toán!
          </div>
        </div>
      );

      delete ExistFreeShipCode.id;
    } else {
      items = 0;
      setFreeShip("");
      toast(
        <div className="text-center fw-bold text-danger">
          <div>MÃ GIẢM GIÁ không hợp lệ</div>
          <div>Vui lòng tìm MÃ GIẢM GIÁ hợp lệ khác!</div>
        </div>
      );
    }
  };

  const renderCartList = (cartItems) => {
    return cartItems?.map((product) => (
      <div>
        <div className="row d-flex justify-content-between" key={product?.id}>
          <div className="col-md-2 col-lg-2 col-xl-2 d-flex mb-1">
            <img
              src={product?.images}
              className=" rounded-3"
              alt="product"
              style={{ height: 50, width: 50 }}
            />
            <sup>
              <h6 className="px-2 text-danger bg-light border border-1 border-secondary rounded-pill">
                {product?.quantity}
              </h6>
            </sup>
          </div>
          <div className="col-md-8 col-lg-8 col-xl-8">
            <h6 className="text-black mb-0">{product?.title}</h6>
            <div className="d-flex">
              <div className="d-flex me-5">
                <strong>
                  <p className="mb-0 me-2">Color:</p>
                </strong>
                <strong>
                  <i>
                    <p className="text-danger mb-0">{product?.color}</p>
                  </i>
                </strong>
              </div>
              <div className="d-flex">
                <strong>
                  <p className="mb-0 me-2">Size:</p>
                </strong>
                <strong>
                  <i>
                    <p className="text-danger mb-0">{product?.size}</p>
                  </i>
                </strong>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 text-danger">
            <i>
              <h5 className="mb-0">{formatNumber(product?.price)} đ</h5>
            </i>
          </div>
          <hr />
        </div>
      </div>
    ));
  };
  return (
    <>
      <div classNameNameName="row">
        <section style={{ backgroundColor: "#d2c9ff" }}>
          <div className="container py-3">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12">
                <div
                  className="card card-registration card-registration-2"
                  style={{ borderRadius: 15 }}
                >
                  <div className="card-body p-0">
                    <div className="row g-0">
                      <i>
                        <h3 className="fw-bold pt-3 text-primary text-center">
                          GIÀY BQ
                        </h3>
                      </i>
                      <div className="col-lg-6">
                        <div className="p-3">
                          <div>
                            <i>
                              <h3 className="fw-bold mb-3 text-nowrap text-center text-success">
                                Thông Tin Giao Hàng
                              </h3>
                            </i>
                            <hr className="mb-3" />

                            {!isLoggedIn ? (
                              <i>
                                <h5 className="mb-3 text-center">
                                  <span className="text-danger">
                                    Bạn đã có tài khoản? Vui lòng
                                  </span>
                                  <Link
                                    to={ROUTES.LOGIN_PAGE}
                                    className="text-decoration-none mx-2"
                                  >
                                    Đăng nhập
                                  </Link>
                                  <span className="text-danger">
                                    để tiếp tục mua sắm!
                                  </span>
                                </h5>
                              </i>
                            ) : (
                              <h6 className="text-center text-danger mb-3 small">
                                <i>
                                  Quý Khách Vui Lòng Kiểm Tra Lại Thông Tin Giao
                                  Hàng Cho Chính Xác!
                                </i>
                              </h6>
                            )}
                          </div>
                          <form onSubmit={handleSubmit(onValid)}>
                            <div className="mb-3">
                              <Controller
                                control={control}
                                name="username"
                                render={({ field: { onChange, value } }) => (
                                  <Input
                                    allowClear
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Họ và tên"
                                    value={value}
                                    onChange={onChange}
                                  />
                                )}
                              />
                              <span
                                className="text-danger ms-2"
                                style={{ fontSize: 18, fontWeight: 500 }}
                              >
                                {errorsValidate.username &&
                                  errorsValidate.username?.message}
                              </span>
                            </div>
                            <div className="row mb-3">
                              <div className="col-8 p-0">
                                <Controller
                                  allowClear
                                  control={control}
                                  name="email"
                                  render={({ field: { onChange, value } }) => (
                                    <Input
                                      id="email"
                                      name="email"
                                      type="email"
                                      placeholder="Email"
                                      value={value}
                                      onChange={onChange}
                                    />
                                  )}
                                />
                                <span
                                  className="text-danger ms-2"
                                  style={{ fontSize: 18, fontWeight: 500 }}
                                >
                                  {errorsValidate.email &&
                                    errorsValidate.email?.message}
                                </span>
                              </div>
                              <div className="col-4 ps-3">
                                <Controller
                                  control={control}
                                  name="phonenumber"
                                  render={({ field: { onChange, value } }) => (
                                    <Input
                                      allowClear
                                      id="phonenumber"
                                      name="phonenumber"
                                      type="tel"
                                      placeholder="Nhập Số Điện Thoại Của Bạn: 0981234xxx"
                                      value={value}
                                      onChange={onChange}
                                    />
                                  )}
                                />
                                <span
                                  className="text-danger ms-2"
                                  style={{ fontSize: 18, fontWeight: 500 }}
                                >
                                  {errorsValidate?.phonenumber &&
                                    errorsValidate?.phonenumber?.message}
                                </span>
                              </div>
                            </div>
                            <div className="mb-3">
                              <Address
                                payloadAddress={payloadAddress}
                                setPayloadAddress={setPayloadAddress}
                                onChange={(e) =>
                                  setPayloadAddress(e?.target?.value) || 0
                                }
                              />
                              <Controller
                                control={control}
                                name="address"
                                render={({ field: { onChange, value } }) => (
                                  <Input
                                    allowClear
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Địa chỉ chi tiết như thôn, đường, số nhà,... "
                                    value={value}
                                    onChange={onChange}
                                  />
                                )}
                              />
                              <span
                                className="text-danger ms-2"
                                style={{ fontSize: 18, fontWeight: 500 }}
                              >
                                {errorsValidate?.address &&
                                  errorsValidate.address?.message}
                              </span>
                            </div>
                            <hr className="my-3" />
                            <div className="mb-5">
                              <h4 className="mb-2">PHƯƠNG THỨC THANH TOÁN</h4>
                              <div className="h4 text-success mt-3 border-2 border border-primary p-3 rounded-3">
                                <strong>
                                  <input
                                    type="radio"
                                    checked
                                    className="me-2"
                                  />
                                  <i>Thanh Toán Khi Nhận Hàng</i>
                                </strong>
                              </div>
                            </div>
                            <div className="d-grid ">
                              <Button type="submit" variant="success" size="lg">
                                Hoàn Tất Đơn Hàng
                              </Button>
                            </div>
                          </form>
                          <div className="py-5 row">
                            <h6 className="mb-0 col-4">
                              <i className="me-2">
                                trở lại
                                <span
                                  className="text-decoration-underline
                                  text-primary mx-2"
                                  onClick={() => navigate(-1)}
                                >
                                  Trang Giỏ Hàng
                                </span>
                              </i>
                            </h6>
                            <h6 className="mb-0 col-4">
                              <i className="me-2">
                                đi đến
                                <Link to={ROUTES.HOME_PAGE} className="mx-2">
                                  Trang Chủ
                                </Link>
                              </i>
                            </h6>
                            <h6 className="mb-0 col-4">
                              <i className="me-2">
                                đi đến
                                <Link to={ROUTES.PRODUCTS} className="mx-2">
                                  Trang Sản Phẩm
                                </Link>
                              </i>
                            </h6>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 bg-grey">
                        <div className="p-3">
                          <i>
                            <h3 className="fw-bold mb-3 text-nowrap text-center text-danger">
                              Chi Tiết Thanh Toán
                            </h3>
                          </i>
                          <hr className="my-3" />
                          <div classNameName="cartpayment">
                            {renderCartList(cartItems)}
                          </div>
                          <div className="d-flex justify-content-between">
                            <i>
                              <h5 className="text-uppercase text-center">
                                Tổng SL:
                              </h5>
                              <h2 className="text-danger text-center">
                                {totalQuantity}
                              </h2>
                            </i>
                            <i>
                              <h5 className="text-uppercase text-center">
                                Phí Ship:
                              </h5>
                              <h2 className="text-danger text-center">
                                {formatNumber(20000)}đ
                              </h2>
                            </i>
                            <i>
                              <h5 className="text-uppercase text-center">
                                Tạm Tính:
                              </h5>
                              <h2 className="text-danger text-center">
                                {formatNumber(totalPrice + 20000) || 0} đ
                              </h2>
                            </i>
                          </div>
                          <div className="d-flex justify-content-between">
                            <div>
                              <div className="d-flex row">
                                <div>
                                  <i>
                                    <h5 className="text-uppercase mb-1 text-nowrap">
                                      GIẢM PHÍ SHIP:
                                    </h5>
                                  </i>
                                  <div className="d-flex me-1">
                                    <span className="me-2">
                                      <input
                                        type="text"
                                        className="form-control form-control-sm mb-2 border-2 border-primary"
                                        placeholder="Nhập mã giảm giá"
                                        value={freeShip}
                                        onChange={(e) =>
                                          setFreeShip(e?.target?.value)
                                        }
                                      />
                                    </span>
                                    <span>
                                      <button
                                        type="button"
                                        className="btn btn-success btn-block btn-sm text-nowrap"
                                        onClick={() =>
                                          handleClickFreeShip(freeShip)
                                        }
                                      >
                                        <strong>Sử Dụng</strong>
                                      </button>
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <i>
                                <h5 className="text-uppercase mb-1">
                                  Mã giảm giá:
                                </h5>
                              </i>
                              <div className="d-flex justify-content-between">
                                <span className="me-2">
                                  <input
                                    type="text"
                                    className="form-control form-control-sm mb-2 border-2 border-primary"
                                    placeholder="Nhập mã giảm giá"
                                    value={discount}
                                    onChange={(e) =>
                                      setDiscount(e?.target?.value) || 0
                                    }
                                  />
                                </span>
                                <span>
                                  <button
                                    type="button"
                                    className="btn btn-success btn-block btn-sm text-nowrap"
                                    onClick={() =>
                                      handleClickDisCount(discount)
                                    }
                                  >
                                    <strong>Sử Dụng</strong>
                                  </button>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex justify-content-center">
                          <div className="d-flex justify-content-between">
                            <i>
                              <h2 className="text-uppercase text-center text-success">
                                Tổng Thanh Toán:
                              </h2>
                            </i>
                            <i>
                              <h2 className="text-danger mx-2 text-nowrap">
                                {(totalQuantity && (
                                  <div>
                                    {formatNumber(
                                      totalPrice + 20000 - (discount + freeShip)
                                    )}{" "}
                                    đ
                                  </div>
                                )) || <div>0 đ</div>}
                              </h2>
                            </i>
                          </div>
                        </div>
                        <h6 className="d-flex justify-content-center text-warning">
                          Chúc Mừng Quý Khách Đã Tiết Kiệm Được:{" "}
                          <i className="text-danger ms-2">
                            {formatNumber(discount + freeShip) || 0} đ
                          </i>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CheckOutPage;
