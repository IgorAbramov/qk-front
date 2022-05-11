import { useEffect, useRef, useState } from "react"

import Image from "next/image"

import avatar from "../../../assets/images/avatarMock.webp"
import bell from "../../../assets/images/bell.svg"
import uniLogo from "../../../assets/images/mockUniLogo.webp"
import { IconAcademicCap, IconHideDropdownBig, IconLogout, IconMessage, IconSettings } from "../_Icon"
import Text from "../Text/Text"
import styles from "./Topbar.module.scss"

const Topbar = () => {
   const [showMenu, setShowMenu] = useState(false)

   const handleShowMenu = () => {
      setShowMenu(prevState => !prevState)
   }

   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (showMenu && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setShowMenu(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [showMenu])

   return (
      <div className={styles.topbar}>
         <div className={styles.imageWrapperNotification}>
            <Image alt="bell" layout="fill"
                   src={bell}/>
            <span className={styles.notification}>3</span>
         </div>
         <div className={styles.imageWrapperLogo}>
            <Image alt="uni" className={styles.logo} layout="fill"
                   objectFit={"contain"}
                   src={uniLogo}/>
         </div>
         <div className={styles.userWrapper} onClick={handleShowMenu}>
            <div className={styles.imageWrapperUser}>
               <Image alt="user" className={styles.user} layout="fill"
                      src={avatar}/>
            </div>
            <Text semiBold>John Reed</Text>
            <IconHideDropdownBig/>
            <div ref={outsideClickRef} className={styles.menu} style={{ display: showMenu ? "block" : "none" }}>
               <ul>
                  <li>
                     <IconAcademicCap/>
                     <Text>Dashboard</Text>
                  </li>
                  <li>
                     <IconSettings/>
                     <Text>Settings</Text>
                  </li>
                  <li>
                     <IconMessage/>
                     <Text>Give feedback</Text>
                  </li>
                  <li>
                     <IconLogout/>
                     <Text>Log out</Text>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   )
}

export default Topbar