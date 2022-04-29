import getConfig from "next/config"

import Heading from "../components/UI/Heading/Heading"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function StudentDashboard({ json }) {
   console.log(json)
   return <Heading blue h2>Student dashboard page</Heading>
}

export const getServerSideProps = async () => {
   try {
      const res = await fetch(`${apiUrl}/auth/test1`)
      const json = await res.json()
      return { props: { json } }
   } catch (error) {
      return { notFound: true }
   }
}