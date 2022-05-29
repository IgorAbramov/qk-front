import Sidebar from "../../UI/Sidebar/Sidebar"
import Topbar from "../../UI/Topbar/Topbar"

const StudentView = ({ children, userData }) => {
   return (
      <div className="main__wrapper">
         <Sidebar/>
         <Topbar userData={userData}/>
         <div className="dashboard">
            {children}
         </div>
      </div>
   )
}

export default StudentView