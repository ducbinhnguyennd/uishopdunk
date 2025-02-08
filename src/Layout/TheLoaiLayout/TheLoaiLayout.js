import React, { useEffect, useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
import CategoryList from '../../components/ListTheLoai/CategoryList'
import Loading from '../../components/Loading/Loading'
import { Link } from 'react-router-dom'
import './TheLoaiLayout.scss'
import { FaFilter } from 'react-icons/fa6'
import ListBlog from '../../components/ListBlog/ListBlog'
import ThanhDinhHuong from '../../components/ThanhDinhHuong/ThanhDinhHuong'
import { Helmet } from 'react-helmet'

const TheLoaiLayout = () => {
  const { slug } = useParams()
  const [productDetails, setProductDetails] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const filterRef = useRef(null)
  const filterButtonRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target) &&
        filterButtonRef.current &&
        !filterButtonRef.current.contains(event.target)
      ) {
        setShowFilter(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://demovemaybay.shop/san-pham/${slug}`
        )
        const data = await response.json()
        setProductDetails(data)
      } catch (error) {
        console.error('Lỗi khi tải sản phẩm:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [slug])

  if (!productDetails) return <Loading />

  return (
    <div className='theloailayout-container'>
      <Helmet>
        <title>{productDetails.nametheloai} - Đồ Thờ Công Hương</title>
        <meta name='description' content={productDetails.nametheloai} />
        <meta
          name='keywords'
          content={
            'Đồ Thờ Công Hương, Làng nghề Cát Đằng, Yên Tiến, Ý Yên, Nam Định, Làm Mộc, Tạc Tượng, Tu Sửa Đình Chùa, Nhà Thờ'
          }
        />
      </Helmet>
      <ThanhDinhHuong
        breadcrumbs={[
          { label: 'Trang Chủ', link: '/' },
          { label: productDetails.nametheloai, link: `/san-pham/${slug}` }
        ]}
      />
      <div className='theloailayout'>
        <div className='category-sidebar'>
          <CategoryList />
          <ListBlog />
        </div>

        <div
          className='filter-button'
          ref={filterButtonRef}
          onClick={() => setShowFilter(!showFilter)}
        >
          <FaFilter /> Bộ Lọc
        </div>

        <div
          className={`category-filter ${showFilter ? 'show' : ''}`}
          ref={filterRef}
        >
          <CategoryList />
        </div>
        <div className='theloaisp'>
          {loading ? (
            <Loading />
          ) : (
            productDetails.sanpham.map(product => (
              <div
                className='divtungsp'
                key={product._id}
                onClick={() =>
                  (window.location.href = `/chitietsanpham/${product.namekhongdau}`)
                }
              >
                <div className='discount'>
                  <p className='number-discount'>-14%</p>
                </div>
                <img src={`${product.image}`} alt={product.name} />
                <div className='product-name'>{product.name}</div>
                <div className='original-price'>
                  Giá gốc: <span>2000000đ</span>
                </div>
                <div className='price'>{product.price} đ</div>
                <Link to={`/chitietsanpham/${product.namekhongdau}`}>
                  <button
                    className='btnthemgiohang'
                    onClick={() => setLoading(true)}
                  >
                    Xem chi tiết
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default TheLoaiLayout
