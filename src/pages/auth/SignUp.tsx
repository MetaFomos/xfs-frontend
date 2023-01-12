import React, {useEffect, useState} from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { register, socialMediaSignUp } from '../../redux/auth/actions'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { gapi } from 'gapi-script'

const google_client_id = '255335071356-qqfb9le0dio476c0mib60o1lkhfl0dce.apps.googleusercontent.com'
const github_client_id = 'db84e790d9f940d5dd2e'
const github_redirect_url = 'https://ox-explorer.com/githubauth'

interface ISignUpProps {}

export const SignUp:React.FC<ISignUpProps> = () => {
    useEffect(() => {
        // Google Auth
        const initClient = () => {
            gapi.client.init({
                clientId: google_client_id,
                scope: ''
            });
         };
         gapi.load('client:auth2', initClient);
        //  Google Auth end
    }, []);
    
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
    const dispatch: Dispatch<any> = useDispatch()
    const [formData, setFormData] = useState({
        userName: '',
        gitName: '',
        email: '',
        password: '',
        confirmPassword: ''
    }) 
    const [loading, setLoading] = useState(false)
    const onChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const onSignUp = async () => {
        if (formData.password !== formData.confirmPassword) {
            toast.warning("Don't match the password!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });   
        } else {
            setLoading(true)
            await dispatch(register(formData))
            setLoading(false)
        }
    }
    /* GOOGLE SIGNUP */
    const responseGOAuthSignup = async (authResponse: any) => {
        console.log('GL authResponse >> ', authResponse)
        if (!authResponse.error) {
            let body = {
                ...authResponse,
                register_type: 'GOOGLE'
            }
            await dispatch(socialMediaSignUp(body));
        }
    }
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <React.Fragment>
            <div className="w-full h-[85vh] flex items-center">
                <div className="w-full lg:w-4/12 px-4 m-auto">
                    <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                        <div className="rounded-t mb-0 px-6 py-6">
                            <div className="text-center mb-3">
                                <h6 className="text-gray-600 text-sm font-bold">
                                    Sign up with
                                </h6>
                            </div>
                            <div className="btn-wrapper text-center flex justify-center items-center gap-2">
                                <a href={`https://github.com/login/oauth/authorize?scope=user&client_id=${github_client_id}&redirect_uri=${github_redirect_url}`} className="g-login pt-1">
                                    <button
                                        className="font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 inline-flex items-center font-bold text-[14px]"
                                        type="button"
                                        style={{ transition: "all .15s ease" }} 
                                        onClick={() => {localStorage.setItem('githubState', 'signup')}}
                                    >
                                        <img
                                            alt="..."
                                            className="w-6 mr-4"
                                            src={"/assets/img/github.svg"}
                                        />
                                        Github
                                    </button>
                                </a>
                                <GoogleLogin className='g-login'
                                    clientId={google_client_id}
                                    buttonText="Google"
                                    onSuccess={responseGOAuthSignup}
                                    onFailure={responseGOAuthSignup}
                                    // cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <hr className="mt-6 border-b-1 border-gray-400" />
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                            <div className="text-gray-500 text-center mb-3 font-bold">
                                <small>Or sign up with credentials</small>
                            </div>
                            <form>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        User name
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Email"
                                        style={{ transition: "all .15s ease" }}
                                        name="userName" 
                                        value={formData.userName} 
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Github username
                                    </label>
                                    <input
                                        type="text"
                                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Email"
                                        style={{ transition: "all .15s ease" }}
                                        name="gitName" 
                                        value={formData.gitName} 
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Email"
                                        style={{ transition: "all .15s ease" }}
                                        name="email" 
                                        value={formData.email} 
                                        onChange={onChange}
                                    />
                                </div>

                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Password"
                                        style={{ transition: "all .15s ease" }}
                                        name="password"
                                        value={formData.password}
                                        onChange={onChange}
                                    />
                                </div>
                                <div className="relative w-full mb-3">
                                    <label
                                        className="block uppercase text-gray-700 text-xs font-bold mb-2"
                                        htmlFor="grid-password"
                                    >
                                        Confirm password
                                    </label>
                                    <input
                                        type="password"
                                        className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                        placeholder="Password"
                                        style={{ transition: "all .15s ease" }}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={onChange}
                                    />
                                </div>
                                <div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            id="customCheckLogin"
                                            type="checkbox"
                                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                                            style={{ transition: "all .15s ease" }}
                                        />
                                        <span className="ml-2 text-sm font-semibold text-gray-700">
                                        Remember me
                                        </span>
                                    </label>
                                </div>

                                <div className="text-center mt-6">
                                    <button type="button" className={`btn btn-dark w-full ${loading ? 'loading' : ''}`} onClick={onSignUp}>Sign Up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}