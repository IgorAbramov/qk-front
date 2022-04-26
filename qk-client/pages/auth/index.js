import Image from "next/image"

import logo from "../../assets/images/qk-logo-xl.svg"
import AuthForm from "../../components/AuthForm/AuthForm"
import Heading from "../../components/UI/Heading/Heading"

export default function Auth() {
   return (
      <div className="auth">
         <div className="container">
            <div className="auth__wrapper">
               <AuthForm login/>
               <div className="logo">
                  <Image alt="Qualkey" height={293} src={logo}
                         width={426}/>
                  <Heading h2 white>Quickly, easily and securely authenticate your credentials</Heading>
               </div>
            </div>
         </div>
      </div>
   )
}