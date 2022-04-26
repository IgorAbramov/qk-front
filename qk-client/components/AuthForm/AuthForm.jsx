import PropTypes from "prop-types"

import Button from "../UI/Button/Button"
import Heading from "../UI/Heading/Heading"
import Input from "../UI/Input/Input"
import Text from "../UI/Text/Text"
import styles from "./AuthForm.module.scss"

const AuthForm = ({ login, forgot, twoFactor, newPassword }) => {
   if (login) {
      return (
         <div className={styles.loginPage}>
            <div className={styles.wrapper}>
               <Heading blue h1>Login</Heading>
               <form>
                  <Input email placeholder="Email"/>
                  {/*<Text error small>Wrong email</Text>*/}
                  <Input password placeholder="Password"/>
                  {/*<Text error small>Wrong password</Text>*/}
                  <div className={styles.textRow}>
                     <Input checkbox checkboxText="Remember me" inputName="rememberMe"/>
                     <Text blue medium link="/auth/forgot">Forgot Password?</Text>
                  </div>
                  <Button blue bold wide>Login as a Student</Button>
                  <Button bold thin white>Login as a University</Button>
               </form>
            </div>
            <div className={styles.copyright}>
               <Text small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
               <Text small underline link="/terms">Terms & Conditions</Text>
            </div>
         </div>
      )
   }
}

export default AuthForm

AuthForm.propTypes = {
   login: PropTypes.bool,
   forgot: PropTypes.bool,
   twoFactor: PropTypes.bool,
   newPassword: PropTypes.bool,
}