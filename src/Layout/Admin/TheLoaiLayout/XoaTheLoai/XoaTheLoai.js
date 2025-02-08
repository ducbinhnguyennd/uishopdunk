import { Modal } from '../../../../components/Modal'
import './XoaTheLoai.scss'
import { MdDeleteForever } from 'react-icons/md'
import { MdCancelPresentation } from 'react-icons/md'

function XoaTheLoai ({ isOpen, onClose, idtheloai, fetchdata }) {
  const handlexoatheloai = async () => {
    try {
      const response = await fetch(
        `https://demovemaybay.shop/deletetheloai/${idtheloai}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )
      if (response.ok) {
        onClose()
        fetchdata()
        alert('Xóa thành công!')
      }
    } catch (error) {
      console.error('lỗi xóa thể loại:', error)
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <p>Bạn có chắc muốn xóa thể loại này?</p>
        <div className='divbtnxtl'>
          <button onClick={handlexoatheloai} className='btndelete'>
            <MdDeleteForever />
            Xóa
          </button>
          <button onClick={onClose} className='btnhuy'>
            <MdCancelPresentation />
            Hủy
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default XoaTheLoai
