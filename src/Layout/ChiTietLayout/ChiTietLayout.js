/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './ChiTietLayout.scss'
import { CiDeliveryTruck } from 'react-icons/ci'
import { TfiReload } from 'react-icons/tfi'
import { AiOutlineDollar } from 'react-icons/ai'
import { FiLifeBuoy } from 'react-icons/fi'
import { SiZalo } from 'react-icons/si'
import { IoMdCall } from 'react-icons/io'
import CategoryList from '../../components/ListTheLoai/CategoryList'
import ListBlog from '../../components/ListBlog/ListBlog'
import ThanhDinhHuong from '../../components/ThanhDinhHuong/ThanhDinhHuong'
import { Helmet } from 'react-helmet'

const ChiTietLayout = () => {
  const { tieude } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [mausac, setMausac] = useState([])
  const [mausac1, setMausac1] = useState([])


  const fetchmausac = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/getmausacrieng/${tieude}`
      )
      if (response.ok) {
        const data = await response.json()
        setMausac(data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const fetchProduct = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `http://localhost:3005/chitietsanpham/${tieude}`
      )
      const data = await response.json()
      if (response.ok) {
        setProduct(data)
        console.log(data)
      } else {
        console.error('Không tìm thấy sản phẩm')
      }
    } catch (error) {
      console.error('Lỗi khi gọi API:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchmausac()
    fetchProduct()
  }, [tieude])

  if (isLoading) {
    return <p>Đang tải dữ liệu...</p>
  }

  if (!product) {
    return <p>Không tìm thấy sản phẩm!</p>
  }

  return (
    <div className='container-chitiet'>
      <Helmet>
        <title>{product.name} - Shopdunk</title>
      </Helmet>
      <ThanhDinhHuong
        breadcrumbs={[
          { label: 'Trang Chủ', link: '/' },
          { label: product.name, link: `/chitietsanpham/${tieude}` }
        ]}
      />

      <div className='main'>
        <div className='product-detail'>
          <div className='product-image'>
            <img src={product.image} alt={product.name} className='pdt-img' />
          </div>

          <div className='product-info'>
            <div className='product-name-chitiet'>{product.name}</div>
            <div className='chitietprice'>
              Giá: <span className='old-price'>50.000.000đ</span>{' '}
              <span className='current-price'>
                {product.price.toLocaleString()}
              </span>
            </div>
            <div className='mausac_chitiet'>
              {mausac.map((item, index) => (
                <div className={mausac1 === item.name ? `border_mausac border_mausac1` : `border_mausac`} key={index} onClick={()=>setMausac1(item.name)}>
                  <div style={{ backgroundColor: `${item.name}` }}>

                  </div>
                </div>
              ))}
            </div>
            <div
              className='description'
              dangerouslySetInnerHTML={{ __html: product.mota }}
            ></div>
            <div className='short-description'>
              <p>
                <span style={{ color: 'red', fontWeight: 'bold' }}>
                  Quý khách lưu ý:
                </span>{' '}
                khi lựa chọn mua bất kì sản phẩm nào nên chọn những cửa hàng có
                thương hiệu lâu năm trên thị trường , chế độ bảo hành sản phẩm ,
                mức độ hoàn thiện chi tiết sản phẩm :
              </p>
              <ul>
                <li>
                  <strong>Cửa hàng lâu năm</strong> trên thị trường vì họ đã có
                  chỗ đứng nhất định cả về chất lượng cũng như giá cả vì với họ
                  uy tín quý hơn vàng
                </li>
                <li>
                  <strong>Chế độ bảo hành dài lâu :</strong> bảo hành trước và
                  sau khi mua sản phẩm , chế độ bảo hành dài lâu , khi sử dụng
                  cũ hoặc thời tiết hanh khô nứt có thể gửi về cửa hàng bảo hành
                  miễn phí phun mới và sửa lại sản phẩm
                </li>
                <li>
                  <strong>Mức độ sản phẩm :</strong> hoàn thiên kĩ đi hết vào
                  các nét của tác phẩm , ko quật máy làm tù hết các đường nét
                  tượng như hàng chợ giá rẻ hoặc 1 số cửa hàng buôn bán chộp
                  giật , mọi đường nét được chải chuốt tinh sảo. Sử dụng sơn
                  Oseven ( O7 Paint ) dòng Sơn cao cấp nhất , hoàn thiện 2 lớp
                  lót , 1 lớp mờ nên khi nên tượng nhìn rất mòng hàng , bụi bẩn
                  có thể phụt rửa thoải mái mà không sợ bay sơn Tượng làm đủ
                  kích thước chuẩn , đúng tỉ lệ, ko co , ko độn kích tượng bằng
                  cách nâng đế tượng, giảm chiều cao và chiều sâu thân tượng
                  .Quý khách hãy thật thông thái khi lựa chọn sản phẩm để tránh
                  mua phải hàng kém chất lượng
                </li>
              </ul>
            </div>

            <div className='buttons'>
              <a
                href='https://zalo.me/0337252262'
                target='_blank'
                rel='noopener noreferrer'
                className='buy-now'
              >
                <SiZalo className='icons' />
                Zalo
              </a>
              <a href='tel:0985963784' className='contact'>
                <IoMdCall className='icons' />
                Gọi điện
              </a>
            </div>
          </div>
          <div className='category-sidebar'>
            <CategoryList />
            <ListBlog />
          </div>
        </div>
      </div>
      <div className='chitiet-footer'>
        <div className='footer-icons'>
          <div className='icon-item'>
            <CiDeliveryTruck
              style={{
                color: '#823905',
                fontSize: '35px',
                display: 'inline-block'
              }}
            />
            <p>MIỄN PHÍ VẬN CHUYỂN</p>
          </div>
          <div className='icon-item'>
            <TfiReload
              style={{
                color: '#823905',
                fontSize: '35px',
                display: 'inline-block'
              }}
            />
            <p>NHẬN ĐỔI TRẢ HÀNG</p>
          </div>
          <div className='icon-item'>
            <AiOutlineDollar
              style={{
                color: '#823905',
                fontSize: '35px',
                display: 'inline-block'
              }}
            />
            <p>GIÁ BÁN TỐT NHẤT</p>
          </div>
          <div className='icon-item'>
            <FiLifeBuoy
              style={{
                color: '#823905',
                fontSize: '35px',
                display: 'inline-block'
              }}
            />
            <p>BẢO HÀNH TRỌN ĐỜI</p>
          </div>
        </div>
        <div className='footer-image'>
          <img
            src='https://dogovinhdinh.vn/wp-content/uploads/2020/10/banner.jpg'
            alt='Logo'
            className='img-footer'
          />
        </div>
      </div>
    </div>
  )
}

export default ChiTietLayout
