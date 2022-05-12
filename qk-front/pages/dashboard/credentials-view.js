import { useEffect } from "react"

import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"
import { useRouter } from "next/router"

import InstitutionView from "../../components/Institution/InstitutionView/InstitutionView"
import Heading from "../../components/UI/Heading/Heading"
import Text from "../../components/UI/Text/Text"
import { userRoles } from "../../utils"
import Error from "../_error"

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
            <Heading blue h1 xxl>View Credentials</Heading>
            <Text large>browse all credential records</Text>
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