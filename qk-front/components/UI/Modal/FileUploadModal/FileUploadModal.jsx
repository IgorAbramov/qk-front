import { useEffect, useRef, useState } from "react"

import axios from "axios"
import { useRecoilState, useRecoilValue } from "recoil"

import { fileUploadErrorState, uploadModalState, credentialsState, dropdownSelectionListenerState } from "../../../../atoms"
import Button from "../../Button/Button"
import FileUploadDropdown from "../../Dropdown/FileUploadDropdown/FileUploadDropdown"
import Heading from "../../Heading/Heading"
import Input from "../../Input/Input"
import Text from "../../Text/Text"
import styles from "./FileUploadModal.module.scss"

const FileUploadModal = () => {

   const [credentialsFields, setCredentialsFields] = useRecoilState(credentialsState)
   const [openModal, setOpenModal] = useRecoilState(uploadModalState)
   const [fileUploadError, setFileUploadError] = useRecoilState(fileUploadErrorState)
   const dropdownSelectionListener = useRecoilValue(dropdownSelectionListenerState)
   const [fileName, setFileName] = useState(null)
   const [parsedValuesFromUpload, setParsedValuesFromUpload] = useState([])
   // const [mappingFromFile, setMappingFromFile] = useState({})
   const [mappingToValues, setMappingToValues] = useState([])

   // console.log(mappingFromFile)

   const uploadFileToClient = async e => {
      if (e.target.files[0]?.type !== "text/csv") {
         setFileUploadError("Unsupported file type")
      } else {
         setFileName(e.target.files[0].name)
         const formData = new FormData()
         formData.append("uploadedFile", e.target.files[0])
         try {
            const response = await axios.post("/api/file-upload", formData, { headers: { "Content-type": "multipart/form-data" } })
            setParsedValuesFromUpload(response.data)
         } catch (error) {
            setFileUploadError(error?.response?.statusText)
         }
      }
   }

   console.log(mappingToValues, "mappingToValues")
   // console.log(credentialsFields, "credentialsFields")
   // console.log(mappingToValues, "mappingToValues")

   const handleOption = (e, index) => {
      mappingToValues[index] = {
         title: e.target.innerText,
         value: e.target.getAttribute("value")
      }
      setMappingToValues([...mappingToValues])
   }

   useEffect(() => {
      setCredentialsFields(fields => fields.filter(value => !mappingToValues.find(mappingValue => (value.value === mappingValue.value)))) //TODO: Make proper object filtering!
   }, [dropdownSelectionListener.length])

   const resetDropdown = index => {
      //TODO: Add here chosen mappingValues[index] to array of dropdown values and activate dropdown.
      mappingToValues[index] = undefined
      setMappingToValues([...mappingToValues])
   }

   // const sendDataToServer = async e => {
   //    const test = parsedValuesFromUpload.map(value => {
   //       return { key: value }
   //    })
   //    console.log(test)
   // }

   // useEffect(() => {
   //    if (parsedValuesFromUpload.length !== 0) {
   //       const mapping = {}
   //       for (const key of parsedValuesFromUpload) {
   //          mapping[key] = ""
   //       }
   //       setMappingFromFile(mapping)
   //    }
   // }, [parsedValuesFromUpload.length])

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

   useEffect(() => {
      setFileUploadError("")
   }, [openModal, parsedValuesFromUpload])

   return (
      <div className={styles.modal}>
         <div ref={outsideClickRef} className={styles.wrapper}
              style={{ height: parsedValuesFromUpload.length ? "90%" : "" }}>
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
            <div className={styles.wrapperInner} style={{ height: parsedValuesFromUpload.length ? "100%" : "" }}>
               <div className={styles.top}>
                  <Heading blue h2 modal>Multi-Upload</Heading>
                  <Text modal>You have confirmed the list of credentials
                     are ready to be authenticated.</Text>
                  <Input fileUpload fileName={fileName} inputName="csvUploader"
                         isFileUploaded={!!parsedValuesFromUpload.length}
                         onChange={uploadFileToClient}/>
                  {fileUploadError && <Text error>{fileUploadError}</Text>}
               </div>
               {
                  !!parsedValuesFromUpload.length
                  && <>
                     <div className={styles.middle}>
                        {parsedValuesFromUpload.map((value, index) => (
                           <div key={value} className={styles.row}>
                              <Input readOnly text inputName={value}
                                     placeholder={value}
                                     value={value}/>
                              <div className={styles.end}>
                                 <FileUploadDropdown key={value} handleOption={handleOption}
                                                     valueIndex={index}/>
                                 <svg fill="none" height="10" viewBox="0 0 9 10"
                                      width="9"
                                      xmlns="http://www.w3.org/2000/svg" onClick={() => resetDropdown(index)}>
                                    <path d="M1.12109 8.53516L8.19216 1.46409" stroke="#737373" strokeLinecap="round"
                                          strokeLinejoin="round" strokeWidth="1.5"/>
                                    <path d="M1.12109 1.46484L8.19216 8.53591" stroke="#737373" strokeLinecap="round"
                                          strokeLinejoin="round" strokeWidth="1.5"/>
                                 </svg>
                              </div>
                           </div>
                        ))}
                     </div>
                     <Button blue>
                        <svg fill="none" height="32" viewBox="0 0 32 32"
                             width="32" xmlns="http://www.w3.org/2000/svg">
                           <path d="M12 26H9C7.14348 26 5.36301 25.2625 4.05025 23.9497C2.7375 22.637 2 20.8565 2 19C2 17.1435 2.7375 15.363 4.05025 14.0503C5.36301 12.7375 7.14348 12 9 12C9.58566 11.9998 10.1692 12.0711 10.7375 12.2125"
                              stroke="white" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M10 16C10 14.4155 10.3765 12.8536 11.0986 11.4432C11.8206 10.0327 12.8675 8.81406 14.1529 7.88758C15.4383 6.96109 16.9255 6.35333 18.4919 6.11437C20.0583 5.87541 21.6591 6.0121 23.1623 6.51317C24.6655 7.01424 26.0281 7.86534 27.1378 8.99635C28.2476 10.1274 29.0727 11.5059 29.5451 13.0183C30.0176 14.5308 30.1239 16.1338 29.8552 17.6954C29.5866 19.257 28.9507 20.7324 28 22"
                              stroke="white" strokeLinecap="round"
                              strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M14.7617 20.2375L18.9992 16L23.2367 20.2375" stroke="white" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                           <path d="M19 26V16" stroke="white" strokeLinecap="round"
                                 strokeLinejoin="round" strokeWidth="1.5"/>
                        </svg>
                        <span>Upload Now</span>
                     </Button>
                  </>
               }
            </div>
         </div>
      </div>
   )
}

export default FileUploadModal