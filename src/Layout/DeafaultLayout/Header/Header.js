/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react'
import './Header.scss'
import { useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Header = () => {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [itemCount, setItemCount] = useState(0)

  const updateCartCount = () => {
    const cart = localStorage.getItem('cart')
    setItemCount(cart ? JSON.parse(cart).length : 0)
  }

  useEffect(() => {
    updateCartCount()

    const handleCartChange = () => updateCartCount()
    window.addEventListener('cartUpdated', handleCartChange)

    return () => {
      window.removeEventListener('cartUpdated', handleCartChange)
    }
  }, [])

  const navigate = useNavigate()

  const handleSearch = () => {
    if (searchKeyword.trim() !== '') {
      navigate(`/search/${searchKeyword}`)
    }
  }

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }
  const handelCart = e => {
    e.preventDefault()
    if (itemCount === 0) {
      toast.warning('Chưa có đơn hàng nào trong giỏ hàng!', {
        position: 'top-right',
        autoClose: 3000
      })
      return
    }
    navigate('/cart')
  }

  return (
    <div className='header-container'>
      <ToastContainer />
      <a onClick={e => handelCart(e)}>
        <div className='cart-container'>
          <FontAwesomeIcon icon={faBagShopping} className='cart-icon' />
          {<span className='cart-badge'>{itemCount}</span>}
        </div>
      </a>
      <div className='div_timkiem_don'>
        <div className='header-right'>
          <input
            type='text'
            className='search-input'
            placeholder='Tìm kiếm đơn hàng'
            value={searchKeyword}
            onChange={e => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button className='search-button' onClick={handleSearch}>
            <FaSearch
              style={{
                color: '#fff',
                fontSize: '20px',
                display: 'inline-block'
              }}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header
