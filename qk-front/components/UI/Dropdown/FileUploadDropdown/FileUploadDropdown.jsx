import { useEffect, useRef, useState } from "react"

import { useRecoilValue } from "recoil"

import { credentialsState } from "../../../../atoms"
import styles from "./FileUploadDropdown.module.scss"

const FileUploadDropdown = ({ handleOption, valueIndex }) => {

   const credentialsData = useRecoilValue(credentialsState)
   const [showDropdown, setShowDropdown] = useState(false)
   const [optionDropdown, setOptionDropdown] = useState("")

   const handleShowDropdown = () => {
      setShowDropdown(prev => !prev)
   }

   const handleChooseOptionDropdown = e => {
      setShowDropdown(false)
      setOptionDropdown(e.target.innerText)
      handleOption(e, valueIndex)
   }

   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (showDropdown && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setShowDropdown(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [showDropdown])

   return (
      <div className={styles.dropdown}>
         <button className={styles.button} onClick={handleShowDropdown}>
            <span style={{ color: showDropdown ? "#e5e5e5" : "" }}>
               {optionDropdown ? optionDropdown : "Choose"}
            </span>
            <svg fill="none" height="20" viewBox="0 0 20 20"
                 width="20" xmlns="http://www.w3.org/2000/svg">
               <path d="M15.5 7.5L10.5 12.5L5.5 7.5" stroke="#262626" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="2"/>
            </svg>
         </button>
         <div ref={outsideClickRef} className={styles.content} style={{ display: showDropdown ? "block" : "none" }}>
            <ul>
               {credentialsData.map((credential, index) => (
                  <li key={credential.value} value={credential.value}
                      onClick={(e) => handleChooseOptionDropdown(e, index)}>{credential.title}</li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default FileUploadDropdown

FileUploadDropdown.propTypes = {}