const PaymentDropdownItem = ({ country, value, handleChooseOption }) => {
   return (
      <li value={value} onClick={handleChooseOption}>{country}</li>
   )
}

export default PaymentDropdownItem