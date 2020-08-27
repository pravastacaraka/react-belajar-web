import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

/* Components */
import Navbar from './components/navbar'

/* Pages */
import LandingPage from './pages/landing'
import FormPage from './pages/form'
import ProductPage from './pages/products';
import ProductDetail from "./pages/product-detail";
import Error404 from "./pages/error-404";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <BrowserRouter>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={ LandingPage }/>
          <Route path="/form" component={ FormPage }/>
          <Route path="/products" component={ ProductPage }/>
          <Route path="/p/:product" component={ ProductDetail }/>
          <Route component={ Error404 }/>
        </Switch>
      </BrowserRouter>
    );
  }
}
 
export default App;
