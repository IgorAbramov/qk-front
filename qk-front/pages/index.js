import { useEffect } from "react"

import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"

import logo from "../assets/images/qk-logo-text.svg"
import { formValidationErrorsState, initialLoginFormState, loadingState, loginFormState } from "../atoms"
import AuthForms from "../components/AuthForms/AuthForms"
import Heading from "../components/UI/Heading/Heading"
import { processingUrl, validateLoginForm } from "../utils"

export default function Home() {

   const router = useRouter()

   const [formData, setFormData] = useRecoilState(loginFormState)
   const [, setFormError] = useRecoilState(formValidationErrorsState)
   const [, setLoading] = useRecoilState(loadingState)

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

   /**
    * Login processing.
    * @desc Validates inputs and sends request to server.
    * @param event Submit event.
    * @returns Redirect to dashboard page.
    * @throws Shows error in UI.
    **/
   const handleFormSubmit = async event => {
      event.preventDefault()
      setFormError({})

      const validation = validateLoginForm(formData, setFormData, initialLoginFormState)
      if (Object.keys(validation).length) {
         setFormError(validation)
      } else {
         setLoading(true)
         await axios.post(`${processingUrl}/auth/login`, formData, { withCredentials: true })
            .then(response => {
               router.push(response.data)
            })
            .catch(error => {
               setLoading(false)
               if (error.response.data.message.includes("Role")) {
                  setFormError({ response: "Not authorized" })
               } else {
                  setFormError({ response: error.response.data.message })
               }
            })
      }
   }

   /**
    * Stops showing loading in UI.
    * @desc Sets loading state to false.
    */
   useEffect(() => {
      setLoading(false)
   }, [])

   return (
      <div className="auth">
         <div className="container authenticate">
            <div className="auth__wrapper">
               <AuthForms login changeFormHandler={handleFormChange} submitFormHandler={handleFormSubmit}/>
               <div className="logo">
                  <div className="logo__image-wrapper">
                     <Image priority alt="Qualkey" layout="fill"
                            quality={100}
                            src={logo}/>
                  </div>
                  <Heading h2 loginPage white>Quickly, easily and securely authenticate your credentials</Heading>
               </div>
            </div>
         </div>
      </div>
   )
}