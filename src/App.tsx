import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ERoute } from './constants'
import './App.css'
import setAuthToken from './utils/setAuthToken'
import store from './redux/store'
import { loadUser } from './redux/auth/actions'
import { LOGOUT } from './redux/action_types'
import PrivateRoute from './components/PrivateRoute'
// pages
import { NotFound } from './pages/notFound/NotFound'
import { Dashboard } from './pages/dashboard/Dashboard';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';
import { CreateIdea } from './pages/idea/CreateIdea'
import { PendingIdea } from './pages/idea/PendingIdea'
import { ApprovedIdea } from './pages/idea/ApprovedIdea'
import { ProposedIdea } from './pages/idea/ProposedIdea'
import { FundRequiredIdea } from './pages/idea/FundRequiredIdea'
import { InProgressIdea } from './pages/idea/InProgressIdea'
import { CompletedIdea } from './pages/idea/CompletedIdea'

interface IAppProps {}

export const App:React.FC<IAppProps> = () => {
  const location = useLocation();

  // check for token in LS
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  
  store.dispatch(loadUser());

  // log user out from all tabs if they log out in one tab
  window.addEventListener('storage', () => {
    if (!localStorage.token) store.dispatch({ type: LOGOUT });
  });

  return (
    <div className='app'>
      <Header />
      <div className='container mx-auto p-5'>
        <Routes location={location}>
          <Route path={ERoute.DEFAULT} element={<PrivateRoute component={Dashboard} />}></Route>
          <Route path={ERoute.DASHBOARD} element={<PrivateRoute component={Dashboard} />}></Route>
          <Route path={ERoute.CREATEIDEA} element={<PrivateRoute component={CreateIdea} />}></Route>
          <Route path={ERoute.PENDING} element={<PrivateRoute component={PendingIdea} />}></Route>
          <Route path={ERoute.APPROVED} element={<PrivateRoute component={ApprovedIdea} />}></Route>
          <Route path={ERoute.PROPOSED} element={<PrivateRoute component={ProposedIdea} />}></Route>
          <Route path={ERoute.FUNDREQUIRED} element={<PrivateRoute component={FundRequiredIdea} />}></Route>
          <Route path={ERoute.INPROGRESS} element={<PrivateRoute component={InProgressIdea} />}></Route>
          <Route path={ERoute.COMPLETED} element={<PrivateRoute component={CompletedIdea} />}></Route>
          <Route path={ERoute.SIGNIN} element={<SignIn />}></Route>
          <Route path={ERoute.SIGNUP} element={<SignUp />}></Route>
          {/* <Route path='*' element={<NotFound />} /> */}
        </Routes>
      </div>
      {/* <Footer /> */}
    </div>
  )
}

export default App;