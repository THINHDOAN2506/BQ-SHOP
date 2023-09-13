import React, { memo } from "react";

const SelectInput = ({
  label,
  options,
  value,
  setValue,
  type,
  reset,
  name,
}) => {
  return (
    <div className="d-flex align-items-center">
      <select
        value={reset ? "" : value}
        onChange={(e) =>
          !name
            ? setValue(e.target.value)
            : setValue((prev) => ({ ...prev, [name]: e.target.value }))
        }
        id="select-address"
        className="border-1 rounded-2"
      >
        <option value="" className="text-center">{`--${label}--`}</option>
        {options?.map((item) => {
          return (
            <option
              key={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : type === "ward"
                  ? item?.ward_id
                  : item?.code
              }
              value={
                type === "province"
                  ? item?.province_id
                  : type === "district"
                  ? item?.district_id
                  : type === "ward"
                  ? item?.ward_id
                  : item?.code
              }
            >
              {type === "province"
                ? item?.province_name
                : type === "district"
                ? item?.district_name
                : type === "ward"
                ? item?.ward_name
                : item?.value}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default memo(SelectInput);
