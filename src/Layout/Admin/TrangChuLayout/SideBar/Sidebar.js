import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SideBar.scss'

function Sidebar () {
  return (
    <div className='sidebar_container'>
      <div className='sidebar_header'>
        <div className='sidebar_logo'>
          <h4>Logo</h4>
        </div>
        <div className='sidebar_toggle'>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
