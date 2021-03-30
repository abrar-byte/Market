import React, { Component } from 'react';
import { Card, CardDeck, Container, Row, Col, Table, Navbar, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import produks from './db.json';
// untuk nama dari JSON boleh terserah
import './Pasar.css'




export default class Pasar extends Component {
  state = {
    produks: produks,
    // atau bisa ditulis "produks"
    // ini mengambil nama dari import di atas
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
    // wadah untuk menampung hasil rumusan di bawah ini
    const item = this.state.produks[x]
    // mengambil index array dari produks, dari json
    const i = this.state.keranjang.findIndex(s => s.nama === item.nama)
    //mencari index dalam array json yang sama dengan item.nama state keranjang
    // index jika tidak ada nilainya maka -1
    if (i < 0) {
      console.log(1)
      const k = { nama: item.nama, jumlah: 1, harga: item.harga, total: item.harga }
      items.push(k)
      // console.log(k)

    } else {
      console.log(2);
      const c = items[i].jumlah + 1
      // mengambil index "i" yang mana "i"adalah index state keranjang.

      const k = { nama: item.nama, jumlah: c, harga: item.harga, total: item.harga * c }
      items.splice(i, 1, k)
      // untuk mengupdate jumlahnya jika lebih dari satu
      // console.log(k)

    }
    this.setState({ keranjang: items })
    localStorage.setItem('toko', JSON.stringify(items))

    this.setState({ total: this.state.total + item.harga })
    // jumlah state total yang tadinya 0 dibuat menjadi total harga dari item.harga


  }





  remove = () => {
    this.setState({ keranjang: [] })
    this.setState({ total: 0 })
    localStorage.removeItem('toko')

  }

  render() {
    console.log("renderapp");

    return (

      <div>
        <Container>
          <Navbar bg="dark" variant="dark" className="justify-content-center">
            <Nav.Item>
              <Navbar variant="light">E-TOKO</Navbar>
            </Nav.Item>
          </Navbar>
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


              <div>
                <Table striped bordered hover variant="dark" responsive="sm">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Produk</th>

                      <th>@</th>

                      <th>Harga</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.keranjang.map((item, i) => (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{item.nama} </td>
                        <td> {item.jumlah} </td>
                        <td>Rp.{item.harga}</td>
                        <td>Rp{item.total}</td>

                      </tr>

                    ))}
                  </tbody>
                </Table>
                Total={this.state.total}<br />
                <button onClick={this.remove}>Bayar</button>

              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

