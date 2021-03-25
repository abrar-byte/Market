import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import produks from './db.json';




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
                {this.state.produks.map((item, i) => (
                  <div key={i}>
                    <p>{item.nama}</p>
                    <p>Rp.{item.harga}</p>
                    <img src={item.gambar} className="gambar" />
                    <br />
                    <br />
                    <button onClick={() => this.add(i)}>Tambah</button>
                  </div>
                ))}
              </div>
            </Col>
            <Col>

              Total:{this.state.total}
              <div>
                {this.state.keranjang.map((item, i) => (
                  <div key={i}>
                    <span>{item.nama} </span>
                    <span> {item.jumlah} </span>
                    <span>Rp.{item.harga}</span>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    )
  }
}

