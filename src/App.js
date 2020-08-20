import React from 'react';
import { Route } from 'react-router-dom'

/* Components */
import Navbar from './components/navbar'

/* Pages */
import LandingPage from './pages/landing'
import FormPage from './pages/form'
import ProductPage from './pages/product';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return ( 
      <div>
        <Navbar/>
        <Route path="/" component={ LandingPage } exact/>
        <Route path="/form" component={ FormPage }/>
        <Route path="/product" component={ ProductPage }/>
      </div>
    );
  }
}
 
export default App;
