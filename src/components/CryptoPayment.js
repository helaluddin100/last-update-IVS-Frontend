import { useEffect, useState } from "react";
import CoinbaseCommerceButton from "react-coinbase-commerce";
import "react-coinbase-commerce/dist/coinbase-commerce-button.css";
import "../assets/css/CryptoPayment.css";

const CryptoPayment = ({ price, name, img, amount }) => {
  const [code, setCode] = useState();
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getCharge = async () => {
    setIsLoading(true);
    const headers = new Headers();
    headers.append("X-CC-Api-Key", "b2834fd4-9b53-494c-b21c-1f306776870b");
    headers.append("Content-Type", "application/json");

    const data = {
      local_price: { currency: "usd", amount: price },
      pricing_type: "fixed_price",
      description: "",
      name: name,
    };
    const requestOptions = {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      redirect: "follow",
    };

    fetch("https://api.commerce.coinbase.com/charges/", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        result = JSON.parse(result);
        setCode(result.data.code);
        setIsLoading(false);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    if (!price) return;
    getCharge();
  }, [price]);

  if (!showModal) {
    return (
      <button className="crypto-show-modal" onClick={() => setShowModal(true)}>
        Buy with Crypto
      </button>
    );
  }
  return (
    <div className="container-modal-crypto">
      <div className="modal-crypto">
        <button
          onClick={() => setShowModal(false)}
          className="crypto-modal-close-button"
        >
          x
        </button>
        <div className="">
          <h1>{name}</h1>
          <div className="flex">
            <img src={img} alt={name} />
            <div>
              <p>
                <span>Amount:</span> {amount}
              </p>
              <p>
                <span>Total:</span> {price}
              </p>
            </div>
          </div>
        </div>

        {(!code || isLoading) && <div className="loader"></div>}

        {code && !isLoading && (
          <CoinbaseCommerceButton
            styled={true}
            style={{ padding: "8px", margin: "15px" }}
            chargeId={code}
          />
        )}
      </div>
    </div>
  );
};

export default CryptoPayment;
