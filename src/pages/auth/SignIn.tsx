import React, {useState} from 'react'
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth/actions'
import { Navigate } from 'react-router-dom'

interface ISignInProps {}

export const SignIn:React.FC<ISignInProps> = () => {
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const dispatch: Dispatch<any> = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [loading, setLoading] = useState(false)
    const onChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onLogin = async () => {
        setLoading(true)
        await dispatch(login(formData))
        setLoading(false)
    }
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }
    return (
        <React.Fragment>
            <div className="hero pt-20">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left ml-5">
                        <h1 className="text-5xl font-bold">Login now!</h1>
                        <p className="py-6 text-xl">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <div className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input 
                                    type="text" 
                                    placeholder="email" 
                                    className="input input-bordered" 
                                    name="email" 
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
                                    name="password"
                                    value={formData.password}
                                    onChange={onChange}
                                />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className={`btn btn-primary ${loading ? 'loading' : ''}`} onClick={() => onLogin()}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}