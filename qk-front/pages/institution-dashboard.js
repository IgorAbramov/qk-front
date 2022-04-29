import axios from "axios"
import getConfig from "next/config"

import Heading from "../components/UI/Heading/Heading"
import Error from "./_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function InstitutionDashboard({ json, statusCode }) {

   if (statusCode) return <Error statusCode={statusCode}/>

   return <Heading blue h2>Institution dashboard page + {json.ok}</Heading>
}

export const getServerSideProps = async ({ req }) => {
   console.log(req.headers.cookie)
   try {
      const testResponse = await axios.get(`${apiUrl}/auth/test1`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie }
      })
      const { data: json } = testResponse
      return { props: { json } }
   } catch (error) {
      return { props: { statusCode: error.response.status } }
   }
}