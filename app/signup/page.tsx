// import Formcomp from "../components/SignupComp/FormComp";
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const Formcomp = dynamic(() => import('../components/SignupComp/FormComp'), { ssr: false })

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
                        <Suspense fallback={<div>Loading ..</div>}>
                       <Formcomp/>
                       </Suspense>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup;