import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { Pagination, Select, Space, Spin } from "antd";
import {
  actfetchAllProduct,
  deleteFilterReducer,
  fiterReducer,
  setNewPage,
  setSearchKey,
} from "../../redux/features/products/productSlice";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard";
import useScrollToTop from "../../hooks/useScrollToTop";
import { useSearchParams } from "react-router-dom";
import { RiFilterOffLine } from "react-icons/ri";
import { scrollToTop } from "../../utils/scrollToTop";

const Products = () => {
  useScrollToTop();

  const dispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { isLoading, products, pagination, searchKey, params } = useSelector(
    (state) => state.product
  );

  useEffect(
    () => {
      const brandParams = searchParams?.get("brand");
      const productTypeParams = searchParams?.get("productType");
      dispatch(
        actfetchAllProduct({
          _page: 1,
          _limit: pagination?.limitPerPage,
          q: searchKey,
          ...params,
          ...(productTypeParams ? { productType: productTypeParams } : {}),
          ...(brandParams ? { brand: brandParams } : {}),
        })
      );
      return () => {
        dispatch(setNewPage(1));
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [params, searchParams]
  );

  const handleChangePage = (newPage) => {
    const brandParams = searchParams?.get("brand");
    const productTypeParams = searchParams?.get("productType");
    dispatch(setNewPage(newPage));
    dispatch(
      actfetchAllProduct({
        _page: newPage,
        _limit: pagination?.limitPerPage,
        q: searchKey,
        ...params,
        ...(productTypeParams ? { productType: productTypeParams } : {}),
        ...(brandParams ? { brand: brandParams } : {}),
      })
    );
    setSearchKey(searchKey);
    scrollToTop();
  };

  const handleDeleteFilterChange = (value) => {
    dispatch(deleteFilterReducer(value));
  };

  const handleFilterChange = (value) => {
    const brandParams = searchParams?.get("brand");
    const productTypeParams = searchParams?.get("productType");
    dispatch(fiterReducer(value));
    dispatch(
      actfetchAllProduct({
        _page: 1,
        _limit: pagination?.limitPerPage,
        q: searchKey,
        ...params,
        ...(productTypeParams ? { productType: productTypeParams } : {}),
        ...(brandParams ? { brand: brandParams } : {}),
      })
    );
  };

  const handleChangeSize = (value, event) => {
    const brandParams = searchParams?.get("brand");
    const productTypeParams = searchParams?.get("productType");
    dispatch(fiterReducer(event));
    dispatch(
      actfetchAllProduct({
        _page: 1,
        _limit: pagination?.limitPerPage,
        q: searchKey,
        size_like: event.value,
        ...params,
        ...(productTypeParams ? { productType: productTypeParams } : {}),
        ...(brandParams ? { brand: brandParams } : {}),
      })
    );
  };
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
    <div className="container">
      <section
        style={{ backgroundColor: "#eee", borderRadius: 15, marginTop: 85 }}
      >
        <div className="row">
          <div className="d-flex justify-content-between mt-3 px-4">
            <Space wrap>
              <RiFilterOffLine
                style={{ cursor: "pointer" }}
                onClick={handleDeleteFilterChange}
                fontSize={35}
                className="py-1 me-2"
              />
              <Select
                style={{ width: 92, fontWeight: 700 }}
                defaultValue="Kích Cỡ"
                onChange={handleChangeSize}
                options={[
                  { value: 34, label: "Size 34", type: "size" },
                  { value: 35, label: "Size 35", type: "size" },
                  { value: 36, label: "Size 36", type: "size" },
                  { value: 37, label: "Size 37", type: "size" },
                  { value: 38, label: "Size 38", type: "size" },
                  { value: 39, label: "Size 39", type: "size" },
                  { value: 40, label: "Size 40", type: "size" },
                  { value: 41, label: "Size 41", type: "size" },
                  { value: 42, label: "Size 42", type: "size" },
                  { value: 43, label: "Size 43", type: "size" },
                  { value: 44, label: "Size 44", type: "size" },
                ]}
              />
              <Select
                style={{ width: 130, fontWeight: 700 }}
                defaultValue="Siêu Sale"
                onChange={handleFilterChange}
                options={[
                  { value: "Dưới 25%", label: "Dưới 25%" },
                  {
                    value: "25%-50%",
                    label: "Từ 25%-50%",
                  },
                  {
                    value: "50%-75%",
                    label: "Từ 50%-75%",
                  },
                  {
                    value: "75%-100%",
                    label: "Từ 75%-100%",
                  },
                ]}
              />
              <Select
                style={{ width: 210, fontWeight: 700 }}
                defaultValue="Lọc Giá"
                onChange={handleFilterChange}
                options={[
                  { value: "Dưới 300.000đ", label: "Dưới 300.000đ" },
                  {
                    value: "300.000đ - 700.000đ",
                    label: "Từ 300.000đ - 700.000đ",
                  },
                  {
                    value: "700.000đ - 1.000.000đ",
                    label: "Từ 700.000đ - 1.000.000đ",
                  },
                  {
                    value: "1.000.000đ - 2.000.000đ",
                    label: "Từ 1.000.000đ - 2.000.000đ",
                  },
                  {
                    value: "Trên 2.000.000",
                    label: "Trên 2.000.000",
                  },
                ]}
              />
            </Space>
            <Space wrap>
              <Select
                style={{ width: 160, fontWeight: 700 }}
                defaultValue="Bộ Lọc"
                onChange={handleFilterChange}
                options={[
                  {
                    value: "Sản Phẩm Nổi Bật",
                    label: "Sản Phẩm Nổi Bật",
                  },
                  { value: "Tên Từ A-Z", label: "Tên Từ A-Z" },
                  { value: "Tên Từ Z-A", label: "Tên Từ Z-A" },
                  { value: "Giá: Tăng Dần", label: "Giá: Tăng Dần" },
                  { value: "Giá: Giảm Dần", label: "Giá: Giảm Dần" },
                  { value: "Mới Nhất", label: "Mới Nhất" },
                  { value: "Cũ Nhất", label: "Cũ Nhất" },
                ]}
              />
            </Space>
          </div>
        </div>

        {products?.length === 0 ? (
          <div className="container py-3">
            <h1 className="text-center text-danger m-5 p-3 border border-3 border-primary rounded-pill bg-warning">
              Không tìm thấy sản phẩm...!
            </h1>
          </div>
        ) : (
          <>
            <div className="container py-3">
              <div className="row">
                {products.map((product) => (
                  <ProductCard key={product?.id} product={product} />
                ))}
              </div>
              <strong>
                <i>
                  <Pagination
                    style={{
                      padding: 20,
                      display: "flex",
                      justifyContent: "center",
                      WebkitTextFillColor: "blue",
                    }}
                    defaultPageSize={pagination?.limitPerPage}
                    current={pagination?.currentPage}
                    total={pagination?.total}
                    onChange={handleChangePage}
                  />
                </i>
              </strong>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
export default Products;
