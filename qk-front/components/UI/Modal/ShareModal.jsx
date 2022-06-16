import { useState } from "react"

import { useRouter } from "next/router"
import { useRecoilState, useRecoilValue } from "recoil"

import { formShareState, showShareModalState } from "../../../atoms"
import { IconClose, IconLock, IconShare, IconShowDropdown } from "../_Icon"
import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Text from "../Text/Text"
import ModalSteps from "./_ModalSteps/ModalSteps"
import styles from "./Modal.module.scss"

const shareData = [
   {
      title: "Qualification Level",
      value: "qualificationLevel"
   }, {
      title: "Award Level",
      value: "awardLevel"
   },
   {
      title: "Study Language",
      value: "studyLanguage"
   }, {
      title: "Info",
      value: "info"
   }, {
      title: "GPA Final Grade",
      value: "gpaFinalGrade"
   }, {
      title: "Study Started At",
      value: "studyStartedAt"
   }, {
      title: "Study Ended At",
      value: "studyEndedAt"
   }, {
      title: "Graduated At",
      value: "graduatedAt"
   }, {
      title: "Expires At",
      value: "expiresAt"
   }
].sort((a, b) => a.title.localeCompare(b.title))

const ShareModal = () => {

   const router = useRouter()

   const formShare = useRecoilValue(formShareState)
   const [, setShowShareModal] = useRecoilState(showShareModalState)
   const [step, setStep] = useState(1)
   const [showExpires, setShowExpires] = useState(false)
   const [shareAll, setShareAll] = useState(true)
   const [shareSelection, setShareSelection] = useState(false)
   const [toCloseModal, setToCloseModal] = useState(false)

   /**
    * Ask if modal should be closed
    */
   const handleRequestCloseModal = () => {
      setToCloseModal(true)
   }

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
      setToCloseModal(true)
      event.stopPropagation()
   }

   const handleShopExpiresDropdown = event => {
      event.preventDefault()
      setShowExpires(prevState => !prevState)
   }

   const handleShareAll = () => {
      setShareSelection(false)
      setShareAll(true)
   }

   const handleShareSelection = () => {
      setShareSelection(true)
      setShareAll(false)
   }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={`${styles.wrapper}`} onClick={event => event.stopPropagation()}>
            <IconClose onClick={handleRequestCloseModal}/>
            <ModalSteps step={step} totalSteps={3}/>
            {
               toCloseModal
                  ? <div className={`${styles.top} ${styles.shareReturn}`}>
                     <div className={`${styles.wrapperInner} ${styles.share}`}>
                        <Heading blue h2 modal>Are you sure you want to close this window?</Heading>
                        <Text>In order to share credentials, you must click on the share credentials button at the
                           bottom of the window.
                        </Text>
                     </div>
                     <div className={`${styles.stepWrapper} ${styles.approved} ${styles.request} ${styles.sureToClose}`}>
                        <Button blue thin onClick={() => setToCloseModal(false)}>No, go back</Button>
                        <Button blue thin onClick={closeModal}>Return to Dashboard</Button>
                     </div>
                  </div>
                  : step === 1
                     ? <div className={`${styles.top}`}>
                        <div className={`${styles.wrapperInner} ${styles.share}`}>
                           <Heading blue h2 modal>Review your email</Heading>
                           <Text grey>You are sharing <span>({formShare.length})</span> credentials. Please review your
                              email
                              and shared data.</Text>
                        </div>
                        <form className={styles.emailForm}>
                           <div className={styles.shareEmail}>
                              <input placeholder="To:" type="text"/>
                              <div className={styles.message}>
                                 <Text medium>Dear, <span><input type="text"/></span></Text>
                                 <Text medium><span>John Reed</span> has chosen to share their authenticated education
                                    credentials with you.</Text>
                                 <Text medium>QualKey uses blockchain technology to provide secure and instant credential
                                    verification.</Text>
                                 <Text medium>Please follow the link below to view the credentials. This link will expire
                                    in
                                    48 hours.</Text>
                                 <div className={styles.mockButton}><Text medium>Link to shared credentials</Text></div>
                                 <Text medium>Kind Regards,</Text>
                                 <Text medium>Qualkey</Text>
                              </div>
                           </div>
                           <div className={styles.adjust}>
                              <Button blue thin onClick={() => setStep(prevState => prevState + 1)}>
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
                     : step === 2
                        ? <div className={`${styles.top}`}>
                           <div className={`${styles.wrapperInner} ${styles.share}`}>
                              <Heading blue h2 modal>Adjust shared data</Heading>
                              <Text grey>Please review your shared data from your authenticated credentials. By default,
                                 you
                                 share all credential data.</Text>
                           </div>
                           <div className={styles.wrapperAdjust}>
                              <div className={styles.radio}>
                                 <div className={styles.radioItem}>
                                    <input checked={shareAll} name="shareAll"
                                           type="radio"
                                           onChange={handleShareAll}/>
                                    <Text grey={!shareAll}>Share all credentials</Text>
                                 </div>
                                 <div className={styles.radioItem}>
                                    <input checked={shareSelection} name="shareSelection" type="radio"
                                           onChange={handleShareSelection}/>
                                    <Text grey={!shareSelection}>Share a selection of credentials</Text>
                                 </div>
                              </div>
                              <div className={styles.adjustData}>
                                 <ul>
                                    {shareData.map(item => {
                                       return <li key={item.value} className={styles.adjustDataItem} value={item.value}>
                                          <Text>{item.title}</Text>
                                          <input type="checkbox"/>
                                       </li>
                                    })}
                                 </ul>
                              </div>
                              <Button blue thin onClick={() => setStep(prevState => prevState - 1)}>Confirm shared
                                 data</Button>
                           </div>
                        </div>
                        : step === 3
                           ? <div className={`${styles.top} ${styles.shareReturn}`}>
                              <div className={`${styles.wrapperInner} ${styles.share} ${styles.shareReturn}`}>
                                 <Heading blue h2 modal>Congratulations</Heading>
                                 <Text>Your credentials have been shared! You now may close this window.</Text>
                              </div>
                              <Button blue thin onClick={() => router.push("/")}>Return to Dashboard</Button>
                           </div>
                           : null
            }
         </div>
      </div>
   )
}

export default ShareModal