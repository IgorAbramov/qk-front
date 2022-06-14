import { useState } from "react"

import { useRecoilState } from "recoil"

import { showShareModalState } from "../../../atoms"
import { IconClose, IconLock, IconShare, IconShowDropdown } from "../_Icon"
import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Text from "../Text/Text"
import ModalSteps from "./_ModalSteps/ModalSteps"
import styles from "./Modal.module.scss"

const ShareModal = () => {

   const [, setShowShareModal] = useRecoilState(showShareModalState)
   const [step, setStep] = useState(1)
   const [showExpires, setShowExpires] = useState(false)

   /**
    * Close modal handler.
    */
   const closeModal = () => {
      setShowShareModal(false)
   }

   /**
    * Allows to close modal by clicking outside.
    */
   const closeModalOutside = event => {
      closeModal()
      event.stopPropagation()
   }

   const handleShopExpiresDropdown = event => {
      event.preventDefault()
      setShowExpires(prevState => !prevState)
   }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={`${styles.wrapper}`} onClick={event => event.stopPropagation()}>
            <IconClose onClick={closeModal}/>
            <ModalSteps step={step} totalSteps={2}/>
            <div className={`${styles.top}`}>
               <div className={`${styles.wrapperInner} ${styles.share}`}>
                  <Heading blue h2 modal>Review your email</Heading>
                  <Text grey>You are sharing credentials. Please review your email and shared data.</Text>
               </div>
               <form className={styles.emailForm}>
                  <div className={styles.shareEmail}>
                     <input placeholder="To:" type="text"/>
                     <div className={styles.message}>
                        <Text medium>Dear, <span><input type="text"/></span></Text>
                        <Text medium><span>John Reed</span> has chosen to share their authenticated education credentials with you.</Text>
                        <Text medium>QualKey uses blockchain technology to provide secure and instant credential verification.</Text>
                        <Text medium>Please follow the link below to view the credentials. This link will expire in 48 hours.</Text>
                        <div className={styles.mockButton}><Text medium>Link to shared credentials</Text></div>
                        <Text medium>Kind Regards,</Text>
                        <Text medium>Qualkey</Text>
                     </div>
                  </div>
                  <div className={styles.adjust}>
                     <Button blue thin>
                        <div className={styles.rowButton}>
                           <IconLock/>
                           <Text>Adjust shared data</Text>
                        </div>
                     </Button>
                     <div className={styles.expires}>
                        <Text semiBold>Link expires in:</Text>
                        <div className={styles.expiresWrapper}>
                           <button onClick={handleShopExpiresDropdown}>
                              <div className={styles.rowButton}>
                                 <Text>Choose</Text>
                                 <IconShowDropdown/>
                              </div>
                           </button>
                           <div className={styles.showExpires} style={{ display: showExpires ? "block" : "" }}>
                              <ul>
                                 <li>48 Hours</li>
                                 <li>14 Days</li>
                                 <li>Never</li>
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
                  <Button blue thin>
                     <div className={styles.rowButton}>
                        <IconShare/>
                        <Text>Share Credentials</Text>
                     </div>
                  </Button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default ShareModal