import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import { HashLink } from "react-router-hash-link";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import ProductDetails from "./ProductDetails";
// Import Swiper styles
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/thumbs/thumbs.min.css";
import "swiper/swiper.min.css";
import "./swiper.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
// import { Link } from "react-router-dom";

function Shop() {
  // States
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProduct] = useState([]);

  useEffect(() => {
    fetch("https://infinity.nftconstructer.com/api/product")
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
  return (
    <React.Fragment>
      {/*------------- Shop Products Section  ----------------*/}
      {/* <section className="shop">
        <div className="container">
          <div className="all-products">
            {products.map((product, index) => (
              <div className="product" key={index}>
                <div className="product-left">
                  <div className="prodict-slider">
                    <Swiper
                      style={{
                        "--swiper-navigation-color": "#fff",
                        "--swiper-pagination-color": "#fff",
                      }}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{ swiper: thumbsSwiper }}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      <SwiperSlide>
                        <img src={product.main_img} />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={product.image_a} />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={product.image_b} />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={product.image_c} />
                      </SwiperSlide>
                    </Swiper>
                    <Swiper
                      onSwiper={setThumbsSwiper}
                      spaceBetween={10}
                      slidesPerView={4}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      className="mySwiper"
                    >
                      <SwiperSlide>
                        <img src={product.main_img} />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={product.image_a} />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={product.image_b} />
                      </SwiperSlide>
                      <SwiperSlide>
                        <img src={product.image_c} />
                      </SwiperSlide>
                    </Swiper>
                  </div>
                </div>
                <div className="product-right">
                  <HashLink to="">
                    <div className="product-title">
                      <h1>{product.name}</h1>
                    </div>
                  </HashLink>
                  <div className="product-details">
                    <p>{product.description}</p>
                  </div>

                  <div className="buy-add-btn">
                    <Link to={"/" + product.id}>
                      <button className="buy-btn">BUY NOW</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      <section>
        <div className="coming-soon">
          <img src="images/coming-soon.jpg" className="coming-soon" alt="" />
        </div>
      </section>
    </React.Fragment>
  );
}
export default Shop;
