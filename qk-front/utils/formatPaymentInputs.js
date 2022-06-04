export const formatPaymentInputs = (value, name) => {
   const inputVal = value.replace(/ /g, "")
   let inputNumbersOnly = inputVal.replace(/\D/g, "")

   if (name === "cardNumber") {
      if (inputNumbersOnly.length > 16) {
         inputNumbersOnly = inputNumbersOnly.substring(0, 16)
      }

      const splits = inputNumbersOnly.match(/.{1,4}/g)

      let spacedNumber = ""
      if (splits) {
         spacedNumber = splits.join(" ")
      }
      return spacedNumber

   } else if (name === "expiry") {
      if (inputNumbersOnly.length > 4) {
         inputNumbersOnly = inputNumbersOnly.substring(0, 4)
      }

      const splits = inputNumbersOnly.match(/.{1,2}/g)

      let spacedNumber = ""
      if (splits) {
         spacedNumber = splits.join(" / ")
      }
      return spacedNumber
   } else if (name === "cvc") {
      if (inputNumbersOnly.length > 3) {
         inputNumbersOnly = inputNumbersOnly.substring(0, 3)
      }

      const splits = inputNumbersOnly.match(/.{1,3}/g)

      let spacedNumber = ""
      if (splits) {
         spacedNumber = splits.join(" ")
      }
      return spacedNumber
   }
}