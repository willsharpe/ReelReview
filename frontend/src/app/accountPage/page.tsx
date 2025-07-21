import { SlLogout } from "react-icons/sl";





function AccountPage(props:any){
    
    return(
        <div>
            <button className="px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 transition-colors duration-200">
                <SlLogout />
            </button>
        </div>
    )
}
export default AccountPage