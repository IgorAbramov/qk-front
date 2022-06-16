import { useState } from "react"

import Image from "next/image"

import schoolLogo from "../../assets/images/mockUniLogo.webp"
import CredentialsInfo from "../CredentialsInfo/CredentialsInfo"
import SharedCredentialsInfo from "../CredentialsInfo/SharedCredentialsInfo"
import { IconAcademicCap, IconCertificate, IconClose, IconHideDropdownBig, IconShowDropdown, IconShowDropdownBig } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Text from "../UI/Text/Text"
import styles from "./DashboardItem.module.scss"

const data = {
   uuid: "3e617da7-bfb7-4a16-8721-13316a51389b",
   did: "did:hedera:testnet:FEAQXNWAZNWVMysDERXv5wXT75SGdLEHANsKuZdGctxU;hedera:testnet:fid=0.0.34921762;hedera:testnet:tid=0.0.34921760",
   status: "ACTIVATED",
   studentUuid: "bf4fe6f3-f5a1-4794-aced-4deb4ba8c67a",
   institutionUuid: "89f43c8f-1434-4caf-92bd-990b3f112da1",
   uploadUuid: "bc379cfe-257a-4ee9-94b4-30c79f007300",
   certificateId: null,
   graduatedName: "Dylan Bomstein",
   qualificationName: "Bachelors of Science in Business",
   majors: null,
   minors: null,
   awardingInstitution: "Learning Institute",
   qualificationLevel: "Bachelors",
   awardLevel: "",
   studyLanguage: "English",
   info: "None",
   gpaFinalGrade: "",
   studyStartedAt: "2013-08-05T00:00:00.000Z",
   studyEndedAt: "2017-05-05T00:00:00.000Z",
   graduatedAt: "2017-05-05T10:00:00.000Z",
   expiresAt: "2021-12-03T10:00:00.000Z",
   authenticatedAt: "2022-06-13T13:45:42.957Z",
   authenticatedBy: "Institution Institution",
   authenticatedTitle: null,
   createdAt: "2022-06-13T13:45:49.933Z",
   updatedAt: "2022-06-13T14:05:27.277Z"
}

const SharedCredentialsItem = () => {
   
   const [showData, setShowData] = useState(false)

   const handleExpandData = () => {
      setShowData(prevState => !prevState)
   }

   return (
      <>
         <div className={`${styles.wrapper} ${styles.viewWrapper} ${styles.student}`}
              style={{ borderRadius: "15px 15px 15px 15px" }}>
            <div className={`${styles.credentialWrapper} ${styles.viewCredentialWrapper} ${styles.shared}`}
                 style={{ borderRadius: showData ? "15px 15px 0 0" : "15px 15px 15px 15px" }}>
               <Image alt="school name" className={styles.studentSchoolLogo} height={64}
                      objectFit="contain" src={schoolLogo} width={196}/>
               <div className={styles.itemWrapper}>
                  <IconAcademicCap/>
                  <div className={styles}>
                     <Text bold>{data.qualificationName}</Text>
                  </div>
               </div>
               <div className={`${styles.actions} ${styles.shared}`}>
                  <IconCertificate/>
                  <Button blue thin
                          onClick={handleExpandData}>
                     <div className={`${styles.buttonRow} ${styles.shared}`}>
                        {!showData ? <IconHideDropdownBig/> : <IconShowDropdownBig/>}
                        <Text semiBold>Certificate</Text>
                     </div>
                  </Button>
               </div>
            </div>
         </div>
         {showData ? <SharedCredentialsInfo data={data}/> : null}
      </>
   )
}

export default SharedCredentialsItem