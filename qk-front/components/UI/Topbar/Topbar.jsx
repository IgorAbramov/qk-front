import { useEffect, useRef, useState } from "react"

import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMediaQuery } from "react-responsive"
import { useRecoilValue } from "recoil"

import avatar from "../../../assets/images/avatarMock.webp"
import bell from "../../../assets/images/bell.svg"
import { queryShareState } from "../../../atoms"
import { processingUrl } from "../../../utils"
import NotificationWrapper from "../../Notification/NotificationWrapper/NotificationWrapper"
import { IconAcademicCap, IconArrowLeft, IconBackLeft, IconHideDropdownBig, IconLogout, IconMessage, IconSettings } from "../_Icon"
import BurgerButton from "../BurgerButton/BurgerButton"
import Text from "../Text/Text"
import styles from "./Topbar.module.scss"

const Topbar = ({ institution, userData, employer, payment, notificationsData }) => {

   const { pathname, push } = useRouter()

   const shareState = useRecoilValue(queryShareState)

   console.log(userData)

   const checkIfPathIncludesView = () => {
      if (pathname === "/dashboard/[uuid]") return "uuid"
      else if (pathname.includes("settings")) return "settings"
      else if (pathname.includes("help")) return "help"
      else if (pathname.includes("contact")) return "contact"
      else if (pathname.includes("about")) return "about"
      else if (pathname.includes("policy")) return "policy"
      else if (pathname.includes("feedback")) return "feedback"
   }

   const isScreenLg = useMediaQuery({ query: "(max-width: 991px)" })
   const isScreenMd = useMediaQuery({ query: "(max-width: 767px" })

   const [lgMarginLeft, setLgMarginLeft] = useState("")
   const [mdMarginLeft, setMdMarginLeft] = useState("")

   /**
    * Logout handler.
    */
   const handleLogout = () => {
      axios.post(`${processingUrl}/auth/logout`, {}, { withCredentials: true })
         .then(response => {
            push(response.data)
         })
         .catch(error => console.log(error))
   }

   /**
    * Dynamic adaptive layout handler.
    */
   useEffect(() => {
      setMdMarginLeft("2.5rem")
      setLgMarginLeft("")
   }, [isScreenMd])

   /**
    * Dynamic adaptive layout handler.
    */
   useEffect(() => {
      setLgMarginLeft("3.5rem")
      setMdMarginLeft("")
   }, [isScreenLg])

   const [showMenu, setShowMenu] = useState(false)
   const [showNotifications, setShowNotifications] = useState(false)

   /**
    * Menu display handler.
    */
   const handleShowMenu = () => {
      setShowMenu(prevState => !prevState)
   }

   /**
    * Notification display handler.
    */
   const handleShowNotifications = () => {
      setShowNotifications(prevState => !prevState)
   }

   /**
    * Allows to close sidebar on click outside.
    */
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
      <div className={styles.topbar} style={{ justifyContent: checkIfPathIncludesView() ? "space-between" : "" }}>
         {checkIfPathIncludesView() && <div className={styles.routes}>
            {!employer
               ? <Link href="/dashboard">
                  <a>
                     <Text grey>Dashboard</Text>
                  </a>
               </Link>
               : <Link href={`/share/${shareState.uuid}?password=${shareState.password}`}>
                  {/*TODO: Should be dynamic link*/}
                  <a>
                     <Text grey>Shared Credentials</Text>
                  </a>
               </Link>}
            <IconArrowLeft/>
            {
               checkIfPathIncludesView() === "uuid"
                  ? <Text>View Credentials</Text>
                  : checkIfPathIncludesView() === "settings"
                     ? <Text>Settings</Text>
                     : checkIfPathIncludesView() === "help"
                        ? <Text>Help & FAQ</Text>
                        : checkIfPathIncludesView() === "contact"
                           ? <Text>Contact Us</Text>
                           : checkIfPathIncludesView() === "about"
                              ? <Text>About Us</Text>
                              : checkIfPathIncludesView() === "policy"
                                 ? <Text>Privacy Policy</Text>
                                 : checkIfPathIncludesView() === "feedback"
                                    ? <Text>Give Feedback</Text>
                                    : null
            }
         </div>}
         {checkIfPathIncludesView() && isScreenLg
            ? <div className={styles.backRow} style={{ marginLeft: lgMarginLeft || mdMarginLeft }}
                   onClick={() => push("/dashboard")}>
               <IconBackLeft/>
               <Text>Back</Text>
            </div>
            : checkIfPathIncludesView() && isScreenMd
               ? <div className={styles.backRow} style={{ marginLeft: lgMarginLeft || mdMarginLeft }}
               onClick={() => push("/dashboard")}>
                  <IconBackLeft/>
                  <Text>Back</Text>
               </div>
               : <BurgerButton style={{ marginLeft: lgMarginLeft || mdMarginLeft }}/>}
         {!employer && !payment ? <div className={styles.right}>
            <div className={styles.imageWrapperNotification} onClick={handleShowNotifications}>
               <Image alt="bell" layout="fill" quality={100}
                      src={bell}/>
               {notificationsData?.length ?
                  <span className={styles.notification}>{notificationsData.length}</span> : null}
               <NotificationWrapper notificationsData={notificationsData} setShow={setShowNotifications}
                                    show={showNotifications}/>
            </div>
            {institution && userData.institution.logoUrl ? <div className={styles.imageWrapperLogo}>
               <Image alt="uni" className={styles.logo} layout="fill"
                      objectFit={"contain"}
                      quality={100} src={userData.institution.logoUrl}/>
            </div> : null}
            <div className={styles.userWrapper} onClick={handleShowMenu}>
               <div className={styles.imageWrapperUser}>
                  <Image alt="user" className={styles.user} layout="fill"
                         quality={100} src={avatar}/>
               </div>
               {userData?.firstName && userData?.lastName ? <Text semiBold>{userData.firstName[0]}. {userData.lastName}</Text> : null}
               <IconHideDropdownBig/>
               <div ref={outsideClickRef} className={styles.menu} style={{ display: showMenu ? "block" : "none" }}>
                  <ul>
                     <Link href="/dashboard">
                        <a>
                           <li>
                              <IconAcademicCap/>
                              <Text>Dashboard</Text>
                           </li>
                        </a>
                     </Link>
                     <Link href="/settings">
                        <a>
                           <li>
                              <IconSettings/>
                              <Text>Settings</Text>
                           </li>
                        </a>
                     </Link>
                     <Link href="/feedback">
                        <a>
                           <li>
                              <IconMessage/>
                              <Text>Give feedback</Text>
                           </li>
                        </a>
                     </Link>
                     <li onClick={handleLogout}>
                        <IconLogout/>
                        <Text>Log out</Text>
                     </li>
                  </ul>
               </div>
            </div>
         </div> : null}
      </div>
   )
}

export default Topbar