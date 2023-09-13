import { Input } from "antd";
import React from "react";

const InputReadOnly = ({ value }) => {
  return (
    <div className="d-flex align-items-center mb-3">
      <Input
        type="text"
        id="exactly-address"
        readOnly
        className="border-1 rounded-2 w-100"
        value={value}
      />
    </div>
  );
};

export default InputReadOnly;
