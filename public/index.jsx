import { Divider } from "antd";
import React from "react";

const index = () => {
  return (
    <div>
      {/* <section className="h-100 h-custom" style={{ background: "#eee}" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <a href="#!" className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Continue shopping
                        </a>
                      </h5>
                      <Divider />

                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <div>
                          <p className="mb-1">Shopping cart</p>
                          <p className="mb-0">You have 4 items in your cart</p>
                        </div>
                        <div>
                          <p className="mb-0">
                            <span className="text-muted">Sort by:</span>{" "}
                            <a href="#!" className="text-body">
                              price <i className="fas fa-angle-down mt-1"></i>
                            </a>
                          </p>
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                  className="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>Iphone 11 pro</h5>
                                <p className="small mb-0">256GB, Navy Blue</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <h5 className="fw-normal mb-0">2</h5>
                              </div>
                              <div style={{ width: "80px" }}>
                                <h5 className="mb-0">$900</h5>
                              </div>
                              <a href="#!" style={{ color: " #cecece" }}>
                                <i className="fas fa-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img2.webp"
                                  className="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>Samsung galaxy Note 10 </h5>
                                <p className="small mb-0">256GB, Navy Blue</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <h5 className="fw-normal mb-0">2</h5>
                              </div>
                              <div style={{ width: "80px" }}>
                                <h5 className="mb-0">$900</h5>
                              </div>
                              <a href="#!" style={{ color: "#cecece" }}>
                                <i className="fas fa-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card mb-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img3.webp"
                                  className="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>Canon EOS M50</h5>
                                <p className="small mb-0">Onyx Black</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <h5 className="fw-normal mb-0">1</h5>
                              </div>
                              <div style={{ width: "80px" }}>
                                <h5 className="mb-0">$1199</h5>
                              </div>
                              <a href="#!" style={{ color: "#cecece" }}>
                                <i className="fas fa-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="card mb-3 mb-lg-0">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div className="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img4.webp"
                                  className="img-fluid rounded-3"
                                  alt="Shopping item"
                                  style={{ width: "65px" }}
                                />
                              </div>
                              <div className="ms-3">
                                <h5>MacBook Pro</h5>
                                <p className="small mb-0">1TB, Graphite</p>
                              </div>
                            </div>
                            <div className="d-flex flex-row align-items-center">
                              <div style={{ width: "50px" }}>
                                <h5 className="fw-normal mb-0">1</h5>
                              </div>
                              <div style={{ width: "80px" }}>
                                <h5 className="mb-0">$1799</h5>
                              </div>
                              <a href="#!" style={{ color: "#cecece" }}>
                                <i className="fas fa-trash-alt"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-5">
                      <div className="card bg-primary text-white rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Card details</h5>
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                              className="img-fluid rounded-3"
                              style={{ width: "45px" }}
                              alt="Avatar"
                            />
                          </div>

                          <p className="small mb-2">Card type</p>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-mastercard fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-visa fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-amex fa-2x me-2"></i>
                          </a>
                          <a href="#!" type="submit" className="text-white">
                            <i className="fab fa-cc-paypal fa-2x"></i>
                          </a>

                          <form className="mt-4">
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeName"
                                className="form-control form-control-lg"
                                siez="17"
                                placeholder="Cardholder's Name"
                              />
                              <label className="form-label" for="typeName">
                                Cardholder's Name
                              </label>
                            </div>

                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="typeText"
                                className="form-control form-control-lg"
                                siez="17"
                                placeholder="1234 5678 9012 3457"
                                minlength="19"
                                maxlength="19"
                              />
                              <label className="form-label" for="typeText">
                                Card Number
                              </label>
                            </div>

                            <div className="row mb-4">
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="text"
                                    id="typeExp"
                                    className="form-control form-control-lg"
                                    placeholder="MM/YYYY"
                                    size="7"
                                    minlength="7"
                                    maxlength="7"
                                  />
                                  <label className="form-label" for="typeExp">
                                    Expiration
                                  </label>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-outline form-white">
                                  <input
                                    type="password"
                                    id="typeText"
                                    className="form-control form-control-lg"
                                    placeholder="&#9679;&#9679;&#9679;"
                                    size="1"
                                    minlength="3"
                                    maxlength="3"
                                  />
                                  <label className="form-label" for="typeText">
                                    Cvv
                                  </label>
                                </div>
                              </div>
                            </div>
                          </form>

                          <Divider className="my-4" />

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">$4798.00</p>
                          </div>

                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Shipping</p>
                            <p className="mb-2">$20.00</p>
                          </div>

                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total(Incl. taxes)</p>
                            <p className="mb-2">$4818.00</p>
                          </div>

                          <button
                            type="button"
                            className="btn btn-info btn-block btn-lg"
                          >
                            <div className="d-flex justify-content-between">
                              <span>$4818.00</span>
                              <span>
                                Checkout{" "}
                                <i className="fas fa-long-arrow-alt-right ms-2"></i>
                              </span>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <!-- Pills navs --> */}
      <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
        <li class="nav-item" role="presentation">
          <a
            class="nav-link active"
            id="tab-login"
            data-mdb-toggle="pill"
            href="#pills-login"
            role="tab"
            aria-controls="pills-login"
            aria-selected="true"
          >
            Login
          </a>
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="tab-register"
            data-mdb-toggle="pill"
            href="#pills-register"
            role="tab"
            aria-controls="pills-register"
            aria-selected="false"
          >
            Register
          </a>
        </li>
      </ul>
      {/* <!-- Pills navs --> */}

      {/* <!-- Pills content --> */}
      <div class="tab-content">
        <div
          class="tab-pane fade show active"
          id="pills-login"
          role="tabpanel"
          aria-labelledby="tab-login"
        >
          <form>
            <div class="text-center mb-3">
              <p>Sign in with:</p>
              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="fab fa-facebook-f"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="fab fa-google"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="fab fa-twitter"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="fab fa-github"></i>
              </button>
            </div>

            <p class="text-center">or:</p>

            {/* <!-- Email input --> */}
            <div class="form-outline mb-4">
              <input type="email" id="loginName" class="form-control" />
              <label class="form-label" for="loginName">
                Email or username
              </label>
            </div>

            {/* <!-- Password input --> */}
            <div class="form-outline mb-4">
              <input type="password" id="loginPassword" class="form-control" />
              <label class="form-label" for="loginPassword">
                Password
              </label>
            </div>

            {/* <!-- 2 column grid layout --> */}
            <div class="row mb-4">
              <div class="col-md-6 d-flex justify-content-center">
                {/* <!-- Checkbox --> */}
                <div class="form-check mb-3 mb-md-0">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="loginCheck"
                    checked
                  />
                  <label class="form-check-label" for="loginCheck">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
              </div>

              <div class="col-md-6 d-flex justify-content-center">
                {/* <!-- Simple link --> */}
                <a href="#!">Forgot password?</a>
              </div>
            </div>
            {/* 
      <!-- Submit button --> */}
            <button type="submit" class="btn btn-primary btn-block mb-4">
              Sign in
            </button>

            {/* <!-- Register buttons --> */}
            <div class="text-center">
              <p>
                Not a member? <a href="#!">Register</a>
              </p>
            </div>
          </form>
        </div>
        <div
          class="tab-pane fade"
          id="pills-register"
          role="tabpanel"
          aria-labelledby="tab-register"
        >
          <form>
            <div class="text-center mb-3">
              <p>Sign up with:</p>
              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="fab fa-facebook-f"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="fab fa-google"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="fab fa-twitter"></i>
              </button>

              <button type="button" class="btn btn-link btn-floating mx-1">
                <i class="fab fa-github"></i>
              </button>
            </div>

            <p class="text-center">or:</p>

            {/* <!-- Name input --> */}
            <div class="form-outline mb-4">
              <input type="text" id="registerName" class="form-control" />
              <label class="form-label" for="registerName">
                Name
              </label>
            </div>

            {/* <!-- Username input --> */}
            <div class="form-outline mb-4">
              <input type="text" id="registerUsername" class="form-control" />
              <label class="form-label" for="registerUsername">
                Username
              </label>
            </div>

            {/* <!-- Email input --> */}
            <div class="form-outline mb-4">
              <input type="email" id="registerEmail" class="form-control" />
              <label class="form-label" for="registerEmail">
                Email
              </label>
            </div>

            {/* <!-- Password input --> */}
            <div class="form-outline mb-4">
              <input
                type="password"
                id="registerPassword"
                class="form-control"
              />
              <label class="form-label" for="registerPassword">
                Password
              </label>
            </div>

            {/* <!-- Repeat Password input --> */}
            <div class="form-outline mb-4">
              <input
                type="password"
                id="registerRepeatPassword"
                class="form-control"
              />
              <label class="form-label" for="registerRepeatPassword">
                Repeat password
              </label>
            </div>

            {/* <!-- Checkbox --> */}
            <div class="form-check d-flex justify-content-center mb-4">
              <input
                class="form-check-input me-2"
                type="checkbox"
                value=""
                id="registerCheck"
                checked
                aria-describedby="registerCheckHelpText"
              />
              <label class="form-check-label" for="registerCheck">
                I have read and agree to the terms
              </label>
            </div>
            {/* 
      <!-- Submit button --> */}
            <button type="submit" class="btn btn-primary btn-block mb-3">
              Sign in
            </button>
          </form>
        </div>
      </div>
      {/* <!-- Pills content --> */}

      <div class="col-md-3 mx-auto p-5 border border-primary border-3 rounded-3">
        {/* <!-- Pills navs --> */}
        <ul class="nav nav-pills nav-justified mb-3" id="ex1" role="tablist">
          <li class="nav-item" role="presentation">
            <a
              class="nav-link active"
              id="tab-login"
              data-mdb-toggle="pill"
              href="#pills-login"
              role="tab"
              aria-controls="pills-login"
              aria-selected="true"
            >
              Login
            </a>
          </li>
          <li class="nav-item" role="presentation">
            <a
              class="nav-link"
              id="tab-register"
              data-mdb-toggle="pill"
              href="#pills-register"
              role="tab"
              aria-controls="pills-register"
              aria-selected="false"
            >
              Register
            </a>
          </li>
        </ul>
        {/* <!-- Pills navs --> */}

        {/* <!-- Pills content --> */}
        <div class="tab-content">
          <div
            class="tab-pane fade show active"
            id="pills-login"
            role="tabpanel"
            aria-labelledby="tab-login"
          >
            <form>
              <div class="text-center mb-3">
                <p>Sign in with:</p>
                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-google"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-github"></i>
                </button>
              </div>

              <p class="text-center">or:</p>

              {/* <!-- Email input --> */}
              <div class="form-outline mb-4">
                <input type="email" id="loginName" class="form-control" />
                <label class="form-label" for="loginName">
                  Email or username
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div class="form-outline mb-4">
                <input
                  type="password"
                  id="loginPassword"
                  class="form-control"
                />
                <label class="form-label" for="loginPassword">
                  Password
                </label>
              </div>

              {/* <!-- 2 column grid layout --> */}
              <div class="row mb-4">
                <div class="col-md-6 d-flex justify-content-center">
                  {/* <!-- Checkbox --> */}
                  <div class="form-check mb-3 mb-md-0">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="loginCheck"
                      checked
                    />
                    <label class="form-check-label" for="loginCheck">
                      {" "}
                      Remember me{" "}
                    </label>
                  </div>
                </div>

                <div class="col-md-6 d-flex justify-content-center">
                  {/* <!-- Simple link --> */}
                  <a href="#!">Forgot password?</a>
                </div>
              </div>
              {/* 
      <!-- Submit button --> */}
              <button type="submit" class="btn btn-primary btn-block mb-4">
                Sign in
              </button>

              {/* <!-- Register buttons --> */}
              <div class="text-center">
                <p>
                  Not a member? <a href="#!">Register</a>
                </p>
              </div>
            </form>
          </div>
          <div
            class="tab-pane fade"
            id="pills-register"
            role="tabpanel"
            aria-labelledby="tab-register"
          >
            <form>
              <div class="text-center mb-3">
                <p>Sign up with:</p>
                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-facebook-f"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-google"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-twitter"></i>
                </button>

                <button type="button" class="btn btn-link btn-floating mx-1">
                  <i class="fab fa-github"></i>
                </button>
              </div>

              <p class="text-center">or:</p>

              {/* <!-- Name input --> */}
              <div class="form-outline mb-4">
                <input type="text" id="registerName" class="form-control" />
                <label class="form-label" for="registerName">
                  Name
                </label>
              </div>

              {/* <!-- Username input --> */}
              <div class="form-outline mb-4">
                <input type="text" id="registerUsername" class="form-control" />
                <label class="form-label" for="registerUsername">
                  Username
                </label>
              </div>

              {/* <!-- Email input --> */}
              <div class="form-outline mb-4">
                <input type="email" id="registerEmail" class="form-control" />
                <label class="form-label" for="registerEmail">
                  Email
                </label>
              </div>

              {/* <!-- Password input --> */}
              <div class="form-outline mb-4">
                <input
                  type="password"
                  id="registerPassword"
                  class="form-control"
                />
                <label class="form-label" for="registerPassword">
                  Password
                </label>
              </div>

              {/* <!-- Repeat Password input --> */}
              <div class="form-outline mb-4">
                <input
                  type="password"
                  id="registerRepeatPassword"
                  class="form-control"
                />
                <label class="form-label" for="registerRepeatPassword">
                  Repeat password
                </label>
              </div>

              {/* <!-- Checkbox --> */}
              <div class="form-check d-flex justify-content-center mb-4">
                <input
                  class="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="registerCheck"
                  checked
                  aria-describedby="registerCheckHelpText"
                />
                <label class="form-check-label" for="registerCheck">
                  I have read and agree to the terms
                </label>
              </div>
              {/* 
      <!-- Submit button --> */}
              <button type="submit" class="btn btn-primary btn-block mb-3">
                Sign in
              </button>
            </form>
          </div>
        </div>
        {/* <!-- Pills content --> */}
      </div>
    </div>
  );
};

export default index;
