import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MyServices = () => {

    const {email} = useParams();
    const [services, setServices] = useState([]);

      useEffect(() => {
        fetchSingleData();
      }, []);

    const fetchSingleData = async () => {
        const { data } = await axios.get(`http://localhost:5000/services/${email}`);
        setServices(data);
      };

  return (
    <div> 
      <div className="overflow-x-auto my-4">
        {
            services.map(service=><table key={service._id} service={service} className="table">
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
                <tbody>
                  {/* row 2 */}
                  <tr>
                    <th>1</th>
                    <td>{email}</td>
                    <td>{service.title}</td>
                    <td>{service.category}</td>
                    <td><button className="btn">Update</button></td>
                    <td><button className="btn">X</button></td>
                  </tr>
                </tbody>
              </table>)
        }
      </div>
    </div>
  );
};

export default MyServices;
