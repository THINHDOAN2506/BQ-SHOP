import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actfetchAllProduct } from "../../redux/features/products/productSlice";

const ProductsQC = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(actfetchAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <div className="col-lg-12">
        <div className="px-0 border rounded-2 shadow-0">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sản Phẩm Tương Tự</h5>
              <div className="row d-flex">
                {products.map(
                  (product) =>
                    product.key === product.types.type0 && (
                      <div className="d-flex col-lg-3 col-md-6 col-sm-12 col-xs-12 mb-3">
                        <img
                          src={product.images.image}
                          style={{ minWidth: 96, height: 96 }}
                          className="img-md img-thumbnail me-3"
                          alt=""
                        />

                        <div className="info">
                          <h6 className="nav-link mb-1">{product.title}</h6>

                          <strong className="text-dark">
                            {product.prices}
                          </strong>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsQC;
