import { Modal } from '../../../../components/Modal'
import { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import './AddSanPham.scss'

function AddSanPham ({ isOpen, onClose, idtheloai, fetchData }) {
  const [name, setname] = useState('')
  const [price, setprice] = useState('')
  const [file, setFile] = useState(null)
  const [mota, setmota] = useState('')

  const handelAddsanpham = async () => {
    try {
      const formData = new FormData() // Tạo FormData
      formData.append('name', name)
      formData.append('mota', mota)
      formData.append('price', price)
      if (file) {
        formData.append('image', file) // Đính kèm file đúng tên
      }

      const response = await fetch(
        `https://demovemaybay.shop/postsanpham/${idtheloai}`,
        {
          method: 'POST',
          body: formData
        }
      )

      if (response.ok) {
        onClose()
        fetchData()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <h2>Thêm sản phẩm</h2>
        <div className='input-group'>
          <label> Ảnh</label>
          <input type='file' onChange={e => setFile(e.target.files[0])} />
          <label>Tên sản phẩm:</label>
          <input
            type='text'
            value={name}
            onChange={e => setname(e.target.value)}
            placeholder='Nhập tên thể loại'
          />
          <label>Giá sản phẩm:</label>
          <input
            type='number'
            value={price}
            onChange={e => setprice(e.target.value)}
            placeholder='Nhập đơn giá'
          />
          <label>Mô tả sản phẩm:</label>
          <ReactQuill
            value={mota}
            onChange={setmota}
            placeholder='Nhập mô tả sản phẩm'
            theme='snow'
          />
        </div>
        <div className='button-group'>
          <button className='btnaddtl' onClick={handelAddsanpham}>
            Thêm
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default AddSanPham
