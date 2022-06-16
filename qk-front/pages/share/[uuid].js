import Head from "next/head"

import SharedCredentialsItem from "../../components/DashboardItem/SharedCredentialsItem"
import EmployerView from "../../components/EmployerView/EmployerView"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"

export default function ShareCredentialsPage() {
   return(
      <>
         <Head>
            <title>Shared Credentials | QualKey</title>
         </Head>
         <EmployerView>
            <Heading blue h1 share><span>Jack</span> has shared their credentials with you</Heading>
            <Text large>view shared credentials</Text>
            <div className="content__wrapper">
               {["alo", "net"].map(item => {
                  return <SharedCredentialsItem key={item}/>
               })}
            </div>
         </EmployerView>
      </>
   )
}