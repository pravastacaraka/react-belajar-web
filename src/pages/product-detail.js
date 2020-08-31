import React from "react";
import Axios from "axios";
import NumberFormat from "react-number-format";
import Breadcrumb from "../components/breadcrumb";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faHeart, faMinusCircle, faPlusCircle, faShare, faStar} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col, Spinner } from "reactstrap";

const apiURL = 'http://localhost:6996';
let height = 1, width = 1;

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      product: []
    };
    this.productId = props.location.state.id;
  }

  componentDidMount() {
    this.getData();
    this.setState({
      loader: false
    })
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
    // Process item product from state
    const item = this.state.product;
    const categories = String(item.category).replace(/\s/g,"").split(",");

    // Zoom in & out image on mouse over
    const imgZoom = document.createElement("div");
    const imgStatic = document.getElementById("img-static");
    const placeholder = document.getElementById("img-placeholder");

    if (placeholder !== null) {
      // Add event listener when mouse over on element
      placeholder.addEventListener("mousemove", (e) => {
        // Remove placeholder child
        placeholder.removeChild(placeholder.childNodes[0]);
        // Add style background position to new div img-zoom
        imgZoom.style.backgroundImage = "url(" + item.images[0] + ")";
        imgZoom.style.backgroundPositionX = (e.offsetX-149)/width*100 + "%";
        imgZoom.style.backgroundPositionY = (e.offsetY-149)/height*100 + "%";
        // Add a new div img-zoom child
        placeholder.appendChild(imgZoom);
      }, false);

      // Add event listener when mouse out on element
      placeholder.addEventListener("mouseleave", () => {
        placeholder.removeChild(placeholder.childNodes[0]);
        placeholder.appendChild(imgStatic);
      }, false);
    }

    let stockCount = 0;

    return item ?
      <Col className='px-2'>
        { /* Breadcrumb Section */ }
        <Breadcrumb locationPage={ categories } activePage={ item.name } />

        { /* Detail Product Section */ }
        <div className="information-container">
          <div className="detail-product-left">
            <div className="product-img"
                 id="product-img"
                 ref={ (productImgEl) => {
                   if (!productImgEl) return;
                   height = productImgEl.getBoundingClientRect().height;
                   width = productImgEl.getBoundingClientRect().width;
                 }}>
              <div className="img-placeholder" id="img-placeholder">
                <div className="img-static" id="img-static">
                  { this.state.product.images ? <img src={ item.images[0] } alt={ 'Foto Produk ' + item.name } /> : null }
                </div>
              </div>
            </div>
          </div>
          <div className="detail-product-right">
            <h5 style={{lineHeight: 1.3}}>{ item.name }</h5>
            <div className="product-rating mb-3">
              {
                this.state.product.rating ?
                  (item.rating.length === 0) ?
                      <span style={{ color: "rgba(0,0,0,.5)"}}>Jadilah Yang Pertama Mengulas Produk Ini</span>
                    : item.rating.length
                : null
              }
              <FontAwesomeIcon icon={faStar} className="ml-1" style={{ color: "#FFC400" }} />
            </div>
            <table className="w-100">
              <tbody>
                <tr>
                  <td className="product-tag">Harga</td>
                  <td className="product-value product-price">
                    <h3 className="mb-0">
                      <NumberFormat value={item.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp'}/>
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td className="product-tag">Merek</td>
                  <td className="product-value">{ item.brand }</td>
                </tr>
                <tr>
                  <td className="product-tag">Warna</td>
                  <td className="product-value">{ item.colour }</td>
                </tr>
                <tr>
                  <td className="product-tag">Ukuran</td>
                  <td className="product-value">
                    <p className="tag-heading">Pilih ukuran</p>
                    <div className="d-flex flex-row">
                      {
                        item.stock? item.stock.map((stockItem, stockIndex) => {
                          stockCount += stockItem.total;
                          return(
                            <button className="mr-2 btn btn-select" key={ stockIndex }>{ stockItem.code }</button>
                          )
                        }) : <h5 className="tag-heading">Stok Habis</h5>
                      }
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="product-tag">Jumlah</td>
                  <td className="product-value">
                    <p className="tag-body">
                      { (stockCount < 20) ? "Stok tersisa <20, beli segera!" : null }
                    </p>
                    <div className="d-flex align-items-center">
                      <FontAwesomeIcon icon={ faMinusCircle } className="disabled" style={{ fontSize: "1.5em" }} />
                      <input className="text-center w-15" type="text" max={ stockCount } min="1" defaultValue="1"/>
                      <FontAwesomeIcon icon={ faPlusCircle } style={{ fontSize: "1.5em" }} />
                      <p className="ml-2">Min. pembelian 1 pcs</p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="product-tag">Info Produk</td>
                  <td className="product-value">
                    <div className="d-flex flex-row">
                      <div className="product-info">
                        <p>Berat</p>
                        <p className="value">2 Kg</p>
                      </div>
                      <div className="product-info">
                        <p>Kondisi</p>
                        <p className="value">Baru</p>
                      </div>
                      <div className="product-info">
                        <p>Asuransi</p>
                        <p className="value">Opsional</p>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colSpan="2" className="text-right">
                    <button className="btn btn-order btn-outline-secondary mr-2">
                      <FontAwesomeIcon icon={ faHeart } style={{ fontSize: "1.3em" }} />
                    </button>
                    <button className="btn btn-order btn-outline-primary mr-2 w-20">Beli</button>
                    <button className="btn btn-order btn-primary">Tambah Ke Keranjang</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="tab-product-wrapper">
          <div className="tab-menu active">
            Deskripsi
          </div>
          <div className="tab-menu">
            Ulasan ({ this.state.product.rating ? item.rating.length : null })
          </div>
          <div className="tab-menu">
            Diskusi (0)
          </div>
          <div className="tab-menu">
            Rekomendasi
          </div>
          <div className="ml-auto tab-share">
            <button className="btn btn-outline-secondary">
              <FontAwesomeIcon icon={ faShare } className="mr-2" />
              Bagikan
            </button>
          </div>
        </div>

        <div className="description-container">
          <h5>Deskripsi { item.name }</h5>
          <p>{ item.description }</p>
        </div>
      </Col> :
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
    )
  }
}

export default ProductDetail;
