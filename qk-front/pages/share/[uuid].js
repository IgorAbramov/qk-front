import Head from "next/head"

import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"

export default function ShareCredentialsPage() {
   return(
      <>
         <Head>
            <title>Shared Credentials | QualKey</title>
         </Head>
         <EmployerView>
            <Heading blue h1 share><span>Jack</span> has shared their credentials with you</Heading>
         </EmployerView>
      </>
   )
}