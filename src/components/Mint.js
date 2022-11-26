import React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Web3 from "web3";
import axios from "axios";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { providerOptions } from "../utils/web3";

import { CONTRACT_ABI } from "../abis/contract";

function Mint() {
  const [pagelocation, setPageLocation] = useState(useLocation().pathname);
  //totalMinted is the total amount of tokens minted
  const [totalMinted, setTotalMinted] = useState(0);
  //mint value is the amount of tokens to mint
  const [value, setValue] = useState(1);
  //connect to metamask
  const [walletConnected, setWalletConnected] = useState(false);

  // Connect Wallet
  // Connect Wallet
  const connectWallet = async () => {
    const web3Modal = new Web3Modal({
      cacheProvider: true,
      providerOptions,
    });

    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);

    const address = await provider.getSigner().getAddress();

    const { ethereum } = window;

    setWalletConnected(true);
    return [provider, address];
  };

  // Contract Info
  const CONTRACT_ADDRESS = "0x96bf089A915Ec6099db3776743125060B0B406cA";

  useEffect(() => {
    axios
      .get(
        "https://api.etherscan.io/api?module=stats&action=tokensupply&contractaddress=0x96bf089A915Ec6099db3776743125060B0B406cA&apikey=419SR145AVH9TUBXGAVJFBZ2M8BHF5WJY9"
      )
      .then(function (response) {
        setTotalMinted(response.data.result);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // Mint
  const mint = async () => {
    if (value <= 0) {
      alert("Please choose quantity");
      return;
    }

    const [web3Provider, address] = await connectWallet();

    const price = 0 * value;

    let tokens = ethers.utils.parseEther(price.toString());

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      web3Provider.getSigner()
    );

    try {
      const transaction = await contract.freesaleMint(value.toString(), {
        value: tokens.toString(),
        gasLimit: 100000,
      });

      await transaction.wait();

      alert(
        "Congratulations you have successfully minted your The4thds ! Check Opensea."
      );
    } catch (error) {
      console.log(error);
    }

    const total = await contract.totalSupply();
    setTotalMinted(total);
  };

  return (
    <>
      <section id="mint" className="mint">
        <div className="container">
          <div className="mint-container">
            <h1 className="mint-title">mint now</h1>
            <div className="mint-box">
              <div className="mint-col">
                <h2>mint now</h2>
                <p className="mint-price">
                  <span>Mint Price</span> <span>0.00 ETH Each</span>
                </p>
              </div>
              <div className="mint-col">
                <div className="mint-counter">
                  <input
                    type="button"
                    value="-"
                    onClick={() => {
                      if (value > 1) {
                        setValue(value - 1);
                      }
                    }}
                  />
                  <span>{value}</span>
                  <input
                    type="button"
                    value="+"
                    onClick={() => {
                      if (value < 10) {
                        setValue(value + 1);
                      }
                    }}
                  />
                </div>
                <button className="mint-now-btn" type="button" onClick={mint}>
                  Mint Now
                </button>

                <p className="mint-qntt">
                  QUANTITY: {totalMinted}/10,000 MINTED
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mint-img-left">
          <img src="./images/mint-img-left.png" alt="images" />
        </div>
        <div className="mint-img-right">
          <img src="./images/mint-img-right.png" alt="images" />
        </div>
      </section>
    </>
  );
}

export default Mint;
