import React, { memo, useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import InputReadOnly from "./InputReadOnly";
import {
  apiGetPublicProvinces,
  apiGetPublicDistrict,
  apiGetPublicWards,
} from "../../redux/features/products/addressSlice";

const Address = ({ setPayloadAddress }) => {
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
      <div>
        <div className="row my-3">
          <div className="col-xxl-4 col-xl-12 col-sm-12 mb-1">
            <SelectInput
              type="province"
              value={province}
              setValue={setProvince}
              options={provinces}
              label="Tỉnh/Thành Phố"
            />
          </div>
          <div className="d-flex justify-content-center col-xxl-4 col-xl-6 col-sm-6 mb-1">
            <SelectInput
              reset={reset}
              type="district"
              value={district}
              setValue={setDistrict}
              options={districts}
              label="Quận/Huyện"
            />
          </div>
          <div className="d-flex justify-content-end col-xxl-4 col-xl-6 col-sm-6">
            <SelectInput
              reset={reset}
              type="ward"
              value={ward}
              setValue={setWard}
              options={wards}
              label="Phường/Xã"
            />
          </div>
        </div>
        <InputReadOnly
          value={`${
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
          }`}
        />
      </div>
    </div>
  );
};

export default memo(Address);
