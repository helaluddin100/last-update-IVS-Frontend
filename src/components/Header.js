import React from "react";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { HashLink } from "react-router-hash-link";

import { useLocation } from "react-router-dom";
import Web3 from "web3";
import Web3Modal from "web3modal";

import AOS from "aos";
import "aos/dist/aos.css";
function Header() {
  const [navActive, setNavActive] = useState(false);
  const [sidebarActive, setSidebarActive] = useState(false);

  const [menuActive, setMenuActive] = useState(false);
  const _toggleSidebar = () => {
    setMenuActive(!menuActive);
  };
  AOS.init();

  const [pagelocation, setPageLocation] = useState(useLocation().pathname);
  //totalMinted is the total amount of tokens minted
  const [totalMinted, setTotalMinted] = useState(0);
  //mint value is the amount of tokens to mint
  const [value, setValue] = useState(1);
  //connect to metamask
  const [walletConnected, setWalletConnected] = useState(false);
  // Connect Wallet
  const connectWallet = async () => {
    if (Web3.givenProvider) {
      const providerOptions = {};

      const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true,
        providerOptions,
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      web3.eth.net.getId();

      const addresses = await web3.eth.getAccounts();
      const address = addresses[0];

      const { ethereum } = window;

      const networkId = await ethereum.request({
        method: "net_version",
      });

      setWalletConnected(true);
    } else {
      window.open(
        `https://metamask.app.link/dapp/hit-cat.netlify.app${pagelocation}`
      );
    }
  };


  return (
    <>
      <header class="header-mobile" id="home">
        <button className="hum-btn" onClick={_toggleSidebar} id="burger-menu">
          <img
            src={`images/${menuActive ? "x" : "burger-menu"}.svg`}
            alt="Menu"
          />
        </button>

        <nav id="mobile-nav" className={`${menuActive ? "hidden" : ""} `}>
          <HashLink to="/">
            <a
              onClick={_toggleSidebar}
              href="/"
              className="active-nav nav-link mobile-link"
            >
              HOME
            </a>
          </HashLink>

          <HashLink to="/#roadmap">
            <a
              onClick={_toggleSidebar}
              href="#roadmap"
              className="nav-link mobile-link"
            >
              ROADMAP
            </a>
          </HashLink>
          <HashLink to="/#about">
            <a
              onClick={_toggleSidebar}
              href="#about"
              className="nav-link mobile-link"
            >
              About
            </a>
          </HashLink>
          <HashLink to="/#faqs">
            <a
              onClick={_toggleSidebar}
              href="#faqs"
              className="nav-link mobile-link"
            >
              FAQs
            </a>
          </HashLink>
          <HashLink to="shop">
            <a
              onClick={_toggleSidebar}
              href="#shop"
              className="nav-link mobile-link"
            >
              Shop
            </a>
          </HashLink>
          <a
            onClick={_toggleSidebar}
            href="https://infinity-verse-studioz.gitbook.io/ivs-whitepaper/"
            className="nav-link mobile-link"
            target={"_blank"}
            rel="noreferrer"
          >
            WhitePaper
          </a>
          <div class="header-link-mobile">
            <div class="social-mob">
              <a href="" target="_blank">
                <img src="./images/discord.png" alt="discord" />
              </a>
              <a href="" target="_blank">
                <img src="./images/twitter.png" alt="twitter" />
              </a>
              <a href="" target="_blank">
                <img src="./images/instagram.png" alt="instagram" />
              </a>
            </div>
          </div>

          <button className="con-wal-mob" onClick={connectWallet}>
            {walletConnected ? "Connected" : "Connect Wallet"}
          </button>
        </nav>
      </header>

      <header>
        <nav>
          <div className="nav-left">
            <HashLink to="/">
              <a href="/">HOME</a>
            </HashLink>

            <HashLink to="/#roadmap">
              <a href="#roadmap">ROADMAP</a>
            </HashLink>

            <HashLink to="/#team">
              <a href="#team">TEAM</a>
            </HashLink>
            <HashLink to="/#faqs">
              <a href="#fqas">FAQs</a>
            </HashLink>
          </div>
          <Link to="/">
            <div className="nav-logo">
              <img src="./images/logo.png" alt="" />
            </div>
          </Link>
          <div className="nav-right">
            <HashLink to="shop">
              <a href="#shop">SHOP</a>
            </HashLink>

            <a
              href="https://infinity-verse-studioz.gitbook.io/ivs-whitepaper/"
              target={"_blank"}
              rel="noreferrer"
            >
              WhitePaper
            </a>
            <button className="btn-header" onClick={connectWallet}>
              {walletConnected ? "Connected" : "Connect Wallet"}
            </button>
          </div>
        </nav>
        <div className="nav-socials"></div>
      </header>
    </>
  );
}

export default Header;
