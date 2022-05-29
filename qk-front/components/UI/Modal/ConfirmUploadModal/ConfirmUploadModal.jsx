import { useState } from "react"

import axios from "axios"
import { useRecoilState, useRecoilValue } from "recoil"

import { confirmUploadModalState, fileIdState } from "../../../../atoms"
import { processingUrl } from "../../../../utils"
import { IconClose, IconDownload, IconLoading, IconUpload } from "../../_Icon"
import Button from "../../Button/Button"
import Heading from "../../Heading/Heading"
import Text from "../../Text/Text"
import styles from "../Modal.module.scss"
import ModalSteps from "../ModalSteps/ModalSteps"

const ConfirmUploadModal = () => {

   const fileId = useRecoilValue(fileIdState)
   const [, setConfirmUploadModal] = useRecoilState(confirmUploadModalState)
   const [loading, setLoading] = useState(false)
   const [error, setError] = useState("")
   const [step, setStep] = useState(1)

   /**
    * Allows to close modal by clicking outside.
    */
   const closeModalOutside = event => {
      setConfirmUploadModal(false)
      event.stopPropagation()
   }

   /**
    * Download file
    */
   const handleFileDownload = async event => {
      setError("")
      setLoading(true)
      await axios.get(`${processingUrl}/upload?uuid=${fileId}`, { withCredentials: true, responseType: "blob" })
         .then(response => {
            const blob = new Blob([response.data])
            const link = document.createElement("a")
            link.href = window.URL.createObjectURL(blob)
            link.download = `${+new Date()}`
            link.click()
            setLoading(false)
            setStep(prevState => prevState + 1)
         })
         .catch(error => {
            setError(error.request.statusText)
            setLoading(false)
         })
      event.stopPropagation()
   }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={styles.wrapper} onClick={event => event.stopPropagation()}>
            <IconClose onClick={() => setConfirmUploadModal(false)}/>
            <ModalSteps step={step}/>
            <div className={`${styles.top} ${styles.confirmUpload} ${step === 2 ? styles.stepTwo : ""}`}>
               <div className={`${styles.wrapperInner} ${styles.confirmUpload}`}>
                  <Heading blue h2 modal>Please Approve Credentials</Heading>
                  <Text semiBold>New credentials uploaded and waiting for your approval</Text>
                  {
                     error
                        ? <Button errorModal onClick={handleFileDownload}>
                           <IconUpload/>
                           <span>{error}</span>
                        </Button>
                        : loading
                           ? <Button disabled>
                              <IconLoading/>
                           </Button>
                           : <Button blue thin onClick={handleFileDownload}>
                              <div className={`${styles.row} ${styles.confirmUpload}`}>
                                 <IconDownload/>
                                 <Text semiBold>Examine file</Text>
                              </div>
                           </Button>
                  }
                  {step === 2
                     ? <div className={styles.stepWrapper}>
                        <Button blue thin>
                           <div className={`${styles.row} ${styles.confirmUpload}`}>
                              <IconDownload/>
                              <Text semiBold>Approve</Text>
                           </div>
                        </Button>
                        <Button error thin>
                           <div className={`${styles.row} ${styles.confirmUpload}`}>
                              <IconDownload/>
                              <Text semiBold>Reject</Text>
                           </div>
                        </Button>
                     </div> : null }
               </div>
            </div>
         </div>
      </div>
   )
}

export default ConfirmUploadModal