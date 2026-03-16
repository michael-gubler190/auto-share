import { useState, type ChangeEvent, type SubmitEvent } from "react";
import { useLogin } from "../hooks/useAuth"
import type { LoginRequest } from "../types/auth";
import { useAuth } from "../context/AuthContext";

function LoginForm() {
    const loginMutation = useLogin();
    const { setUserAndStore } = useAuth();

    const [loginInfo, setLoginInfo] = useState<LoginRequest>({
        email: "",
        password: ""
    });


    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setLoginInfo({
            ...loginInfo,
            [event.target.name]: event.target.value
        });
    }


    function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();
        loginMutation.mutate(loginInfo, {
            onSuccess: (data) => {
                setUserAndStore(data);
            }
        });
    }


  return (
    <form method="POST" onSubmit={handleSubmit}>
        <div className='grid grid-cols-2 gap-5'>
            <input onChange={handleChange} name="email" value={loginInfo["email"]} className='border border-mist-300 rounded-md p-3 col-span-2 focus:outline-1 focus:outline-sky-500' type="email" placeholder='Email'/>
            <input onChange={handleChange} name="password" value={loginInfo["password"]} className='border border-mist-300 rounded-md p-3 col-span-2 focus:outline-1 focus:outline-sky-500' type="password" placeholder='Password'/>

            <button disabled={loginMutation.isPending} type='submit' className='col-span-2 bg-sky-500 hover:bg-sky-400 transition text-white p-3 font-medium text-xl mt-3 rounded-full cursor-pointer'>
                {loginMutation.isPending ? "Logging in..." : "Submit"}
            </button>
        </div>


        {loginMutation.isError && (
            <div className="mt-5 bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
                <p className="font-bold">Oops! What happend?</p>
                <ul className="col-span-2 p-3 space-y-1">
                    {((loginMutation.error as any)?.response?.data?.message ?? "Login failed")
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

export default LoginForm