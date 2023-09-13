import React, { useEffect } from "react";
import "./style.scss";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { Controller, useForm } from "react-hook-form";
import { Button, Input } from "antd";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { actCreateNewUser } from "../../redux/features/products/authSlice";
import { ToastContainer } from "react-toastify";
import useScrollToTop from "../../hooks/useScrollToTop";
import {
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";

const initialFormValue = {
  email: "",
  password: "",
  passwordenter: "",
};

const resgisterSchema = Yup.object({
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email của bạn!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu của bạn!")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
  passwordenter: Yup.string()
    .required("Vui lòng nhập lại mật khẩu của bạn!")
    .oneOf(
      [Yup.ref("password"), null],
      "Mật khẩu phải trùng khớp với mật khẩu đã nhập"
    ),
});

const Register = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(resgisterSchema),
  });
  const {
    control,
    handleSubmit,
    formState: { errors: errorsValidate },
  } = methods;

  const onValid = (values) => {
    dispatch(actCreateNewUser(values));
  };
  useEffect(() => {
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
  });
  return (
    <div>
      <ToastContainer />
      <section className="bg-image">
        <div className="d-flex align-items-center gradient-custom-3 p-3">
          <div className="container">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: 15 }}>
                  <div className="card-body p-3">
                    <i>
                      <h2 className="text-success text-center text-decoration-underline mb-4">
                        TẠO MỘT TÀI KHOẢN
                      </h2>
                    </i>
                    <form onSubmit={handleSubmit(onValid)}>
                      <div className="form-outline mb-2">
                        <label className="form-label px-2">
                          <strong>Email Của Bạn</strong>
                        </label>
                        <Controller
                          control={control}
                          name="email"
                          render={({ field: { onChange, value } }) => (
                            <Input
                              allowClear
                              id="email"
                              name="email"
                              type="email"
                              placeholder="Nhập Email Của Bạn"
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
                      <div className="form-outline mb-2">
                        <label className="form-label px-2">
                          <strong>Mật Khẩu</strong>
                        </label>

                        <Controller
                          control={control}
                          name="password"
                          render={({ field: { onChange, value } }) => (
                            <Input.Password
                              allowClear
                              id="password"
                              name="password"
                              type="password"
                              placeholder="Nhập Mật Khẩu Của Bạn"
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

                      <div className="form-outline mb-2">
                        <label className="form-label px-2">
                          <strong>Nhập Lại Mật Khẩu</strong>
                        </label>
                        <Controller
                          control={control}
                          name="passwordenter"
                          render={({ field: { onChange, value } }) => (
                            <Input.Password
                              allowClear
                              id="passwordenter"
                              name="passwordenter"
                              type="password"
                              placeholder="Nhập Lại Mật Khẩu Của Bạn"
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
                      <div className="form-check d-flex justify-content-center mb-4">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                        />
                        <label className="form-check-label">
                          Tôi đồng ý với tất cả các tuyên bố trong
                          <a href="#!" className="text-body mx-1">
                            <i>
                              <u className="text-danger ">Điều khoản dịch vụ</u>
                            </i>
                          </a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center">
                        <Button htmlType="submit" type="primary" ghost>
                          Đăng Ký
                        </Button>
                      </div>
                      <Link to={ROUTES.LOGIN_PAGE}>
                        <p className="text-center text-muted mt-4 mb-1">
                          Đã có một tài khoản ?
                          <a href="#!" className="fw-bold text-body">
                            <i>
                              <u className="text-primary mx-2">
                                Đăng nhập tại đây
                              </u>
                            </i>
                          </a>
                        </p>
                      </Link>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Register;
