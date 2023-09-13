import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsFillBagHeartFill } from "react-icons/bs";
import "./style.scss";
import logobq from "../../assets/images/logobq.png";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../constants/router";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
  actfetchAllProduct,
  setNewPage,
  setSearchKey,
} from "../../redux/features/products/productSlice";
import { actLogout } from "../../redux/features/products/authSlice";
import { Input } from "antd";
import { clearAllCarts } from "../../redux/features/cart/cartSlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { FaUserSecret } from "react-icons/fa";
import { scrollToTop } from "../../utils/scrollToTop";

const SideBar = () => {
  const { cartItems } = useSelector((state) => state?.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { searchKey, pagination } = useSelector((state) => state?.product);
  const { userInfo, isLoggedIn } = useSelector((state) => state?.auth);

  const handleLogout = () => {
    dispatch(actLogout());
    dispatch(clearAllCarts());
    navigate(ROUTES.HOME_PAGE);
  };

  const handleSearchProduct = (event) => {
    event.preventDefault();
    if (searchKey !== "") {
      navigate(`/products?search=${searchKey}`);
      dispatch(
        actfetchAllProduct({
          _page: 1,
          _limit: pagination?.limitPerPage,
          q: searchKey,
        })
      );
      scrollToTop();
    }
  };

  const handleChangeInputSearch = (event) => {
    event.preventDefault();
    const value = event?.target?.value;
    dispatch(setSearchKey(value));
  };

  useEffect(
    () => {
      dispatch(
        actfetchAllProduct({
          _page: 1,
          _limit: pagination?.limitPerPage,
        })
      );

      return () => {
        dispatch(setNewPage(1));
      };
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Navbar expand="xl" className="navbar fixed-top">
        <Container fluid>
          <Navbar.Brand>
            <Link to={ROUTES.HOME_PAGE}>
              <img style={{ maxWidth: 75 }} src={logobq} alt="logobq" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <strong className="navbar-link">
                <Nav.Link onClick={() => navigate(`/home-page`)}>
                  Trang Chủ
                </Nav.Link>
              </strong>
              <strong className="navbar-link">
                <NavDropdown title="Giày Nữ">
                  <NavDropdown.Item
                    onClick={() =>
                      navigate(`/products?productType=giay-dep-nu`)
                    }
                  >
                    Tất Cả
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=giay-bit-nu`)}
                  >
                    Giày Bít Nữ
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=sandal-nu`)}
                  >
                    Sandal Nữ
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=guoc-va-dep`)}
                  >
                    Guốc & Dép
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=giay-day-nu`)}
                  >
                    Giày Dây Nữ
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=giay-the-thao-nu`)}
                    className="rounded-bottom-1"
                  >
                    Giày Thể Thao Nữ
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <strong className="navbar-link">
                <NavDropdown title="Giày Nam">
                  <NavDropdown.Item
                    onClick={() =>
                      navigate(`/products?productType=giay-dep-nam`)
                    }
                  >
                    Tất Cả
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=giay-tay`)}
                  >
                    Giày Tây
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=giay-luoi`)}
                  >
                    Giày Lười
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() =>
                      navigate(`/products?brand=sandal-va-dep-nam`)
                    }
                  >
                    Sandal & Dép Nam
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() =>
                      navigate(`/products?brand=giay-the-thao-nam`)
                    }
                  >
                    Giày Thể Thao Nam
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=giay-nam-cao-cap`)}
                    className="rounded-bottom-1"
                  >
                    Giày Nam Cao Cấp
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <strong className="navbar-link">
                <NavDropdown title="Phụ Kiện">
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?productType=phu-kien`)}
                  >
                    Tất Cả
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=vi-nam`)}
                  >
                    Ví Nam
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=tat-vo`)}
                  >
                    Tất Vớ
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=lot-giay`)}
                  >
                    Lót Giày
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=xi-danh-giay`)}
                  >
                    Xi Đánh Giày
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => navigate(`/products?brand=that-lung-nam`)}
                    className="rounded-bottom-1"
                  >
                    Thắt Lưng Nam
                  </NavDropdown.Item>
                </NavDropdown>
              </strong>
              <strong className="navbar-link">
                <Nav.Link onClick={() => navigate(`show-rooms`)}>
                  Showrooms
                </Nav.Link>
              </strong>
            </Nav>
            <Navbar.Collapse className="d-flex justify-content-end">
              <Form className="d-flex" onClick={handleSearchProduct}>
                <Input
                  allowClear
                  placeholder="Tìm Kiếm"
                  value={searchKey}
                  onChange={handleChangeInputSearch}
                  size="sm"
                />
                <Button type="submit" className="text-nowrap ms-2" size="sm">
                  Tìm Kiếm
                </Button>
              </Form>
              <Navbar.Text>
                <Nav.Link>
                  <Link to={ROUTES.CART}>
                    <BsFillBagHeartFill
                      className="ms-4 me-1"
                      style={{
                        fontSize: 30,
                        cursor: "pointer",
                        color: "red",
                        marginBottom: 5,
                      }}
                    />
                    <sup>
                      <strong
                        className="px-2 text-success bg-warning border border-0 rounded-circle"
                        style={{ fontSize: 18 }}
                      >
                        {cartItems?.length}
                      </strong>
                    </sup>
                  </Link>
                </Nav.Link>
              </Navbar.Text>
              {isLoggedIn ? (
                <NavDropdown
                  title={
                    <div className="mx-3" style={{ cursor: "pointer" }}>
                      <img
                        alt="avatar"
                        src={
                          userInfo?.fileUrl ||
                          "https://file.hstatic.net/200000473357/file/frame-logo_b61c0616110d41098a1d231657356290.png"
                        }
                        height={35}
                        width={35}
                        className="d-block mx-auto"
                      />
                      <span className="d-block mx-auto text-nowrap text-success">
                        <strong>
                          {userInfo?.username || (
                            <span className="small">Người Dùng</span>
                          )}
                        </strong>
                      </span>
                    </div>
                  }
                  className="d-flex justify-content-center align-items-center"
                >
                  <NavDropdown.Item
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(ROUTES.USERINFORMATION)}
                    className="text-center text-success rounded-top-1"
                  >
                    <strong className="d-flex align-items-center">
                      Thông Tin
                      <FaUserSecret fontSize={22} style={{ marginLeft: 10 }} />
                    </strong>
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    style={{ cursor: "pointer" }}
                    className="text-center text-danger rounded-bottom-1"
                    onClick={handleLogout}
                  >
                    <strong className="d-flex align-items-center">
                      Đăng Xuất
                      <RiLogoutCircleRLine
                        fontSize={22}
                        style={{ marginLeft: 10 }}
                      />
                    </strong>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link to={ROUTES.LOGIN_PAGE}>
                  <Button variant="outline-success mx-2" size="sm">
                    <strong>Đăng Nhập</strong>
                  </Button>
                </Link>
              )}
            </Navbar.Collapse>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer />
    </>
  );
};

export default SideBar;
