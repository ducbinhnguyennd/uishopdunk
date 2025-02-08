import { Modal } from '../../../../components/Modal'
import { MdDeleteForever } from 'react-icons/md'
import { MdCancelPresentation } from 'react-icons/md'

function XoaSanPham ({ isOpen, onClose, idsanpham, fetchdata }) {
  const handleXoaSanPham = async () => {
    try {
      const response = await fetch(
        `https://demovemaybay.shop/deletesanpham/${idsanpham}`,
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
      console.error('lỗi xóa sản phẩm:', error)
    }
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <p>Bạn có chắc muốn xóa sản phẩm này?</p>
        <div className='divbtnxtl'>
          <button onClick={handleXoaSanPham} className='btndelete'>
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

export default XoaSanPham
