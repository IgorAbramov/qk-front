import moment from "moment"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { confirmUploadModalState, fileIdState } from "../../../atoms"
import { validateNotificationDescription, validateNotificationTitle, validateNotificationType } from "../../../utils"
import Text from "../../UI/Text/Text"
import styles from "./NotificationsItem.module.scss"

const NotificationsItem = ({ data }) => {

   const [, setConfirmUploadModal] = useRecoilState(confirmUploadModalState)
   const [, setFileId] = useRecoilState(fileIdState)

   const handleShowModal = () => {
      if (data.type === "REVIEW_UPLOAD") {
         setConfirmUploadModal(true)
         setFileId(data.subjectUuid)
      }
   }

   return (
      <div className={styles.wrapper} onClick={handleShowModal}>
         <div className={styles.left}>
            {validateNotificationType(data.type)}
            <div>
               <Text medium semiBold>{validateNotificationTitle(data.type)}</Text>
               <Text medium>{`${validateNotificationDescription(data.type).slice(0, 90).trim()}...`}</Text>
            </div>
         </div>
         <Text grey medium>{moment(data.createdAt).format("DD.MM.YYYY")}</Text>
      </div>
   )
}

export default NotificationsItem

NotificationsItem.propTypes = { data: PropTypes.object }