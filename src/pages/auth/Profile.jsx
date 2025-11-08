import { useState } from "react";
import { MdEmail } from "react-icons/md";
import { FaLink, FaUser } from "react-icons/fa6";
import toast from "react-hot-toast";
import useAuthContext from "../../hooks/useAuthContext";
import Loading from "../../components/Loading";

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { user, loading, updateUser } = useAuthContext();

  const handleEdit = () => {
    setEditing(!editing);
  };

  const updateProfile = (e) => {
    e.preventDefault();

    const form = e.target;

    let photo = form.photo.value;
    let name = form.name.value;

    if (!photo && name == user.displayName) {
      // console.log(photo, name);
      toast("Update your name or photoURL");
      return;
    }

    const updatedPhotoAndName = {
      displayName: name,
      photoURL: photo ? photo : user.photoURL,
    };

    setUpdateLoading(true);

    updateUser(updatedPhotoAndName)
      .then(() => {
        setEditing(false);
        photo = "";
        setUpdateLoading(false);
        toast("profile updated successfully");
      })
      .catch((error) => {
        toast(error.message);
      });
  };

  if (loading && !user) {
    <Loading />;
  }

  if (user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-gray-100 rounded-2xl p-8 w-full max-w-md text-center shadow-2xl border border-gray-200 py-10">
          {/* Profile Photo */}
          <img
            src={user.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-indigo-500 object-center object-cover object"
          />
          <form
            onSubmit={updateProfile}
            className="justify-self-start space-y-3 py-10"
          >
            <label className="input validator outline-none">
              <MdEmail size={20} className="text-black/90" />
              <input
                className="w-full bg-white text-gray-800 outline-none disabled:bg-white disabled:text-black/80  disabled:cursor-not-allowed"
                type="email"
                name="email"
                defaultValue={user.email}
                disabled
              />
            </label>
            <label className="input validator outline-none">
              <FaUser size={16} />
              <input
                className="w-full bg-white text-gray-800 outline-none disabled:bg-white disabled:text-black/80  disabled:cursor-not-allowed"
                type="text"
                name="name"
                defaultValue={user.displayName}
                disabled={!editing}
                required
              />
            </label>
            <label className="input validator outline-none">
              <FaLink size={20} />
              <input
                className="w-full bg-white text-gray-800 outline-none disabled:bg-white disabled:text-black/80  disabled:cursor-not-allowed placeholder:text-gray-400"
                placeholder="Paste you photo url"
                type="text"
                name="photo"
                disabled={!editing}
              />
            </label>
            <div className="validator-hint hidden">
              Enter valid email address
            </div>

            <div className="flex justify-center gap-4 mt-5">
              <button
                type="button"
                className="btn rounded-lg px-10 bg-red-500 text-white transition"
                onClick={handleEdit}
              >
                {editing ? "Cancel" : "Edit"}
              </button>
              <button
                className="btn btn-primary rounded-lg"
                disabled={!editing}
              >
                {updateLoading ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>{" "}
                    Updating Profile
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>

          {/* Buttons */}
        </div>
      </div>
    );
  }
}
