import { useState } from "react"

import Image from "next/image"
import PropTypes from "prop-types"

import avatar from "../../assets/images/avatarMock.webp"
import { IconCheckMark } from "../UI/_Icon"
import Button from "../UI/Button/Button"
import Input from "../UI/Input/Input"
import Text from "../UI/Text/Text"
import styles from "./SettingsView.module.scss"

const SettingsView = ({ institution, userData }) => {

   const { firstName, lastName, email } = userData

   const [view, setView] = useState(1)

   return (
      <div className={styles.wrapper}>
         <div className={styles.left}>
            <div className={styles.topLeft}>
               <div className={styles.imageWrapperUser}>
                  <Image alt="user" className={styles.user} layout="fill"
                         quality={100} src={avatar}/>
               </div>
               {firstName && lastName ? <Text big bold>{firstName[0]}. {lastName}</Text> : null}
            </div>
            <div className={styles.handlers}>
               <ul>
                  <li className={view === 1 ? styles.active : ""} onClick={() => setView(1)}>
                     <Text semiBold>Account</Text>
                  </li>
                  <li className={view === 2 ? styles.active : ""} onClick={() => setView(2)}>
                     <Text semiBold>Change Password</Text>
                  </li>
                  {!institution && <li className={view === 3 ? styles.active : ""} onClick={() => setView(3)}>
                     <Text semiBold>Security & Privacy</Text>
                  </li>}
               </ul>
            </div>
         </div>
         <div className={styles.right}>
            {
               view === 1
                  ? <>
                     <Text big bold>Account</Text>
                     <form className={styles.form}>
                        <Text grey small>First Name</Text>
                        <Input disabled={institution} inputName="firstName" placeholder={firstName}
                               type="text"/>
                        <Text grey small>Last Name</Text>
                        <Input disabled={institution} inputName="lastName" placeholder={lastName}
                               type="text"/>
                        <Text grey small>Email Address</Text>
                        <Input disabled={institution} inputName="email" placeholder={email}
                               type="text"/>
                        {institution && <>
                           <Text grey small>Organization</Text>
                           <Input disabled={institution} inputName="organization" placeholder="ENDPOINT REQUIRED"
                                  type="text"/>
                        </>}
                        <Button blue thin>
                           <div className={styles.buttonRow}>
                              <IconCheckMark/>
                              <Text>Save Changes</Text>
                           </div>
                        </Button>
                     </form>
                  </>
                  : view === 2
                     ? <>
                        <Text big bold>Change Password</Text>
                        <form className={styles.form}>
                           <Text grey small>Old Password</Text>
                           <Input hideEye inputName="oldPassword" type="password"/>
                           <Text grey small>New Password</Text>
                           <Input hideEye type="password"/>
                           <Text grey small>Repeat new password</Text>
                           <Input hideEye passwordRepeat type="password"/>
                           <Button blue thin>
                              <div className={styles.buttonRow}>
                                 <IconCheckMark/>
                                 <Text>Save Changes</Text>
                              </div>
                           </Button>
                        </form>
                     </>
                     : view === 3
                        ? <>
                           <Text big bold>Security & Privacy</Text>
                           <form className={styles.security}>
                              <Input checkboxText="Receive news and other updates through email" inputName="newsAndUpdates"
                                     type="checkbox"/>
                              <Input checkboxText="Receive deals and sales information through email"
                                     inputName="dealsAndSales" type="checkbox"/>
                              <Button blue thin>
                                 <div className={styles.buttonRow}>
                                    <IconCheckMark/>
                                    <Text>Save Changes</Text>
                                 </div>
                              </Button>
                           </form>
                        </>
                        : null
            }
         </div>
      </div>
   )
}

export default SettingsView

SettingsView.propTypes = { institution: PropTypes.bool, userData: PropTypes.object }