import Image from "next/image"

import logo from "../../assets/images/qk-logo-text.svg"
import AuthForms from "../../components/AuthForms/AuthForms"
import Heading from "../../components/UI/Heading/Heading"

export default function ForgotPassword() {

   // TODO: Declare callback axios post request to API and pass to AuthForms

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <AuthForms forgot/>
               <div className="logo">
                  <div className="logo__image-wrapper">
                     <Image alt="Qualkey" layout="fill" quality={100}
src={logo}/>
                  </div>
                  <Heading h2 loginPage white>Quickly, easily and securely authenticate your credentials</Heading>
               </div>
            </div>
         </div>
      </div>
   )
}