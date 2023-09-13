import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import { Link, generatePath, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber } from "../../utils/formatNumber";
import { actFetchAllOrder } from "../../redux/features/products/orderSlice";
import { Input, Modal } from "antd";
import { Controller, useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { actupdatePasswordById } from "../../redux/features/products/authSlice";
import { toast } from "react-toastify";
import useScrollToTop from "../../hooks/useScrollToTop";
import {
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";

const initialFormValue = {
  oldpassword: "",
  password: "",
  passwordenter: "",
};

const loginSchema = Yup.object({
  oldpassword: Yup.string().required("Mật khẩu là bắt buộc"),
  password: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .notOneOf(
      [Yup.ref("oldpassword"), null],
      "Mật khẩu mới không được giống mật khẩu cũ đã nhập"
    ),
  passwordenter: Yup.string()
    .required("Mật khẩu là bắt buộc")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu phải trùng khớp với mật khẩu mới đã nhập"
    ),
});

const UserInformation = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(loginSchema),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors: errorsValidate },
  } = methods;

  const onValid = (values) => {
    const valuesChangeUserPassword = {
      ...userInfo,
      ...values,
    };
    if (values?.oldpassword !== userInfo?.password) {
      toast(
        <div className="text-center fw-bold text-danger">
          <div>Mật khẩu cũ không chính xác!</div>
          <div>Vui lòng nhập lại cho chính xác!</div>
        </div>
      );
    } else {
      dispatch(
        actupdatePasswordById({
          id: userInfo?.id,
          usersUpdate: valuesChangeUserPassword,
        })
      );
      toast(
        <div className="text-center fw-bold text-success">
          Mật khẩu của bạn đã đổi thành công!
        </div>
      );
      handleChangePasswordOk();
      setValue("oldpassword", "");
      setValue("password", "");
      setValue("passwordenter", "");
    }
  };

  const { userInfo } = useSelector((state) => state?.auth);
  const { orders } = useSelector((state) => state?.order);

  const [isModalOpenChangePassword, setIsModalOpenChangePassword] =
    useState(false);
  const showModalChangePassword = () => {
    setIsModalOpenChangePassword(true);
  };
  const handleChangePasswordOk = () => {
    setIsModalOpenChangePassword(false);
  };
  const handleChangePasswordCancel = () => {
    setIsModalOpenChangePassword(false);
  };

  const [detailsCart, setDetailsCart] = useState([]);
  const [isModalOpenHistoryCart, setIsModalOpenHistoryCart] = useState(false);
  const showModalHistoryCart = () => {
    setIsModalOpenHistoryCart(true);
  };
  const handleHistoryCartOk = () => {
    setIsModalOpenHistoryCart(false);
  };
  const handleHistoryCartCancel = () => {
    setIsModalOpenHistoryCart(false);
  };

  useEffect(() => {
    dispatch(actFetchAllOrder({ userId: userInfo?.id || "" }), {
      ...params,
    });
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id, params]);

  const handleOnClickOrder = (carts) => {
    setDetailsCart(carts);
    showModalHistoryCart();
  };

  const renderOrdersList = (orders) =>
    orders.map((order) => {
      return (
        <div
          className="border-bottom"
          onClick={() => handleOnClickOrder(order?.carts || [])}
        >
          <div className="row">
            <div className="col-2 text-center my-auto fw-bold">{order?.id}</div>
            <div className="col-5 text-center border border-top-0 border-bottom-0 pt-2">
              <p className="mb-0">{order?.createAt}</p>
              <p className="mb-0 text-success">
                {`${order?.address}, `}
                {order?.payload?.address}
              </p>
            </div>
            <div className="col-5 d-flex text-center">
              <div className="col-5 my-auto">
                <h6 className="mb-0 text-danger">
                  <i>Phí Ship: {formatNumber(20000)} đ</i>
                </h6>
                <h6 className="mb-0 text-success">
                  <i>
                    Giảm Phí Ship:{" "}
                    {Number.isFinite(order?.freeShip)
                      ? formatNumber(order?.freeShip)
                      : 0}{" "}
                    đ
                  </i>
                </h6>
                <h6 className="mb-0 text-danger">
                  <i>
                    Giảm Giá:{" "}
                    {Number.isFinite(order?.discount)
                      ? formatNumber(order?.discount)
                      : 0}{" "}
                    đ
                  </i>
                </h6>
              </div>
              <strong className="col-7 my-auto text-danger border-start pt-1">
                <s>
                  <i>{formatNumber(order?.totalPrice + 20000)} đ</i>
                </s>
                <i>
                  <h5>
                    {formatNumber(
                      order?.totalPrice +
                        20000 -
                        (order?.freeShip + order?.discount)
                    )}{" "}
                    đ
                  </h5>
                </i>
              </strong>
            </div>
          </div>
        </div>
      );
    });

  const renderCartsList = (carts) =>
    carts.map((product) => (
      <div className="col-12">
        <div
          className="row d-flex justify-content-between border-bottom mb-2"
          key={product?.id}
        >
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
            <h6 style={{ cursor: "pointer" }} className="text-black mb-0">
              {product?.title}
            </h6>
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
              <div className="d-flex mb-2">
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
            <div className="d-flex justify-content-center">
              <Button
                className="mb-2"
                variant="warning"
                size="sm"
                onClick={() =>
                  navigate(
                    generatePath(ROUTES.PRODUCT_DETAILS, { id: product.id })
                  )
                }
              >
                Viết Đánh Giá Của Bạn Về Sản Phẩm
              </Button>
            </div>
          </div>
          <div className="col-md-2 col-lg-2 col-xl-2 text-danger">
            <i>
              <h5 className="mb-0">{formatNumber(product?.price)} đ</h5>
            </i>
          </div>
        </div>
      </div>
    ));

  return (
    <>
      <div className="container">
        <div className="main-body">
          <div className="card">
            <div className="card-body p-2">
              <div className="row gutters-sm border-bottom pb-3 mb-3">
                <div className="col-md-4 border-end mb-3">
                  <div className="d-flex flex-column align-items-center text-center">
                    <img
                      src={
                        userInfo?.fileUrl ||
                        "https://file.hstatic.net/200000473357/file/frame-logo_b61c0616110d41098a1d231657356290.png"
                      }
                      alt="Admin"
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-2">
                      <h4 className="mb-0">{userInfo?.username}</h4>
                      <p className="text-secondary mb-2">
                        Người dùng {userInfo?.id}
                      </p>
                    </div>
                    <Button variant="success" onClick={showModalChangePassword}>
                      Đổi Mật Khẩu
                    </Button>
                  </div>
                </div>
                <div className="col-md-8 px-5">
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Họ và Tên:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo?.username}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo?.email}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Số Điện Thoại:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo?.phonenumber}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Địa Chỉ:</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      {userInfo?.address}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12 d-flex justify-content-around">
                      <div className="me-3">
                        <Link to={ROUTES.EDITUSERINFORMATION}>
                          <Button variant="info">Sửa Thông Tin</Button>
                        </Link>
                      </div>
                      <div>
                        <Button variant="warning" onClick={() => navigate(-1)}>
                          Quay Lại Trang Trước
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-2">
                <h4 className="text-center text-danger mb-0 bg-info py-2">
                  Thông Tin Mua Hàng
                </h4>
                <div className="row border-bottom border-top mt-1">
                  <div className="col-2 text-center py-1">
                    <h6>Mã Đơn Hàng</h6>
                  </div>
                  <div className="col-5 text-center border border-top-0 border-bottom-0 py-1">
                    <h6>Ngày Tạo Và Địa Chỉ Nhận hàng </h6>
                  </div>
                  <div className="col-5 text-center py-1">
                    <h6>Tổng Tiền Thanh Toán</h6>
                  </div>
                </div>

                <div className="mb-3" style={{ cursor: "pointer" }}>
                  {renderOrdersList(orders)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title="Chi Tiết Thanh Toán Đơn Hàng"
        open={isModalOpenHistoryCart}
        onOk={handleHistoryCartOk}
        onCancel={handleHistoryCartCancel}
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
        okText="Xong"
        cancelText="Hủy"
      >
        {renderCartsList(detailsCart)}
      </Modal>

      <Modal
        title="Đổi Mật Khẩu :"
        style={{ width: "100vw", display: "flex", justifyContent: "center" }}
        open={isModalOpenChangePassword}
        onOk={handleSubmit(onValid)}
        onCancel={handleChangePasswordCancel}
        okText="Đổi Mật Khẩu"
        cancelText="Hủy"
      >
        <h6 className="text-danger text-center mb-2">
          <i>
            <u className="me-1">CHÚ Ý:</u> Nhớ thông tin MẬT KHẨU đã thay đổi để
            đăng nhập lại!!!
          </i>
        </h6>
        <div className="form-outline mb-3">
          <label className="form-label ms-2">
            <strong>
              <i>Mật Khẩu Cũ:</i>
            </strong>
          </label>
          <Controller
            name="oldpassword"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input.Password
                allowClear
                className="mb-1"
                size="large"
                id="oldpassword"
                name="oldpassword"
                type="password"
                placeholder="Nhập mật khẩu"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <span
            className="text-danger ms-2"
            style={{ fontSize: 18, fontWeight: 500 }}
          >
            {errorsValidate.oldpassword && errorsValidate.oldpassword?.message}
          </span>
        </div>
        <div className="form-outline mb-2">
          <label className="form-label ms-2">
            <strong>
              <i>Mật Khẩu Mới:</i>
            </strong>
          </label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input.Password
                allowClear
                className="mb-1"
                size="large"
                id="password"
                name="password"
                type="password"
                placeholder="Nhập mật khẩu"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <span
            className="text-danger ms-2"
            style={{ fontSize: 18, fontWeight: 500 }}
          >
            {errorsValidate.password && errorsValidate.password?.message}
          </span>
        </div>
        <div className="form-outline">
          <label className="form-label ms-2">
            <strong>
              <i>Nhập Lại Mật Khẩu Mới:</i>
            </strong>
          </label>
          <Controller
            name="passwordenter"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input.Password
                allowClear
                className="mb-1"
                size="large"
                id="passwordenter"
                name="passwordenter"
                type="password"
                placeholder="Nhập mật khẩu"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <span
            className="text-danger ms-2"
            style={{ fontSize: 18, fontWeight: 500 }}
          >
            {errorsValidate.passwordenter &&
              errorsValidate.passwordenter?.message}
          </span>
        </div>
      </Modal>
    </>
  );
};

export default UserInformation;
