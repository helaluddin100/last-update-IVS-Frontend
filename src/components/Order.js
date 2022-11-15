// import React from "react";
import React from "react";

import { HashLink } from "react-router-hash-link";

function Order() {
  return (
    <React.Fragment>
      {/*------------- Products Section  ----------------*/}
      <section className="order">
        <div className="container">
          <div className="order-con">
            <div className="order-left">
              <div className="order-title">
                <p>Package 1 of 1</p>
              </div>
              <div className="delivery-option">
                <div className="delivery-option-title">
                  <p>Delievery Option</p>
                  <div className="delivery-option-box">
                    <div className="order-delievery-item">
                      <div className="order-checkbox">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13.1075 20.9125C12.9435 20.9128 12.7809 20.8808 12.6293 20.8181C12.4776 20.7555 12.3398 20.6635 12.2238 20.5475L6.9213 15.2437C6.80183 15.1285 6.70651 14.9907 6.64089 14.8382C6.57527 14.6857 6.54068 14.5217 6.53912 14.3558C6.53756 14.1898 6.56907 14.0252 6.63181 13.8715C6.69456 13.7178 6.78727 13.5782 6.90455 13.4608C7.02184 13.3433 7.16133 13.2504 7.31491 13.1874C7.46848 13.1245 7.63306 13.0927 7.79903 13.0941C7.965 13.0954 8.12905 13.1298 8.2816 13.1952C8.43415 13.2606 8.57215 13.3557 8.68755 13.475L13.1063 17.8937L21.0625 9.93999C21.2969 9.70544 21.6149 9.5736 21.9465 9.57349C22.2781 9.57337 22.5961 9.70498 22.8307 9.93936C23.0652 10.1737 23.1971 10.4917 23.1972 10.8233C23.1973 11.1549 23.0657 11.4729 22.8313 11.7075L13.9913 20.5475C13.8753 20.6635 13.7375 20.7555 13.5858 20.8181C13.4342 20.8808 13.2716 20.9128 13.1075 20.9125V20.9125Z"
                            fill="black"
                          />
                        </svg>
                      </div>
                      <div className="order-price-delievery">
                        <p>$ 10.00</p>
                        <p>Standard Delievery</p>
                        <p>Get by 20-21 Oct</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-left-wrapper order-product-card">
                <div className="product-image order-product-img">
                  <img src="./images/product-image.png" alt="Not Found" />
                </div>
                <div className="product-info">
                  <p>
                    These items are for the public on the store page, but are
                    limited editions. Accept crypto and credit payments. Apply
                    the supply of each item and apply a countdown of their
                    availability as they are purchased. Shipping information
                    Standard shipping for international customers 6-10 business
                    days When roadmap reaches 80% we will integrate UP
                  </p>
                  <div className="product-price order-product-price">
                    <h2>$99.99</h2>
                    <p>Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-right">
              <div className="order-btns">
                <HashLink to="payment">
                  <button className="prcoess-btn">process to pay</button>
                </HashLink>
              </div>
              <p className="shipping">Shipping & Billing</p>
              <div className="oder-product-title">
                <div className="order-product-title-left">
                  <div className="order-map-icons">
                    <svg
                      width="26"
                      height="38"
                      viewBox="0 0 26 38"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.0003 37.4526C4.44416 26.2876 0.166992 18.3437 0.166992 13.6192C0.166992 10.2156 1.51907 6.9514 3.92579 4.54468C6.3325 2.13797 9.59671 0.785889 13.0003 0.785889C16.4039 0.785889 19.6681 2.13797 22.0749 4.54468C24.4816 6.9514 25.8337 10.2156 25.8337 13.6192C25.8337 18.3437 21.5565 26.2876 13.0003 37.4526ZM13.0003 20.9526C14.9452 20.9526 16.8105 20.1799 18.1858 18.8047C19.561 17.4294 20.3337 15.5641 20.3337 13.6192C20.3337 11.6743 19.561 9.80904 18.1858 8.43377C16.8105 7.05851 14.9452 6.28589 13.0003 6.28589C11.0554 6.28589 9.19014 7.05851 7.81488 8.43377C6.43961 9.80904 5.66699 11.6743 5.66699 13.6192C5.66699 15.5641 6.43961 17.4294 7.81488 18.8047C9.19014 20.1799 11.0554 20.9526 13.0003 20.9526V20.9526Z"
                        fill="#00FF00"
                      />
                    </svg>
                  </div>
                  <p>Alex Joe</p>
                </div>
                <div className="order-edit">
                  <svg
                    width="34"
                    height="34"
                    viewBox="0 0 34 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M26.6593 12.1975L21.6499 7.18954L23.6545 5.18637C24.547 4.29387 26.5913 4.11679 27.6609 5.18637L28.6625 6.18795C29.732 7.25754 29.5564 9.30179 28.6625 10.1957L26.6593 12.1975ZM24.6561 14.202L10.6311 28.227L4.12012 29.7287L5.62178 23.2177L19.6468 9.1927L24.6561 14.202V14.202Z"
                      fill="black"
                    />
                  </svg>
                </div>
              </div>
              <div className="oder-product-discription">
                <p>
                  <span>Home</span> These items are for the public on the store
                  page, but are limited editions. Accept crypto and credit
                  payments. Apply the supply of each item and apply
                </p>
              </div>
              <div className="order-suggest-dis">
                <p>5 Suggest collection point(s) nearby</p>
              </div>
              <div className="order-product-edit">
                <div className="product-edit-item">
                  <div className="edit-item-left">
                    <div className="icons">
                      <svg
                        width="31"
                        height="23"
                        viewBox="0 0 31 23"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M3.16634 0.808594H27.833C28.6508 0.808594 29.435 1.13344 30.0133 1.71168C30.5915 2.28992 30.9163 3.07418 30.9163 3.89193V19.3086C30.9163 20.1263 30.5915 20.9106 30.0133 21.4888C29.435 22.0671 28.6508 22.3919 27.833 22.3919H3.16634C2.34859 22.3919 1.56433 22.0671 0.986095 21.4888C0.407858 20.9106 0.0830078 20.1263 0.0830078 19.3086V3.89193C0.0830078 3.07418 0.407858 2.28992 0.986095 1.71168C1.56433 1.13344 2.34859 0.808594 3.16634 0.808594ZM7.79134 13.1419C7.38247 13.1419 6.99034 13.3044 6.70122 13.5935C6.4121 13.8826 6.24967 14.2747 6.24967 14.6836C6.24967 15.0925 6.4121 15.4846 6.70122 15.7737C6.99034 16.0628 7.38247 16.2253 7.79134 16.2253H17.0413C17.4502 16.2253 17.8423 16.0628 18.1315 15.7737C18.4206 15.4846 18.583 15.0925 18.583 14.6836C18.583 14.2747 18.4206 13.8826 18.1315 13.5935C17.8423 13.3044 17.4502 13.1419 17.0413 13.1419H7.79134ZM23.208 5.43359V8.51693H26.2913V5.43359H23.208Z"
                          fill="#FFCA0E"
                        />
                      </svg>
                    </div>
                    <p>Bill to the same address</p>
                  </div>
                  <div className="edit-items-right">
                    <span>EDIT</span>
                  </div>
                </div>

                <div className="product-edit-item">
                  <div className="edit-item-left">
                    <div className="icons">
                      <svg
                        width="18"
                        height="30"
                        viewBox="0 0 18 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4.75 0.925415H13.25C14.3772 0.925415 15.4582 1.37318 16.2552 2.17021C17.0522 2.96724 17.5 4.04824 17.5 5.17541V25.0087C17.5 26.1359 17.0522 27.2169 16.2552 28.014C15.4582 28.811 14.3772 29.2587 13.25 29.2587H4.75C3.62283 29.2587 2.54183 28.811 1.7448 28.014C0.947767 27.2169 0.5 26.1359 0.5 25.0087L0.5 5.17541C0.5 4.04824 0.947767 2.96724 1.7448 2.17021C2.54183 1.37318 3.62283 0.925415 4.75 0.925415V0.925415ZM9 25.0087C9.37572 25.0087 9.73606 24.8595 10.0017 24.5938C10.2674 24.3281 10.4167 23.9678 10.4167 23.5921C10.4167 23.2164 10.2674 22.856 10.0017 22.5903C9.73606 22.3247 9.37572 22.1754 9 22.1754C8.62428 22.1754 8.26394 22.3247 7.99827 22.5903C7.73259 22.856 7.58333 23.2164 7.58333 23.5921C7.58333 23.9678 7.73259 24.3281 7.99827 24.5938C8.26394 24.8595 8.62428 25.0087 9 25.0087Z"
                          fill="#FFCA0E"
                        />
                      </svg>
                    </div>
                    <p>03185003677</p>
                  </div>
                  <div className="edit-items-right">
                    <span>EDIT</span>
                  </div>
                </div>

                <div className="product-edit-item">
                  <div className="edit-item-left">
                    <div className="icons">
                      <svg
                        width="30"
                        height="22"
                        viewBox="0 0 30 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M30 8H0L6 0.5H24L30 8ZM30 11V18.5C30 19.2956 29.6839 20.0587 29.1213 20.6213C28.5587 21.1839 27.7956 21.5 27 21.5H3C2.20435 21.5 1.44129 21.1839 0.87868 20.6213C0.316071 20.0587 0 19.2956 0 18.5V11H9.189C9.52266 12.2874 10.2744 13.4275 11.3261 14.2414C12.3779 15.0553 13.6701 15.4969 15 15.4969C16.3299 15.4969 17.6221 15.0553 18.6739 14.2414C19.7256 13.4275 20.4773 12.2874 20.811 11H30ZM12.3975 11H17.595C17.3318 11.4564 16.953 11.8354 16.4968 12.0989C16.0406 12.3624 15.5231 12.5012 14.9963 12.5012C14.4694 12.5012 13.9519 12.3624 13.4957 12.0989C13.0395 11.8354 12.6607 11.4564 12.3975 11V11Z"
                          fill="#FFCA0E"
                        />
                      </svg>
                    </div>
                    <p>youremail123@gmail.com</p>
                  </div>
                  <div className="edit-items-right">
                    <span>EDIT</span>
                  </div>
                </div>
              </div>
              <p className="order-summarys">Order Summary</p>
              <div className="item-total">
                <div className="item-price">
                  <p>
                    Items Total <span>(1 item)</span>
                  </p>
                  <p>$99.99</p>
                </div>
                <div className="item-price">
                  <p>Delievery Fee</p>
                  <p>$10.00</p>
                </div>
                <div className="item-price">
                  <p>7.25% Sales Tax</p>
                  <p>$07.15</p>
                </div>
                <div className="item-price">
                  <p>Total</p>
                  <p>$117.14</p>
                </div>
              </div>
              <div className="order-btns place-order">
                <HashLink to="payment">
                  <button className="prcoess-btn place-order-btn ">
                    PLACE ORDER
                  </button>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Order;
