import React, { Component } from "react";
import axios from "axios";

export default class Subscriber extends Component {
  state = {
    email: "",
    error_list: [],
  };

  handelInput = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  Subscriber = async (e) => {
    e.preventDefault();
    const res = await axios.post(
      "https://infinity.nftconstructer.com/api/subscriber",
      this.state
    );
    if (res.data.status === 200) {
      console.log(res.data.message);
      this.setState({
        email: "",
      });
      alert(res.data.message);
    } else {
      console.log(res.data.message);
      alert(res.data.message);
    }
  };
  render() {
    return (
      <div>
        <section className="newsletter">
          <div className="container">
            <h1>
              sign up for <span>newsletter</span>
            </h1>
            <div className="email-box">
              <form onSubmit={this.Subscriber}>
                <div className="input-box">
                  <input
                    type="email"
                    name="email"
                    required
                    onChange={this.handelInput}
                    value={this.state.email}
                    placeholder="Enter your email.."
                  />
                  <button className="submit-btn" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="news-top-img">
            <img src="./images/UFO.png" alt="images" />
          </div>
          <div className="news-left-img">
            <img src="./images/news-left-img.png" alt="images" />
          </div>
          <div className="news-right-img">
            <img src="./images/news-right-img.png" alt="images" />
          </div>
        </section>
      </div>
    );
  }
}
