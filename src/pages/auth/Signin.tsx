

import { SigninForm } from "@/components/SigninForm";
import sidebar from "../../assets/Frame 1618874405.svg"

export default function SigninPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row ">
      {/* Left Sidebar - Dark with green mesh pattern */}
      <div className="w-full md:w-5/12 lg:w-4/12 bg-beam-dark">
      <img  src={sidebar}/>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full md:w-7/12 lg:w-8/12 bg-white flex items-center justify-center py-10 px-6 md:px-12 lg:px-24">
<SigninForm/>
      </div>
    </div>
  );
}
