import { useEffect, useState } from "react"

import { IconShare } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Text from "../../UI/Text/Text"
import InstitutionEditCredentialsItem from "../InstitutionEditCredentialsItem/InstitutionEditCredentialsItem"
import styles from "./InstitutionEditCredentials.module.scss"

const mockDataMapping = new Map([
   ["authenticatedBy", "Authenticated by"],
   ["authenticatedDate", "Authenticated date"],
   ["authenticatedTitle", "Authenticated title"],
   ["awardLevel", "Award level"],
   ["awardingInstitution", "Awarding Institution"],
   ["expiresAt", "Expires at"],
   ["graduatedAt", "Graduated at"],
   ["graduatedName", "Full name"],
   ["info", "Info"],
   ["qualificationLevel", "Qualification level"],
   ["qualificationName", "Qualification name"],
   ["studyEndedAt", "Study ended at"],
   ["studyLanguage", "Study language"],
   ["studyStartedAt", "Study started at"]
])

const InstitutionEditCredentials = ({ data }) => {

   const [savedData, setSavedData] = useState({})
   const [formData, setFormData] = useState({})
   const [, setActiveIndex] = useState(null)

   console.log(savedData, "savedData :))")
   console.log(formData, "formData")

   const handleFormChange = ({ target }, index) => {
      setActiveIndex(index)
      const { name, value } = target
      setFormData({
         ...formData,
         [name]: value
      })
   }

   const saveValue = inputName => {
      setSavedData({
         ...savedData,
         [inputName]: formData[inputName]
      })
   }

   const resetValue = inputName => {
      setSavedData({
         ...savedData,
         [inputName]: undefined
      })
      setFormData({
         ...formData,
         [inputName]: ""
      })
   }

   return (
      <div className={styles.edit}>
         <Text large semiBold>Edit Credentials</Text>
         <div className={styles.wrapper}>
            {
               Object.keys(data).map((key, index) => {
                  if (mockDataMapping.has(key)) {
                     return <InstitutionEditCredentialsItem key={key}
                                                            data={data}
                                                            formData={formData}
                                                            handleFormChange={handleFormChange}
                                                            index={index}
                                                            mapping={mockDataMapping}
                                                            mappingKey={key}
                                                            resetValue={resetValue}
                                                            savedData={savedData}
                                                            saveValue={saveValue}/>
                  }
               })
            }
         </div>
         <Button blue thin>
            <div className={styles.buttonRow}>
               <IconShare/>
               <Text semiBold>Confirm Changes</Text>
            </div>
         </Button>
      </div>
   )
}

export default InstitutionEditCredentials