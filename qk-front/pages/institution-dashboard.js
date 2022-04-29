import axios from "axios"
import getConfig from "next/config"

import Heading from "../components/UI/Heading/Heading"
import Error from "./_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function InstitutionDashboard({ value, statusCode }) {

   if (statusCode) return <Error statusCode={statusCode}/>

   return <Heading blue h2>{value}</Heading>
}

export const getServerSideProps = async ({ req }) => {
   console.log(req.headers.cookie)
   try {
      const response = await axios.get(`${apiUrl}/credentials/institution`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie }
      })
      const { data: value } = response
      return { props: { value } }
   } catch (error) {
      return { props: { statusCode: error.response.status } }
   }
}