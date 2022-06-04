import { useRecoilState } from "recoil"

import { paymentFormState, showPaymentModalState } from "../../../atoms"
import { formatPaymentInputs } from "../../../utils"
import { IconClose } from "../_Icon"
import Button from "../Button/Button"
import PaymentDropdown from "../Dropdown/PaymentDropdown/PaymentDropdown"
import Heading from "../Heading/Heading"
import Input from "../Input/Input"
import Text from "../Text/Text"
import styles from "./Modal.module.scss"

const PaymentModal = () => {

   const [, setShowPaymentModal] = useRecoilState(showPaymentModalState)
   const [formData, setFormData] = useRecoilState(paymentFormState)

   const closeModal = () => {
      setShowPaymentModal(false)
   }

   const closeModalOutside = event => {
      closeModal()
      event.stopPropagation()
   }

   /**
    * Input value handling.
    **/
   const handleLoginFormChange = ({ target }) => {
      const { name, value } = target
      if (name === "cardNumber") {
         setFormData({
            ...formData,
            [name]: formatPaymentInputs(value, name)
         })
      } else if (name === "expiry") {
         setFormData({
            ...formData,
            [name]: formatPaymentInputs(value, name)
         })
      } else if (name === "cvc") {
         setFormData({
            ...formData,
            [name]: formatPaymentInputs(value, name)
         })
      } else {
         setFormData({
            ...formData,
            [name]: value
         })
      }
   }

   /**
    * Form submit handler
    */
   const handleFormSubmit = event => {
      event.preventDefault()
      console.log(formData)
   }

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
                  <form onSubmit={handleFormSubmit}>
                     <div className={styles.paymentInput}>
                        <Text grey small>Name on card</Text>
                        <Input inputName="name" placeholder="John Reed" type="text"
                               value={formData.name}
                               onChange={handleLoginFormChange}/>
                     </div>
                     <div className={styles.paymentInput}>
                        <Text grey small>Card number</Text>
                        <Input inputName="cardNumber" placeholder="1234 1234 1234 1234"
                               type="text"
                               value={formData.cardNumber} onChange={handleLoginFormChange} onKeyPress={(event) => {
                                  if (!/\d/.test(event.key)) {
                                     event.preventDefault()
                                  }
                               }}/>
                        {/*TODO: Add card logo*/}
                     </div>
                     <div className={styles.paymentInputRow}>
                        <div className={styles.paymentInput}>
                           <Text grey small>Expiry date</Text>
                           <Input inputName="expiry" placeholder="MM / YY" type="text"
                                  value={formData.expiry}
                                  onChange={handleLoginFormChange}/>
                        </div>
                        <div className={styles.paymentInput}>
                           <Text grey small>CVC</Text>
                           <Input inputName="cvc" maxLength={3}
                                  placeholder="011" type="text"
                                  value={formData.cvc} onChange={handleLoginFormChange}/>
                        </div>
                     </div>
                     <PaymentDropdown/>
                     <div className={styles.paymentInput}>
                        <Text grey small>Post code of billing address</Text>
                        <Input inputName="zip" placeholder="1234"
                               type="text"
                               value={formData.zip} onChange={handleLoginFormChange}/>
                     </div>
                     <Button blue thin>Confirm your purchase</Button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}

export default PaymentModal