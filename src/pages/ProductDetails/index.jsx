import React, { useEffect, useState } from "react";
import "./style.scss";
import { Upload, Input, Rate, Modal, Tabs } from "antd";
import {
  actFetchProductById,
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {
  MDBTabs,
  MDBTabsContent,
  MDBTabsItem,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { formatNumber } from "../../utils/formatNumber";
import TextArea from "antd/es/input/TextArea";
import {
  actCreateNewCommment,
  actFetchAllComments,
} from "../../redux/features/products/commentSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import StarsReviews from "../../components/RateStars/StarsReviews";
import StarsReviewsLg from "../../components/RateStars/StarsReviewsLg";
import { PlusOutlined } from "@ant-design/icons";
import useScrollToTop from "../../hooks/useScrollToTop";
import { actFetchAllOrder } from "../../redux/features/products/orderSlice";
import { DataBQ } from "./DataBQ";

const initialFormValue = {
  title: "",
  content: "",
};

const resgisterSchema = Yup.object({
  title: Yup.string()
    .required("Vui lòng nhập tiêu đề của bạn!")
    .min(3, "Tiêu đề phải có ít nhất 3 ký tự"),
  content: Yup.string()
    .required("Vui lòng nhập nội dung đánh giá của bạn!")
    .min(3, "Nội dung phải có ít nhất 3 ký tự"),
});
const ProductDetails = () => {
  useScrollToTop();
  const product = useSelector((state) => state.product.currentProduct);

  const { userInfo, isLoggedIn } = useSelector((state) => state.auth);

  const { comments } = useSelector((state) => state.comment);

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(actFetchProductById(params?.id));
    dispatch(actFetchAllComments({ productId: product?.id }));
    dispatch(actFetchAllOrder({ userId: userInfo?.id || "" }), {
      ...params,
    });
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, product?.id, userInfo?.id]);

  const methods = useForm({
    defaultValues: initialFormValue,
    resolver: yupResolver(resgisterSchema),
  });
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors: errorsValidate },
  } = methods;

  const onValid = (values) => {
    const commentInfo = {
      userId: userInfo?.id,
      productId: product?.id,
      createAt: new Date().toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
      }),
      rating: rating || 0,
      username: userInfo?.username || "",
      fileUrl0:
        fileList[0]?.thumbUrl ||
        "https://file.hstatic.net/200000473357/file/frame-logo_b61c0616110d41098a1d231657356290.png",
      fileUrl1:
        fileList[1]?.thumbUrl ||
        "https://file.hstatic.net/200000473357/file/frame-logo_b61c0616110d41098a1d231657356290.png",
      fileUrl2:
        fileList[2]?.thumbUrl ||
        "https://file.hstatic.net/200000473357/file/frame-logo_b61c0616110d41098a1d231657356290.png",
      ...values,
    };

    if (!isLoggedIn)
      return toast(
        <div className="text-center fw-bold text-danger">
          Vui lòng đăng nhập để đánh giá!
        </div>
      );
    if (Number(ArrRenderCOMMENT_1_ByProductId(comments)) === userInfo?.id)
      return toast(
        <div className="text-center fw-bold text-danger">
          Bạn đã tham gia đánh giá sản phẩm rồi!
        </div>
      );

    if (Number(ArrRenderCOMMENTSByProductId(orders)) === product?.id) {
      dispatch(
        actCreateNewCommment({
          commentInfo: commentInfo,
          productId: product?.id,
          ...params,
        })
      );
      setIsModalOpen(false);
      setValue("title", "");
      setValue("content", "");
      setRating(0);
      setFileList("");
      toast(
        <div className="text-center fw-bold text-success">
          Cảm ơn bạn đã đánh giá cho sản phẩm!
        </div>
      );
    } else {
      toast(
        <div className="text-center fw-bold text-danger">
          Vui lòng mua sản phẩm để tham gia đánh giá!
        </div>
      );
    }
  };

  const { orders } = useSelector((state) => state?.order);

  const ArrRenderCOMMENT_1_ByProductId = (comments) => {
    return comments
      ?.map((comment) => comment?.userId)
      .find((userId) => userId === userInfo?.id);
  };

  const ArrRenderCOMMENTSByProductId = (orders) => {
    return orders
      ?.map((order) => order?.carts?.map((cart) => cart?.id))
      .find((id) => Number(id) === product?.id);
  };

  const ArrRenderRate = (comments) => {
    return comments.map((comment) => comment?.rating);
  };

  // const ArrrenderRateValues = Object.values(ArrrenderRate(comments));

  const [renderRateMedium, setRenderRateMedium] = useState(0);

  useEffect(() => {
    setRenderRateMedium(
      Number(
        ArrRenderRate(comments).reduce((partialSum, a) => partialSum + a, 0) /
          ArrRenderRate(comments).length
      ).toFixed(1)
    );
  }, [comments]);

  const onChange = (key) => {
    console.log(key);
  };

  const [fillActive, setFillActive] = useState("tab0");

  const handleFillClick = (value) => {
    if (value === fillActive) {
      return;
    }
    setFillActive(value);
  };

  const productSize = product?.size ? product?.size?.[0] : "";
  const productColor = product?.color ? product?.color?.[0] : "";
  const [size, setSize] = useState(productSize);
  const [color, setColor] = useState(productColor);

  const [rating, setRating] = useState(0);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setValue("title", "");
    setValue("content", "");
    setRating(0);
    setFileList("");
    setIsModalOpen(false);
  };

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

  const handleCancels = () => setPreviewOpen(false);
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

  const renderCommentsByProductId = (comments) => {
    return comments?.map((comment) => (
      <section>
        <div key={comment?.id} className="border-bottom mb-3 pe-2">
          <div>
            <div>
              <img
                src={comment?.fileUrl0}
                alt="product_Img0"
                style={{
                  height: 100,
                  width: 100,
                  marginBottom: 5,
                  marginRight: 5,
                }}
              />
              <img
                src={comment?.fileUrl1}
                alt="product_Img1"
                style={{
                  height: 100,
                  width: 100,
                  marginBottom: 5,
                  marginRight: 5,
                }}
              />
              <img
                src={comment?.fileUrl2}
                alt="product_Img3"
                style={{
                  height: 100,
                  width: 100,
                  marginBottom: 5,
                }}
              />
            </div>
            <Rate disabled allowHalf defaultValue={comment?.rating || 0} />
            <div className="d-flex mt-1">
              <strong>
                <p className="mb-1">{comment?.title} -</p>
              </strong>
              <strong>
                <i>
                  <p className="text-muted ms-1 mb-1">{comment?.username} -</p>
                </i>
              </strong>
              <p className="text-muted ms-1 mb-1">{comment?.createAt}</p>
            </div>
            <p>{comment?.content}</p>
          </div>
        </div>
      </section>
    ));
  };

  return (
    <div className="bg-white">
      <section>
        <div className="container">
          <div className="row gx-1">
            <aside className="col-lg-8 mt-3">
              <MDBTabsContent>
                <MDBTabsPane show={fillActive === "tab0"}>
                  <div className="row">
                    {product?.images?.image0?.slice(0, 4)?.map((image) => (
                      <div className="col-md-6 mb-2 mx-auto">
                        <img
                          style={{
                            maxWidth: "100%",
                            maxHeight: "65vh",
                          }}
                          className="rounded-4"
                          src={image}
                          alt="product"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="row">
                    {product?.images?.image0?.slice(4, 7)?.map((image) => (
                      <div className="col-md-4 mb-2 mx-auto">
                        <img
                          style={{
                            maxWidth: "100%",
                            maxHeight: "50vh",
                          }}
                          className="rounded-4 mx-auto"
                          src={image}
                          alt="product"
                        />
                      </div>
                    ))}
                  </div>
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === "tab1"}>
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={product?.images?.image0?.[0]}
                    alt=""
                  />
                </MDBTabsPane>
                <MDBTabsPane show={fillActive === "tab2"}>
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100vh",
                      margin: "auto",
                    }}
                    className="rounded-4 fit"
                    src={product?.images?.image0?.[6]}
                    alt=""
                  />
                </MDBTabsPane>
              </MDBTabsContent>
            </aside>
            <main className="col-lg-4 mt-3">
              <div className="ps-lg-3">
                <h4 className="title text-dark ">{product?.title}</h4>
                <div className="d-flex flex-row">
                  <div className=" me-2">
                    <StarsReviews
                      stars={renderRateMedium || 0}
                      reviews={ArrRenderRate(comments).length || 0}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  {product?.sale > 0 ? (
                    <div>
                      <strong>
                        <i className="h3 text-danger me-3">
                          {formatNumber(
                            (
                              product?.price *
                              (1 - 0.01 * product?.sale)
                            )?.toFixed(0)
                          )}
                          đ
                        </i>
                      </strong>
                      <strong>
                        <s className="h5 text-muted me-3">
                          {formatNumber(product?.price?.toFixed(0))} đ
                        </s>
                      </strong>
                      <span
                        className="h3 text-white mx-auto px-2 py-3 bg-danger rounded-circle"
                        style={{ height: 30, width: 30 }}
                      >
                        <i> {-product?.sale} %</i>
                      </span>
                    </div>
                  ) : (
                    <div>
                      <strong>
                        <h3 className="h3 text-danger">
                          {formatNumber(product?.price?.toFixed(0))} đ
                        </h3>
                      </strong>
                    </div>
                  )}
                </div>

                <hr className="mt-4" />
                <div className="row mb-4">
                  <div className="p-0 row">
                    <div className=" p-0 d-flex justify-content-start">
                      <MDBTabs className="col-3 d-flex pb-3">
                        <MDBTabsItem>
                          <div className="d-flex">
                            <MDBTabsContent>
                              <MDBTabsPane
                                show={fillActive === "tab0"}
                                className="pt-3"
                              >
                                <dt className="text-primary text-nowrap text-center">
                                  Mẫu:
                                </dt>
                                <strong>
                                  <i>
                                    <p
                                      style={{
                                        padding: 1,
                                        color: "green",
                                      }}
                                      className="text-wrap"
                                    >
                                      {product?.color?.[0]}
                                    </p>
                                  </i>
                                </strong>
                              </MDBTabsPane>
                              <MDBTabsPane
                                show={fillActive === "tab1"}
                                className="pt-3"
                              >
                                <dt className="text-primary text-nowrap text-center">
                                  Mẫu:
                                </dt>
                                <strong>
                                  <i>
                                    <p style={{ padding: 1, color: "green" }}>
                                      {product?.color?.[1]}
                                    </p>
                                  </i>
                                </strong>
                              </MDBTabsPane>
                              <MDBTabsPane
                                show={fillActive === "tab2"}
                                className="pt-3"
                              >
                                <dt className="text-primary text-nowrap text-center">
                                  Mẫu:
                                </dt>
                                <strong>
                                  <i>
                                    <p
                                      style={{
                                        padding: 1,
                                        color: "green	",
                                      }}
                                    >
                                      {product?.color?.[2]}
                                    </p>
                                  </i>
                                </strong>
                              </MDBTabsPane>
                            </MDBTabsContent>
                          </div>
                        </MDBTabsItem>
                      </MDBTabs>
                      <MDBTabs className="col-9 d-flex pb-3">
                        <MDBTabsItem>
                          <Button
                            style={{
                              padding: 1,
                            }}
                            variant="white"
                            size="md"
                            onClick={() => handleFillClick("tab0")}
                            active={fillActive === "tab0"}
                          >
                            <img
                              width="50"
                              height="80"
                              src={product?.images?.image0?.[0]}
                              alt=""
                            />
                            <img
                              width="50"
                              height="80"
                              src={product?.images?.image0?.[6]}
                              alt="product"
                            />
                          </Button>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <Button
                            style={{ padding: 1 }}
                            variant="white"
                            size="md"
                            onClick={() => handleFillClick("tab1")}
                            active={fillActive === "tab1"}
                          >
                            <img
                              width="80"
                              height="80"
                              className="rounded-2"
                              src={product?.images?.image0?.[0]}
                              alt="product"
                            />
                          </Button>
                        </MDBTabsItem>
                        <MDBTabsItem>
                          <Button
                            style={{ padding: 1 }}
                            className="text-primary"
                            variant="white"
                            size="md"
                            onClick={() => handleFillClick("tab2")}
                            active={fillActive === "tab2"}
                          >
                            <img
                              width="80"
                              height="80"
                              className="rounded-2"
                              src={product?.images?.image0?.[6]}
                              alt="product"
                            />
                          </Button>
                        </MDBTabsItem>
                      </MDBTabs>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-6">
                      <label className="mb-2 text-success">
                        <strong>
                          <i>Kích cỡ:</i>
                        </strong>
                      </label>
                      <select
                        className="form-select border border-secondary text-danger"
                        style={{ height: 35, width: 100, fontWeight: 700 }}
                        value={size}
                        onChange={(e) => setSize(e.target.value)}
                      >
                        {product?.size?.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-6">
                      <label className="mb-2 text-success">
                        <strong>
                          <i>Màu Sắc:</i>
                        </strong>
                      </label>
                      <select
                        className="form-select border border-secondary text-danger"
                        style={{ height: 35, width: 140, fontWeight: 700 }}
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                      >
                        {product?.color?.map((item) => (
                          <option value={item}>{item}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <Link
                    to={ROUTES.CART}
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
                    <Button
                      variant="success text-nowrap"
                      className="icon-hover"
                    >
                      Mua Ngay
                    </Button>
                  </Link>
                  <Button
                    variant="warning text-nowrap"
                    className="icon-hover mx-3"
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
                  <Button
                    variant="info text-nowrap"
                    className="icon-hover"
                    ripple={true}
                    onClick={() => navigate(-1)}
                  >
                    Trang Trước Đó
                  </Button>
                </div>
              </div>
              <div>
                <MDBTabsContent>
                  <h3 className="text-danger mt-5 mb-3 ps-3">
                    Đặc Điểm Nổi Bật
                  </h3>
                  <MDBTabsPane show={fillActive === "tab0"}>
                    <p className="ps-3">
                      {product?.characteristics?.characteristic}
                    </p>
                    {product?.characteristics?.characteristic0?.map((chat) => (
                      <p className="ps-3">{chat}</p>
                    ))}
                  </MDBTabsPane>
                  <MDBTabsPane show={fillActive === "tab1"}>
                    <p className="hidden-p ps-3">
                      {product?.characteristics?.characteristic}
                    </p>
                    {product?.characteristics?.characteristic0?.map((chat) => (
                      <p className="ps-3">{chat}</p>
                    ))}
                  </MDBTabsPane>
                  <MDBTabsPane show={fillActive === "tab2"}>
                    <p className="hidden-p ps-3">
                      {product?.characteristics?.characteristic}
                    </p>
                    {product?.characteristics?.characteristic0?.map((chat) => (
                      <p className="ps-3">{chat}</p>
                    ))}
                  </MDBTabsPane>
                </MDBTabsContent>
              </div>
            </main>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="row gx-4">
            <div className="col-lg-12 mb-1">
              <div className="border rounded-2 px-3 py-2">
                <div className="nav nav-pills nav-justified mb-3">
                  <main>
                    <Tabs
                      defaultActiveKey="1"
                      centered
                      items={DataBQ}
                      onChange={onChange}
                    />
                  </main>
                </div>
              </div>
            </div>
          </div>
          <section>
            <div className="my-3">
              <div className="d-flex justify-content-between">
                <h5 className="text-success">
                  <u>Khách Hàng Nhận Xét: </u>
                </h5>
                <Button variant="success" onClick={showModal}>
                  Viết Đánh Giá
                </Button>
              </div>

              <div className="mb-3 text-center text-success">
                <StarsReviewsLg
                  stars={renderRateMedium || 0}
                  reviews={ArrRenderRate(comments).length || 0}
                />
              </div>
              {comments?.length ? (
                <div
                  style={{
                    textAlign: "justify",
                    height: 230,
                    overflowY: "scroll",
                    background: "white",
                  }}
                >
                  {renderCommentsByProductId(comments)}
                </div>
              ) : (
                ""
              )}
            </div>
          </section>
          <Modal
            title="Viết Đánh Giá Của Bạn!"
            centered
            open={isModalOpen}
            onOk={handleSubmit(onValid)}
            onCancel={handleCancel}
            width={1200}
            okText="Gửi"
            cancelText="Hủy"
          >
            <form onSubmit={handleSubmit(onValid)}>
              <div className="d-flex justify-content-between">
                <div className="mb-2">
                  <Rate
                    allowHalf
                    defaultValue={rating || 0}
                    onChange={(rate) => setRating(rate || 0)}
                    style={{ fontSize: 75 }}
                  />
                  <div className="d-flex justify-content-center">
                    <h6>
                      Đánh Giá:
                      <span className="text-danger mx-2">{rating} sao</span>
                    </h6>
                  </div>
                </div>
                <div>
                  <Upload
                    action=""
                    listType="picture-card"
                    fileList={[...fileList]}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={3}
                    className="d-flex justify-content-center"
                  >
                    {fileList.length >= 8 ? null : uploadButton}
                  </Upload>
                  <Modal
                    open={previewOpen}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancels}
                  >
                    <img
                      alt="example"
                      style={{
                        width: "100%",
                      }}
                      src={previewImage}
                    />
                  </Modal>
                  <h6 className="mb-0 text-warning mt-2">
                    Tải Lên 3 Ảnh Sản Phẩm Bạn Đã Mua
                  </h6>
                </div>
              </div>
              <div className="mb-2">
                <strong>Tiêu Đề:</strong>
                <Controller
                  control={control}
                  name="title"
                  render={({ field: { onChange, value } }) => (
                    <Input
                      name="title"
                      placeholder="Nhập Nội Dung Đánh Giá Tối Thiểu 3 Ký Tự - Tối Đa 100 Ký Tự"
                      type="text"
                      minLength={10}
                      maxLength={100}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <span
                  className="text-danger ms-2"
                  style={{ fontSize: 18, fontWeight: 500 }}
                >
                  {errorsValidate.title && errorsValidate.title?.message}
                </span>
              </div>
              <div>
                <strong>Nội Dung:</strong>
                <Controller
                  control={control}
                  name="content"
                  render={({ field: { onChange, value } }) => (
                    <TextArea
                      name="content"
                      rows={6}
                      placeholder="Tối Thiểu 3 Ký Tự - Tối Đa 1000 Ký Tự"
                      type="text"
                      minLength={25}
                      maxLength={1000}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
                <span
                  className="text-danger ms-2"
                  style={{ fontSize: 18, fontWeight: 500 }}
                >
                  {errorsValidate.content && errorsValidate.content?.message}
                </span>
              </div>
            </form>
          </Modal>
        </div>
      </section>
    </div>
  );
};
export default ProductDetails;
