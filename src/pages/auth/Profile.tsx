import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Dispatch } from 'redux'
import { editProfile, changePassword, avatarImgSaveAction } from '../../redux/auth/actions'
import { toast } from 'react-toastify'

export const Profile = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const user = useSelector((state: any) => state.auth.user);
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
  const [loading, setLoading] = useState(false)
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    userName: '',
    gitName: '',
    email: '',
    curPassword: '',
    resetPassword: ''
  }) 
  const [tabIndex, setTabIndex] = useState(1)

  const onChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onEditProfile = async () => {

    setLoading(true)
    const data = new FormData()
    if(files) {
      for (var i = 0; i < files.length; i++) {
          data.append('files[]', files[i])
      }
    }
    data.append('userName', formData.userName);
    data.append('gitName', formData.gitName);
    data.append('email', formData.gitName);
    await dispatch(editProfile(data))
    setLoading(false)
  }

  const onChangePassword = async () => {
    setLoading(true)
    await dispatch(changePassword(formData))
    setLoading(false)
  }

  const onChangeUpload = (e: any) => {
    setFiles(e.target.files);
}

  useEffect(() => {
    setFormData({
      ...formData,
      userName: user.name,
      gitName: user.github,
      email: user.email
    })
  }, [user]);

  return (
    <>
      <section className="relative block" style={{ height: "500px" }}>
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-50 bg-black"
          ></span>
        </div>
        <div
          className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
          style={{ height: "70px" }}
        >
          <svg
            className="absolute bottom-0 overflow-hidden"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon
              className="text-gray-300 fill-current"
              points="2560 0 2560 100 0 100"
            ></polygon>
          </svg>
        </div>
      </section>
      <section className="relative py-16 bg-gray-300">
        <div className="container mx-auto px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
            <div className="px-6">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                  <div className="relative">
                    {isAuthenticated ? (
                      user.register_type === 'NORMAL_SIGNUP' 
                        ? <img
                            alt="..."
                            src={`assets/img/${user.avatar}`}
                            className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                            style={{ maxWidth: "150px" }}
                          />
                        : <img src={user.avatar} />
                    ) : (
                      <img
                        alt="..."
                        src={"assets/img/defaultUser.png"}
                        className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16"
                        style={{ maxWidth: "150px" }}
                      />
                    )}
                    
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                  <div className="py-6 px-3 mt-32 sm:mt-0">
                    <label></label>
                  </div>
                </div>
                <div className="w-full lg:w-4/12 px-4 lg:order-1">
                  <div className="flex justify-center py-4 lg:pt-4 pt-8">
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        22
                      </span>
                      <span className="text-sm text-gray-500">Friends</span>
                    </div>
                    <div className="mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        10
                      </span>
                      <span className="text-sm text-gray-500">Photos</span>
                    </div>
                    <div className="lg:mr-4 p-3 text-center">
                      <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
                        89
                      </span>
                      <span className="text-sm text-gray-500">Comments</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tabs tabs-boxed">
                <span onClick={() => { setTabIndex(1) }} className={`tab ${tabIndex == 1 && 'tab-active'}`}>Summary</span> 
                <span onClick={() => { setTabIndex(2) }} className={`tab ${tabIndex == 2 && 'tab-active'}`}>Edit Profile</span> 
                <span onClick={() => { setTabIndex(3) }} className={`tab ${tabIndex == 3 && 'tab-active'}`}>Change Password</span>
              </div>
              {tabIndex == 1 && (
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    {user.name}
                  </h3>
                  <div className="text-lg leading-normal mt-0 mb-2 text-gray-500 font-bold">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    <a href={`mailto:${user.email}`} target="_blank">{user.email}</a>
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    Joined At - {new Date(user.date).toDateString()}
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    Github -{" "}
                    <a
                      href={`https://github.com/${user.github}`}
                      target={"_blank"}
                    >
                      {user.github}
                    </a>
                  </div>
                </div>
              )}
              {tabIndex == 2 && (
                <div className='w-full lg:w-4/12 px-4 m-auto mt-10'>
                  <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                    <form>
                      <div className="relative w-full mb-3">
                          <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                          >
                              Avatar
                          </label>
                          <input
                              type="file"
                              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              placeholder="Email"
                              style={{ transition: "all .15s ease" }}
                              id="formFile"
                              onChange={onChangeUpload}
                          />
                      </div>
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

                      <div className="text-center mt-6">
                          <button type="button" className={`btn btn-dark w-full ${loading ? 'loading' : ''}`} onClick={() => onEditProfile()}>Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {tabIndex == 3 && (
                <div className='w-full lg:w-4/12 px-4 m-auto mt-10'>
                  <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                    <form>
                      <div className="relative w-full mb-3">
                          <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                          >
                              Current password
                          </label>
                          <input
                              type="password"
                              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              placeholder="Password"
                              style={{ transition: "all .15s ease" }}
                              name="curPassword"
                              value={formData.curPassword}
                              onChange={onChange}
                          />
                      </div>
                      <div className="relative w-full mb-3">
                          <label
                              className="block uppercase text-gray-700 text-xs font-bold mb-2"
                              htmlFor="grid-password"
                          >
                              Reset password
                          </label>
                          <input
                              type="password"
                              className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              placeholder="Password"
                              style={{ transition: "all .15s ease" }}
                              name="resetPassword"
                              value={formData.resetPassword}
                              onChange={onChange}
                          />
                      </div>

                      <div className="text-center mt-6">
                          <button type="button" className={`btn btn-dark w-full ${loading ? 'loading' : ''}`} onClick={onChangePassword}>Submit</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              

              <div className="mt-10 py-10 border-t border-gray-300 text-center">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-9/12 px-4">
                    <p className="mb-4 text-md leading-relaxed text-[#ff00ff]">
                      XFS(XDAG Funding System) is designed and approved to
                      collect ideas regarding development, improvement and
                      marketing from the community. Fully diluited and
                      community driven website that helps surely the future of
                      XDAG. Everybody love this platform and use!!!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
