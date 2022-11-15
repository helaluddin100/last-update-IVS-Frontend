import React from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Mint from "./components/Mint";
import Shop from "./components/Shop";
import Card from "./components/Card";
import Order from "./components/Order";
import Payment from "./components/Payment";
import Billing from "./components/Billing";
import ProductDetails from "./components/Product";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/mint">
            <Mint />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/card">
            <Card />
          </Route>
          <Route exact path="/:id" component={ProductDetails} />
          <Route exact path="/order">
            <Order />
          </Route>
          <Route exact path="/payment">
            <Payment />
          </Route>
          <Route exact path="/billing">
            <Billing />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
