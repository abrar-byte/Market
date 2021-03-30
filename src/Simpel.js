import React, { Component } from 'react';
import produk from './data.json';
import './Simpel.css'

export default class Simpel extends Component {
  state = {
    produk,
    keranjang: JSON.parse(localStorage.getItem('keranjang')) || [],
    total: 0
  }

  tambahin = async (item) => {
    const semiKeranjang = JSON.parse(localStorage.getItem('keranjang')) || []
    // const produk = this.state.produk[z]
    const index = this.state.keranjang.findIndex(a => a.nama === item.nama)
    console.log("index", index);
    if (index < 0) {
      const push = { nama: item.nama, jumlah: 1, harga: item.harga, total: item.harga }

      semiKeranjang.push(push)
    }
    else {
      const tambah = semiKeranjang[index].jumlah + 1

      const push2 = { nama: item.nama, jumlah: tambah, harga: item.harga, total: item.harga * tambah }
      semiKeranjang.splice(index, 1, push2)
    } console.log("total2", this.state.total);
    console.log("harga2", produk.harga);
    this.setState({ keranjang: semiKeranjang })

    this.setState({ total: this.state.total + item.harga })




    localStorage.setItem('keranjang', JSON.stringify(semiKeranjang))
  }

  tambah = async (item) => {
    const semiKeranjang = JSON.parse(localStorage.getItem('keranjang')) || []
    // const produk = this.state.keranjang[z]
    // const jumlahcuys = semiKeranjang[z].jumlah
    const jumlahcuys = item.jumlah


    const push2 = { nama: item.nama, jumlah: jumlahcuys + 1, harga: item.harga, total: item.harga * (jumlahcuys + 1) }
    semiKeranjang.splice(item, 1, push2)

    this.setState({ keranjang: semiKeranjang })
    this.setState({ total: this.state.total + item.harga })
    // state total produk sekarang ditambah dengan produk harga sekarang



    localStorage.setItem('keranjang', JSON.stringify(semiKeranjang))
  }

  hapus = (item) => {
    const semiKeranjang = this.state.keranjang
    console.log('ikiikikiki', item.nama);

    const i = semiKeranjang.findIndex(s => s.nama === item.nama)

    console.log("tktjktj", item.harga);
    // mengecek apakah di dalam keranjang sudah ada item apa belum
    if (semiKeranjang[i].jumlah < 2) {
      console.log("satu")
      semiKeranjang.splice(i, 1)
    } else {
      console.log("dua")


      semiKeranjang[i].jumlah = semiKeranjang[i].jumlah - 1
      semiKeranjang[i].total = semiKeranjang[i].jumlah * item.harga
    }

    this.setState({ keranjang: semiKeranjang })
    this.setState({ total: this.state.total - item.harga })
    // state total sekarang dikurangi harga yang diklik

    localStorage.setItem('keranjang', JSON.stringify(semiKeranjang))


  }
  hapusin = () => {
    this.setState({ keranjang: [] })
    this.setState({ total: 0 })

    localStorage.removeItem('keranjang')


  }

  total
  render() {
    return (
      <div>
        <h1>Jual Mobil Berkualitas (-tapi boong)</h1>
        {this.state.produk.map((item, i) =>
          <tr key={i}>
            <th>
              <img src={item.gambar} width="200" height="300" alt="Gambar Mobil" />
            </th>
            <tr>
            </tr>

            <th>{item.nama}</th>
            <td>{item.detail}</td>
            <td>Rp.{item.harga}</td>
            <button onClick={() => this.tambahin(item)}>Beli ini bang</button>

          </tr>
        )}

        <div>
          <h1>Total=Rp.{this.state.total}</h1>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>@</th>
              <th>Harga</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>

            {this.state.keranjang.map((item, i) =>
              <tr key={i}>
                <td>{i + 1}</td>

                <td>{item.nama}</td>
                <td>{item.jumlah}</td>
                <td>Rp.{item.harga}</td>
                <td>Rp.{item.total}</td>
                <td><button onClick={() => this.hapus(item)}>-</button></td>
                <td><button onClick={() => this.tambah(item)}>+</button></td>
                //parameter z didefinisikan dengan i karena kita mengambil dari json bukan dari localstorage


              </tr>
            )}
          </tbody>
          <button onClick={this.hapusin}>Bayar</button>
          {/* {this.state.keranjang.map((item, i) =>
          )} */}
        </div>
      </div>
    )
  }
}
