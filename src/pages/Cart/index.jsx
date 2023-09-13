import { useDispatch, useSelector } from "react-redux";
import {
  clearAllCarts,
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity,
} from "../../redux/features/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/router";
import { DeleteOutlined } from "@ant-design/icons";
import { formatNumber } from "../../utils/formatNumber";
import useScrollToTop from "../../hooks/useScrollToTop";
import { Button } from "react-bootstrap";
import { useEffect } from "react";
import {
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";

const Cart = () => {
  useScrollToTop();
  const { cartItems, totalQuantity, totalPrice } = useSelector(
    (state) => state.cart
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
  });
  const renderCartList = (cartItems) => {
    return cartItems?.map((product) => (
      <div>
        <div
          className="row mb-2 d-flex justify-content-between align-items-center"
          key={product?.id}
        >
          <div className="col-md-2 col-lg-2 col-xl-2">
            <img
              src={product?.images}
              className=" rounded-3"
              alt="product"
              style={{ height: 100, width: 100 }}
            />
          </div>
          <div className="col-md-10 col-lg-5 col-xl-5">
            <p className="mb-0 small">
              <i>{product?.product_type}</i>
            </p>
            <h6 className="col-sm-10 col-md-12 fw-bold mb-1">
              <i>{product?.title}</i>
            </h6>
            <div className="row d-flex mb-1">
              <div className="col-sm-6 col-md-6 d-flex">
                <label style={{ width: 52 }}>
                  <h6 className="mb-0 me-2">Color:</h6>
                </label>
                <i>
                  <p className="text-danger mb-0" style={{ fontWeight: 700 }}>
                    {product?.color}
                  </p>
                </i>
              </div>
              <div className="col-sm-6 col-md-6 d-flex">
                <label style={{ width: 52 }}>
                  <h6 className="mb-0 me-2">Size:</h6>
                </label>
                <i>
                  <p
                    className="text-danger mb-0"
                    style={{ width: 50, fontWeight: 700 }}
                  >
                    {product?.size}
                  </p>
                </i>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-5 col-xl-5">
            <div className="row">
              <div className="col-sm-5 col-md-6 col-lg-5 col-xl-5 d-flex p-0">
                <button
                  className="btn btn-link"
                  ripple={true}
                  onClick={() => dispatch(decreaseItemQuantity(product))}
                >
                  <i className="fas fa-minus"></i>
                </button>
                <input
                  value={product?.quantity}
                  type="number"
                  className="form-control form-control-sm text-center"
                  style={{ width: 50 }}
                />
                <button
                  className="btn btn-link px-2"
                  ripple={true}
                  onClick={() => dispatch(increaseItemQuantity(product))}
                >
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <h5 className="col-sm-5 col-md-4 col-lg-5 col-xl-5 text-center text-danger mb-0 p-0">
                <i>{formatNumber(product?.price)}</i>
              </h5>
              <div className="col-sm-2 col-md-2 col-lg-2 col-xl-2 d-flex p-0">
                <DeleteOutlined
                  style={{ fontSize: 30, cursor: "pointer" }}
                  onClick={() =>
                    dispatch(
                      deleteItem({
                        id: product.id,
                        size: product.size,
                        color: product.color,
                      })
                    )
                  }
                />
              </div>
            </div>
          </div>
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
              <div className="card" style={{ borderRadius: 15 }}>
                <div className="card-body p-0">
                  <div className="col-lg-12">
                    <div className="p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <i>
                          <h1 className="fw-bold mb-3 text-primary">
                            GIỎ HÀNG
                          </h1>
                        </i>
                        <i>
                          <h6 className="mb-0 text-muted">
                            {cartItems?.length} sản phẩm
                          </h6>
                        </i>
                      </div>
                      <hr className="mb-4" />

                      <div classNameName="cartpayment">
                        {cartItems.length ? (
                          renderCartList(cartItems)
                        ) : (
                          <h5 className="d-flex justify-content-center text-danger">
                            <strong>
                              <i>Giỏ Hàng Rỗng...!!!</i>
                            </strong>
                          </h5>
                        )}
                      </div>
                    </div>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-around bg-grey">
                    <div className="d-flex justify-content-center my-3">
                      <i>
                        <h5 className="text-uppercase text-success text-center">
                          Tổng Số Lượng:
                          <h5 className="text-danger text-center mt-2">
                            {totalQuantity}
                          </h5>
                        </h5>
                      </i>
                    </div>
                    <hr className="my-3" />
                    <div className="d-flex justify-content-center my-3">
                      <i>
                        <h5 className="text-uppercase text-success text-center">
                          Tổng Thanh Toán:
                          <h5 className="text-danger text-center mt-2">
                            {formatNumber(totalPrice)}
                          </h5>
                        </h5>
                      </i>
                    </div>
                    <Link
                      to={ROUTES.CHECKOUT_PAGE}
                      className="text-decoration-none d-flex justify-content-center "
                    >
                      <div className="mx-1">
                        <button
                          type="button"
                          className="btn btn-success btn-block btn-lg "
                          data-mdb-ripple-color="warning"
                        >
                          <strong>THANH TOÁN</strong>
                        </button>
                      </div>
                    </Link>
                  </div>
                  <hr className="my-3" />
                  <div className="d-flex justify-content-center">
                    <Button
                      variant="warning text-uppercase"
                      onClick={() => dispatch(clearAllCarts())}
                    >
                      <strong>Xóa Toàn Bộ Giỏ Hàng</strong>
                    </Button>
                  </div>
                  <hr className="my-3" />
                  <div className="py-3 row">
                    <h6 className="mb-0 col-4 d-flex justify-content-center">
                      <i className="me-2">
                        trở về
                        <span
                          className="text-decoration-underline text-primary mx-2"
                          onClick={() => navigate(-1)}
                        >
                          Trang Trước Đó
                        </span>
                      </i>
                    </h6>
                    <h6 className="mb-0 col-4 d-flex justify-content-center">
                      <i className="me-2">
                        đi đến
                        <Link to={ROUTES.HOME_PAGE} className="mx-2">
                          Trang Chủ
                        </Link>
                      </i>
                    </h6>
                    <h6 className="mb-0 col-4 d-flex justify-content-center">
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
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Cart;
