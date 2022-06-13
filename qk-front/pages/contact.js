import axios from "axios"
import getConfig from "next/config"
import Head from "next/head"

import InstitutionView from "../components/Institution/InstitutionView/InstitutionView"
import StudentView from "../components/Student/StudentView/StudentView"
import Heading from "../components/UI/Heading/Heading"
import { userRoles } from "../utils"
import Error from "./_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function Contact({ userData, notificationsData, serverErrorMessage }) {

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   const { role } = userData

   if (role === userRoles.institution) return (
      <>
         <Head>
            <title>Contact Us | QualKey</title>
         </Head>
         <InstitutionView institution notificationsData={notificationsData} userData={userData}>
            <Heading blue h1>Contact Us</Heading>
         </InstitutionView>
      </>
   )

   if (role === userRoles.student) return (
      <>
         <Head>
            <title>Contact Us | QualKey</title>
         </Head>
         <StudentView notificationsData={notificationsData} userData={userData}>
            <Heading blue h1>Contact Us</Heading>
         </StudentView>
      </>
   )
}

export const getServerSideProps = async (ctx) => {
   const { req } = ctx

   try {
      const responseUser = await axios.get(`${apiUrl}/user/me`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const responseNotifications = await axios.get(`${apiUrl}/action`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data: userData } = responseUser
      const { data: notificationsData } = responseNotifications
      return { props: { userData, notificationsData } }
   } catch (error) {
      console.log(error)
      return { props: { serverErrorMessage: error.response ? error.response.statusText : "Something went wrong" } }
   }
}