import React, {useEffect, useState} from 'react'
import { githubAuth_signup, githubAuth_signin } from '../../redux/auth/actions'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { Navigate, useNavigate } from 'react-router-dom'

interface IGithubAuth {}

export const GithubAuth:React.FC<IGithubAuth> = () => {
    const navigate = useNavigate()
    const dispatch: Dispatch<any> = useDispatch()
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const url = window.location.href;
        const hasCode = url.includes("?code=");

        // If Github API returns the code parameter
        if (hasCode) {
            const newUrl = url.split("?code=");
            const requestData = {
                code: newUrl[1],
                type: localStorage.getItem('githubState')
            };
            console.log(requestData);
            fetchData(requestData)
        }
        async function fetchData(requestData: any) {
            if(requestData.type == 'signup') {
                setLoading(true)
                const res: any = await dispatch(githubAuth_signup(requestData))
                setLoading(false)
                if(!res) {
                    navigate('/signup')
                }
            } else if (requestData.type == 'signin') {
                setLoading(true)
                const res: any = await dispatch(githubAuth_signin(requestData))
                setLoading(false)
                if(!res) {
                    navigate('/signin')
                }
            }
            
        }
    }, [])

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />
    }

    return (
        <div>
            {loading ? 'Your github account is authenticating' : 'This is authenticating page'}
        </div>
    )
}