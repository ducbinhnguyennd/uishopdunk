import React, { useState, useEffect } from 'react'
import './DanhGiaLayout.scss'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import moment from 'moment'

const DanhGiaLayout = () => {
  const [rating, setRating] = useState(0)
  const [tenkhach, setTenkhach] = useState('')
  const [content, setcontent] = useState('')
  const [danhgias, setdanhgias] = useState([])

  const handleRating = value => {
    setRating(value)
  }

  const handlePostdanhgia = async () => {
    try {
      const response = await fetch('http://localhost:3005/danhgia', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          tenkhach,
          content,
          rating
        })
      })
      if (response.ok) {
        toast.success('Đánh giá thành công', {
          position: 'top-right',
          autoClose: 2000
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  const fetchdanhgia = async () => {
    try {
      const response = await fetch('http://localhost:3005/getdanhgia')
      if (response.ok) {
        const data = await response.json()
        setdanhgias(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchdanhgia()
  }, [])

  return (
    <div className='review-container'>
      <div className='review-rating'>
        <h2 className='title_rate'>Đánh giá danh mục</h2>

        <div className='rating-summary'>
          <div className='score'>
            <span>5</span>
            <p>7 đánh giá</p>
          </div>
          <div className='rating-details'>
            <div className='stars'>★★★★★</div>
            <div className='rating-bars'>
              <div className='bar active'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
              <div className='bar'></div>
            </div>
          </div>
        </div>
        <div className='review-form'>
          <h3 className='form-title'>Viết đánh giá của riêng bạn</h3>
          <div className='div_chatluong_star'>
            <label>Chất lượng*:</label>
            <div className='rating-select'>
              {[1, 2, 3, 4, 5].map(star => (
                <span
                  key={star}
                  className={`star ${rating >= star ? 'starselected' : ''}`}
                  onClick={() => handleRating(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className='div_danhgia_input'>
            <label htmlFor=''>Tên của bạn</label>
            <input
              type='text'
              value={tenkhach}
              className='input-name'
              required
              onChange={e => setTenkhach(e.target.value)}
            />
          </div>
          <div className='div_danhgia_input'>
            <label htmlFor=''>Đánh giá danh mục</label>
            <textarea
              className='input-review'
              value={content}
              onChange={e => setcontent(e.target.value)}
              required
            ></textarea>
          </div>

          <button className='submit-btn' onClick={handlePostdanhgia}>
            Gửi
          </button>
        </div>
      </div>

      <div className='reviews'>
        {danhgias.length > 0 ? (
          danhgias.map((review, index) => (
            <div className='review-item' key={index}>
              <p className='reviewer'>
                {`${review.tenkhach} - ${moment(review.date).format(
                  'DD/MM/YYYY'
                )}`}
              </p>
              <div className='stars'>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    style={{ color: i < review.rating ? 'gold' : '#ccc' }}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className='comment'>{review.content}</p>
            </div>
          ))
        ) : (
          <div className='danhgia_no'>Không có đánh giá nào</div>
        )}
      </div>
    </div>
  )
}

export default DanhGiaLayout
