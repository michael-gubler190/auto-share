import { useState, type ChangeEvent, type SubmitEvent } from "react"
import { useRegister } from "../hooks/useAuth";
import type { RegisterRequest } from "../types/auth";

function RegisterForm() {
    const registerMutation = useRegister();

    const [inputInfo, setInputInfo] = useState<RegisterRequest>({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        password: ""
    });


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setInputInfo({
            ...inputInfo,
            [event.target.name]: event.target.value
        });
    }


    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        registerMutation.mutate(inputInfo, {
            onSuccess: () => {
                
            }
        });
    }


  return (
    <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-5'>
            <input onChange={handleChange} value={inputInfo["fullName"]} name="fullName" className='border border-mist-300 rounded-md p-3 col-span-1 focus:outline-1 focus:outline-sky-500' type="text" placeholder='Full name'/>
            <input onChange={handleChange} value={inputInfo["username"]} name="username" className='border border-mist-300 rounded-md p-3 col-span-1 focus:outline-1 focus:outline-sky-500' type="text" placeholder='Username'/>

            <input onChange={handleChange} value={inputInfo["email"]} name="email" className='border border-mist-300 rounded-md p-3 col-span-1 focus:outline-1 focus:outline-sky-500' type="email" placeholder='Email'/>
            <input onChange={handleChange} value={inputInfo["phone"]} name="phone" className='border border-mist-300 rounded-md p-3 col-span-1 focus:outline-1 focus:outline-sky-500' type="tel" placeholder='Phone'  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"/>

            <input onChange={handleChange} value={inputInfo["password"]} name="password" className='border border-mist-300 rounded-md p-3 col-span-2 focus:outline-1 focus:outline-sky-500' type="password" placeholder='Password'/>

            <button disabled={registerMutation.isPending} type='submit' className='col-span-2 bg-sky-500 hover:bg-sky-400 transition text-white p-3 font-medium text-xl mt-3 rounded-full cursor-pointer'>
                {registerMutation.isPending ? "Creating account..." : "Submit"}
            </button>
        </div>


        {registerMutation.isError && (
            <div className="mt-5 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">Oops! What happend?</p>
                <ul className="col-span-2 p-3 space-y-1">
                    {((registerMutation.error as any)?.response?.data?.message ?? "Registration failed")
                        .split(", ")
                        .map((error: string, index: number) => (
                            <li key={index} className="text-orange-700 text-sm flex items-start gap-2">
                                <span className="mt-1 w-1.5 h-1.5 rounded-full bg-orange-700 shrink-0" />
                                {error.split(": ")[1]}
                            </li>
                        ))
                    }
                </ul>
            </div>
        )}

    </form>
  )
}

export default RegisterForm;