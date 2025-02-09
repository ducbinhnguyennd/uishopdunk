import React, { useEffect, useState } from 'react'
import './ListBlog.scss'

const ListBlog = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetch('https://demovemaybay.shop/getblog')
      .then(response => response.json())
      .then(data => setBlogs(data))
      .catch(error => console.error('Error fetching blogs:', error))
  }, [])

  return (
    <div className='news-list'>
      <div className='news-header'>Tin tức</div>
      <div className='news-items'>
        {blogs.slice(0, 3).map(blog => (
          <div key={blog._id} className='news-item'>
            <div className='news-thumbnail'>
              <img src={"https://shopdunk.com/images/thumbs/0019069__DSC4273%20(1)_1600.jpeg"} alt={blog.tieude_blog} />
            </div>
            <div className='news-content'>
              <a
                href={`/chitietblog/${blog.tieude_khongdau}`}
                className='news-title'
                target='_blank'
                rel='noopener noreferrer'
              >
                {blog.tieude_blog}
              </a>
              <p className='news-date'>09/02/2025</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListBlog
