import React, { useEffect } from "react";
import "./style.scss";
import login from "../../assets/images/login.png";
import { BsFacebook, BsTwitter } from "react-icons/bs";
import { SiZalo } from "react-icons/si";
import { BiLogoGmail } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actLogin } from "../../redux/features/products/authSlice";
import * as Yup from "yup";
import { Button, Input } from "antd";
import { toast } from "react-toastify";
import useScrollToTop from "../../hooks/useScrollToTop";
import {
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";

const initialFormValue = {
  email: "",
  password: "",
};
const loginSchema = Yup.object({
  email: Yup.string().required("Tên email là bắt buộc"),
  password: Yup.string().required("Mật khẩu là bắt buộc"),
});

const Login = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(loginSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors: errorsValidate },
  } = methods;

  const onValid = (values) => {
    dispatch(actLogin(values));
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.HOME_PAGE);
      toast(
        <div className="text-center fw-bold text-success">
          Đăng nhập vào tài khoản thành công!
        </div>
      );
    }
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  return (
    <div className="d-flex align-items-center gradient-custom-3">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center p-1">
          <section className="col-lg-12">
            <div className="container-fluid h-custom">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6 d-flex justify-content-center">
                  <img
                    src={login}
                    alt="login"
                    className="img-fluid"
                    style={{ borderRadius: 20 }}
                  />
                </div>
                <div className="col-md-6">
                  <form className="p-3">
                    <div className="d-flex flex-row align-items-center justify-content-center justify-content-md-start">
                      <h4 className="lead fw-normal mb-0 me-3 text-nowrap">
                        <strong>
                          <i>Đăng Nhập Với:</i>
                        </strong>
                      </h4>
                      <button
                        type="button"
                        className="btn btn-light btn-floating mx-1"
                      >
                        <i>
                          <BsFacebook />
                        </i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-light btn-floating mx-1"
                      >
                        <i>
                          <BsTwitter />
                        </i>
                      </button>

                      <button
                        type="button"
                        className="btn btn-light btn-floating mx-1"
                      >
                        <i>
                          <SiZalo />
                        </i>
                      </button>
                      <button
                        type="button"
                        className="btn btn-light btn-floating mx-1"
                      >
                        <i>
                          <BiLogoGmail />
                        </i>
                      </button>
                    </div>
                    <div className="divider d-flex align-items-center my-4">
                      <p className="text-center fw-bold mx-3 mb-0">Hoặc</p>
                    </div>
                    {/* <!-- Email input --> */}
                    <div className="form-outline mb-2">
                      <label className="form-label ms-2">
                        <strong>
                          <i>Tên Đăng Nhập / Email:</i>
                        </strong>
                      </label>
                      <Controller
                        name="email"
                        control={control}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            allowClear
                            className="mb-1"
                            size="large"
                            id="email"
                            name="email"
                            type="email"
                            placeholder="Nhập tên đăng nhập"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      <span
                        className="text-danger ms-2"
                        style={{ fontSize: 18, fontWeight: 500 }}
                      >
                        {errorsValidate.email && errorsValidate.email?.message}
                      </span>
                    </div>

                    {/* <!-- Password input --> */}
                    <div className="form-outline">
                      <label className="form-label ms-2">
                        <strong>
                          <i>Mật Khẩu</i>
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
                        {errorsValidate.password &&
                          errorsValidate.password?.message}
                      </span>
                    </div>

                    <div className="row d-flex justify-content-between align-items-center">
                      {/* <!-- Checkbox --> */}
                      <div className="form-check mb-0 mt-1 col-md-6 col-xs-12">
                        <input
                          className="btn btn-primary btn-lg me-2"
                          type="checkbox"
                        />
                        <label className="form-check-label text-nowrap">
                          Lưu Lại Mật Khẩu
                        </label>
                      </div>
                      <a href="#!" className="text-body col-md-6 col-xs-12">
                        Quên Mật Khẩu ?
                      </a>
                    </div>

                    <div className="text-center text-lg-start mt-4 pt-2">
                      <Button type="primary" onClick={handleSubmit(onValid)}>
                        Đăng Nhập
                      </Button>
                      <div className="d-flex justify-content-between mt-3">
                        <Link to={ROUTES.REGISTER_PAGE}>
                          <i>
                            <p className="small fw-bold mt-2 pt-1 mb-0">
                              Chưa Có Tài Khoản?
                              <a href="#!" className="link-danger mx-2">
                                Đăng Kí
                              </a>
                            </p>
                          </i>
                        </Link>
                        <Link to={ROUTES.CHECKOUT_PAGE}>
                          <p className="small fw-bold mt-2 pt-1 mb-0">
                            <i>
                              Đi tới
                              <span className="text-danger ms-2">
                                Trang Thanh Toán
                              </span>
                            </i>
                          </p>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Login;
