import { useState } from "react"

import Image from "next/image"
import { useRecoilState } from "recoil"

import logo from "../assets/images/qk-logo-xl.png"
import { formValidationErrorsState } from "../atoms/formValidationErrorsState"
import { initialLoginFormState, loginFormState } from "../atoms/loginFormState"
import AuthForm from "../components/AuthForms/AuthForm"
import Heading from "../components/UI/Heading/Heading"
import { validate } from "../utils"

export default function Home() {

   const [formData, setFormData] = useRecoilState(loginFormState)
   const [formErrors, setFormErrors] = useRecoilState(formValidationErrorsState)
   const [success, setSuccess] = useState(false)

   console.log(formErrors)

   const handleFormChange = ({ target }) => {
      const { name, value, type, checked } = target
      if (type !== "checkbox") {
         setFormData({
            ...formData,
            [name]: value
         })
      } else {
         setFormData({
            ...formData,
            [name]: checked
         })
      }
   }

   const handleFormSubmit = event => {
      event.preventDefault()
      setFormErrors(validate(formData, setFormData, setSuccess, initialLoginFormState))
   }

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <AuthForm login changeFormHandler={handleFormChange} submitFormHandler={handleFormSubmit}/>
               <div className="logo">
                  <div className="logo__image-wrapper">
                     <Image priority alt="Qualkey" layout="fill"
                            src={logo}/>
                  </div>
                  <Heading h2 loginPage white>Quickly, easily and securely authenticate your credentials</Heading>
               </div>
            </div>
         </div>
      </div>
   )
}