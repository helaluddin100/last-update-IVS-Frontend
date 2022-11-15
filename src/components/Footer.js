import React from "react";

function Footer() {
  return (
    <>
      <section className="footer-all">
        <div className="community">
          <div className="container">
            <div className="community-box">
              <h1>
                JOIN THE IVS <span>COMMUNITY</span>
              </h1>
              <p>
                Join the Infinity- Verse Studioz Discord Community. All sorts of games and
                activities hosted by IVS. you can win free Co. Merch, NFT's, IVS Time or Power Tokens, and much more!
              </p>
              <div className="join-group">
                <a
                  href="https://discord.gg/infinity-versestudioz"
                  target="_blank"
                >
                  <img src="./images/discord-community.png" alt="discord" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-con">
            <div className="socials">
              <a
                href="https://discord.gg/infinity-versestudioz"
                target="_blank"
              >
                <img src="./images/discord.png" alt="discord" />
              </a>
              <a href="https://twitter.com/Infinity_V_S" target="_blank">
                <img src="./images/twitter.png" alt="twitter" />
              </a>
              <a href="https://www.instagram.com/ivs_4th_d/" target="_blank">
                <img src="./images/instagram.png" alt="instagram" />
              </a>
            </div>
            <div className="copyright">
              <p>© 2022 IVS All Rights Reserved</p>
            </div>
            {/* <div className="nft-constructer">
              <p>
                BROUGHT TO YOU BY
                <a href="https://www.nftconstructer.com/" target="_blank">
                  <img
                    src="./images/nft-constructor.png"
                    alt="NFT CONSTRUCTER"
                  />
                  NFT CONSTRUCTER
                </a>
              </p>
            </div> */}
          </div>
          <div className="rocket">
            <img src="./images/rocket.gif" alt="rocket.gif" />
          </div>
        </div>
        <div className="footer-side-img-1">
          <img src="./images/footer-side-img-1.png" alt="rocket.gif" />
        </div>
        <div className="footer-side-img-2">
          <img src="./images/footer-side-img-2.png" alt="rocket.gif" />
        </div>
      </section>
    </>
  );
}

export default Footer;
