import React, { useEffect, useState } from "react";
import "./style.scss";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { actupdateUserInformationById } from "../../redux/features/products/authSlice";
import { Input, Upload, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast, ToastContainer } from "react-toastify";
import useScrollToTop from "../../hooks/useScrollToTop";
import {
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";

const initialFormValueEditUserInformation = {
  username: "",
  email: "",
  oldpassword: "",
  password: "",
  passwordenter: "",
  phonenumber: "",
  address: "",
};

const phoneRegExp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s/0-9]*$/;

const editUserInformationSchema = Yup.object({
  username: Yup.string().required("Vui lòng nhập tên của bạn!"),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Vui lòng nhập email của bạn!"),
  password: Yup.string()
    .required("Vui lòng nhập mật khẩu của bạn!")
    .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
    .notOneOf(
      [Yup.ref("oldpassword"), null],
      "Mật khẩu không đúng, vui lòng nhập lại"
    ),
  phonenumber: Yup.string()
    .required("Vui lòng nhập số điện thoại của bạn!")
    .min(10, "Số điện thoại phải hợp lệ")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ!"),
  address: Yup.string().required(
    "Vui lòng nhập địa chỉ trùng với nơi nhận hàng của bạn!"
  ),
});

const EditUserInformation = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const methods = useForm({
    defaultValues: initialFormValueEditUserInformation,
    resolver: yupResolver(editUserInformationSchema),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors: errorsValidate },
  } = methods;

  const onValid = (values) => {
    const valuesChangeUserInformation = {
      ...userInfo,
      fileUrl: fileList[0]?.thumbUrl,
      ...values,
    };
    if (values.password !== userInfo.password) {
      toast(
        <div className="text-center fw-bold text-danger">
          <div>Mật khẩu không chính xác!</div>
          <div>Vui lòng nhập lại cho chính xác!</div>
        </div>
      );
    } else {
      dispatch(
        actupdateUserInformationById({
          id: userInfo?.id,
          usersUpdate: valuesChangeUserInformation,
        })
      );

      setValue("password", "");
      navigate(ROUTES.USERINFORMATION);
      toast(
        <div className="text-center fw-bold text-success">
          Thông tin của bạn đã cập nhật thành công!
        </div>
      );
    }
  };
  useEffect(() => {
    setValue("email", userInfo?.email || "");
    setValue("username", userInfo?.username || "");
    setValue("phonenumber", userInfo?.phonenumber || "");
    setValue("address", userInfo?.address || "");
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.id]);

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState("");
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      ></div>
    </div>
  );

  return (
    <div>
      <div className="container">
        <div className="main-body">
          <div className="card">
            <div className="card-body p-2">
              <div className="row gutters-sm border-bottom pb-3 mb-3">
                <form onSubmit={handleSubmit(onValid)}>
                  <div className="col-md-12 border-end">
                    <div className="d-flex flex-column align-items-center text-center">
                      <Upload
                        action=""
                        listType="picture-circle"
                        fileList={[...fileList]}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        maxCount={1}
                      >
                        {fileList.length >= 8 ? null : uploadButton}
                      </Upload>
                      <Modal
                        open={previewOpen}
                        title={previewTitle}
                        footer={null}
                        onCancel={handleCancel}
                      >
                        <img
                          alt="example"
                          style={{
                            width: "100%",
                          }}
                          src={previewImage}
                        />
                      </Modal>
                      <div
                        style={{ width: "100%" }}
                        className="mb-5 py-2 border border-2 bg-info rounded-3 me-2"
                      >
                        <h5 className="mb-0 text-danger">
                          Tải Lên Ảnh Đại Diện Của Bạn
                        </h5>
                        <div className="mt-1 border-top border-2">
                          <h4 className="mb-0 text-success">
                            {userInfo?.username}
                          </h4>
                          <p className="text-secondary mb-2">
                            Người dùng {userInfo?.id}
                          </p>
                        </div>
                        <h6 className="text-danger">
                          <i>
                            <u className="me-1">CHÚ Ý:</u> Nhớ địa chỉ EMAIL
                            (nếu có) đã thay đổi để đăng nhập lại!!!
                          </i>
                        </h6>
                      </div>
                    </div>
                  </div>

                  <div className="form-outline mb-2">
                    <label className="form-label px-2">
                      <strong>Tên Của Bạn</strong>
                    </label>
                    <Controller
                      control={control}
                      name="username"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          allowClear
                          id="username"
                          name="username"
                          type="text"
                          placeholder="Nhập Tên Của Bạn"
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
                          placeholder="Nhập Email Của Bạn...Vui Lòng Nhớ Email Để Đăng Nhập!"
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
                  <div className="row">
                    <div className="form-outline mb-2 col-lg-6 col-md-12">
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
                    <div className="form-outline mb-2 col-lg-6 col-md-12">
                      <label className="form-label px-2">
                        <strong>Số Điện Thoại Của Bạn</strong>
                      </label>
                      <Controller
                        control={control}
                        name="phonenumber"
                        render={({ field: { onChange, value } }) => (
                          <Input
                            allowClear
                            id="phonenumber"
                            name="phonenumber"
                            type="tel"
                            required
                            placeholder="Nhập Số Điện Thoại Của Bạn Theo Định Dạng:  0981234xxx"
                            value={value}
                            onChange={onChange}
                          />
                        )}
                      />
                      <span
                        className="text-danger ms-2"
                        style={{ fontSize: 18, fontWeight: 500 }}
                      >
                        {errorsValidate.phonenumber &&
                          errorsValidate.phonenumber?.message}
                      </span>
                    </div>
                  </div>
                  <div className="form-outline mb-2">
                    <label className="form-label px-2">
                      <strong>Địa Chỉ Của Bạn</strong>
                    </label>
                    <Controller
                      control={control}
                      name="address"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          allowClear
                          id="address"
                          name="address"
                          type="text"
                          placeholder="Nhập Tên Địa Chỉ Của Bạn"
                          value={value}
                          onChange={onChange}
                        />
                      )}
                    />
                    <span
                      className="text-danger ms-2"
                      style={{ fontSize: 18, fontWeight: 500 }}
                    >
                      {errorsValidate.address &&
                        errorsValidate.address?.message}
                    </span>
                  </div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="success"
                      type="submit"
                      onSubmit={handleSubmit(onValid)}
                    >
                      Lưu Thông Tin
                    </Button>
                  </div>
                </form>
              </div>
            </div>
            <div class="row pb-3">
              <div class="col-12 text-secondary d-flex justify-content-around px-3">
                <Button variant="warning" onClick={() => navigate(-1)}>
                  Quay Lại Trang Trước
                </Button>

                <Link to={ROUTES.HOME_PAGE}>
                  <Button variant="primary">Đến Trang Chủ</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditUserInformation;
