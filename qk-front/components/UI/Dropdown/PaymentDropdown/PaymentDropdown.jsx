import { useState } from "react"

import { useRecoilState } from "recoil"

import { paymentFormState } from "../../../../atoms"
import { IconShowDropdown } from "../../_Icon"
import Text from "../../Text/Text"
import styles from "./PaymentDropdown.module.scss"
import PaymentDropdownItem from "./PaymentDropdownItem"

const mockCountries = [
   {
      country: "Latvia",
      value: "LVA"
   },
   {
      country: "Estonia",
      value: "EST"
   },
   {
      country: "UK",
      value: "UK"
   },
   {
      country: "USA",
      value: "USA"
   },
   {
      country: "Albania",
      value: "ALB"
   },
   {
      country: "Test Country of Testing",
      value: "TCT"
   }
]

const PaymentDropdown = () => {

   const [openDropdown, setOpenDropdown] = useState(false)
   const [option, setOption] = useState("")
   const [formData, setFormData] = useRecoilState(paymentFormState)

   const handleOpenModal = event => {
      event.preventDefault()
      setOpenDropdown(prevState => !prevState)
   }

   const handleChooseOption = ({ target }) => {
      setOption(target.innerText)
      setOpenDropdown(false)
      setFormData({
         ...formData,
         country: target.getAttribute("value")
      })
   }

   return (
      <div className={styles.wrapper}>
         <Text grey small>Country</Text>
         <button className={styles.dropdown}
                 style={{
                    borderRadius: openDropdown ? "15px 15px 0 0" : "",
                    borderBottomColor: openDropdown ? "transparent" : ""
                 }}
                 onClick={handleOpenModal}>
            <Text>{option ? option : "Choose Country"}</Text>
            <IconShowDropdown/>
         </button>
         <div className={styles.content} style={{ display: openDropdown ? "block" : "none" }}>
            <ul>
               {mockCountries.map(item => (
                  <PaymentDropdownItem key={item.value} country={item.country} handleChooseOption={handleChooseOption}
                                       value={item.value}/>
                  //TODO: Fix blurry text
               ))}
            </ul>
         </div>
      </div>
   )
}

export default PaymentDropdown