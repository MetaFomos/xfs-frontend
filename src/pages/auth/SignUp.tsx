import React, {useEffect, useState} from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/auth/actions'
import { toast } from 'react-toastify'
import { Navigate } from 'react-router-dom'

interface ISignUpProps {}

export const SignUp:React.FC<ISignUpProps> = () => {
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
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
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

    return (
        <React.Fragment>
            <div className="hero pt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="ml-5 text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6 text-xl">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User name</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Name" 
                                    className="input input-bordered" 
                                    name='userName'
                                    value={formData.userName} 
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Github username</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="Github username" 
                                    className="input input-bordered" 
                                    name='gitName'
                                    value={formData.gitName} 
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="email" 
                                    className="input input-bordered" 
                                    name='email'
                                    value={formData.email} 
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="password" 
                                    className="input input-bordered" 
                                    name='password' 
                                    value={formData.password} 
                                    onChange={onChange}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input 
                                    type="password" 
                                    placeholder="password" 
                                    className="input input-bordered" 
                                    name='confirmPassword' 
                                    value={formData.confirmPassword} 
                                    onChange={onChange}
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className={`btn btn-primary ${loading ? ' loading' : ''}`} onClick={() => onSignUp()}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}