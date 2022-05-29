import moment from "moment"
import PropTypes from "prop-types"

import { validateNotificationDescription, validateNotificationTitle, validateNotificationType } from "../../../utils"
import Text from "../../UI/Text/Text"
import styles from "./NotificationsItem.module.scss"

const NotificationsItem = ({ data }) => {
   
   return (
      <div className={styles.wrapper}>
         <div className={styles.left}>
            {validateNotificationType(data.type)}
            <div>
               <Text medium semiBold>{validateNotificationTitle(data.type)}</Text>
               <Text medium>{`${validateNotificationDescription(data.type).slice(0, 90).trim()}...`}</Text>
            </div>
         </div>
         <Text grey medium>{moment(data.updatedAt).format("DD.MM.YYYY")}</Text>
      </div>
   )
}

export default NotificationsItem

NotificationsItem.propTypes = { data: PropTypes.object }