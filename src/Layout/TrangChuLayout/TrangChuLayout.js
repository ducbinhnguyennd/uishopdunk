import { useState, useEffect } from 'react'
import './TrangChuLayout.scss'
import Loading from '../../components/Loading/Loading'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import Carousel from '../Carousel/Carousel'
import ThanhDinhHuong from '../../components/ThanhDinhHuong/ThanhDinhHuong'
import { Helmet } from 'react-helmet'

function TrangChuLayout () {
  const [data, setdata] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const location = useLocation()

  const fetchdata = async () => {
    try {
      setIsLoading(true)
      const response = await fetch('https://demovemaybay.shop/sanpham')
      const data = await response.json()
      if (response.ok) {
        setdata(data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchdata()
  }, [])
  const convertToSlug = str => {
    const slug = str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '')
      .replace(/--+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '')

    return slug.charAt(0).toUpperCase() + slug.slice(1)
  }
  return (
    <div>
      <Helmet>
        <title>{'Đồ Thờ Đồ Gỗ Công Hương - Ý Yên Nam Định'}</title>
        <meta
          name='description'
          content={
            'Đồ Thờ Đồ Gỗ Công Hương tọa lạc tại Ngã 3 Cát Đằng, xã Yên Tiến, huyện Ý Yên, tỉnh Nam Định, nơi nổi tiếng với các sản phẩm đồ thờ và đồ gỗ mỹ nghệ cao cấp. Với truyền thống lâu đời của làng nghề Ý Yên, Nam Định, nơi đây được biết đến như một trung tâm chế tác đồ thờ, đồ gỗ với sự khéo léo, tinh tế trong từng sản phẩm.'
          }
        />
        <meta
          name='keywords'
          content={
            'Đồ Thờ Công Hương, Làng nghề Cát Đằng, Yên Tiến, Ý Yên, Nam Định, Làm Mộc, Tạc Tượng, Tu Sửa Đình Chùa, Nhà Thờ'
          }
        />
      </Helmet>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
          {location.pathname !== '/' && (
            <ThanhDinhHuong breadcrumbs={[{ label: 'Trang Chủ', link: '/' }]} />
          )}
          <Carousel />
          {data.map(item => (
            <div key={item.name}>
              <div className='title-product'>
                <p className='namesp'>{item.name}</p>
                <Link
                  to={`/san-pham/${convertToSlug(item.name)}`}
                  className='see-all'
                >
                  Xem tất cả{' '}
                  <MdKeyboardArrowRight
                    style={{
                      color: '#ffffffbe',
                      fontSize: '20px',
                      display: 'inline',
                      marginLeft: '5px'
                    }}
                  />
                </Link>
              </div>

              <div className='divsp'>
                {item.sanpham.map(sanpham => (
                  <div
                    className='divtungsp'
                    key={sanpham.name}
                    onClick={() =>
                      (window.location.href = `/chitietsanpham/${sanpham.namekhongdau}`)
                    }
                  >
                    <img className='discount-logo2' src='./logo.png' />
                    <img src={`${sanpham.image}`} alt='' />
                    <div className='name-sp'>{sanpham.name}</div>
                    <div className='original-price'>
                      Giá gốc: <span>50.000.000đ</span>
                    </div>
                    <div className='price'>
                      {sanpham.price.toLocaleString()} đ
                    </div>
                    <Link to={`/chitietsanpham/${sanpham.namekhongdau}`}>
                      <button
                        className='btnthemgiohang'
                        onClick={e => e.stopPropagation()}
                      >
                        Xem chi tiết
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default TrangChuLayout
