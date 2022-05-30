import { useEffect, useState } from "react"

import styles from "./ModalSteps.module.scss"

const ModalSteps = ({ step, totalSteps }) => {
   
   const [stepCount, setStepCount] = useState([])
   
   useEffect(() => {
      setStepCount(new Array(totalSteps).fill(""))
      return () => {
         setStepCount([])
      }
   }, [])
   
   return (
      <div className={styles.wrapper}>
         {
            stepCount.map((s, i) => {
               return <span key={i} className={`${styles.item} ${step === (i+1) ? styles.active : ""}`}></span>
            })
         }
      </div>
   )
}

export default ModalSteps