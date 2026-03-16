import { SparklesIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useModal } from "../hooks/useModal";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const { isAuthenticated, logout } = useAuth();

    const navigate = useNavigate();
    const registerModal = useModal();
    const loginModal = useModal();

  return (
    <div className="bg-sky-500 text-white py-5">
        <div className="sm:container mx-auto flex align-middle items-center justify-between">
            <h1 className="text-3xl font-bold cursor-pointer" onClick={() => navigate("/")}>
                AutoShare
            </h1>

            {isAuthenticated ? (
                <button onClick={logout} type="button" className="flex items-center gap-1 text-sky-500 bg-white box-border border border-transparent shadow-xs font-bold leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">
                    <span>Logout</span>
                </button>
            ) : (
                <div className="flex gap-5">
                    <button onClick={loginModal.open} type="button" className="flex items-center gap-1 text-sky-500 bg-white box-border border border-transparent shadow-xs font-bold leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">
                        <span>Login</span>
                    </button>

                    <button onClick={registerModal.open} type="button" className="flex items-center gap-1 text-sky-500 bg-white box-border border border-transparent shadow-xs font-bold leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">
                        <span>Sign up</span>
                    </button>
                </div>
            )}

            <div>
                <button type="button" className="flex items-center gap-1 text-sky-500 bg-white box-border border border-transparent shadow-xs font-bold leading-5 rounded-full text-sm px-4 py-2.5 focus:outline-none hover:cursor-pointer">
                    <SparklesIcon className="size-5"/>
                    <span>Ask AutoShare</span>
                </button>
            </div>
        </div>

        <Modal
            isOpen={registerModal.isOpen}
            onClose={registerModal.close}
            title="Sign up"
        >
            <RegisterForm />
        </Modal>

        <Modal
            isOpen={loginModal.isOpen}
            onClose={loginModal.close}
            title="Login"
        >
            <LoginForm />
        </Modal>
    </div>
  )
}

export default Navbar