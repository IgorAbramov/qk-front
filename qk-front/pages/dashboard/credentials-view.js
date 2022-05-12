import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"

import InstitutionCredentialsInfo from "../../components/Institution/InstitutionCredentialsInfo/InstitutionCredentialsInfo"
import InstitutionViewCredentialsItem from "../../components/Institution/InstitutionItem/InstitutionViewCredentialsItem"
import InstitutionView from "../../components/Institution/InstitutionView/InstitutionView"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"
import { userRoles } from "../../utils"
import Error from "../_error"

const mockDataView = {
   student: "Andrew Feinstein",
   diploma: "BA Computer Science and Engineering",
   status: "Uploaded",
   lastModified: 1652112363,
   information: {
      authenticatedBy: "Mr. M. Caine",
      authenticatedTitle: "Head of Registrars",
      authenticatedDate: 1652112363,
      awardingInstitution: "Middlesex University",
      qualificationName: "BS of Science",
      qualificationLevel: "Masters",
      awardLevel: "",
      graduatedName: "Andrew Feinstein",
      studyStartedAt: "01/10/2001",
      studyEndedAt: "07/12/2019",
      graduatedAt: "03/04/2023",
      studyLanguage: "English",
      expiresAt: "06/02/2022",
      info: ""
   }
}

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function CredentialsView({ data, serverErrorMessage }) {

   //TODO: Should be dynamic route!
   //TODO: Change request address according to logic and make it return role.

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   const { role, value } = data

   if (role === userRoles.institution) return (
      <>
         <Head>
            <title>View Credentials | QualKey</title>
         </Head>
         <InstitutionView>
            <Heading blue h1>View Credentials</Heading>
            <Text large>browse all credential records</Text>
            <InstitutionViewCredentialsItem data={mockDataView}/>
            <InstitutionCredentialsInfo data={mockDataView.information}/>
            <div className="withdraw__button">
               <Text grey>- Withdraw Credentials -</Text>
            </div>
         </InstitutionView>
      </>
   )

   if (role === userRoles.student) return (
      <Heading blue h1>{value}</Heading>
   )

}

export const getServerSideProps = async ({ req }) => {
   try {
      const response = await axios.get(`${apiUrl}/credential`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data } = response
      return { props: { data } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response.statusText } }
   }
}