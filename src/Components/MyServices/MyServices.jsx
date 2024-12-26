import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";

const MyServices = () => {
  const { email } = useParams();
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");

  const axiosSecure = useAxiosSecure()

  const fetchSingleData = async () => {
    const { data } = await axiosSecure.get(`/services/${email}?search=${search}`);
    setServices(data);
  };

  useEffect(() => {
    
    fetchSingleData();
  }, [services,search]);

  const handleUpdate = (id) => {
    console.log(id);
  };

  const handleDelete = async (id) => {
    const { data } = await axiosSecure.delete(`/service/${id}`);
    if (data.deletedCount > 0) {
      toast.success("Service Deleted Successfully");
      fetchSingleData();
    }
  };

  const standardDelete = (id) => {
    toast((t) => (
      <div className="flex items-center gap-2 justify-center">
        <div>
          <p>
            Are You <b>Sure?</b>
          </p>
        </div>
        <button
          onClick={() => {
            toast.dismiss(t.id);
            handleDelete(id);
          }}
          className="px-3 py-1 rounded-md text-white bg-red-400"
        >
          Yes
        </button>
        <button
          className="px-3 py-1 rounded-md text-white bg-green-400"
          onClick={() => toast.dismiss(t.id)}
        >
          Cancel
        </button>
      </div>
    ));
  };

  return (
    <div>
      <Helmet>
        <title>My Services</title>
      </Helmet>
      <div className="text-center mt-4 flex justify-center gap-2 px-2">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search By Category"
          className="input input-bordered w-full max-w-xs"
        />
        <button className="px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
          Search
        </button>
      </div>
      <div className="overflow-x-auto my-4 w-full">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Serial</th>
              <th>User</th>
              <th>Title</th>
              <th>Category</th>
              <th>Modify</th>
              <th>Delete</th>
            </tr>
          </thead>
          {services.map((service, index) => (
            <tbody key={service._id} service={service}>
              <tr>
                <th>{index + 1}</th>
                <td>{email}</td>
                <td>{service.title}</td>
                <td>{service.category}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("updateModal").showModal()
                    }
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => standardDelete(service._id)}
                    className="btn"
                  >
                    X
                  </button>
                </td>
                {/* Modal */}
                <dialog
                  id="updateModal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Update Service Data</h3>
                    <div className="modal-action">
                      <form
                        onSubmit={handleSubmit}
                        method="dialog"
                        className="w-full"
                      >
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Title</span>
                          </label>
                          <input
                            type="text"
                            name="title"
                            defaultValue={service?.title}
                            placeholder="Title"
                            className="input input-bordered"
                          />
                        </div>
                        <div className="form-control">
                          <label className="label">
                            <span className="label-text">Price</span>
                          </label>
                          <input
                            type="number"
                            name="price"
                            placeholder="Price"
                            className="input input-bordered"
                            defaultValue={service?.price}
                          />
                        </div>
                        <div className="form-control w-full">
                          <label className="label">
                            <span className="label-text">Category</span>
                          </label>
                          <select
                            name="category"
                            defaultValue={service.category}
                            className="select select-bordered w-full"
                          >
                            <option>Select One</option>
                            <option>Electronics</option>
                            <option>Automobiles</option>
                            <option>Transport</option>
                            <option>Restaurant</option>
                            <option>Travel Agency</option>
                          </select>
                        </div>
                        <p className="text-center py-2">
                          Press ESC key to cancel
                        </p>
                        <div className="flex my-2 justify-center">
                          <button
                            onClick={() => handleUpdate(service._id)}
                            className="btn"
                          >
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </dialog>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default MyServices;
