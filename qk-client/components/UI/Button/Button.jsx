import PropTypes from "prop-types"

import style from "./Button.module.scss"

const Button = ({ thin, wide, children }) => {
   if (thin) {
      return (
         <button className={`${style.btn} ${style.thin}`}>
            {children}
         </button>
      )
   }

   if (wide) {
      return (
         <button className={`${style.btn} ${style.wide}`}>
            {children}
         </button>
      )
   }

   return null
}

export default Button

Button.propTypes = {
   thin: PropTypes.bool,
   wide: PropTypes.bool,
   children: PropTypes.string.isRequired
}