import React from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import NumberFormat from "react-number-format";

const apiURL = 'http://localhost:6996';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: []
    };
    this.productId = props.location.state.id
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    Axios.get(apiURL + '/products/' + this.productId)
      .then((res) => {
        this.setState({
          product: res.data
        });
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  }

  printData = () => {
    const item = this.state.product;
    return item?
      <div className='col-12 px-2'>
        <Breadcrumb>
          <BreadcrumbItem><Link to="/">Home</Link></BreadcrumbItem>
          <BreadcrumbItem><Link to={"/c/" + item.category}>{ item.category }</Link></BreadcrumbItem>
          <BreadcrumbItem active>{ item.name }</BreadcrumbItem>
        </Breadcrumb>
        <Card className='product-card'>
          {/*<CardImg top width="100%" src={ item.images[0] } alt={ item.name } />*/}
          <CardBody>
            <CardTitle>{ item.name }</CardTitle>
            <CardSubtitle className='product-price'>
              <NumberFormat value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'}/>
            </CardSubtitle>
            {/*<CardSubtitle className='product-rating'>0 Star ({ item.rating.length })</CardSubtitle>*/}
            <CardText>{ item.description }</CardText>
          </CardBody>
        </Card>
      </div> :
      <div className='col-12 px-2 my-2 d-flex align-items-center justify-content-center' style={{ height: '80vh' }}>
        No Data
      </div>
  }

  render() {
    return (
      <div className='container'>
        <div className='row py-4'>
          { this.printData() }
        </div>
      </div>
    )
  }
}

export default ProductDetail;
