import axios from "axios"
import getConfig from "next/config"
import { useRecoilState, useRecoilValue } from "recoil"

import { uploadModalState } from "../atoms/uploadModalState"
import Heading from "../components/UI/Heading/Heading"
import InstitutionSidebar from "../components/UI/Sidebar/InstitutionSidebar/InstitutionSidebar"
import Topbar from "../components/UI/Topbar/Topbar"
import Error from "./_error"

const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()

const apiUrl = serverRuntimeConfig.apiUrl || publicRuntimeConfig.apiUrl

export default function Dashboard({ value, serverErrorMessage }) {
   
   const openModal = useRecoilValue(uploadModalState)

   if (serverErrorMessage) return <Error serverErrorMessage={serverErrorMessage}/>

   return (
      <>
         <InstitutionSidebar/>
         <Topbar/>
         <div className="dashboard">
            <Heading blue h1 xxl>{value}</Heading>
         </div>
         {openModal && <h1>laksjdflaskj</h1>}
      </>
   )
}

export const getServerSideProps = async ({ req }) => {
   console.log(req.headers.cookie)
   try {
      const response = await axios.get(`${apiUrl}/credentials`, {
         withCredentials: true,
         headers: { Cookie: req.headers.cookie || "" }
      })
      const { data: value } = response
      return { props: { value } }
   } catch (error) {
      return { props: { serverErrorMessage: error.response.statusText } }
   }
}