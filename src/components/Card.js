// import React from "react";
import React from "react";

import { HashLink } from "react-router-hash-link";

function Card() {
  return (
    <React.Fragment>
      {/*------------- Products Section  ----------------*/}
      <section className="card">
        <div className="container">
          <div className="card-wrapper">
            <div className="card-left">
              <div className="card-left-wrapper">
                <div className="product-image">
                  <img src="./images/product-image.png" alt="Not Found" />
                </div>
                <div className="product-info">
                  <p>
                    This bag is made from spun polyester and weights 1.3 lbs,
                    just enough to be light, strong and long-lasting. Grab it,
                    stow it, throw it onto the seat next to you, this backpack
                    can take it, and so will you, wherever you go!
                  </p>
                  <div className="product-price">
                    <h2>$99.99</h2>
                    <p>Qty: 1</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-right">
              <h1>
                MY SHOPPING CART <span>(1 item)</span>
              </h1>
              <div className="subtotal">
                <p>Subtotal</p>
                <p>USD 99.99</p>
              </div>
              <div className="total">
                <p>Total</p>
                <p>USD 99.99</p>
              </div>
              <div className="card-btns">
                <HashLink to="billing">
                  <button className="buy-btn">BUY NOW</button>
                </HashLink>
                <HashLink to="billing">
                  <button className="add-card-btn">ADD TO CARD</button>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
}

export default Card;
