import { useEffect, useRef, useState } from "react";
import { request } from "./service";
import "./App.css";

/**
 * 登录：
 * myTodo://login?xxxxx
 * myTodo://close?result=
 */

function App() {
    const defaultInfo = {
        userName: "",
        password: "",
    };
    const [info, setInfo] = useState(defaultInfo);
    const [isLogin, setIsLogin] = useState(false); // 是否在登录中
    const [timerId, setTimerId] = useState(0);
    const noticeRef = useRef();
    useEffect(() => {
        /**
         *
         * @param {obj} res
         * {
         *  type: "login" | "register"
         *  result: boolean
         *  reson?: string; 失败原因
         * }
         */
        window.sendCallbackRes = (res) => {
            switch (res?.type) {
                case "login":
                    setIsLogin(false);
                    if (res.result) {
                        request("close", { result: true });
                        noticeRef.current.innerText = "登录成功，即将跳转";
                        clearTimeout(timerId);
                    } else {
                        request("close", { result: false });
                        noticeRef.current.innerText = "登录失败，请重新登录";
                        alert(res.reson);
                    }

                    break;
                case "register":
                    break;
                default:
                    break;
            }
        };
    }, []);
    const handleChange = (flag, e) => {
        console.log(flag, e.target.value);
        switch (flag) {
            case 0:
                setInfo({
                    ...info,
                    userName: e.target.value,
                });
                break;
            case 1:
                setInfo({
                    ...info,
                    password: e.target.value,
                });
                break;
            default:
                return;
        }
    };
    const handleLogin = () => {
        if (!isLogin) {
            // request("login", info);
            window.userLoginAndRegister.login(info.userName,info.password);
            setIsLogin(true);
            noticeRef.current.innerText = "登录中。。。";
            const id = setTimeout(() => {
                noticeRef.current.innerText = "登录超时！！！";
                setIsLogin(false);
            }, 3000);
            setTimerId(id);
        }
    };
    const handleRegister = () => {
        window.userLoginAndRegister.register(info.userName,info.password);
        noticeRef.current.innerText = "注册中。。。";
    }   
    return (
        <div className="login-wrapper">
            <div className="login-header">我的待办</div>
            <div className="login-input">
                <input
                    type="text"
                    value={info.userName}
                    onChange={(e) => {
                        handleChange(0, e);
                    }}
                />
                <br />
                <input
                    type="password"
                    value={info.password}
                    onChange={(e) => {
                        handleChange(1, e);
                    }}
                />
            </div>
            <div className="login-btn">
                <button onClick={handleLogin} className="btn">登录</button>
                <button onClick={handleRegister} className="btn">注册</button>
            </div>
            <div className="notice" ref={noticeRef}></div>
        </div>
    );
}

export default App;
