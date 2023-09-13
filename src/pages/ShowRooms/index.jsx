import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import giaybqhethongcuahang from "../../assets/images/showroom/giaybqhethongcuahang.png";
import useScrollToTop from "../../hooks/useScrollToTop";
import AddressBQ from "../../components/Address/AddressBQ";
import { useDispatch } from "react-redux";
import {
  deleteFilterReducer,
  setSearchKey,
} from "../../redux/features/products/productSlice";

const ShowRooms = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSearchKey(""));
    dispatch(deleteFilterReducer(null));
  });
  const [payloadAddress, setPayloadAddress] = useState("");
  return (
    <div>
      <Card.Img
        src={giaybqhethongcuahang}
        alt="giaybqhethongcuahang"
        className="mb-5"
        style={{ maxWidth: "100vw" }}
      />
      <h2 className="text-center text-success mb-2">
        Hệ Thống Cửa Hàng & Đại Lý
      </h2>
      <div className="text-center mb-5">
        <p className="pb-1 mb-0">
          Giày BQ đã có mặt tại 43 tỉnh thành với hệ thống hơn 200 cửa hàng và
          đại lý trên toàn quốc. Chọn ngay để biết địa chỉ gần bạn nhất!
        </p>
        <p>Chọn ngay để biết địa chỉ gần bạn nhất!</p>
        <div className="row d-flex justify-content-center mx-0 mb-5">
          <div className="col-1"></div>
          <div className="col-10">
            <AddressBQ
              payloadAddress={payloadAddress}
              setPayloadAddress={setPayloadAddress}
            />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
};

export default ShowRooms;
