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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGift } from '@fortawesome/free-solid-svg-icons'

const ChiTietLayout = () => {
  const { tieude, loaisp } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [dungluong, setdungluong] = useState([])
  const [dungluong1, setdungluong1] = useState([])
  const [mausac1, setmausac1] = useState([])

  useEffect(() => {
    if (dungluong.length > 0) {
      setdungluong1(dungluong[0].name)
      if (dungluong[0].mausac.length > 0) {
        setmausac1(dungluong[0].mausac[0].name)
      }
    }
  }, [dungluong])

  const fetchdungluong = async () => {
    try {
      const response = await fetch(
        `http://localhost:3005/dungluongmay/${loaisp}`
      )
      if (response.ok) {
        const data = await response.json()
        setdungluong(data)
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
    fetchdungluong()
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
        <div className='product-image'>
          <img src={product.image} alt={product.name} className='pdt-img' />
        </div>

        <div className='product-detail'>
          <div className='product-info'>
            <div className='product-name-chitiet'>{product.name}</div>
            <div className='divratedanhgia_container'>
              <div className='divratedanhgia'>
                <div className='startdangia'>
                  <img src='/star.png' alt='' width={15} height={15} />
                  <img src='/star.png' alt='' width={15} height={15} />
                  <img src='/star.png' alt='' width={15} height={15} />
                  <img src='/star.png' alt='' width={15} height={15} />
                  <img src='/star.png' alt='' width={15} height={15} />
                </div>
                <div className='danhgiarate'>Đánh giá</div>
              </div>
            </div>
            <div className='chitietprice'>
              <span className='current-price'>
                {product.price.toLocaleString()}
              </span>
              <span className='old-price'>50.000.000đ</span>{' '}
            </div>
            <div class='note_VAT'>(Đã bao gồm VAT)</div>

            <div className='mausac_dungluong'>
              <div class='note_tieude'>Dung lượng:</div>

              <div className='dungluong_chitiet'>
                {dungluong.map((item, index) => (
                  <>
                    <div className='dungluong_container' key={index}>
                      <div
                        className={
                          dungluong1 === item.name
                            ? 'dungluong_item dungluong_item_active'
                            : 'dungluong_item'
                        }
                        onClick={() => setdungluong1(item.name)}
                      >
                        <span>{item.name}</span>
                      </div>
                    </div>
                  </>
                ))}
              </div>
              <div class='note_tieude'>Màu sắc:</div>

              <div className='mausac_chitiet'>
                {dungluong.map((item, index) => (
                  <>
                    <div className='dungluong_container' key={index}>
                      <div className='mausac_container'>
                        {dungluong1 === item.name &&
                          item.mausac.map((mau, row) => (
                            <div
                              className={
                                mausac1 === mau.name
                                  ? `border_mausac border_mausac1`
                                  : `border_mausac`
                              }
                              key={row}
                              onClick={() => setmausac1(mau.name)}
                            >
                              <div
                                style={{ backgroundColor: `${mau.name}` }}
                              ></div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
          <div className='short-des'>
            <p className='title'>
              <FontAwesomeIcon icon={faGift} />
              Ưu đãi
            </p>
            <div className='short-description'>
              <div className='short-description-header'>
                <span>
                  ( Khuyến mãi dự kiến áp dụng{' '}
                  <strong>đến 23h59 | 28/2/2025</strong>&nbsp;)
                </span>
              </div>
              <hr />
              <div style={{ display: 'flex' }}>
                <div className='short-description-content'>
                  <div className='event_price'>
                    Ưu đãi mùa yêu Valentine 10/2 - 17/2 giảm thêm
                  </div>
                  <div className='event_value'>100,000 ₫</div>
                  <div>
                    Áp dụng màu Ultramarine (Xanh Lưu Ly). Được áp dụng cùng
                    ZaloPay. Không áp dụng cùng CTKM khác.
                  </div>
                </div>
              </div>
              <hr />
              <p className='pchitiet'>
                <strong className='pstrong'>I. Ưu đãi thanh toán&nbsp;</strong>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                  Hỗ trợ trả góp
                  <strong> 0% </strong>
                  lãi suất, 0 phụ phí
                  <span style={{ color: '#007edb' }}> (xem chi tiết)</span>
                </span>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                  Giảm đến
                  <strong> 400.000đ </strong>
                  khi thanh toán qua
                  <strong> QR ZaloPay </strong>
                  (SL có hạn)
                </span>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                  Giảm đến
                  <strong> 200.000đ </strong>
                  khi thanh toán qua
                  <strong> Kredivo </strong>
                </span>
              </p>
              <p className='pchitiet'>
                <strong className='pstrong'>II. Ưu đãi mua kèm &nbsp;</strong>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                  <strong> Ốp chính hãng Apple iPhone 16 series </strong>
                  giảm
                  <strong> 100.000đ </strong>
                </span>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                  <strong> Sản phẩm Apple, phụ kiên </strong>
                  giảm đên
                  <strong> 80% </strong>
                  <span style={{ color: '#007edb' }}>(xem chi tiết)</span>
                </span>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                  Mua combo phụ kiện
                  <strong> Non Apple </strong>
                  giảm đến
                  <strong> 200.000đ </strong>
                </span>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                  Giảm đến
                  <strong> 20% </strong>
                  khi mua các gói bảo hành
                  <span style={{ color: '#007edb' }}> (xem chi tiết)</span>
                </span>
              </p>
              <p className='pchitiet'>
                <strong className='pstrong'>III. Ưu đãi khác &nbsp;</strong>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                  Duy nhất tại ShopDunk, hỗ trợ mở thẻ tín dụng Sacombank hạn
                  mức lên tới
                  <strong> 25 triệu </strong>
                  dành cho HS-SV
                </span>
              </p>
              <p className='pchitiet lh-2'>
                <span style={{ color: '#000000' }}>
                  <img src='/tichxanh.jpe' alt='' width={16} height={17} />
                   Trợ giá lên đời đến 
                  <strong> 20% </strong>
                  <span style={{ color: '#007edb' }}>(xem chi tiết)</span>
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className='category-sidebar'>
        <CategoryList />
        <ListBlog />
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
