// import React from "react";
import React from "react";


function Payment() {
  return (
    <React.Fragment>
      {/*------------- Payment Section  ----------------*/}
      <section className="payment">
        <div className="container">
          <div className="payment-wrapper">
            <h3>Select Payments Method</h3>
            <div className="payment-method">
              <div className="payment-left">
                <div className="payment-box">
                  <img
                    src="./images/bitcoin-icon.svg"
                    alt="Coin Icon Not Found"
                  />
                  <p>Crypto</p>
                </div>
                <div className="payment-box">
                  <img
                    src="./images/visa-card-icon.svg"
                    alt="Visa Card Icon Not Found"
                  />
                  <p>Credit/Debit Card</p>
                </div>
              </div>
              <div className="payment-right">
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="subtotal">
                    <p>Subtotal ( 1 item and shipping fee included)</p>
                    <p>$110.00</p>
                  </div>
                  <div className="total">
                    <p>Total Ammount</p>
                    <p><span>$110.00</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Payment;
