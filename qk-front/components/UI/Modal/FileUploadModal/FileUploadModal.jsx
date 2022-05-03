import { useEffect, useRef } from "react"

import { useRecoilState } from "recoil"

import { uploadModalState } from "../../../../atoms/uploadModalState"
import FileUploadDropdown from "../../Dropdown/FileUploadDropdown/FileUploadDropdown"
import Heading from "../../Heading/Heading"
import Input from "../../Input/Input"
import Text from "../../Text/Text"
import styles from "./FileUploadModal.module.scss"

const FileUploadModal = () => {

   const [openModal, setOpenModal] = useRecoilState(uploadModalState)

   const outsideClickRef = useRef()
   useEffect(() => {
      const checkIfClickedOutside = event => {
         if (openModal && outsideClickRef.current && !outsideClickRef.current.contains(event.target)) {
            setOpenModal(false)
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [openModal])

   return (
      <div className={styles.modal}>
         <div ref={outsideClickRef} className={styles.wrapper}>
            <svg className={styles.close} fill="none" height="46"
                 viewBox="0 0 46 46"
                 width="46"
                 xmlns="http://www.w3.org/2000/svg" onClick={() => setOpenModal(false)}>
               <path d="M31.1424 31.4853C35.8287 26.799 35.8287 19.201 31.1424 14.5147C26.4561 9.82843 18.8581 9.82843 14.1718 14.5147C9.48551 19.201 9.48551 26.799 14.1718 31.4853C18.8581 36.1716 26.4561 36.1716 31.1424 31.4853Z"
                  stroke="#737373" strokeLinecap="round"
                  strokeLinejoin="round" strokeWidth="1.5"/>
               <path d="M19.1211 26.5356L26.1922 19.4646" stroke="#737373" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
               <path d="M19.1211 19.4644L26.1922 26.5354" stroke="#737373" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
            </svg>
            <div className={styles.wrapperInner}>
               <div className={styles.top}>
                  <Heading blue h2 modal>Multi-Upload</Heading>
                  <Text modal>You have confirmed the list of credentials
                     are ready to be authenticated.</Text>
                  <Input fileUpload inputName="csvUploader"/>
               </div>
               <div className={styles.middle}>
                  {["info", "ksdajfhsj", "sadfasdfas", "sadfsda", "asdfsadfkjsah"].map(test => (
                     <div key={test} className={styles.row}>
                        <Input readOnly text inputName={test}
                               placeholder={test}
                               value={test}/>
                        <FileUploadDropdown key={test}/>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </div>
   )
}

export default FileUploadModal