import {useContext, useState} from "react";
import {Navigate} from "react-router-dom";
import {HomePage} from "./HomePage";
import {userInfo} from "node:os";
import {UserContext} from "../../UserContext";

export const LoginPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [redirect, setRedirect] = useState(false);

    const context = useContext(UserContext)!
    const { setUserInfo, userInfo } = context;

    async function login(ev: any){
        ev.preventDefault();

        const response = await fetch('http://localhost:4000/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {'Content-Type':'application/json'},
            credentials: 'include',
        });

        if(response.ok){
            response.json().then(userInfo => {
                setUserInfo(userInfo);
                setRedirect(true);
            });
        }else{
            alert('Invalid credentials. Please try again.');
        }
    }

    if(redirect) {
        return <Navigate to={'/'}/>
    }

    return (
        <form className="max-w-[500px] flex flex-col mx-auto items-center gap-5 mt-24 max-sm:mx-10" onSubmit={login}>
            <h1 className="text-center text-5xl font-bold font-sans mb-8">Login</h1>

            <input
                type="text" placeholder="username"
                className="p-3 border-2 border-gray-300 bg-gray-100 rounded-xl m-2 w-full"
                value={username}
                onChange={(e) => {setUsername(e.target.value)}}
            />

            <input
                type="password" placeholder="password"
                className="p-3 border-2 border-gray-300 bg-gray-100 rounded-xl m-2 w-full"
                value={password}
                onChange={(e) => {setPassword(e.target.value)}}
            />

            <button
                className="w-64 bg-black text-white rounded-xl p-2 mt-4"
            >
                Login
            </button>
        </form>
    );
};
