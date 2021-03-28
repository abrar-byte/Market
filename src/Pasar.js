import React, { Component } from 'react';
import { Card,CardDeck, Container, Row, Col,Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import produks from './db.json';
import './Pasar.css'




export default class Pasar extends Component {
  state = {
    produks: produks,
    keranjang: JSON.parse(localStorage.getItem("toko")) || [],
    // jumlah: 0,
    total: 0


  }

  // componentDidMount() {
  //   console.log("update");
  //   // this.setState({ keranjang: JSON.parse(localStorage.getItem("toko")) })
  // }

  //jika keranjang kosong, maka total=item.harga
  //jika tidak maka reduce (this.onTotal)



  add = (x) => {
    const items = JSON.parse(localStorage.getItem("toko")) || []
    const item = this.state.produks[x]
    const i = this.state.keranjang.findIndex(s => s.nama === item.nama)
    //mencari index dalam array json yang sama dengan item.nama
    if (i < 0) {
      const k = { nama: item.nama, jumlah: 1, harga: item.harga }
      items.push(k)
      console.log(k)

    } else {
      const c = items[x].jumlah

      const k = { nama: item.nama, jumlah: c + 1, harga: item.harga }
      items.splice(x, 1, k)
      console.log(k)
    }
    this.setState({ keranjang: items })
    localStorage.setItem('toko', JSON.stringify(items))

    this.setState({ total: this.state.total + item.harga })


  }



  remove = () => {
    this.setState({ keranjang: [] })
    localStorage.removeItem('toko')

  }

  render() {
    console.log("renderapp");

    return (
      <div>
        <Container>
          <Row>
            <Col>
              <div>
              <CardDeck>
                {this.state.produks.map((item, i) => 
                 <Card bg="dark" text="light" key={i}>

                  
                    <Card.Img src={item.gambar} className="gambar" />
                    <Card.Body>
                    <Card.Title>
                    <b>{item.nama}</b>
                    </Card.Title>
                    <Card.Text>
                    <p>Rp.{item.harga}</p>
                    </Card.Text>

                    </Card.Body>

                    <button onClick={() => this.add(i)}>Tambah</button>
                    </Card>
                )}
              </CardDeck>
                  </div>
              
            </Col>
            <Col>

              Total:{this.state.total}
              <div>
               <Table striped bordered hover variant="dark" responsive="sm">
          <thead>
            <tr>
              <th>No</th>
              <th>Produk</th>
              <th></th>
              <th>@</th>
              <th></th>
              <th>Harga</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
                {this.state.keranjang.map((item, i) => (
                  <tr key={i}>
                    <td>{item.nama} </td>
                    <td> {item.jumlah} </td>
                    <td>Rp.{item.harga}</td>
                  </tr>

                ))}
           </tbody>
           </Table>   
                 <button onClick={this.remove}>Bayar</button>

           </div> 
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

