import { useState } from "react"

import axios from "axios"
import Image from "next/image"
import { useRecoilState } from "recoil"

import logo from "../assets/images/qk-logo-xl.png"
import { initialLoginFormState, loginFormState, formValidationErrorsState } from "../atoms"
import AuthForms from "../components/AuthForms/AuthForms"
import Heading from "../components/UI/Heading/Heading"
import { processingUrl, validate } from "../utils"

export default function Home() {

   const [formData, setFormData] = useRecoilState(loginFormState)
   const [formErrors, setFormErrors] = useRecoilState(formValidationErrorsState)
   const [success, setSuccess] = useState(false)

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

      console.log(formData)

      const validation = validate(formData, setFormData, initialLoginFormState)
      if (Object.keys(validation).length) {
         setFormErrors(validation)
      } else {
         axios.post(`${processingUrl}/auth/login`, { formData })
            .then(response => {
               console.log(response)
            })
            .catch(error => {
               console.log(error)
            })
      }
   }

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <AuthForms login changeFormHandler={handleFormChange} submitFormHandler={handleFormSubmit}/>
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