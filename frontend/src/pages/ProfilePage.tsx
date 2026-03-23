import { useState, type ChangeEvent, type SubmitEvent } from "react";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useAuth } from "../context/AuthContext"
import {useBecomeOwner, useUpdateUser} from "../hooks/useUser";
import { UserTypes, type UpdateUserRequest } from "../types/user";

function ProfilePage() {
  const { user } = useAuth();
  const becomeOwnerMutation = useBecomeOwner();
  const updateUserMutation = useUpdateUser();

  const originalValues = {
    fullName: user?.fullName ?? "",
    username: user?.username ?? "",
    phone: user?.phone ?? "",
    profilePicturePath: user?.profilePicturePath ?? ""
  };

  const [userValues, setUserValues] = useState<UpdateUserRequest>(originalValues);

  const hasChanges = 
    userValues.fullName !== originalValues.fullName ||
    userValues.username !== originalValues.username ||
    userValues.phone !== originalValues.phone ||
    userValues.profilePicturePath !== originalValues.profilePicturePath;


  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setUserValues({
      ...userValues,
      [event.target.name]: event.target.value
    });
  }


  function handleDiscard() {
    setUserValues(originalValues);
  }


  function handleBecomeOwner() {
    becomeOwnerMutation.mutate(undefined, {
      onSuccess: (response) => {
        console.log(response);
      }
    })
  }


  console.log(user?.role);


  function handleProfileUpdate(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    updateUserMutation.mutate(userValues, {
      onSuccess: (response) => {
        console.log(response);
      }
    })
  }

  return (
    <div>
        <Navbar />
        <div className="flex flex-col items-center justify-center p-10 space-y-9">
          {/* Profile picture */}
          <div className="w-40 h-40 rounded-full border-2 border-sky-500">
            <img className="w-full h-full rounded-full object-cover" src={user?.profilePicturePath ?? "https://static.vecteezy.com/system/resources/thumbnails/060/605/418/small/default-avatar-profile-icon-social-media-user-free-vector.jpg"} alt={user?.fullName} />
          </div>

          {/* Form of user fields */}
          <form onSubmit={handleProfileUpdate} className="w-full max-w-lg">

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                  Full name
                </label>
                <input onChange={handleChange} value={userValues["fullName"]} name="fullName" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text"/>
              </div>

              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                  Username
                </label>
                <input onChange={handleChange} value={userValues["username"]} name="username" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text"/>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                  Phone
                </label>
                <input onChange={handleChange} value={userValues["phone"]} name="phone" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text"/>
                <p className="text-gray-600 text-xs italic">Ex. 555 555 5555</p>
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
                  Profile picture link (temporary)
                </label>
                <input onChange={handleChange} value={userValues["profilePicturePath"]} name="profilePicturePath" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="text"/>
                <p className="text-gray-600 text-xs italic">Temporary field until S3 storage bucket configured</p>
              </div>
            </div>

            <div className="flex gap-5">
              <button className="disabled:bg-gray-200 disabled:text-black disabled:cursor-default font-medium bg-sky-500 text-white transition w-full p-2 rounded-full text-lg cursor-pointer" type="submit" disabled={!hasChanges}>Save changes</button>
              <button className="disabled:bg-gray-200 disabled:text-black disabled:cursor-default font-medium bg-red-500 text-white transition w-full p-2 rounded-full text-lg cursor-pointer" type="button" disabled={!hasChanges} onClick={handleDiscard}>Discard changes</button>
            </div>

            {/* Button to become an owner */}
            {user?.role !== UserTypes.owner && <button onClick={handleBecomeOwner} type="button" className="mt-7 font-medium bg-sky-500 text-white transition w-full p-2 rounded-full text-lg cursor-pointer">Become owner</button>}
          </form>
        </div>
        <Footer />
    </div>
  )
}

export default ProfilePage