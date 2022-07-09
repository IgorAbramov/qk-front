import moment from "moment"
import Image from "next/image"
import QRCodeSVG from "qrcode.react"

import qkLogo from "../../assets/images/qk-logo-text-blue.svg"
import { awsUrl } from "../../utils"
import { IconEllipseBl, IconEllipseBr, IconEllipseTl, IconEllipseTr } from "../UI/_Icon"
import Text from "../UI/Text/Text"
import styles from "./Certificate.module.scss"

const Certificate = ({ data, sharePage }) => {

   return (
      <div className={`${styles.certificateWrapper} ${sharePage ? styles.sharePage : ""}`}>
         <IconEllipseTl/>
         <IconEllipseTr/>
         <IconEllipseBl/>
         <IconEllipseBr/>
         <div className={styles.top}>
            <div className={styles.imageWrapper}>
               <Image alt="uni logo" height={102} objectFit="contain"
                         src={!data?.institution?.logoUrl ? `${awsUrl}/${data.institutionLogoUrl}` : `${awsUrl}/${data?.institution?.logoUrl}`}
                         width={308}/>
            </div>
            <QRCodeSVG size={110} value={`${process.env.NEXT_PUBLIC_FRONT_URL}/${data.did}`}/>
         </div>
         <div className={styles.certificateInner}>
            <div className={styles.left}>
               <div>
                  <Text grey small>THIS IS TO CERTIFY THAT</Text>
                  <Text bold>{data.graduatedName}</Text>
               </div>
               <div>
                  <Text grey small>WAS AWARDED THE QUALIFICATION OF</Text>
                  <Text bold>{data.qualificationName}</Text>
               </div>
               <div>
                  <Text grey small>GRADUATION DATE</Text>
                  <Text bold>{moment.utc(data.graduatedAt).format("DD/MM/YYYY")}</Text>
               </div>
            </div>
            <div className={styles.right}>
               {!sharePage
                  ? data.institution.representatives.map(item => {
                     return <div key={`${item.firstName}-${item.lastName}`} style={styles.rightItem}>
                        <div className={styles.imageWrapper}>
                           <Image alt="Signature" layout="fill" objectFit="contain"
                                        src={`${awsUrl}/${item.signatureUrl}`}/>
                        </div>
                        <Text semiBold small>{item.firstName} {item.lastName}</Text>
                        <Text semiBold small>{item.title}</Text>
                     </div>
                  })
                  : <div style={styles.rightItem}>
                     <div className={styles.imageWrapper}>
                        <Image alt="Signature" layout="fill" objectFit="contain"
                                  src={`${awsUrl}/${data.authenticatedBySignatureUrl}`}/>
                     </div>
                     <Text semiBold small>{data.authenticatedBy}</Text>
                     <Text semiBold small>{data.authenticatedTitle}</Text>
                  </div>}
            </div>
         </div>
         <div className={styles.bottom}>
            <div className={styles.imageWrapper}>
               {!sharePage
                  ? <Image alt="Stamp" layout="fill" src={`${awsUrl}/${data.institution.stampUrl}`}/>
                  : <Image alt="Stamp" layout="fill" src={`${awsUrl}/${data.institutionStampUrl}`}/>}
            </div>
            <Image alt="qk logo" height={80} src={qkLogo}
                      width={116}/>
            <Text blueSpan small>This certificate has been generated by <span>QualKey</span> using the
                  authenticated credentials of the issuing Academic institution. This is not the original
                  certificate issued by the Academic institution. </Text>
         </div>
      </div>
   )
}

Certificate.displayName = "Certificate"

export default Certificate