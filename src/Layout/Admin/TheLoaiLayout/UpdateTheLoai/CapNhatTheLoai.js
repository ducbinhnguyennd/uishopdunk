import React, { useState, useEffect } from 'react';
import './CapNhatTheLoai.scss';

export function CapNhatTheLoai({ isOpen, onClose, idtheloai, currentName, fetchdata }) {
  const [name, setName] = useState('');
  useEffect(() => {
    if (isOpen) {
      setName(currentName || ''); // Nếu currentName không tồn tại, đặt giá trị là chuỗi rỗng
    }
  }, [isOpen, currentName]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:3010/puttheloai/${idtheloai}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        alert('Cập nhật thể loại thành công!');
        fetchdata(); // Cập nhật danh sách thể loại
        onClose(); // Đóng modal
      } else {
        alert('Cập nhật thất bại!');
      }
    } catch (error) {
      console.error(error);
      alert('Đã xảy ra lỗi!');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-capnhat">
      <div className="modal-content-capnhat">
        <h2>Cập nhật thể loại</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nhập tên thể loại mới"
        />
        <div className="modal-actions">
          <button onClick={handleUpdate}>Cập nhật</button>
          <button onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  );
}
