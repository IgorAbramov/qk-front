import PropTypes from "prop-types"

import ForgotForm from "./FormTypes/ForgotForm"
import LoginForm from "./FormTypes/LoginForm"
import NewPasswordForm from "./FormTypes/NewPasswordForm"
import TwoFactorForm from "./FormTypes/TwoFactorForm"

const AuthForms = ({ login, forgot, twoFactor, newPassword, changeFormHandler, submitFormHandler }) => {

   if (login) return <LoginForm changeFormHandler={changeFormHandler} submitFormHandler={submitFormHandler}/>

   if (forgot) return <ForgotForm submitFormHandler={submitFormHandler}/>

   if (twoFactor) return <TwoFactorForm submitFormHandler={submitFormHandler}/>

   if (newPassword) return <NewPasswordForm/>
}

export default AuthForms

AuthForms.propTypes = {
   login: PropTypes.bool,
   forgot: PropTypes.bool,
   twoFactor: PropTypes.bool,
   newPassword: PropTypes.bool,
   changeFormHandler: PropTypes.func.isRequired,
   submitFormHandler: PropTypes.func.isRequired
}