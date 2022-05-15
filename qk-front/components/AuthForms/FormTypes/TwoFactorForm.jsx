import Button from "../../UI/Button/Button"
import Heading from "../../UI/Heading/Heading"
import Input from "../../UI/Input/Input"
import Text from "../../UI/Text/Text"
import styles from "../AuthForm.module.scss"

const TwoFactorForm = ({ submitFormHandler }) => {
   return (
      <div className={`${styles.loginPage}`}>
         <div className={styles.wrapper}>
            <Heading blue h1>Check your email</Heading>
            <Text grey>Enter the 4-digit code we’ve sent to your
               email and then choose your new password</Text>
            <form onSubmit={submitFormHandler}>
               <Input pinCode/>
               <Text error small>Please enter all 4 digits</Text>
               <Button blue bold thin>Next</Button>
               <Text grey>Resend code</Text>
            </form>
         </div>
         <div className={styles.copyright}>
            <Text grey small>Copyright &copy; 2021 <span>QualKey Limited</span> All rights reserved.</Text>
            <Text grey small underline
                  link="/terms">Terms & Conditions</Text>
         </div>
      </div>
   )
}

export default TwoFactorForm