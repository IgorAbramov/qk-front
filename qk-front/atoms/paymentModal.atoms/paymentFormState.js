import { atom } from "recoil"

const initialValues = {
   name: "",
   cardNumber: "",
   expiry: "",
   cvc: "",
   country: "",
   zip: ""
}

export const paymentFormState = atom({
   key: "paymentFormState",
   default: initialValues
})