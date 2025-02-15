import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './DangNhapLayout.scss'
import { useState } from 'react'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

function DagNhapLayout () {
  const [ispassword, setispassword] = useState(true)
  return (
    <div className='login_container'>
      <div className='login_main'>
        <div className='login_left'>
          <video autoPlay={true} muted loop playsInline>
            <source src='/video.mp4' type='video/mp4' />
            Trình duyệt của bạn không hỗ trợ video.
          </video>
        </div>
        <div className='login_right'>
          <div className='login_logo'>
            <img src='/logo2.png' alt='' />
            <h2>WELCOME BACK!</h2>
          </div>
          <div className='login_input'>
            <label htmlFor=''>Tài khoản</label>
            <div className='divinput_login'>
              <input type='text' placeholder='Nhập tài khoản' />
            </div>
          </div>
          <div className='login_input'>
            <label htmlFor=''>Mật khẩu</label>
            <div className='divinput_login'>
              <input
                type={ispassword ? 'password' : 'text'}
                placeholder='Nhập mật khẩu'
              />
              <FontAwesomeIcon
                icon={ispassword ? faEyeSlash : faEye}
                onClick={() => setispassword(!ispassword)}
              />
            </div>
          </div>
          <div className='login_button'>
            <button>Đăng nhập</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DagNhapLayout
