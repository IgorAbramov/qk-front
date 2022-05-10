import Link from "next/link"
import PropTypes from "prop-types"

import styles from "./Text.module.scss"

const Text = ({ blue, grey, white, small, medium, large, underline, link, error, success, bold, semiBold, sidebar, sidebarMin, active, blackSpan, children, ...otherProps }) => {
   if (link) return (
      <Link href={link}>
         <a className={`${styles.text} ${styles.link}
         ${blue ? styles.blue : ""}
         ${grey ? styles.grey : ""}
         ${white ? styles.white : ""}
         ${small ? styles.small : ""}
         ${medium ? styles.medium : ""}
         ${large ? styles.large : ""}
         ${underline ? styles.underline : ""}
         ${bold ? styles.bold : ""}
         ${semiBold ? styles.semiBold : ""}
         ${sidebar ? styles.sidebar : ""}
         ${sidebarMin ? styles.sidebarMin : ""}
         ${active ? styles.active : ""}
         ${blackSpan ? styles.blackSpan : ""}`}>
            {children}
         </a>
      </Link>
   )

   return (
      <p {...otherProps} className={`${styles.text}
      ${underline ? styles.underline : ""}
      ${blue ? styles.blue : ""}
      ${grey ? styles.grey : ""}
      ${white ? styles.white : ""}
      ${small ? styles.small : ""}
      ${medium ? styles.medium : ""}
      ${large ? styles.large : ""}
      ${underline ? styles.underline : ""}
      ${error ? styles.error + " form-error" : ""}
      ${success ? styles.success + " form-error" : ""}
      ${bold ? styles.bold : ""}
      ${semiBold ? styles.semiBold : ""}
      ${sidebar ? styles.sidebar : ""}
      ${sidebarMin ? styles.sidebarMin : ""}
      ${active ? styles.active : ""}
      ${blackSpan ? styles.blackSpan : ""}`}>
         {children}
      </p>
   )
}

export default Text

Text.propTypes = {
   blue: PropTypes.bool,
   grey: PropTypes.bool,
   white: PropTypes.bool,
   small: PropTypes.bool,
   medium: PropTypes.bool,
   large: PropTypes.bool,
   underline: PropTypes.bool,
   link: PropTypes.string,
   error: PropTypes.bool,
   success: PropTypes.bool,
   bold: PropTypes.bool,
   semiBold: PropTypes.bool,
   sidebar: PropTypes.bool,
   sidebarMin: PropTypes.bool,
   active: PropTypes.bool,
   blackSpan: PropTypes.bool,
   children: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
}
