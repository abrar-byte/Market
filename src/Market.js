import React, { Component } from 'react'

export default class Market extends Component {
  state = {
    produk: "Anggur",
    harga: [1000]
  }

  apel = () => {
    this.setState({ produk: "Apel" })
  }

  bayar = () => {
    const harga = this.state.harga
    // const data = 3000
    harga.push("data")
    this.setState(harga)
  }

  render() {
    return (
      <div>
        <p>{this.state.produk}</p>
        <p>{this.state.harga}</p>

        <button onClick={this.apel}>Klik</button>
        <button onClick={this.bayar}>Bayar</button>


      </div>
    )
  }
}
