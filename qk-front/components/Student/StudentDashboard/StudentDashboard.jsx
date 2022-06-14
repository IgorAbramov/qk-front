import { useState } from "react"

import { useRouter } from "next/router"
import PropTypes from "prop-types"
import { useRecoilState } from "recoil"

import { showShareModalState } from "../../../atoms"
import StudentDashboardItem from "../../DashboardItem/StudentDashboardItem"
import { IconShare } from "../../UI/_Icon"
import Button from "../../UI/Button/Button"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "./StudentDashboard.module.scss"

const StudentDashboard = ({ data }) => {

   const router = useRouter()
   const [searchValue, setSearchValue] = useState("")
   const [formShare, setFormShare] = useState([])
   const [, setShowShareModal] = useRecoilState(showShareModalState)

   /**
    * Input value handling.
    **/
   const handleInputChange = ({ target }) => {
      setSearchValue(target.value)
   }

   /**
    * Search input handling.
    **/
   const handleSubmitSearch = e => {
      if (searchValue.trim() !== "") {
         if (e.key === "Enter") {
            router.push({
               pathname: "/dashboard",
               query: { filter: searchValue }
            })
         }
      }
   }

   /**
    * Add share credential handler
    */
   const handleCredentialsToShare = id => {
      setFormShare([
         ...formShare, id
      ])
   }

   /**
    * Delete share credential handler
    */
   const deleteCredentialToShare = id => {
      const newArray = formShare.filter(item => item !== id)
      setFormShare(newArray)
   }

   const handleShowShareModal = () => {
      setShowShareModal(true)
   }

   return (
      <>
         <div className={styles.searchShareWrapper}>
            <Input type={"search"} value={searchValue} onChange={handleInputChange}
                   onKeyDown={handleSubmitSearch}/>
            <Button blue thin disabled={formShare.length === 0}
                    onClick={handleShowShareModal}>
               <div className={styles.buttonRow}>
                  <IconShare/>
                  <Text bold>Share Selected {formShare.length !== 0 ? `(${formShare.length})` : null}</Text>
               </div>
            </Button>
         </div>
         <div className={styles.contentWrapper}>
            {data.map(data => (
               <StudentDashboardItem key={data.uuid} data={data} deleteCredentialToShare={deleteCredentialToShare}
                                     handleCredentialsToShare={handleCredentialsToShare}/>
            ))}
         </div>
      </>
   )
}

export default StudentDashboard

StudentDashboard.propTypes = { data: PropTypes.array }