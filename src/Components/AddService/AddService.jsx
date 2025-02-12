import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../Hook/useAxiosSecure";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const image = form.image.value;
    const title = form.title.value;
    const company = form.company.value;
    const website = form.website.value;
    const price = form.price.value;
    const category = form.category.value;
    const description = form.description.value;
    const date = form.date.value;
    const email = user?.email;

    const formData = { image, title, company, website, price, category, description, date, email };

    

    axiosSecure.post("/addService", formData)
    .then(response => {
        if(response.data.insertedId){
            form.reset();
            toast.success('Service Added Successfully')
            navigate(`/myServices/${user?.email}`)
        }
    })
  };

  return (
    <div className="bg-purple-300">
     <Helmet>
       <title>Service Review || Add</title>
     </Helmet>
      <h3 className="font-bold text-2xl text-center pt-4">Add Service</h3>
      <form onSubmit={handleSubmit} className="card-body pt-2">
        <div className="lg:flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Service Image</span>
            </label>
            <input
              type="url"
              name="image"
              placeholder="Service Image"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Service Title</span>
            </label>
            <input
              type="text"
              name="title"
              placeholder="Service Title"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        <div className="lg:flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Company Name</span>
            </label>
            <input
              type="text"
              name="company"
              placeholder="Company Name"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Website</span>
            </label>
            <input
              type="url"
              name="website"
              placeholder="Website URL"
              className="input input-bordered"
              required
            />
          </div>
        </div>
        <div className="lg:flex gap-4">
        <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              placeholder="Price"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select name="category" required className="select select-bordered w-full">
              <option defaultValue={true}>
                Select One
              </option>
              <option>Electronics</option>
              <option>Automobiles</option>
              <option>Transport</option>
              <option>Restaurant</option>
              <option>Travel Agency</option>
            </select>
          </div>
        </div>

        <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea name="description" placeholder="Description"
              className="input input-bordered"
              required></textarea>
          </div>
          <div className="lg:flex gap-4">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Date</span>
            </label>
            <input
              type="text"
              disabled
              name="date"
              defaultValue={new Date().toLocaleDateString()}
              placeholder="Price"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              defaultValue={user?.email}
              disabled
              className="input input-bordered"
              required
            />
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary bg-gradient-to-r from-cyan-500 to-blue-500">Add Service</button>
        </div>
      </form>
    </div>
  );
};

export default AddService;
