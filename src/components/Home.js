import React from "react";

import { useEffect, useState } from "react";
import Subscriber from "./Inner/Subscriber";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import Slider from "react-slick";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";
import Image7 from "../assets/image7.png";
import "./Modal.css";
import "./slider.css";

const images = [Image1, Image2, Image3, Image4, Image5, Image6];

function Home() {
  // States
  const [activeFaq, setActiveFaq] = useState();
  const [value, setValue] = useState(1);
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    );
  };
  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    );
  };

  const [imageIndex, setImageIndex] = useState(0);
  const settings = {
    infinite: true,
    lazyLoad: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  };
  // Close Tab
  const closeTab = () => {
    window.opener = null;
    window.open("", "_self");
    window.close();
  };

  //  Modal
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setModal(true);
    }, 500);
  }, []);
  const toggleMadal = () => {
    setModal(!modal);
  };
  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <React.Fragment>
      {/* Modal */}
      {modal && (
        <div className="modal">
          <div className="modal-overlay">
            <div className="modal-contant">
              <div className="modal-info">
                <div className="modal-title">
                  <h1>Welcome to The 4th Ds minting page</h1>
                </div>
                <div className="modal-description">
                  <p>
                    Our website is age restricted, you must be 18 years or
                    older.
                  </p>
                  <p>Are you 18 years or older?</p>
                </div>
                <div className="modal-btns">
                  <button className="yes-btn" onClick={toggleMadal}>
                    Heck YES!
                  </button>
                  <button className="no-btn" onClick={closeTab}>
                    Um... NO
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Modal */}
      {/*------------- Intro Section  ----------------*/}
      <section className="intro">
        <div className="container">
          <div className="hero">
            <div className="hero-left">
              <div className="hero-title" data-aos="fade-up">
                <h1>
                  Mint 1 of <span>10,000 4th D NFTS</span> and join IVS as we
                  transcend through time and space!
                </h1>
              </div>
              <div className="hero-btns">
                <HashLink to="mint">
                  <button className="mints-now-btn">Mint Now</button>
                </HashLink>
                <a
                  href="https://discord.com/invite/infinity-versestudioz"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <button className="join-discord-btn">Join Our Discord</button>
                </a>
              </div>
            </div>
            <div className="hero-right">
              <img
                src="./images/hero-img.webp"
                alt="Hero Animation Not Found"
              />
            </div>
          </div>
        </div>
        <div className="hero-left-img">
          <img src="./images/hero-left-img.png" alt="" />
        </div>
      </section>
      {/*------------- Newsletter Section  -----------*/}
      <Subscriber />

      {/*------------- Slider Section  -----------*/}
      <section className="slider-manu">
        <div className="container">
          <Slider {...settings}>
            {images.map((img, idx) => (
              <div
                className={idx === imageIndex ? "slide activeSlide" : "slide"}
              >
                <img src={img} alt={img} />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/*------------------ Bus Section  --------------------*/}
      <section className="bus">
        <div className="bus-img">
          <img src="./images/bus.png" alt="images" />
        </div>
        <div className="supply-info">
          <div className="container">
            <div className="supply-inner">
              <div className="supply-box">
                <h2>TOTAL SUPPLY</h2>
                <h2>10,000</h2>
              </div>
              <div className="supply-box">
                <h2>Free Mint</h2>
                <h2>1,000</h2>
              </div>
              <div className="supply-box">
                <h2>Pre Sale</h2>
                <h2>0.05 ETH</h2>
              </div>
              <di v className="supply-box">
                <h2>Public Sale</h2>
                <h2>0.10 ETH</h2>
              </di>
            </div>
          </div>
        </div>
        <div className="bus-left-img">
          <img src="./images/Ston-Fire.gif" alt="images" />
        </div>
        <div className="bus-right-img">
          <img src="./images/bus-right-img.png" alt="images" />
        </div>
      </section>

      {/*------------- Roadmap Section  ----------------*/}

      <section id="roadmap" className="roadmap">
        <div className="container">
          <div className="raodmap-title">
            <h1>roadmap</h1>
          </div>
          <div className="roadmap-con">
            <div className="roadmap-left">
              <img src="./images/roadmap-left.png" alt="images" />
            </div>
            <div className="roadmap-right">
              <div className="roadmap-phase">
                <div className="phase-box">
                  <div className="phase-left">
                    <img src="./images/r-10.png" alt="images" />
                  </div>
                  <div className="phase-right">
                    <p>
                      IVS will release our Erc-20 Token we call Time. It will be
                      a stable coin utilized on the humans world to purchased
                      goods and products on the IVS-Earth primitive website.
                    </p>
                  </div>
                </div>
                <div className="phase-box">
                  <div className="phase-left">
                    <img src="./images/r-20.png" alt="images" />
                  </div>
                  <div className="phase-right">
                    <p>
                      We will begin to acquire more Earth Dev team members from
                      the current timeline to join our quest to deliver our next
                      collection Hobo Joe a stepping-stone into our final
                      centralized project before we transition into a
                      decentralized Community DAO.
                    </p>
                  </div>
                </div>
                <div className="phase-box">
                  <div className="phase-left">
                    <img src="./images/r-40.png" alt="images" />
                  </div>
                  <div className="phase-right">
                    <p>
                      IVS will engage the community to vote on a type of charity
                      or charities to donate 5% of all IVS sales profits every
                      quarter and/ or end of fiscal year.
                    </p>
                  </div>
                </div>
                <div className="phase-box">
                  <div className="phase-left">
                    <img src="./images/r-60.png" alt="images" />
                  </div>
                  <div className="phase-right">
                    <p>
                      IVS will prepare our community to begin staking their NFTs
                      once all 10k NFTs of "The 4th Ds" are minted and sold.
                      More info will be provided on our White paper that will be
                      continuously updated to provide the best information to
                      our investors, vistors, and community members.
                    </p>
                  </div>
                </div>
                <div className="phase-box">
                  <div className="phase-left">
                    <img src="./images/r-80.png" alt="images" />
                  </div>
                  <div className="phase-right">
                    <p>
                      IVS will provide more information about the immanent
                      weekly games on our IVS Discord. Our NFT members can earn
                      various IVS related prizes like Co merch, NFTs, crypto and
                      many other prizes for our participating NFT members within
                      the IVS community.
                    </p>
                  </div>
                </div>
                <div className="phase-box">
                  <div className="phase-left">
                    <img src="./images/r-90.png" alt="images" />
                  </div>
                  <div className="phase-right">
                    <p>
                      IVS will add more content to our YouTube channel featuring
                      the 4th Ds n Tales of 2 Dimensions and its developments.
                      We plan to use YouTube to raise brand awareness, funding,
                      and reveal our updates and continue to develop the series
                      for our IVS metaverse.
                    </p>
                  </div>
                </div>
                <div className="phase-box">
                  <div className="phase-left">
                    <img src="./images/r-100.png" alt="images" />
                  </div>
                  <div className="phase-right">
                    <p>
                      Hobo Joe will release a few weeks after 4th Ds sell out,
                      and we will have the acquired Dev members to begin the
                      development of our 4th D “Tales of 2 Dimension” VR series,
                      an immersive and interactive 3D experience and show. More
                      details in our white paper about the entire IVS Roadmap.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="roadmap-side-img-1">
          <img src="./images/roadmap-side-img-1.png" alt="images" />
        </div>
        <div className="roadmap-side-img-2">
          <img src="./images/roadmap-side-img-2.png" alt="images" />
        </div>
      </section>
      {/* --------- Team SECTION  ------------ */}
      <section className="team" id="team">
        <div className="container">
          <h1>ABOUT TEAM</h1>
          <div className="team-wrapper">
            <div className="team-member">
              <div className="team-img">
                <img src="./images/team-1.png" alt="images" />
              </div>
              <div className="team-description">
                <h3 className="team-name">Mr. Infinity</h3>
                <p>
                  Co- founder/ author/ artist of Infinity- Verse StudioZ. I’m
                  not an artist, just someone who likes creating art. I’m also
                  not an entrepreneur, just a Joe who has a detailed business
                  plan, with the ability to execute, and truly someone who got
                  lucky enough to get pulled off the streets… (Ms. 4th D made
                  all this happen)
                </p>
              </div>
            </div>
            <div className="team-member">
              <div className="team-img">
                <img src="./images/team-2.png" alt="images" />
              </div>
              <div className="team-description">
                <h3 className="team-name">Ms. 4th D</h3>
                <p>
                  Co-founder/ producer/ artist of Infinity Verse StudioZ, I
                  don’t have much to say. Its more about our art and fulfilling
                  the mission.
                </p>
              </div>
            </div>
            <div className="team-member">
              <div className="team-img">
                <img src="./images/team-3.png" alt="images" />
              </div>
              <div className="team-description">
                <h3 className="team-name">NFT Constructer</h3>

                <p>
                  Non-Fungible Token Development Company helps to create NFTs
                  for artworks, digital collectibles, gaming, sports, music,
                  video, content Subscription, etc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --------- FAQ SECTION  ------------ */}
      <section className="faq" id="faqs">
        <div className="container" data-aos="fade-up">
          <h1>
            Frequently Asked <br /> <span>Questions</span>
          </h1>
          <div className="faq-box">
            <div className="faq-top">
              <p>What are some of the benefits I receive as a member?</p>
            </div>
            <div className="faq-bottom">
              <p>
                All IVS NFTs are Commercial Use Licensed.
                <br />
                Admission to all IVS IRL events with any Infinity- Verse
                studioZ.
                <br />
                Ability to earn Power and Time Tokens our governance and
                currency tokens.
                <br />
                Access to our IVS Discord Community events to earn monthly
                prizes, players must be an active NFT holder to earn prizes.
                <br />
                Access to our metaverse that contains the official IVS 20 game
                series, 3D interactive 7 episode series "The 4th D n Tales of 2
                Dimensions", Infinity Merch n Verch shop,
              </p>
            </div>
            <div className="faq-roket">
              <img src="./images/roket.png" alt="roket" />
            </div>
          </div>
          <div className="faq-box-2">
            <div className="faq-top">
              <p>What is IVS?</p>
            </div>
            <div className="faq-bottom">
              <p>
                An idea turned company started by two individuals inorder to
                create a studio dedicated to our 3 Timeline roadmaps, which
                include 4th D Tales of 2 Dimension Comedic series about a 4th
                Dimensional company running a time regulatory Co. It will
                transform the way we watch shows as it includes using a VR and
                diving you into a 3D environment. Completely immersive and
                interactive Series. To boost sales and demand for our original
                collection release 4th Ds selected holders of certain NFTs will
                receive royalties for their NFT characters being used. IVS will
                transparently and automatically divert all funds into different
                percentages of our profits into designated projects to create
                multiple revenue streams before we activate our Power tokens
                system of governance, we will title it the IVS Community DAO
                Protocol System.
              </p>
            </div>
            <div className="faq-roket">
              <img src="./images/roket.png" alt="roket" />
            </div>
          </div>

          <div className="faq-box">
            <div className="faq-top">
              <p>What are 4th ds</p>
            </div>
            <div className="faq-bottom">
              <p>
                A 10k 4th Dimensional NFT Utility Collectable Collection with
                756 variations, 13 backgrounds, 7 different groups. This
                collection will lead to our other IVS NFT collections and
                enable/help IVS pursue its goals to create the IVS Community DAO
                Protocol System.
                <br />
                Its utility is the follwoing:
                <br />
                - Provides Commercial Use License to our NFT Holders
                <br />
                - Each NFT grants access to our exclusive IRL events
                <br />
                -Exclusive “verch n merch”
                <br />
                Transcend through time and space with the 4th Ds as they will
                embark on VR 3D immersive and interactive adventure in the
                digital NFT IVS metaverse. We begin with a 7 episode series to
                explain how The 4th Ds, Hobo Joe, and Infinity- Verse the 20
                game series bleands together creating the IVS Metaverse.
              </p>
            </div>
            <div className="faq-roket">
              <img src="./images/roket.png" alt="roket" />
            </div>
          </div>

          <div className="faq-box-2">
            <div className="faq-top">
              <p>
                What is the IVS Community DAO Protocol and what does it have to
                do with 4th Ds?
              </p>
            </div>
            <div className="faq-bottom">
              <p>
                A system of protocols which are rules, activations,
                deactivations, businesses, ideas, currency, of any form of
                governance. All this is required to create the Community Royalty
                Protocol and become fully decentralized. Thus creating other
                decentralized bussinesses under the IVS name for the worlds
                first ever decentralized finacillay transparrent conglomerate.
                It will be formulated of all our IVS NFT Holder and community
                members. For example our CRP will be enabled as a benefit from
                our various IVS DAO Protocol(s). More information is located
                within the IVS whitepaper link provided.
              </p>
            </div>
            <div className="faq-roket">
              <img src="./images/roket.png" alt="roket" />
            </div>
          </div>
        </div>
        <div className="faq-side-img-1">
          <img src="./images/Earth-Fire.gif" alt="Earth-Fire" />
        </div>
      </section>
    </React.Fragment>
  );
}

export default Home;
