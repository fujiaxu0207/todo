import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const defaultInfo = {
        userName: "23423",
        password: "",
    };
    const [info, setInfo] = useState(defaultInfo);
    const [isLogin, setIsLogin] = useState(false);
    useEffect(() => {
        window.sendCallbackRes = (res) => {
            if (!res) {
                alert("failed");
            } else {
                alert("sucess");
                setIsLogin(res);
            }
        };
    }, []);
    const handleChange = (flag,e)=>{
      console.log(flag,e.target.value);
      switch(flag) {
        case 0: 
          setInfo({
            ...info,
            userName:e.target.value
          });
          break;
        case 1:
          setInfo({
            ...info,
            password:e.target.value
          });
          break;
        default:
          return;
      }
    }
    const handleOk = () => {
      alert("登录中");
    }
    return (
        <div className="login-wrapper">
            <div className="login-header">登录</div>
            <div className="login-input">
                <input type="text" value={info.userName} onChange={e=>{handleChange(0,e)}}/>
                <br/>
                <input type="password" value={info.password} onChange={e=>{handleChange(1,e)}}/>
            </div>
            <div className="login-btn">
              <button onClick={handleOk}>登录</button>
              <button>注册</button>
            </div>
        </div>
    );
}

export default App;
