import StudentDashboardItem from "../../DashboardItem/StudentDashboardItem"
import { IconShare } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./StudentDashboard.module.scss"

const StudentDashboard = ({ data }) => {
   return (
      <>
         <div className={styles.searchShareWrapper}>
            <Input type={"search"}/>
            <Button blue disabled thin>
               <div className={styles.buttonRow}>
                  <IconShare/>
                  <Text bold>Share Selected</Text>
               </div>
            </Button>
         </div>
         <div className={styles.contentWrapper}>
            {data.map(data => (
               <StudentDashboardItem key={data.uuid} data={data}/>
            ))}
         </div>
      </>
   )
}

export default StudentDashboard