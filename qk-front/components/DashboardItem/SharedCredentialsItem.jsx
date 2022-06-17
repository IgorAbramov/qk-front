import { useState } from "react"

import Image from "next/image"
import { useRecoilState } from "recoil"

import schoolLogo from "../../assets/images/mockUniLogo.webp"
import { viewCertificateModalState } from "../../atoms"
import SharedCredentialsInfo from "../CredentialsInfo/SharedCredentialsInfo"
import { IconAcademicCap, IconCertificate, IconHideDropdownBig, IconShowDropdownBig } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import ViewCertificateModal from "../UI/Modal/ViewCertificateModal"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const SharedCredentialsItem = ({ data }) => {

   const [viewCertificateModal, setViewCertificateModal] = useRecoilState(viewCertificateModalState)
   
   const [showData, setShowData] = useState(false)

   /**
    * Show credential data handler
    */
   const handleExpandData = () => {
      setShowData(prevState => !prevState)
   }

   return (
      <>
         <div className={`${styles.wrapper} ${styles.viewWrapper} ${styles.student}`}
              style={{ borderRadius: "15px 15px 15px 15px" }}>
            <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper} ${styles.shared}`}
                 style={{ borderRadius: showData ? "15px 15px 0 0" : "15px 15px 15px 15px" }}>
               <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                      objectFit="contain" src={schoolLogo} width={196}/>
               <div className={styles.itemWrapper}>
                  <IconAcademicCap/>
                  <div className={styles}>
                     <Text bold>{data.qualificationName}</Text>
                  </div>
               </div>
               <div className={`${styles.actions} ${styles.shared}`}>
                  <IconCertificate onClick={() => setViewCertificateModal(true)}/>
                  <Button blue thin
                          onClick={handleExpandData}>
                     <div className={`${styles.buttonRow} ${styles.shared}`}>
                        {!showData ? <IconHideDropdownBig/> : <IconShowDropdownBig/>}
                        <Text semiBold>Certificate</Text>
                     </div>
                  </Button>
               </div>
            </div>
         </div>
         {showData ? <SharedCredentialsInfo data={data}/> : null}
         {viewCertificateModal && <ViewCertificateModal data={data}/>}
      </>
   )
}

export default SharedCredentialsItem