import { Elements, PaymentElement } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { useRecoilState } from "recoil"

import { showPaymentModalState } from "../../../atoms"
import { IconClose } from "../_Icon"
import Button from "../Button/Button"
import Heading from "../Heading/Heading"
import Text from "../Text/Text"
import styles from "./Modal.module.scss"

const stripePromise = loadStripe(`${process.env.NEXT_PUBLIC_STRAPI_PUBLISHABLE_KEY}`)

const PaymentModal = () => {

   const [, setShowPaymentModal] = useRecoilState(showPaymentModalState)

   const closeModal = () => {
      setShowPaymentModal(false)
   }

   const closeModalOutside = event => {
      closeModal()
      event.stopPropagation()
   }

   const stripeOptions = { clientSecret: `${process.env.NEXT_PUBLIC_STRAPI_SECRET_KEY}` }

   return (
      <div className={styles.modal} onClick={closeModalOutside}>
         <div className={`${styles.wrapper}`} onClick={event => event.stopPropagation()}>
            <IconClose onClick={closeModal}/>
            <div className={`${styles.top}`}>
               <div className={`${styles.wrapperInner} ${styles.payment}`}>
                  <Heading blue h2>Pay for your lifetime credentials</Heading>
                  <Text grey>Please provide your payment details. This is a one-off charge that you pay for each
                     qualification that you upload onto your QualKey Dashboard.</Text>
                  <div className={styles.amount}>
                     <Text big>Total Amount:</Text>
                     <Text big>£39,99</Text>
                  </div>
                  <Elements options={stripeOptions} stripe={stripePromise}>
                     <form>
                        <PaymentElement/>
                        <Button blue thin>Submit</Button>
                     </form>
                  </Elements>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PaymentModal