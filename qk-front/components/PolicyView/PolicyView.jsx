import Image from "next/image"

import qkLogo from "../../assets/images/qk-logo.svg"
import Text from "../UI/Text/Text"
import styles from "./PolicyView.module.scss"

const PolicyView = () => {
   return (
      <div className={styles.wrapper}>
         <div className={styles.top}>
            <Image alt="Qualkey" height={120} src={qkLogo}
                   width={171}/>
         </div>
         <div className={styles.content}>
            <Text>
               This privacy policy applies between you, the User of this Website, and QualKey Ltd., the owner and
               provider of this Website. QualKey Ltd. takes the privacy of your information very seriously. This privacy
               policy applies to our use of any and all Data collected by us or provided by you in relation to your use
               of the Website.
            </Text>
            <br/>
         </div>
      </div>
   )
}

export default PolicyView