import { TheLoaiLayout } from '../TheLoaiLayout'
import { BlogLayout } from '../BlogLayout'
import { useState } from 'react'
import './AdminLayout.scss'
function TrangChuLayout () {
  const [isOpen, setisOpen] = useState(true)
  return (
    <div>
      <div className='tabbtn'>
        <button onClick={() => setisOpen(true)} className={isOpen ? 'btntab active' : 'btntab'}>Thể loại</button>
        <button onClick={() => setisOpen(false)} className={!isOpen ? 'btntab active' : 'btntab'}>Blog</button>
      </div>
      {isOpen ? <TheLoaiLayout /> : <BlogLayout />}
    </div>
  )
}

export default TrangChuLayout
