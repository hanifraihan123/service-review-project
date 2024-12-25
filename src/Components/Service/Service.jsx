import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";


const Service = () => {

    const [services, setServices] = useState([])
    const [filter,setFilter] = useState('');
    const [search,setSearch] = useState('');

    useEffect(()=>{
       const fetchAllService = async () => {
        const {data} = await axios.get(`https://service-review-system-server.vercel.app/services?filter=${filter}&search=${search}`,{withCredentials: true})
        setServices(data)
       } 
        fetchAllService()
    },[filter,search]) 


    return (
        <div className="bg-violet-300">
           <div className="flex gap-4 justify-center items-center pt-4">
           <div>
            <select
              name='category'
              id='category'
              className='border p-4 rounded-lg'
              onChange={(e)=>setFilter(e.target.value)}
            >
              <option value=''>Filter By Category</option>
              <option value='Electronics'>Electronics</option>
              <option value='Automobiles'>Automobiles</option>
              <option value='Transport'>Transport</option>
              <option value='Restaurant'>Restaurant</option>
              <option value='Travel Agency'>Travel Agency</option>
            </select>
          </div>
            <div className='flex p-1 overflow-hidden rounded-lg'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                onBlur={(e)=>setSearch(e.target.value)}
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />
              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-6 py-6 space-y-2">
            {
                services.map(service=><ServiceCard key={service._id} service={service}></ServiceCard>)
            }
            </div>
        </div>
    );
};

export default Service;