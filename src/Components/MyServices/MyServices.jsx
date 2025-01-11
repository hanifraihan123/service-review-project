import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAxiosSecure from "../Hook/useAxiosSecure";
import Modal from "../Modal/Modal";
import { AuthContext } from "../Provider/AuthProvider";

const MyServices = () => {
  const { email } = useParams();
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [service,setService] = useState({})
  const {loading,setLoading} = useContext(AuthContext)

  if(loading) <><span className="loading loading-bars loading-xs"></span>
    <span className="loading loading-bars loading-sm"></span>
    <span className="loading loading-bars loading-md"></span>
    <span className="loading loading-bars loading-lg"></span></>


  const axiosSecure = useAxiosSecure()

  const fetchAllService = async () => {
    const { data } = await axiosSecure.get(`/services/${email}?search=${search}`);
    setServices(data);
  };

  useEffect(() => {
    
    fetchAllService();
    setLoading(false)
  }, [search]);

  const handleUpdate = async(id) => {
    document.getElementById("customModal").showModal()
    await axios.get(`https://service-review-system-server.vercel.app/service/${id}`)
    .then(res=>{
      setService(res.data)
      setLoading(false)
    })
  }

  const handleDelete = async (id) => {
    const { data } = await axiosSecure.delete(`/service/${id}`);
    if (data.deletedCount > 0) {
      toast.success("Service Deleted Successfully");
      fetchAllService();
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
        <title>Service Review || Services</title>
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
              <th>Price</th>
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
                <td>{service.price}</td>
                <td>{service.category}</td>
                <td>
                  <button className="btn" onClick={()=>handleUpdate(service._id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => standardDelete(service._id)} className="btn">X</button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
      <Modal service={service} fetchAllService={fetchAllService}></Modal>
    </div>
  );
};

export default MyServices;
