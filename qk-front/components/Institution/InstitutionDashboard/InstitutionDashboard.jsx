import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import InstitutionDashboardItem from "../InstitutionDashboardItem/InstitutionDashboardItem"
import styles from "./InstitutionDashboard.module.scss"

const mockData = [
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Andrew Feinstein",
      diploma: "BA Computer Science and Engineering",
      status: "Uploaded",
      lastModified: 1652112363,
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Brian Herrera",
      diploma: "MA International Relations",
      status: "Activated",
      lastModified: 1652112363,
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Isabelle Portre",
      diploma: "BA Computer Science and Engineering",
      status: "Withdrawn",
      lastModified: 1652112363,
   },
   {
      auditName: "L. Wade",
      auditFrom: "University Registrar",
      student: "Adrian Portre",
      diploma: "MSc Data Science in Business",
      status: "Expired",
      lastModified: 1652112363,
   },
]

const InstitutionDashboard = () => {
   return (
      <>
         <div className={styles.searchWrapper}>
            <Text search>Showing <span>5</span> from <span>5</span> results</Text>
            <Input search/>
         </div>
         {/*<div className={styles.headerWrapper}>*/}
         {/*   <Text grey>Audit</Text>*/}
         {/*   <Text grey>Student Information</Text>*/}
         {/*   <Text grey>Status</Text>*/}
         {/*   <Text grey>Last Modified</Text>*/}
         {/*   <Text grey>Actions</Text>*/}
         {/*/!*</div>*!/ TODO: How to correctly display them CSS?*/}
         {mockData.map(data => (
            <InstitutionDashboardItem key={data.student} data={data}/>
         ))}
      </>
   )
}

export default InstitutionDashboard