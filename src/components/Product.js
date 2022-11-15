import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import CryptoPayment from "./CryptoPayment";
import { HashLink } from "react-router-hash-link";
import ReCAPTCHA from "react-google-recaptcha";

function Product() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProduct] = useState([]);
  const [value, setValue] = useState(1);
  const [activeStep, setActiveStep] = useState(1);
  const [verify, setVerify] = useState(0);
  const [paymentPP, setPaymentPP] = useState(0);

  const _popupaddclass = () => {
    setPaymentPP(1);
  };
  const _popupremoveclass = () => {
    setPaymentPP(0);
  };
  function onChange(value) {
    console.log("Captcha value:", value);
    setVerify(1);
  }

  useEffect(() => {
    var productid = window.location.pathname;
    productid = productid.split("/");

    fetch(
      `https://infinity.nftconstructer.com/api/product-details/${productid[1]}`
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setProduct(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  // Submits
  const brandInfoSubmit = (e) => {
    e.preventDefault();
    setActiveStep(2);
  };
  const websiteInfoSubmit = (e) => {
    e.preventDefault();
    setActiveStep(3);
  };
  const smartContractInfoSubmit = (e) => {
    e.preventDefault();
    setActiveStep(4);
  };

  // ======================submit order=====================
  const [loading, setLoading] = useState(false);

  const _deactivateLoading = () => {
    setLoading(false);
  };

  var productid = window.location.pathname;
  productid = productid.split("/");
  var carentproduct = productid[1];
  const [inputField, setInputField] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    town: "",
    zip: "",
  });

  const inputsHandler = (e) => {
    e.persist();
    setInputField({
      ...inputField,
      [e.target.name]: e.target.value,
    });
  };

  const allInfoSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", inputField.first_name);
    formData.append("last_name", inputField.last_name);
    formData.append("email", inputField.email);
    formData.append("phone", inputField.phone);
    formData.append("country", inputField.country);
    formData.append("address", inputField.address);
    formData.append("town", inputField.town);
    formData.append("zip", inputField.zip);
    formData.append("qty", value);
    formData.append("price", products.price * value);
    formData.append("weight", products.weight * value);
    formData.append("product_id", carentproduct);

    axios
      .post("https://infinity.nftconstructer.com/api/place-order", formData)
      .then((res) => {
        if (res.data.status === 200) {
          setActiveStep(1);
          _deactivateLoading(false);
        } else {
          alert(
            "You did not fill all the required fields correctly. Please check again and fill all the required fields (*)."
          );
        }
      });
  };

  // =====================paypal payment===================

  // const PayPalButton = window.paypal.Buttons.driver("react", {
  //   React,
  //   ReactDOM,
  // });
  var totlaprice = products.price * value;
  var totalweight = products.weight * value;
  var lbprice = 4;

  var international_delivery = 40;
  if (inputField.country == "United States") {
    var international_delivery = 10;
    var lbprice = 2;
  }
  var productgrandprice = totalweight * lbprice + totlaprice;
  var subtotalprice = (productgrandprice / 100) * 7.25;

  var lastprice = productgrandprice + subtotalprice;

  var removeflot = ~~lastprice + international_delivery;

  var PayPalData = {
    first_name: inputField.first_name,
    last_name: inputField.last_name,
    email: inputField.email,
    phone: inputField.phone,
    country: inputField.country,
    address: inputField.address,
    town: inputField.town,
    zip: inputField.zip,
    qty: value,
    price: removeflot,
    weight: products.weight * value,
    product_id: carentproduct,
    payment_mode: "",
    payment_id: "",
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: removeflot,
          },
        },
      ],
    });
  };
  const onApprove = (data, actions) => {
    // return actions.order.capture();
    return actions.order.capture().then(function (details) {
      console.log(details);
      PayPalData.payment_id = details.id;
      PayPalData.payment_mode = "PayPal";

      axios
        .post("https://infinity.nftconstructer.com/api/place-order", PayPalData)
        .then((res) => {
          if (res.data.status === 200) {
            setActiveStep(1);
            _deactivateLoading(false);
            alert("Your Order Successfully Submitted .");
          } else {
            alert(
              "You did not fill all the required fields. Please check again and fill all the required fields (*)."
            );
          }
        });
    });
  };

  // ======================Stripe payment ==================

  const onToken = (token) => {
    console.log(token);
    PayPalData.payment_id = token.id;
    PayPalData.payment_mode = "Stripe";
    console.log(PayPalData);
    axios
      .post("https://infinity.nftconstructer.com/api/place-order", PayPalData)
      .then((res) => {
        if (res.data.status === 200) {
          setActiveStep(1);
          _deactivateLoading(false);
          alert("Your Order Successfully Submitted .");
        } else {
          alert(
            "You did not fill all the required fields. Please check again and fill all the required fields (*)."
          );
        }
      });
  };
  // ======================Stripe payment ==================

  return (
    <React.Fragment>
      {/*------------- Billing Section  ----------------*/}
      <section className="order">
        <div className="container">
          <div className="order-con">
            <div className="order-left">
              <div className="order-title">
                <p>Package 1 of 1</p>
              </div>
              <div className="delivery-option">
                <div className="delivery-option-title">
                  <p>Disclaimer</p>
                  <div className="disclaimer">
                    <p>
                      No returns, refunds, or cancellations of any
                      Limited-Edition item, IVS will not resend orders under any
                      circumstance, IVS is not responsible for lost shipments,
                      please enter the correct shipping information.
                    </p>
                  </div>
                  <p className="mt-3">Offer</p>

                  <div className="second-disclaimer">
                    <p>
                      Spend 300$ or more and receive a free gift bag with your
                      order.
                    </p>
                  </div>
                  <p className="mt-3">Delivery Option</p>
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
                        <p>$ {international_delivery}</p>
                        <p>Standard Delivery</p>
                        <p>
                          {inputField.country === "United States"
                            ? "Get by 3 to 5 days"
                            : "Get by 7 to 15 days"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-left-wrapper order-product-card">
                <div className="product-image order-product-img">
                  <img src={products.main_img} alt="Not Found" />
                </div>
                <div className="product-info">
                  <h3>{products.name}</h3>
                  <p>{products.description}</p>
                  <div className="product-price order-product-price">
                    <h2>${products.price * value}</h2>
                    <div className="item-qty">
                      <button
                        className="minus"
                        onClick={() => {
                          if (value > 1) {
                            setValue(value - 1);
                          }
                        }}
                      >
                        -
                      </button>
                      <span>{value}</span>
                      <button
                        className="plus"
                        onClick={() => {
                          if (value < 3) {
                            setValue(value + 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-right">
              <h1>Billing Details</h1>
              <form
                onSubmit={brandInfoSubmit}
                className={
                  activeStep === 1 ? "billing-form active" : " billing-form"
                }
              >
                <div className="input-group">
                  <input
                    placeholder="First Name"
                    name="first_name"
                    required
                    onChange={inputsHandler}
                    value={inputField.first_name}
                  />
                  <input
                    placeholder="Last Name"
                    name="last_name"
                    required
                    onChange={inputsHandler}
                    value={inputField.last_name}
                  />
                </div>
                <input
                  placeholder="Email Address"
                  type="email"
                  name="email"
                  onChange={inputsHandler}
                  value={inputField.email}
                  required
                />
                <input
                  placeholder="Phone Number"
                  name="phone"
                  type="number"
                  required
                  onChange={inputsHandler}
                  value={inputField.phone}
                />
                <select
                  name="country"
                  required
                  onChange={inputsHandler}
                  value={inputField.country}
                >
                  <option value="Afghanistan">Afghanistan</option>
                  <option value="Albania">Albania</option>
                  <option value="Algeria">Algeria</option>
                  <option value="American Samoa">American Samoa</option>
                  <option value="Andorra">Andorra</option>
                  <option value="Angola">Angola</option>
                  <option value="Anguilla">Anguilla</option>
                  <option value="Antartica">Antarctica</option>
                  <option value="Antigua and Barbuda">
                    Antigua and Barbuda
                  </option>
                  <option value="Argentina">Argentina</option>
                  <option value="Armenia">Armenia</option>
                  <option value="Aruba">Aruba</option>
                  <option value="Australia">Australia</option>
                  <option value="Austria">Austria</option>
                  <option value="Azerbaijan">Azerbaijan</option>
                  <option value="Bahamas">Bahamas</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Bangladesh">Bangladesh</option>
                  <option value="Barbados">Barbados</option>
                  <option value="Belarus">Belarus</option>
                  <option value="Belgium">Belgium</option>
                  <option value="Belize">Belize</option>
                  <option value="Benin">Benin</option>
                  <option value="Bermuda">Bermuda</option>
                  <option value="Bhutan">Bhutan</option>
                  <option value="Bolivia">Bolivia</option>
                  <option value="Bosnia and Herzegowina">
                    Bosnia and Herzegowina
                  </option>
                  <option value="Botswana">Botswana</option>
                  <option value="Bouvet Island">Bouvet Island</option>
                  <option value="Brazil">Brazil</option>
                  <option value="British Indian Ocean Territory">
                    British Indian Ocean Territory
                  </option>
                  <option value="Brunei Darussalam">Brunei Darussalam</option>
                  <option value="Bulgaria">Bulgaria</option>
                  <option value="Burkina Faso">Burkina Faso</option>
                  <option value="Burundi">Burundi</option>
                  <option value="Cambodia">Cambodia</option>
                  <option value="Cameroon">Cameroon</option>
                  <option value="Canada">Canada</option>
                  <option value="Cape Verde">Cape Verde</option>
                  <option value="Cayman Islands">Cayman Islands</option>
                  <option value="Central African Republic">
                    Central African Republic
                  </option>
                  <option value="Chad">Chad</option>
                  <option value="Chile">Chile</option>
                  <option value="China">China</option>
                  <option value="Christmas Island">Christmas Island</option>
                  <option value="Cocos Islands">Cocos (Keeling) Islands</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Comoros">Comoros</option>
                  <option value="Congo">Congo</option>
                  <option value="Congo">
                    Congo, the Democratic Republic of the
                  </option>
                  <option value="Cook Islands">Cook Islands</option>
                  <option value="Costa Rica">Costa Rica</option>
                  <option value="Cota D'Ivoire">Cote d'Ivoire</option>
                  <option value="Croatia">Croatia (Hrvatska)</option>
                  <option value="Cuba">Cuba</option>
                  <option value="Cyprus">Cyprus</option>
                  <option value="Czech Republic">Czech Republic</option>
                  <option value="Denmark">Denmark</option>
                  <option value="Djibouti">Djibouti</option>
                  <option value="Dominica">Dominica</option>
                  <option value="Dominican Republic">Dominican Republic</option>
                  <option value="East Timor">East Timor</option>
                  <option value="Ecuador">Ecuador</option>
                  <option value="Egypt">Egypt</option>
                  <option value="El Salvador">El Salvador</option>
                  <option value="Equatorial Guinea">Equatorial Guinea</option>
                  <option value="Eritrea">Eritrea</option>
                  <option value="Estonia">Estonia</option>
                  <option value="Ethiopia">Ethiopia</option>
                  <option value="Falkland Islands">
                    Falkland Islands (Malvinas)
                  </option>
                  <option value="Faroe Islands">Faroe Islands</option>
                  <option value="Fiji">Fiji</option>
                  <option value="Finland">Finland</option>
                  <option value="France">France</option>
                  <option value="France Metropolitan">
                    France, Metropolitan
                  </option>
                  <option value="French Guiana">French Guiana</option>
                  <option value="French Polynesia">French Polynesia</option>
                  <option value="French Southern Territories">
                    French Southern Territories
                  </option>
                  <option value="Gabon">Gabon</option>
                  <option value="Gambia">Gambia</option>
                  <option value="Georgia">Georgia</option>
                  <option value="Germany">Germany</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Gibraltar">Gibraltar</option>
                  <option value="Greece">Greece</option>
                  <option value="Greenland">Greenland</option>
                  <option value="Grenada">Grenada</option>
                  <option value="Guadeloupe">Guadeloupe</option>
                  <option value="Guam">Guam</option>
                  <option value="Guatemala">Guatemala</option>
                  <option value="Guinea">Guinea</option>
                  <option value="Guinea-Bissau">Guinea-Bissau</option>
                  <option value="Guyana">Guyana</option>
                  <option value="Haiti">Haiti</option>
                  <option value="Heard and McDonald Islands">
                    Heard and Mc Donald Islands
                  </option>
                  <option value="Holy See">
                    Holy See (Vatican City State)
                  </option>
                  <option value="Honduras">Honduras</option>
                  <option value="Hong Kong">Hong Kong</option>
                  <option value="Hungary">Hungary</option>
                  <option value="Iceland">Iceland</option>
                  <option value="India">India</option>
                  <option value="Indonesia">Indonesia</option>
                  <option value="Iran">Iran (Islamic Republic of)</option>
                  <option value="Iraq">Iraq</option>
                  <option value="Ireland">Ireland</option>
                  <option value="Israel">Israel</option>
                  <option value="Italy">Italy</option>
                  <option value="Jamaica">Jamaica</option>
                  <option value="Japan">Japan</option>
                  <option value="Jordan">Jordan</option>
                  <option value="Kazakhstan">Kazakhstan</option>
                  <option value="Kenya">Kenya</option>
                  <option value="Kiribati">Kiribati</option>
                  <option value="Democratic People's Republic of Korea">
                    Korea, Democratic People's Republic of
                  </option>
                  <option value="Korea">Korea, Republic of</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Kyrgyzstan">Kyrgyzstan</option>
                  <option value="Lao">Lao People's Democratic Republic</option>
                  <option value="Latvia">Latvia</option>
                  <option value="Lebanon" selected>
                    Lebanon
                  </option>
                  <option value="Lesotho">Lesotho</option>
                  <option value="Liberia">Liberia</option>
                  <option value="Libyan Arab Jamahiriya">
                    Libyan Arab Jamahiriya
                  </option>
                  <option value="Liechtenstein">Liechtenstein</option>
                  <option value="Lithuania">Lithuania</option>
                  <option value="Luxembourg">Luxembourg</option>
                  <option value="Macau">Macau</option>
                  <option value="Macedonia">
                    Macedonia, The Former Yugoslav Republic of
                  </option>
                  <option value="Madagascar">Madagascar</option>
                  <option value="Malawi">Malawi</option>
                  <option value="Malaysia">Malaysia</option>
                  <option value="Maldives">Maldives</option>
                  <option value="Mali">Mali</option>
                  <option value="Malta">Malta</option>
                  <option value="Marshall Islands">Marshall Islands</option>
                  <option value="Martinique">Martinique</option>
                  <option value="Mauritania">Mauritania</option>
                  <option value="Mauritius">Mauritius</option>
                  <option value="Mayotte">Mayotte</option>
                  <option value="Mexico">Mexico</option>
                  <option value="Micronesia">
                    Micronesia, Federated States of
                  </option>
                  <option value="Moldova">Moldova, Republic of</option>
                  <option value="Monaco">Monaco</option>
                  <option value="Mongolia">Mongolia</option>
                  <option value="Montserrat">Montserrat</option>
                  <option value="Morocco">Morocco</option>
                  <option value="Mozambique">Mozambique</option>
                  <option value="Myanmar">Myanmar</option>
                  <option value="Namibia">Namibia</option>
                  <option value="Nauru">Nauru</option>
                  <option value="Nepal">Nepal</option>
                  <option value="Netherlands">Netherlands</option>
                  <option value="Netherlands Antilles">
                    Netherlands Antilles
                  </option>
                  <option value="New Caledonia">New Caledonia</option>
                  <option value="New Zealand">New Zealand</option>
                  <option value="Nicaragua">Nicaragua</option>
                  <option value="Niger">Niger</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Niue">Niue</option>
                  <option value="Norfolk Island">Norfolk Island</option>
                  <option value="Northern Mariana Islands">
                    Northern Mariana Islands
                  </option>
                  <option value="Norway">Norway</option>
                  <option value="Oman">Oman</option>
                  <option value="Pakistan">Pakistan</option>
                  <option value="Palau">Palau</option>
                  <option value="Panama">Panama</option>
                  <option value="Papua New Guinea">Papua New Guinea</option>
                  <option value="Paraguay">Paraguay</option>
                  <option value="Peru">Peru</option>
                  <option value="Philippines">Philippines</option>
                  <option value="Pitcairn">Pitcairn</option>
                  <option value="Poland">Poland</option>
                  <option value="Portugal">Portugal</option>
                  <option value="Puerto Rico">Puerto Rico</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Reunion">Reunion</option>
                  <option value="Romania">Romania</option>
                  <option value="Russia">Russian Federation</option>
                  <option value="Rwanda">Rwanda</option>
                  <option value="Saint Kitts and Nevis">
                    Saint Kitts and Nevis
                  </option>
                  <option value="Saint LUCIA">Saint LUCIA</option>
                  <option value="Saint Vincent">
                    Saint Vincent and the Grenadines
                  </option>
                  <option value="Samoa">Samoa</option>
                  <option value="San Marino">San Marino</option>
                  <option value="Sao Tome and Principe">
                    Sao Tome and Principe
                  </option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Senegal">Senegal</option>
                  <option value="Seychelles">Seychelles</option>
                  <option value="Sierra">Sierra Leone</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Slovakia">Slovakia (Slovak Republic)</option>
                  <option value="Slovenia">Slovenia</option>
                  <option value="Solomon Islands">Solomon Islands</option>
                  <option value="Somalia">Somalia</option>
                  <option value="South Africa">South Africa</option>
                  <option value="South Georgia">
                    South Georgia and the South Sandwich Islands
                  </option>
                  <option value="Span">Spain</option>
                  <option value="SriLanka">Sri Lanka</option>
                  <option value="St. Helena">St. Helena</option>
                  <option value="St. Pierre and Miguelon">
                    St. Pierre and Miquelon
                  </option>
                  <option value="Sudan">Sudan</option>
                  <option value="Suriname">Suriname</option>
                  <option value="Svalbard">
                    Svalbard and Jan Mayen Islands
                  </option>
                  <option value="Swaziland">Swaziland</option>
                  <option value="Sweden">Sweden</option>
                  <option value="Switzerland">Switzerland</option>
                  <option value="Syria">Syrian Arab Republic</option>
                  <option value="Taiwan">Taiwan, Province of China</option>
                  <option value="Tajikistan">Tajikistan</option>
                  <option value="Tanzania">Tanzania, United Republic of</option>
                  <option value="Thailand">Thailand</option>
                  <option value="Togo">Togo</option>
                  <option value="Tokelau">Tokelau</option>
                  <option value="Tonga">Tonga</option>
                  <option value="Trinidad and Tobago">
                    Trinidad and Tobago
                  </option>
                  <option value="Tunisia">Tunisia</option>
                  <option value="Turkey">Turkey</option>
                  <option value="Turkmenistan">Turkmenistan</option>
                  <option value="Turks and Caicos">
                    Turks and Caicos Islands
                  </option>
                  <option value="Tuvalu">Tuvalu</option>
                  <option value="Uganda">Uganda</option>
                  <option value="Ukraine">Ukraine</option>
                  <option value="United Arab Emirates">
                    United Arab Emirates
                  </option>
                  <option value="United Kingdom">United Kingdom</option>
                  <option value="United States">United States</option>
                  <option value="United States Minor Outlying Islands">
                    United States Minor Outlying Islands
                  </option>
                  <option value="Uruguay">Uruguay</option>
                  <option value="Uzbekistan">Uzbekistan</option>
                  <option value="Vanuatu">Vanuatu</option>
                  <option value="Venezuela">Venezuela</option>
                  <option value="Vietnam">Viet Nam</option>
                  <option value="Virgin Islands (British)">
                    Virgin Islands (British)
                  </option>
                  <option value="Virgin Islands (U.S)">
                    Virgin Islands (U.S.)
                  </option>
                  <option value="Wallis and Futana Islands">
                    Wallis and Futuna Islands
                  </option>
                  <option value="Western Sahara">Western Sahara</option>
                  <option value="Yemen">Yemen</option>
                  <option value="Serbia">Serbia</option>
                  <option value="Zambia">Zambia</option>
                  <option value="Zimbabwe">Zimbabwe</option>
                </select>
                <input
                  placeholder="Address"
                  name="address"
                  required
                  onChange={inputsHandler}
                  value={inputField.address}
                />
                <input
                  placeholder="Town/Suburb"
                  name="town"
                  required
                  onChange={inputsHandler}
                  value={inputField.town}
                />
                <input
                  placeholder="Zip/Portal Code"
                  name="zip"
                  required
                  onChange={inputsHandler}
                  value={inputField.zip}
                  type="Number"
                />
                <div className="order-btns place-order">
                  <button
                    type="submit"
                    className="prcoess-btn place-order-btn "
                  >
                    Continue
                  </button>
                </div>
              </form>

              <form
                onSubmit={websiteInfoSubmit}
                className={
                  activeStep === 2 ? "billing-form active" : " billing-form"
                }
              >
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
                    <p>{inputField.country}</p>
                  </div>
                  <div
                    className="order-edit"
                    onClick={() => {
                      setActiveStep(1);
                    }}
                  >
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
                    <HashLink to={"/"}>
                      <span>Home</span>
                    </HashLink>
                    <br /> These items are for the public on the store page, but
                    are limited editions. Accept crypto and credit payments.
                    Apply the supply of each item and apply
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
                      <p>{inputField.address}</p>
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
                      <p>{inputField.phone}</p>
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
                      <p>{inputField.email}</p>
                    </div>
                  </div>
                </div>
                <p className="order-summarys">Order Summary</p>
                <div className="item-total">
                  <div className="item-price">
                    <p>
                      Items Total <span>({value})</span>
                    </p>
                    <p>${totlaprice}</p>
                  </div>
                  <div className="item-price">
                    <p>Delivery Fee</p>
                    <p>
                      $
                      {inputField.country === "United States"
                        ? `${
                            products.weight * value * 2 + international_delivery
                          }`
                        : `${
                            products.weight * value * 4 + international_delivery
                          }`}
                    </p>
                  </div>

                  <div className="item-price">
                    <p>7.25% Sales Tax</p>
                    <p>${subtotalprice}</p>
                  </div>
                  <div className="item-price">
                    <p>Total</p>
                    <p>${removeflot}</p>
                  </div>
                </div>
                <div className="notic">
                  <p>
                    All shipping profits and 5% sales profits will be donated to
                    a charity of the community's choice!
                  </p>
                </div>
                <div className="captcha">
                  <ReCAPTCHA
                    sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                    onChange={onChange}
                  />
                </div>
                <div className="order-btns place-order">
                  <div className="order-btns">
                    {verify === 1 ? (
                      <button type="submit" className="prcoess-btn">
                        process to pay
                      </button>
                    ) : (
                      <button type="submit" className="prcoess-btn" disabled>
                        Fill The Captcha
                      </button>
                    )}
                  </div>
                </div>
                <div className="order-btns place-order">
                  <div className="order-btns">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveStep(1);
                      }}
                      className="prcoess-btn"
                    >
                      Back
                    </button>
                  </div>
                </div>
              </form>

              <form
                onSubmit={allInfoSubmit}
                className={
                  activeStep === 3 ? "billing-form active" : " billing-form"
                }
                encType="multipart/form-data"
              >
                <div className="payment-wrapper">
                  <h3>Select Payments Method</h3>
                  <div className="payment-method">
                    <div className="payment-left">
                      <div className="payment-box">
                        <CryptoPayment
                          price={removeflot}
                          amount={value}
                          name={products.name}
                          img={products.main_img}
                        />
                      </div>
                      <div className="payment-box">
                        <StripeCheckout
                          token={onToken}
                          currency="USD"
                          amount={removeflot * 100}
                          stripeKey="pk_live_51LxhjWAwQbwOScCRI9kGAOzhMl1W5COLgSmSwLSB2JYoFXeejqOfWXWACz2by6Jz4E7pTjgfASnXY4gbK3tH2DJt00ecq3WUNL"
                          // stripeKey="pk_test_51LxhjWAwQbwOScCRymeJg6wbUDuz0KPOmaMkyD3d58Dq7ajR438r9KQGcqrz8EnW8fXjhVDkkKy6id0J9QE8HOkB00B3tNAh3M"
                        />
                      </div>

                      {/* <div className="payment-box">
                        <h3
                          className="paypal-btn-main"
                          onClick={_popupaddclass}
                        >
                          PayPal
                        </h3>
                      </div> */}
                    </div>

                    {/* <div
                      className={`${
                        paymentPP == 1
                          ? "popup-payment active"
                          : "popup-payment"
                      }`}
                    >
                      <div className="popup-model">
                        <div className="close-btn" onClick={_popupremoveclass}>
                          X
                        </div>
                        <PayPalButton
                          createOrder={(data, actions) =>
                            createOrder(data, actions)
                          }
                          onApprove={(data, actions) =>
                            onApprove(data, actions)
                          }
                        />
                      </div>
                    </div> */}
                    {/* <div className="payment-right">
                      <div className="order-summary">
                        <h3>Order Summary</h3>
                        <div className="subtotal">
                          <p>Subtotal ( 1 item and shipping fee included)</p>
                          <p>$110.00</p>
                        </div>
                        <div className="total">
                          <p>Total Ammount</p>
                          <p>
                            <span>$110.00</span>
                          </p>
                        </div>
                      </div>
                    </div> */}
                    <div className="order-btns place-order">
                      <div className="order-btns">
                        <button
                          type="submit"
                          onClick={() => {
                            setActiveStep(2);
                          }}
                          className="prcoess-btn"
                        >
                          Back
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Product;
