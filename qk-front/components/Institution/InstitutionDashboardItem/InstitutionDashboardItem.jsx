import { useState } from "react"

import moment from "moment"
import Image from "next/image"
import { useRecoilState, useRecoilValue } from "recoil"

import portrait from "../../../assets/images/mockPortrait.webp"
import { credentialsDetailsState, credentialsShowDetailsState } from "../../../atoms"
import Text from "../../UI/Text/Text"
import InstitutionDetailsItem from "../InstitutionDetailsItem/InstitutionDetailsItem"
import InstitutionHistoryItem from "../InstitutionHistoryItem/InstitutionHistoryItem"
import styles from "./InstitutionDashboardItem.module.scss"

const mockDataHistory = [
   {
      date: 1652174960,
      action: "Credentials Uploadedkjhkljh",
      details: {
         action: "Credentials Uploaded or maybe not",
         status: "Success",
         registrar: "Mr. Michael Cainekjhlkj",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials Uploaded",
      details: {
         action: "Credentials Uploaded",
         status: "Success ksjdfh",
         registrar: "Mr. Michael Caine de Cisse",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials",
      details: {
         action: "Credentials Uploaded",
         status: "Success",
         registrar: "Mr. Michael Caine",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials Uploaded",
      details: {
         action: "Credentials Uploaded",
         status: "Success",
         registrar: "Mr. Michael Caine",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials",
      details: {
         action: "Credentials Uploaded",
         status: "Success",
         registrar: "Mr. Michael Caine",
         date: 1652174960
      }
   },
   {
      date: 1652174960,
      action: "Credentials lkjlkj",
      details: {
         action: "Credentials Uploaded",
         status: "Success",
         registrar: "Mr. Michael Caine",
         date: 1652174960
      }
   }
]

const InstitutionDashboardItem = ({ data }) => {
   const { auditFrom, auditName, diploma, lastModified, status, student } = data

   const validateStatus = () => {
      if (status === "Activated") return styles.activated
      if (status === "Uploaded") return styles.uploaded
      if (status === "Withdrawn") return styles.withdrawn
      if (status === "Expired") return styles.expired
   }

   const showDetails = useRecoilValue(credentialsShowDetailsState)
   const details = useRecoilValue(credentialsDetailsState)
   const [showCredentialsHistory, setShowCredentialsHistory] = useState(false)

   const handleShowDropdown = () => {
      if (showCredentialsHistory) {
         setShowCredentialsHistory(false)
      } else {
         setShowCredentialsHistory(true)
      }
   }

   return (
      <div className={styles.wrapper} style={{ borderRadius: "15px 15px 15px 15px" }}>
         <div className={styles.credentialWrapper} style={{
            borderRadius: !showCredentialsHistory
               ? "15px 15px 15px 15px"
               : "15px 15px 0 0"
         }}>
            <div className={styles.itemWrapper}>
               <Image alt="portrait" className={styles.photo} height={50}
                      quality={100} src={portrait} width={50}/>
               <div className={styles.item}>
                  <Text bold>{auditName}</Text>
                  <Text grey>{auditFrom}</Text>
               </div>
            </div>
            <div className={styles.itemWrapper}>
               <svg fill="none" height="48" viewBox="0 0 48 48"
                    width="48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1.47852 18L23.6703 6L45.8621 18L23.6703 30L1.47852 18Z" stroke="#262626"
                        strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M34.7678 45V24L23.6719 18" stroke="#262626" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M40.6836 20.7939V31.0314C40.6823 31.35 40.5784 31.6595 40.3878 31.9127C39.1487 33.6002 33.8967 39.7502 23.6699 39.7502C13.4432 39.7502 8.19118 33.6002 6.95214 31.9127C6.76147 31.6595 6.65758 31.35 6.65625 31.0314V20.7939"
                     stroke="#262626" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
               </svg>
               <div className={styles}>
                  <Text bold>{student}</Text>
                  <Text>{`${diploma.slice(0, 27).trim()}...`}</Text>
               </div>
            </div>
            <div className={`${styles.status} ${validateStatus()}`}>
               <svg fill="none" height="32" viewBox="0 0 32 32"
                    width="32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.9993 29.3337C23.3631 29.3337 29.3327 23.3641 29.3327 16.0003C29.3327 8.63653 23.3631 2.66699 15.9993 2.66699C8.63555 2.66699 2.66602 8.63653 2.66602 16.0003C2.66602 23.3641 8.63555 29.3337 15.9993 29.3337Z"
                     stroke="#D4D4D4" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="2"/>
                  <path d="M16 21.3333V16" stroke="#D4D4D4" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="2"/>
                  <path d="M16 10.667H16.0133" stroke="#D4D4D4" strokeLinecap="round"
                        strokeLinejoin="round" strokeWidth="2"/>
               </svg>
               <Text bold>{status}</Text>
            </div>
            <Text bold>{moment(lastModified * 1000).format("hh:mm DD/MM/YYYY")}</Text>
            <div className={styles.actions}>
               <svg fill="none" height="40" viewBox="0 0 40 40"
                    width="40"
                    xmlns="http://www.w3.org/2000/svg">
                  <path d="M32.5 22.5H7.5C6.80964 22.5 6.25 23.0596 6.25 23.75V31.25C6.25 31.9404 6.80964 32.5 7.5 32.5H32.5C33.1904 32.5 33.75 31.9404 33.75 31.25V23.75C33.75 23.0596 33.1904 22.5 32.5 22.5Z"
                     stroke="#262626" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M32.5 7.5H7.5C6.80964 7.5 6.25 8.05964 6.25 8.75V16.25C6.25 16.9404 6.80964 17.5 7.5 17.5H32.5C33.1904 17.5 33.75 16.9404 33.75 16.25V8.75C33.75 8.05964 33.1904 7.5 32.5 7.5Z"
                     stroke="#262626" strokeLinecap="round"
                     strokeLinejoin="round" strokeWidth="1.5"/>
                  <path d="M28.125 14.0625C28.9879 14.0625 29.6875 13.3629 29.6875 12.5C29.6875 11.6371 28.9879 10.9375 28.125 10.9375C27.2621 10.9375 26.5625 11.6371 26.5625 12.5C26.5625 13.3629 27.2621 14.0625 28.125 14.0625Z"
                     fill="#262626"/>
                  <path d="M28.125 29.0625C28.9879 29.0625 29.6875 28.3629 29.6875 27.5C29.6875 26.6371 28.9879 25.9375 28.125 25.9375C27.2621 25.9375 26.5625 26.6371 26.5625 27.5C26.5625 28.3629 27.2621 29.0625 28.125 29.0625Z"
                     fill="#262626"/>
               </svg>
               {
                  showCredentialsHistory
                     ? <svg fill="none" height="32" viewBox="0 0 32 32"
                            width="32"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={handleShowDropdown}>
                        <path d="M1.10118 18.9187L14.7512 7.475C15.2083 7.1375 15.6369 7 16.0012 7C16.3655 7 16.8562 7.13869 17.1862 7.418L30.9005 18.9187C31.5859 19.4875 31.6082 20.4937 30.9519 21.0375C30.3001 21.6391 29.2105 21.6586 28.5297 21.0824L16.0012 10.575L3.47261 21.075C2.79404 21.6512 1.70261 21.6316 1.05047 21.0301C0.394039 20.4937 0.415468 19.4875 1.10118 18.9187Z"
                           fill="#262626"/>
                     </svg>
                     : <svg fill="none" height="15" viewBox="0 0 32 15"
                            width="32"
                            xmlns="http://www.w3.org/2000/svg" onClick={handleShowDropdown}>
                        <path d="M30.8988 3.08125L17.2488 14.525C16.7917 14.8625 16.3631 15 15.9988 15C15.6345 15 15.1438 14.8613 14.8138 14.582L1.09955 3.08125C0.414121 2.5125 0.391835 1.50625 1.04812 0.9625C1.69991 0.360938 2.78955 0.341376 3.47026 0.917582L15.9988 11.425L28.5274 0.925001C29.206 0.348813 30.2974 0.368376 30.9495 0.96992C31.606 1.50625 31.5845 2.5125 30.8988 3.08125Z"
                           fill="#262626"/>
                     </svg>
               }
            </div>
         </div>
         <div style={{ display: showCredentialsHistory ? "block" : "none", borderRadius: "0 0 15px 15px" }}>
            <div className={styles.history}>
               <div className={styles.left}>
                  <Text bold large>Credentials History</Text>
                  <div className={styles.historyItemWrapper}>
                     {mockDataHistory.map((data, index) => (
                        <InstitutionHistoryItem key={index} data={data}/>
                     ))}
                  </div>
               </div>
               <div className={styles.right}>
                  <Text bold large>Details</Text>
                  <div className={styles.rightWrapper}>
                     {showDetails && <InstitutionDetailsItem data={details}/>}
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstitutionDashboardItem