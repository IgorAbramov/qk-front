import InstitutionDashboardItem from "../../DashboardItem/InstitutionDashboardItem"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./InstitutionDashboard.module.scss"

const InstitutionDashboard = ({ data }) => {
   return (
      <>
         <div className={styles.searchWrapper}>
            <Text blackSpan semiBold>Showing <span>5</span> from <span>{data.length}</span> results</Text>
            <Input type={"search"}/>
         </div>
         <div className={styles.contentWrapper}>
            {data.map(data => (
               <InstitutionDashboardItem key={data.uuid} data={data}/>
            ))}
         </div>
      </>
   )
}

export default InstitutionDashboard