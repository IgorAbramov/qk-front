import Image from "next/image"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import schoolLogo from "../../assets/images/mockUniLogo.webp"
import { viewCertificateModalState } from "../../atoms"
import { validateStatus, validateStatusStyles } from "../../utils"
import { IconAcademicCap, IconCertificate, IconInfo, IconWarning } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import HoverInfo from "../UI/HoverInfo/HoverInfo"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const StudentViewCredentialsItem = ({ data }) => {

   const [, setViewCertificateModal] = useRecoilState(viewCertificateModalState)

   const handleViewCertificate = () => {
      setViewCertificateModal(true)
   }

   const handleOpenPaymentModal = () => {
      console.log("ok")
   }

   return (
      <div className={`${styles.wrapper} ${styles.viewWrapper} ${styles.student}`}
           style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper} ${styles.student}`}
              style={{ borderRadius: "15px 15px 15px 15px" }}>
            <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                   objectFit="contain" src={schoolLogo} width={196}/>
            <div className={styles.itemWrapper}>
               <IconAcademicCap/>
               <div className={styles}>
                  <Text bold>{data.qualificationName}</Text>
               </div>
            </div>

            <div className={`${styles.status} ${validateStatusStyles(data.status, true)}`}
                 onClick={data.status === "UPLOADED_TO_BLOCKCHAIN" ? handleOpenPaymentModal : null}>
               {data.status === "UPLOADED_TO_BLOCKCHAIN"
                  ? <>
                     <div className={styles.iconWrapper}>
                        <IconWarning/>
                        <HoverInfo status={data.status}/>
                     </div>
                     <Text bold>{validateStatus(data.status, true)}</Text>
                  </>
                  : <>
                     <div className={styles.iconWrapper}>
                        <IconInfo/>
                        <HoverInfo status={data.status}/>
                     </div>
                     <Text bold>{validateStatus(data.status, true)}</Text>
                  </>}
            </div>
            <div className={styles.actions}>
               <Button blue thin disabled={data.status !== "ACTIVATED"}
                       onClick={handleViewCertificate}>
                  <div className={styles.buttonRow}>
                     <IconCertificate/>
                     <Text semiBold>Certificate</Text>
                  </div>
               </Button>
            </div>
         </div>
      </div>
   )
}

export default StudentViewCredentialsItem

StudentViewCredentialsItem.propTypes = { data: PropTypes.object.isRequired }