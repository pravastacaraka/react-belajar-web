import React from 'react';
import Axios from "axios";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Spinner } from 'reactstrap';

const apiURL = 'http://localhost:6996';

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbProduct: [],
      loader: true
    }
  }

  componentDidMount() {
    this.getData();
    setTimeout(() => {
      this.setState({
        loader: false
      })
    }, 1000);
  }

  getData = () => {
    Axios.get(apiURL + '/products')
      .then((res) => {
        this.setState({
          dbProduct: res.data
        });
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }

  printData = () => {
    return this.state.dbProduct !== null ?
      this.state.dbProduct.map((item, index) => {
        const productName = item.name.toLowerCase().replace(/\s/g, "-");
        const productUrl =  '/p/' + productName + '-' + item.id;
        return (
          <div className='col-sm-6 col-md-3 col-lg-2 px-2 my-2' key={ index }>
            <Link to={{
              pathname: productUrl,
              state: {
                id: item.id
              }
            }}>
              <Card className='product-card'>
                <CardImg top width="100%" src={ item.images[0] } alt={ item.name } />
                <CardBody>
                  <CardTitle>{ item.name }</CardTitle>
                  <CardSubtitle className='product-price'>
                    <NumberFormat value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'}/>
                  </CardSubtitle>
                  <CardSubtitle className='product-rating'>0 Star ({ item.rating.length })</CardSubtitle>
                  <CardText>{ item.description }</CardText>
                </CardBody>
              </Card>
            </Link>
          </div>
        );
      }) :
      <Col className='px-2 my-2 d-flex align-items-center justify-content-center' style={{ height: '80vh' }}>
        No Data
      </Col>
  }

  loaderData = () => {
    return (
      <Col className='px-2 my-2 d-flex align-items-center justify-content-center' style={{ height: '80vh' }}>
        <Spinner style={{ width: '3rem', height: '3rem', opacity: '0.3' }}/>
      </Col>
    )
  }

  render() {
    return (
      <Container>
        <Row className='py-4'>
          { this.state.loader ? this.loaderData() : this.printData() }
        </Row>
      </Container>
    );
  }
}

export default ProductPage;
