import { useState, useEffect } from 'react'
import './TheLoaiLayout.scss'
import { FaPlus } from 'react-icons/fa'
import { AddTheLoai } from './AddTheLoai'
import { SanPhamLayout } from '../SanPhamLayout'
import { XoaTheLoai } from './XoaTheLoai'
import { CapNhatTheLoai } from './UpdateTheLoai/CapNhatTheLoai'
function TheLoaiLayout () {
  const [data, setdata] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenSp, setisOpenSp] = useState(false)
  const [isOpenXoaTL, setisOpenXoaTL] = useState(false)
  const [isOpenCapNhat, setisOpenCapNhat] = useState(false)
  const [currentName, setCurrentName] = useState('')

  const [idtheloai, setidtheloai] = useState('')

  const fetchdata = async () => {
    try {
      const response = await fetch('https://demovemaybay.shop/theloaisanpham')
      if (response.ok) {
        const data = await response.json()
        setdata(data)
      }
    } catch (error) {
      console.error(error)
    }
  }
  useEffect(() => {
    fetchdata()
  }, [])
  return (
    <div>
      <button className='btnthemtheloai' onClick={() => setIsOpen(true)}>
        <FaPlus className='icons' />
        Thêm thể loại
      </button>
      <table className='tablenhap'>
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên thể loại</th>
            <th>Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td className='tdchucnang1'>
                <div
                  className='chitiet'
                  onClick={() => {
                    setidtheloai(item._id)
                    setisOpenSp(true)
                  }}
                >
                  Chi tiết
                </div>

                <div
                  className='capnhat'
                  onClick={() => {
                    setidtheloai(item._id)
                    setCurrentName(item.name)
                    setisOpenCapNhat(true)
                  }}
                >
                  Cập nhật
                </div>
                <div
                  className='xoatheloai'
                  onClick={() => {
                    setidtheloai(item._id)
                    setisOpenXoaTL(true)
                  }}
                >
                  Xóa
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddTheLoai
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        fetchdata={fetchdata}
      />
      <SanPhamLayout
        isOpen={isOpenSp}
        onClose={() => setisOpenSp(false)}
        idtheloai={idtheloai}
      />
      <XoaTheLoai
        isOpen={isOpenXoaTL}
        onClose={() => setisOpenXoaTL(false)}
        idtheloai={idtheloai}
        fetchdata={fetchdata}
      />
      <CapNhatTheLoai
        isOpen={isOpenCapNhat}
        onClose={() => setisOpenCapNhat(false)}
        idtheloai={idtheloai}
        currentName={currentName}
        fetchdata={fetchdata}
      />
    </div>
  )
}

export default TheLoaiLayout
