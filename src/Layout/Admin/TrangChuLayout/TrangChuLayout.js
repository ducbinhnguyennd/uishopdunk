
import './AdminLayout.scss'
import { SideBar } from './SideBar'
function TrangChuLayout ({children}) {
  
  return (
    <div className='trangchu_container'>
      <SideBar/>
      <div>
        {children}
        </div>
    </div>
  )
}

export default TrangChuLayout
