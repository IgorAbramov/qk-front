import { useEffect, useState } from "react"

import { getCookie } from "cookies-next"
import dynamic from "next/dynamic"
import PropTypes from "prop-types"
import { useRecoilValue } from "recoil"


import { showShareModalState } from "../../../atoms"
import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const ShareModal = dynamic(() => import("../../UI/Modal/ShareModal"))
const ChangePasswordModal = dynamic(() => import("../../UI/Modal/ChangePasswordModal"))

const StudentView = ({ children, userData, notificationsData, credentials }) => {

   const showShareModal = useRecoilValue(showShareModalState)
   const [changePasswordModal, setChangePasswordModal] = useState(false)

   useEffect(() => {
      if (getCookie("first_login") === true) {
         setChangePasswordModal(true)
      }
   }, [])

   return (
      <>
         <div className="main__wrapper">
            <Sidebar/>
            <Topbar notificationsData={notificationsData} userData={userData}/>
            <div className={`dashboard ${credentials ? "credentials" : ""}`}>
               {children}
            </div>
         </div>
         {showShareModal && <ShareModal/>}
         {changePasswordModal && <ChangePasswordModal/>}
      </>
   )
}

export default StudentView

StudentView.propTypes = {
   userData: PropTypes.object.isRequired,
   notificationsData: PropTypes.array,
   credentials: PropTypes.bool
}