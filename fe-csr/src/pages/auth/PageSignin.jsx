import {Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {useContext, useEffect} from "react";
import {REDUCER_OBJECT_ACTIONS, ROOT_PAGE, TOKEN_KEY, TOKEN_RESOURCE, TOKEN_RESOURCES} from "../../config/constants.js";
import ContextGeneric from "../../contexts/ContextGeneric.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import logoImg from '../../assets/logo.svg'
import loginImg from '../../assets/login.jpg'

const PageSignin = () => {
    const navigate = useNavigate();
    const { login, users } = useContext(ContextGeneric);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        users.reducer.objects.dispatch({type: REDUCER_OBJECT_ACTIONS.SET, data: {[name]: value}})
    }

    //state untuk get data
    // dispatch untuk set data ataupun clear data
    const signIn = () => {
        const {username,password} = users.reducer.objects.state
        login.http.create.execute({username,password})
            .then((response) => {
                // console.log("haha", response.data.token)
                if (TOKEN_RESOURCE === TOKEN_RESOURCES.SESSION_STORAGE) {
                    sessionStorage.setItem(TOKEN_KEY, response.data.token);
                } else if (TOKEN_RESOURCE === TOKEN_RESOURCES.LOCAL_STORAGE) {
                    localStorage.setItem(TOKEN_KEY, response.data.token);
                }
                localStorage.setItem("menu", JSON.stringify(response.data.menu))
                navigate("/home")
                // console.log(response);
            }).catch((error) => {
            console.log(error)
        })
    }



    return (
        <main>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-6 login-section-wrapper">
                        <div className="brand-wrapper">
                            <img className='logo' src={logoImg} alt="logo"/>
                            {/*<img src="assets/images/logo.svg" alt="logo" className="logo"/>*/}
                        </div>
                        <div className="login-wrapper my-auto">
                            <h1 className="login-title">Log in</h1>
                            {/*<form action="#!">*/}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    placeholder="enter username / phone / email"
                                    name={"username"}
                                    size="lg"
                                    onChange={handleChange}
                                    value={users.reducer.objects.state.username || ""}
                                    className="form-control"
                                />
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password">Password</label>
                                <input
                                    type={"password"}
                                    name={"password"}
                                    size="lg"
                                    onChange={handleChange}
                                    value={users.reducer.objects.state.password || ""}
                                    className="form-control"
                                    placeholder="enter your passsword"/>
                            </div>
                            <div className="d-grid gap-2">
                                <Button className="btn btn-block login-btn" size="lg" onClick={signIn} variant="primary">
                                    Sign In
                                </Button>
                            </div>
                            <a href="#/forgotpwd" className="forgot-password-link">Forgot password?</a>
                            <p className="login-wrapper-footer-text">Don't have an account? <a href="#/signup" className="text-reset">Register
                                here</a></p>
                        </div>
                    </div>
                    <div className="col-sm-6 px-0 d-none d-sm-block">
                        <img src={loginImg} alt="login image" className="login-img"/>
                    </div>
                </div>
            </div>
        </main>
    )
}

//agar bisa diimport di modul lain dan harus di daftarkan di App.jsx
export default PageSignin;