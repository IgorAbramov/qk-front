import Image from "next/image"
import { useRecoilState } from "recoil"

import logo from "../../../../assets/images/qk-logo-text.svg"
import { uploadModalState } from "../../../../atoms"
import { IconAcademicCapPerson, IconKey, IconLogout, IconMessage, IconPlus, IconPolicy, IconQuestion } from "../../_Icon"
import Text from "../../Text/Text"
import styles from "./InstitutionSidebar.module.scss"

const InstitutionSidebar = () => {

   const [openModal, setOpenModal] = useRecoilState(uploadModalState)

   return (
      <div className={styles.sidebar}>
         <div className={styles.wrapper}>
            <div className={styles.top}>
               <div className={styles.imageWrapper}>
                  <Image alt="Qualkey" layout="fill" src={logo}/>
               </div>
               <hr className={styles.hr}/>
               <div className={styles.menu}>
                  <Text bold sidebar active={!openModal}>
                     <IconAcademicCapPerson/>
                     <span>University Dashboard</span>
                  </Text>
                  <Text bold sidebar active={openModal}
                        onClick={() => setOpenModal(true)}>
                     <IconPlus/>
                     <span>Upload</span>
                  </Text>
               </div>
            </div>
            <div className={styles.bottom}>
               <hr className={styles.hr}/>
               <div className={styles.helpers}>
                  <Text sidebar sidebarMin>
                     <IconQuestion/>
                     <span>Help & FAQ</span>
                  </Text>
                  <Text sidebar sidebarMin>
                     <IconMessage/>
                     <span>Contact Us</span>
                  </Text>
                  <Text sidebar sidebarMin>
                     <IconKey/>
                     <span>About Us</span>
                  </Text>
                  <Text sidebar sidebarMin>
                     <IconPolicy/>
                     <span>Privacy Policy</span>
                  </Text>
                  <Text sidebar sidebarMin>
                     <IconLogout/>
                     <span>Log Out</span>
                  </Text>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstitutionSidebar