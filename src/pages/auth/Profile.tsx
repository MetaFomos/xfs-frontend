

export const Profile = () => {
    return (
        <>
            <h1 className="text-3xl my-5 text-center">View your profile</h1>
            <div className="flex gap-5 w-full md:w-4/5 lg:w-3/5 m-auto">
                <div className="w-1/2">
                    <div className="flex items-center mt-5">
                        <label className="w-1/3">Name</label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered w-full"
                            name="title"
                        />
                    </div>
                    <div className="flex items-center mt-5">
                        <label className="w-1/3">Bio</label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered w-full"
                            name="title"
                        />
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="flex items-center mt-5">
                        <label className="w-1/3">Email</label>
                        <input
                            type="text"
                            placeholder="Title"
                            className="input input-bordered w-full"
                            name="title"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}