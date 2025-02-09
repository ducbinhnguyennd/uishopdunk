import { useState, useEffect } from 'react'
import './TrangChuLayout.scss'
import Loading from '../../components/Loading/Loading'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { Link, useLocation } from 'react-router-dom'
import Carousel from '../Carousel/Carousel'
import ThanhDinhHuong from '../../components/ThanhDinhHuong/ThanhDinhHuong'
import { Helmet } from 'react-helmet'
import ProductCard from '../../components/ProductItem/ProductCard'
function TrangChuLayout() {
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
        <title>{'Shopdunk'}</title>


      </Helmet>
      {isLoading && <Loading />}
      {!isLoading && (
        <div>
          {location.pathname !== '/' && (
            <ThanhDinhHuong breadcrumbs={[{ label: 'Trang Chủ', link: '/' }]} />
          )}
          <Carousel />
          {data.map((item) => (
        <div key={item.name}>
 
          <div className="namesp">{item.name}</div>

          <div className="divsp">
            {item.sanpham.slice(0, 4).map((sanpham) => (
              <ProductCard key={sanpham.name} sanpham={sanpham} />
            ))}
          </div>

  
          <div className="title-product">
            <Link to={`/san-pham/${convertToSlug(item.name)}`} className="see-all">
              Xem tất cả{" "}
              <MdKeyboardArrowRight
                style={{
                  color: "#0066CC",
                  fontSize: "20px",
                  display: "inline",
                  marginLeft: "5px",
                }}
              />
            </Link>
          </div>
        </div>
      ))}
        </div>
      )}
    </div>
  )
}

export default TrangChuLayout
