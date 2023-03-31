import React, { useEffect, useState } from "react";
import styles from './Login.module.css'
import { useNavigate } from "react-router-dom";
import SERVER_URL from "../../../connect/axios/axios";

import SetCookie from "../../../client/cookie/SetCookie"
import GetCookie from "../../../client/cookie/GetCookie"
import RemoveCookie from "../../../client/cookie/RemoveCookie"
import { COOKIE } from "../../../client/common/Constant"

import { notify_success, notify_fail } from "../../../client/common/Notification";

const Login = () => {
    // login
    const [nameLogin, setNameLogin] = useState('');
    const [passwordLogin, setPasswordLogin] = useState('');
    const [rememberLogin, setRememberLogin] = useState(GetCookie(COOKIE) ? JSON.parse(GetCookie(COOKIE)).remember : false);

    // sign_up
    const [nameSignUp, setNameSignUp] = useState('');
    const [emailSignUp, setEmailSignUp] = useState('');
    const [passwordSignUp, setPasswordSignUp] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');

    //valid
    const [valid, setValid] = useState({ valNameSignUp: 'none', valVerifyPassword: 'none' });

    // sign_up or login
    const [slideUp, setSlideUp] = useState({ signup: styles.slide_up, login: '' })

    useEffect(() => {
        if (GetCookie(COOKIE) ? JSON.parse(GetCookie(COOKIE)).remember : false) {
            setNameLogin(GetCookie(COOKIE) ? JSON.parse(GetCookie(COOKIE)).email : "")
            setPasswordLogin(GetCookie(COOKIE) ? JSON.parse(GetCookie(COOKIE)).password : '')
        }
    }, [rememberLogin]);


    // event sign_up
    const handleSignUp = (event) => {
        event.preventDefault();
        if (passwordSignUp === verifyPassword) {
            SERVER_URL.post(`/postUser`, {
                user_name: nameSignUp,
                email: emailSignUp,
                password: passwordSignUp,
            })
                .then((res) => {
                    if (res.data.status === 200) {
                        notify_success("sign-up");
                        // alert('Sign up success!');
                    }
                    else if (res.data.status === 409) {
                        notify_fail("sign-up");
                        // alert(res.data.message);
                    }
                    else {
                        notify_fail("sign-up");
                        // alert('Sign up fail!');
                    }
                })
                .catch(error => {
                    notify_fail("sign-up");
                    // alert(error);
                });
        }
        else {
            alert('Verify password does not match!');
        }
    }

    const navigate = useNavigate();

    // event login
    const handleLogin = (event) => {
        event.preventDefault();
        SERVER_URL.post(`/getToken`, {
            //TODO
            user_name: nameLogin,
            password: passwordLogin
        })
            .then((res) => {
                if (res.data.status === 200) {
                    // remember
                    RemoveCookie(COOKIE);
                    SetCookie(COOKIE, JSON.stringify({
                        remember: rememberLogin,
                        email: nameLogin,
                        password: passwordLogin,
                        token: res.data.token,
                        role: res.data.role
                    }));
                    notify_success("Login");
                    navigate("/dashboard");
                }
                else {
                    notify_fail("Login")
                    // alert('Login failed!');
                }
            })
            .catch(error => {
                notify_fail("Login")
                // alert('Login: ' + error);
            });
    }

    const handleCheckUser = (value) => {
        setNameSignUp(value);
        SERVER_URL.get(`/checkUserName?user_name=${value}`)
            .then((res) => {
                if (res.data.status === 200) {
                    setValid({ ...valid, valNameSignUp: 'none' });
                }
                else if (res.data.status === 409) {
                    setValid({ ...valid, valNameSignUp: 'block' });
                }
            })
            .catch(error => {
                if (error.data.status === 409) {
                    setValid({ ...valid, valNameSignUp: 'block' });
                } else {
                    setValid({ ...valid, valNameSignUp: 'block' });
                }
            });
    }

    const checkVerifyPassword = (verify, value) => {
        if (verify) {
            setVerifyPassword(value);
            if (value === passwordSignUp) {
                setValid({ ...valid, valVerifyPassword: 'none' });
            } else {
                setValid({ ...valid, valVerifyPassword: 'block' });
            }
        } else {
            setPasswordSignUp(value);
            if (value === verifyPassword) {
                setValid({ ...valid, valVerifyPassword: 'none' });
            } else {
                setValid({ ...valid, valVerifyPassword: 'block' });
            }
        }
    }

    return (
        <div className={styles.form_structor}>
            {/* sign_up */}
            <form onSubmit={handleSignUp}>
                <div className={styles.signup + " " + slideUp.signup}>
                    <h2 onClick={() => setSlideUp({ ...slideUp, signup: '', login: styles.slide_up })} className={styles.form_title}><span>or</span>Sign up</h2>
                    <div className={styles.form_holder}>
                        {/* <input required type="text" className={styles.input} placeholder="Name" onChange={e => { setNameSignUp(e.target.value) }} /> */}
                        <input
                            id="nameSignUp"
                            required
                            type="text"
                            className={styles.input}
                            placeholder="Name"
                            onChange={e => handleCheckUser(e.target.value)} />
                        <label
                            className={styles.checkValid}
                            htmlFor="nameSignUp"
                            style={{ display: valid.valNameSignUp }}>User Name Exist!</label>
                        <input
                            required
                            type="email"
                            className={styles.input}
                            placeholder="Email"
                            onChange={e => { setEmailSignUp(e.target.value) }} />
                        <input
                            required
                            type="password"
                            className={styles.input}
                            placeholder="Password"
                            onChange={e => { checkVerifyPassword(false, e.target.value) }} />
                        <input
                            id="verifyPassword"
                            required
                            type="password"
                            className={styles.input}
                            placeholder="Verify password"
                            onChange={e => { checkVerifyPassword(true, e.target.value) }} />
                        <label
                            className={styles.checkValid}
                            htmlFor="verifyPassword"
                            style={{ display: valid.valVerifyPassword }}>
                            Verify password does not match
                        </label>
                    </div>
                    <button type="submit" className={styles.submit_btn}>Sign up</button>
                </div>
            </form>
            {/* login */}
            <form onSubmit={handleLogin}>
                <div className={styles.login + " " + slideUp.login}>
                    <div className={styles.center}>
                        <h2 onClick={() => setSlideUp({ ...slideUp, signup: styles.slide_up, login: '' })} className={styles.form_title}><span>or</span>Log in</h2>
                        <div className={styles.form_holder}>
                            {/* user name */}
                            <input
                                required
                                type="text"
                                className={styles.input}
                                placeholder="Name"
                                value={nameLogin}
                                onChange={e => { setNameLogin(e.target.value) }} />
                            {/* password */}
                            <input
                                required
                                minLength={6}
                                type="password"
                                className={styles.input}
                                placeholder="Password to 6 characters or more"
                                value={passwordLogin}
                                onChange={e => { setPasswordLogin(e.target.value) }} />
                        </div>
                        <div>
                            {/* checkbox remember */}
                            <label className={styles.remember_checkbox}>
                                <input type="checkbox" defaultChecked={rememberLogin} onChange={e => { setRememberLogin(e.target.checked) }} />
                                <span className={styles.remember_checkmark}>Remember</span>
                            </label>
                        </div>
                        {/* button log_in */}
                        <button type="submit" className={styles.submit_btn} >Log in</button>
                    </div>
                </div>
            </form>
        </div >
    )
}

export default Login;