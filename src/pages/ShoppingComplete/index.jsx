import React, { useEffect } from "react";
import { ROUTES } from "../../constants/router";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useDispatch } from "react-redux";
import {
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";

const ShoppingComplete = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
  });
  return (
    <div>
      <div className="container text-center mb-5">
        <h3 className="text-success">Đơn hàng của Quý Khách đã hoàn tất.</h3>
        <h4 className="text-danger">
          Nhà Bán Hàng sẽ giao cho đơn vị vận chuyển trong vòng từ 1-3 ngày!
        </h4>
        <div>
          <div className="d-flex justify-content-center">
            <h5 className="text-warning">
              Quý Khách có thể tham khảo thêm các sản phẩm khác của hệ thống
              Shop...
            </h5>
            <Link to={ROUTES.PRODUCTS}>
              <h5 className="ms-2">tại đây</h5>
            </Link>
          </div>
          <h5>Chúc Quý Khách mua sắm vui vẻ.</h5>
          <h5>Cảm ơn Quý Khách!!!</h5>
        </div>
        <div className="row mt-5">
          <p className="col-4">
            đi tới
            <Link to={ROUTES.USERINFORMATION}>
              <h6 className="ms-2">Trang Thông Tin Cá Nhân</h6>
            </Link>
          </p>
          <p className="col-4">
            đi tới
            <Link to={ROUTES.PRODUCTS}>
              <h6 className="ms-2">Trang Sản Phẩm</h6>
            </Link>
          </p>

          <p className="col-4">
            đi tới
            <Link to={ROUTES.HOME_PAGE}>
              <h6 className="ms-2">Trang Chủ</h6>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShoppingComplete;
