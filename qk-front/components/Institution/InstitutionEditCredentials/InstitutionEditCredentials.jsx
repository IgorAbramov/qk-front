import { useState } from "react"

import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./InstitutionEditCredentials.module.scss"

const InstitutionEditCredentials = ({ data }) => {

   const [inputValue, setInputValue] = useState("")

   const handleInputChange = event => {
      setInputValue(event.target.value)
   }

   //TODO: Create input logic change without mapping data from server or by adding it to specific object.

   return (
      <div className={styles.edit}>
         <Text large semiBold>Edit Credentials</Text>
         <div className={styles.wrapper}>
            <div className={styles.infoItem}>
               <Text grey>Authenticated by:</Text>
               <Input text name={data.authenticatedBy} placeholder={data.authenticatedBy}
                      value={inputValue} onChange={handleInputChange}/>
            </div>
         </div>
      </div>
   )
}

export default InstitutionEditCredentials