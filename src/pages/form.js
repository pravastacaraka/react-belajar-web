import React from 'react';
import Axios from 'axios';
import { FormGroup, Form, Label, Input, Button, Table } from 'reactstrap';

const apiURL = 'http://localhost:2000';

class FormPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dbForm: [],
      selectedId: null
    }
  }

  // life cycle componentDidMount() berjalan setelah render di jalankan
  componentDidMount() {
    this.getData();
  }

  getData = () => {
    Axios.get(apiURL + '/form')
      .then((res) => {
          this.setState({
              dbForm: res.data
          });
      })
      .catch((err) => {
          console.log('Error:', err);
      });
  }

  addData = () => {
    const data = {
      nama: this.nama.value,
      alamat: this.alamat.value,
      pekerjaan: this.pekerjaan.value,
      hobi: this.hobi.value
    };
    Axios.post(apiURL + '/form', data)
      .then(() => {
          this.getData();
      })
      .catch((err) => {
          console.log('Error:', err);
      });
  }

  removeData = (id) => {
    Axios.delete(apiURL + `/form/${id}`)
      .then(() => {
          this.getData();
      })
      .catch((err) => {
          console.log('Error:', err);
      });
  }

  saveData = (id) => {
    const data = {
      nama: this.newNama.value,
      alamat: this.newAlamat.value,
      pekerjaan: this.newPekerjaan.value,
      hobi: this.newHobi.value
    };
    Axios.patch(apiURL + `/form/${id}`, data)
      .then(() => {
          this.getData();
          this.setState({selectedId: null});
      })
      .catch((err) => {
          console.log('Error:', err);
      });
  }

  printData = () => {
      return this.state.dbForm !== null ?
          this.state.dbForm.map((item, index) => {
              if(this.state.selectedId === item.id) {
                  return (
                      <tr key={index}>
                          <td>{ item.id }</td>
                          <td><Input type='text' innerRef={(val) => this.newNama = val} defaultValue={ item.nama }/></td>
                          <td><Input type='text' innerRef={(val) => this.newAlamat = val} defaultValue={ item.alamat }/></td>
                          <td><Input type='text' innerRef={(val) => this.newPekerjaan = val} defaultValue={ item.pekerjaan }/></td>
                          <td>
                              <Input type='select' id='hobi' innerRef={(val) => this.newHobi = val} defaultValue={ item.hobi }>
                                  <option>Choose...</option>
                                  <option value='Baca'>Baca</option>
                                  <option value='Coding'>Coding</option>
                                  <option value='Photography'>Photography</option>
                              </Input>
                          </td>
                          <td className='text-center'>
                              <Button type='button' onClick={() => this.saveData(item.id)} className='mr-1'>Yes</Button>
                              <Button onClick={() => this.setState({selectedId: null})}>No</Button>
                          </td>
                      </tr>
                  );
              } else {
                  return (
                      <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.nama}</td>
                          <td>{item.alamat}</td>
                          <td>{item.pekerjaan}</td>
                          <td>{item.hobi}</td>
                          <td className='text-center'>
                              <Button type='button' onClick={ () => this.setState({selectedId: item.id}) } className='mr-1'>Edit</Button>
                              <Button type='button' onClick={ () => this.removeData(item.id) }>Delete</Button>
                          </td>
                      </tr>
                  );
              }
          }) :
          <tr><td colSpan='6'>No Data</td></tr>
  }

  // life cycle render jalan terlebih dahulu
  render() {
      return (
          <div className='container py-3'>
              <Form>
                  <FormGroup>
                      <Label for='nama'>Nama</Label>
                      <Input type='text' id='nama' innerRef={(val) => this.nama = val}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for='alamat'>Alamat</Label>
                      <Input type='text' id='alamat' innerRef={(val) => this.alamat = val}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for='pekerjaan'>Pekerjaan</Label>
                      <Input type='text' id='pekerjaan' innerRef={(val) => this.pekerjaan = val}/>
                  </FormGroup>
                  <FormGroup>
                      <Label for='hobi'>Hobi</Label>
                      <Input type='select' id='hobi' innerRef={(val) => this.hobi = val}>
                          <option>Choose...</option>
                          <option value='Baca'>Baca</option>
                          <option value='Coding'>Coding</option>
                          <option value='Photography'>Photography</option>
                      </Input>
                  </FormGroup>
                  <Button type='button' onClick={ this.addData }>Submit</Button>
              </Form>
              <br/>
              <Table>
                  <thead>
                      <tr>
                          <th className='w-5'>No</th>
                          <th className='w-20'>Nama</th>
                          <th className='w-25'>Alamat</th>
                          <th className='w-15'>Pekerjaan</th>
                          <th className='w-15'>Hobi</th>
                          <th className='w-20'/>
                      </tr>
                  </thead>
                  <tbody>{ this.printData() }</tbody>
              </Table>
          </div>
      );
  }
}

export default FormPage;
