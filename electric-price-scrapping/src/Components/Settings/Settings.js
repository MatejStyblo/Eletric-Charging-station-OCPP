import React from 'react'
import Logout from "./Logout/Logout"
import UserInfo from "./UserInfo/UserInfo"
const Settings = () => {
    
  return (
    <div>
        <h1 className='settings-title'>Nastavení</h1>
        <Logout/>
        <UserInfo/>
    </div>
  )
}

export default Settings