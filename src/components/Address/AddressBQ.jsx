import React, { memo, useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import {
  apiGetPublicProvinces,
  apiGetPublicDistrict,
  apiGetPublicWards,
} from "../../redux/features/products/addressSlice";
import Search from "antd/es/input/Search";
import { Button } from "react-bootstrap";

const AddressBQ = ({ payloadAddress, setPayloadAddress }) => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [reset, setReset] = useState(false);

  useEffect(() => {
    const fetchPublicProvince = async () => {
      const response = await apiGetPublicProvinces();
      if (response.status === 200) {
        setProvinces(response?.data.results);
      }
    };
    fetchPublicProvince();
  }, []);
  useEffect(() => {
    setDistrict(null);
    const fetchPublicDistrict = async () => {
      const response = await apiGetPublicDistrict(province);
      if (response.status === 200) {
        setDistricts(response.data?.results);
      }
    };
    province && fetchPublicDistrict();
    !province ? setReset(true) : setReset(false);
    !province && setDistricts([]);
  }, [province]);

  useEffect(() => {
    setWard(null);
    const fetchPublicWard = async () => {
      const response = await apiGetPublicWards(district);
      if (response.status === 200) {
        setWards(response.data?.results);
      }
    };
    district && fetchPublicWard();
    !district ? setReset(true) : setReset(false);
    !district && setWards([]);
  }, [district]);

  useEffect(() => {
    setPayloadAddress((prev) => ({
      ...prev,
      address: `${
        ward
          ? `${wards?.find((item) => item.ward_id === ward)?.ward_name},`
          : ""
      } ${
        district
          ? `${
              districts?.find((item) => item.district_id === district)
                ?.district_name
            },`
          : ""
      } ${
        province
          ? provinces?.find((item) => item.province_id === province)
              ?.province_name
          : ""
      }`,
      province: province
        ? provinces?.find((item) => item.province_id === province)
            ?.province_name
        : "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [province, district, ward]);
  return (
    <div>
      <div className="row my-3 px-2 d-flex justify-content-around align-items-center">
        <div className="col-3 mx-auto">
          <SelectInput
            type="province"
            value={province}
            setValue={setProvince}
            options={provinces}
            label="Tỉnh/Thành Phố"
          />
        </div>
        <div className="col-3 mx-auto">
          <SelectInput
            reset={reset}
            type="district"
            value={district}
            setValue={setDistrict}
            options={districts}
            label="Quận/Huyện"
          />
        </div>
        <div className="col-3 mx-auto">
          <SelectInput
            reset={reset}
            type="ward"
            value={ward}
            setValue={setWard}
            options={wards}
            label="Phường/Xã"
          />
        </div>
        <div className="col-3 mx-auto">
          <Search placeholder="Tìm Kiếm" className="rounded-2" />
        </div>
      </div>
      <div className="col-md-12 d-flex">
        <div className="col-md-6 d-flex justify-content-center">
          {payloadAddress.province !== "" ? (
            <div>
              <h5>
                {province
                  ? provinces?.find((item) => item.province_id === province)
                      ?.province_name
                  : ""}
              </h5>
              <p className="mb-1">{`${
                ward
                  ? `${
                      wards?.find((item) => item.ward_id === ward)?.ward_name
                    },`
                  : ""
              } ${
                district
                  ? `${
                      districts?.find((item) => item.district_id === district)
                        ?.district_name
                    },`
                  : ""
              } ${
                province
                  ? provinces?.find((item) => item.province_id === province)
                      ?.province_name
                  : ""
              }`}</p>
              <p className="mb-0">Điện thoại: 0793-609-987</p>
              <p className="mb-0">
                Thời gian: 8h30 - 21h30 (Kể cả CN và ngày lễ)
              </p>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="col-md-6 d-flex justify-content-center align-items-center">
          <Button
            variant="outline-secondary"
            className="border-0"
            style={{ maxHeight: 40 }}
          >
            <u>Xem bản đồ</u>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default memo(AddressBQ);
