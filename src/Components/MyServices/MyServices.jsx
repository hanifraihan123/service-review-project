import axios from "axios";
import { div, p } from "motion/react-m";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

const MyServices = () => {

    const {email} = useParams();
    const [services, setServices] = useState([]);

      useEffect(() => {
        fetchSingleData();
      }, []);

    const fetchSingleData = async () => {
        const { data } = await axios.get(`http://localhost:5000/services/${email}`,{withCredentials: true});
        setServices(data);
      };

      const handleDelete = async(id) => {
        const {data} = await axios.delete(`http://localhost:5000/service/${id}`)
          if(data.deletedCount > 0){
            toast.success('Service Deleted Successfully')
            fetchSingleData();
          }
      }

      const standardDelete = id => {
        toast(
          (t) => (
            <div className='flex items-center gap-2 justify-center'>
              <div><p>Are You <b>Sure?</b></p></div>
              <button onClick={()=>{
                 toast.dismiss(t.id)
                handleDelete(id)}} className='px-3 py-1 rounded-md text-white bg-red-400'>Yes</button>
              <button className='px-3 py-1 rounded-md text-white bg-green-400' onClick={() => toast.dismiss(t.id)}>Cancel</button>
            </div>
          )
        );
      }

  return (
    <div> 
      <div className="overflow-x-auto my-4">
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
                {
                  services.map((service,index) => <tbody key={service._id} service={service}>
                  <tr>
                    <th>{index+1}</th>
                    <td>{email}</td>
                    <td>{service.title}</td>
                    <td>{service.category}</td>
                    <td><button className="btn">Update</button></td>
                    <td><button onClick={()=>standardDelete(service._id)} className="btn">X</button></td>
                  </tr>
                </tbody>
                )}
              </table>
      </div>
    </div>
  );
};

export default MyServices;
