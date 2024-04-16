// import Formcomp from "../components/SigninComp/Formcomp";
import dynamic from 'next/dynamic';

const Formcomp = dynamic(() => import('../components/SigninComp/Formcomp'), { ssr: false })
const Signin = () => {

    return (
        <>
            <div className="bg-[#7f7f7f] h-screen ">
                <div className="flex justify-center items-center h-full">
                    <div className="bg-white p-8 rounded-lg ">
                        <div className="flex justify-center text-3xl font-bold">
                            Sign In
                        </div>
                        <div className="flex justify-center text-gray-500 py-4 text-center pb-8 px-8">
                            Enter your Credentials to Access your <br />
                            account
                        </div>
                        <Formcomp/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signin;