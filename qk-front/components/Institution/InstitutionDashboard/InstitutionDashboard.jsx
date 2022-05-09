import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./InstitutionDashboard.module.scss"

const InstitutionDashboard = () => {
   return (
      <>
         <div className={styles.searchWrapper}>
            <Text search>Showing <span>5</span> from <span>5</span> results</Text>
            <Input search/>
         </div>
      </>
   )
}

export default InstitutionDashboard