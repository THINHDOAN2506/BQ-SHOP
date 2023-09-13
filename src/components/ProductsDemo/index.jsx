import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import ProductCard from "../../components/ProductCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { ROUTES } from "../../constants/router";
import { actfetchAllProduct } from "../../redux/features/products/productSlice";
import { Spin } from "antd";

const ProductsDemo = () => {
  const dispatch = useDispatch();
  const { isLoading, products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(actfetchAllProduct());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return (
      <Spin
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      />
    );
  }
  return (
    <div className="px-5">
      <section
        style={{
          backgroundColor: "#eee",
          borderRadius: 15,
        }}
      >
        <div>
          <h1
            className="text-center py-3"
            style={{
              fontWeight: 800,
              background: "green",
              borderTopRightRadius: 15,
              borderTopLeftRadius: 15,
              color: "orange",
            }}
          >
            <i>Sản phẩm</i>
          </h1>
          {products?.length === 0 ? (
            <div className="container py-3">
              <h1 className="text-center text-danger m-5 p-3 border border-3 border-primary rounded-pill bg-warning">
                No Products...!!!
              </h1>
            </div>
          ) : (
            <>
              <div className="px-3 pt-3 pb-2">
                <div className="row">
                  {products?.slice(17, 25)?.map((product) => (
                    <ProductCard key={product?.id} product={product} />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        <div className="d-flex justify-content-center pb-4">
          <Link to={ROUTES.PRODUCTS}>
            <Button variant="warning" className="py-2 px-5">
              Xem Tất Cả Các Sản Phẩm
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ProductsDemo;
