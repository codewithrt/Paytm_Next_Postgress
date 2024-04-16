import Formcomp from "../components/SignupComp/FormComp";

const Signup = () => {
   
    return (
        <>
            <div className="bg-[#7f7f7f] h-screen ">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-white p-8 rounded-lg ">
                        <div className="flex justify-center text-3xl font-bold">
                            Sign Up
                        </div>
                        <div className="flex justify-center text-gray-500 py-4 text-center pb-8 px-8">
                            Enter your information to create an <br />
                            account
                        </div>
                       <Formcomp/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;