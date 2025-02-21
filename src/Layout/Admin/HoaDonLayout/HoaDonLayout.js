import { useState, useEffect } from 'react'

import { FaMobile } from 'react-icons/fa6'
import { HoaDonChiTiet } from './HoaDonChiTiet'
import './HoaDonLayout.scss'

function HoaDonLayout () {
  const [data, setData] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const fetchdata = async () => {
    try {
      const response = await fetch('http://localhost:3005/gethoadon')
      if (response.ok) {
        const data = await response.json()
        setData(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([])
    } else {
      setSelectedIds(data.map(item => item._id))
    }
    setSelectAll(!selectAll)
  }

  const handleSelectItem = id => {
    let newSelectedIds = [...selectedIds]
    if (newSelectedIds.includes(id)) {
      newSelectedIds = newSelectedIds.filter(itemId => itemId !== id)
    } else {
      newSelectedIds.push(id)
    }
    setSelectedIds(newSelectedIds)

    setSelectAll(newSelectedIds.length === data.length)
  }

  const handleStatusChange = async (id, value) => {
    try {
      const response = await fetch(`http://localhost:3005/settrangthai/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          trangthai: value
        })
      })

      if (response.ok) {
        fetchdata()
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='theloai_container'>
      <div className='nav_chucnang'>
        <button
          className='btnthemtheloai'
          onClick={() => {
            if (selectedIds.length === 0) {
              alert('Chọn một hóa đơn để xem chi tiết')
            } else if (selectedIds.length > 1) {
              alert('Chỉ được chọn một hóa đơn để xem chi tiết')
            } else {
              setIsOpen(true)
            }
          }}
        >
          <FaMobile className='icons' />
          Chi tiết
        </button>
      </div>

      <table className='tablenhap'>
        <thead>
          <tr>
            <th>
              <input
                type='checkbox'
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>STT</th>
            <th>Tên khách hàng</th>
            <th>Số điện thoại</th>
            <th>Địa chỉ</th>
            <th>Số lượng sản phẩm</th>
            <th>Tổng tiền</th>
            <th>Thanh toán</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item._id}>
              <td>
                <input
                  type='checkbox'
                  checked={selectedIds.includes(item._id)}
                  onChange={() => handleSelectItem(item._id)}
                />
              </td>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.phone}</td>
              <td>{item.address}</td>
              <td>{item.sanpham.length}</td>
              <td>{item.tongtien.toLocaleString()}đ </td>
              <td>{item.thanhtoan ? 'Đã thanh toán' : 'Chưa thanh toán'}</td>
              <td>
                <select
                  value={item.trangthai}
                  onChange={e => handleStatusChange(item._id, e.target.value)}
                  className='custom-select'
                >
                  <option value='Đang xử lý'>🕒 Đang xử lý</option>
                  <option value='Đang vận chuyển'>🚚 Đang vận chuyển</option>
                  <option value='Đã nhận'>✅ Đã nhận</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <HoaDonChiTiet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        idhoadon={selectedIds}
      />
    </div>
  )
}

export default HoaDonLayout
