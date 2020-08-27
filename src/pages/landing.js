import React from 'react';
import Axios from 'axios';
import CarouselComponent from '../components/carousel';

const apiURL = 'http://localhost:6996';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbSlider: []
    };
  }

  // life cycle componentDidMount() berjalan setelah render di jalankan
  componentDidMount() {
    console.log('componentDidMount() jalan');
    this.getData();
  }

  // arrow function untuk mengambil data dari api
  getData = () => {
    Axios.get(apiURL + '/slider')
      .then((res) => {
        console.log('Get data:', res.data);
        this.setState({
          dbSlider: res.data
        });
      })
      .catch((err) => {
        console.log('Error:', err);
      })
  }

  // life cycle render jalan terlebih dahulu
  render() {
    console.log('render() jalan');
    console.log('DB Slider:', this.state.dbSlider);
    return (
      <div style={{overflow: "hidden"}}>
        <CarouselComponent dataSlider={this.state.dbSlider}/>
      </div>
    );
  }
}

export default LandingPage;
