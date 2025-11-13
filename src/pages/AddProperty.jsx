import toast from "react-hot-toast";
import useAuthContext from "../hooks/useAuthContext";
import { useState } from "react";
import useAxios from "../hooks/useAxios";

export default function AddProperty() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();
  const instance = useAxios();

  const handleAddProperty = (e) => {
    e.preventDefault();
    setLoading(true);

    const now = new Date();

    const propertyName = e.target.propertyName.value;
    const category = e.target.category.value;
    const shortDescription = e.target.description.value;
    const location = e.target.location.value;
    const price = e.target.price.value;
    const image = e.target.image.value;

    const newProperty = {
      propertyName,
      category,
      shortDescription,
      location,
      propertyPrice: price,
      image,
      userName: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      createdAt: now,
      updatedAt: now,
    };

    instance
      .post("/add-property", newProperty)
      .then(() => {
        toast("Property added successfully");
        console.log("Property added successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <section className="max-w-3xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Add a New Property
        </h1>
        <p className="text-gray-600 mt-2">
          Fill in the details below to list your property.
        </p>
      </div>

      <form
        className="bg-white shadow-md rounded-2xl p-8 space-y-6"
        onSubmit={handleAddProperty}
      >
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Property Name
          </label>
          <input
            type="text"
            name="propertyName"
            placeholder="Enter property name"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            placeholder="Write a short description..."
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none resize-none"
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Category
          </label>
          <select
            name="category"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            required
          >
            <option value="">Select category</option>
            <option value="Rent">Rent</option>
            <option value="Sale">Sale</option>
            <option value="Commercial">Commercial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Price (in USD)
          </label>
          <input
            type="number"
            name="price"
            placeholder="Enter property price"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            name="location"
            placeholder="City, Area, or Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Image Link
          </label>
          <input
            type="url"
            name="image"
            placeholder="Paste image URL"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              User Name
            </label>
            <input
              type="text"
              value={user.displayName}
              readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              User Email
            </label>
            <input
              type="email"
              value={user.email}
              readOnly
              className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-300"
          >
            {loading && (
              <span className="loading loading-spinner loading-md mr-5"></span>
            )}
            Add Property
          </button>
        </div>
      </form>
    </section>
  );
}
