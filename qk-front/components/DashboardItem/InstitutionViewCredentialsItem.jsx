import moment from "moment"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { showEditCredentialsState } from "../../atoms"
import { IconAcademicCap, IconAcademicCapPerson, IconEdit, IconInfo } from "../UI/_Icon"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const InstitutionViewCredentialsItem = ({ data }) => {

   const [, setShowEditCredentials] = useRecoilState(showEditCredentialsState)

   const validateStatusStyles = () => {
      if (data.status === "ACTIVATED") return styles.activated
      if (data.status === "UPLOADED_TO_BLOCKCHAIN") return styles.uploaded
      if (data.status === "WITHDRAWN") return styles.withdrawn
      // if (data.status === "Expired") return styles.expired
   }

   const validateStatus = () => {
      if (data.status === "ACTIVATED") return "Activated"
      if (data.status === "UPLOADED_TO_BLOCKCHAIN") return "Uploaded"
      if (data.status === "WITHDRAWN") return "Withdrawn"
      // if (data.status === "Expired") return "Expired"
   }
   
   return (
      <div className={`${styles.wrapper} ${styles.viewWrapper}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper}`} style={{ borderRadius: "15px 15px 15px 15px" }}>
            <div className={`${styles.itemWrapper} ${styles.viewName}`}>
               <IconAcademicCapPerson/>
               <div>
                  <Text bold>{data.graduatedName}</Text>
               </div>
            </div>
            <div className={styles.itemWrapper}>
               <IconAcademicCap/>
               <div className={styles}>
                  <Text bold>{data.qualificationName}</Text>
               </div>
            </div>
            <div className={`${styles.status} ${validateStatusStyles()}`}>
               <IconInfo/>
               <Text bold>{validateStatus()}</Text>
            </div>
            <Text bold>{moment.utc(data.updatedAt).format("HH:mm DD/MM/YYYY")}</Text>
            <div className={`${styles.actions} ${styles.viewActions}`}>
               <IconEdit onClick={() => setShowEditCredentials(true)}/>
            </div>
         </div>
      </div>
   )
}

export default InstitutionViewCredentialsItem

InstitutionViewCredentialsItem.propTypes = { data: PropTypes.object.isRequired }