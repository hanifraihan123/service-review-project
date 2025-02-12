import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../ServiceCard/ServiceCard";
import { Helmet } from "react-helmet-async";


const Service = () => {

    const [services, setServices] = useState([])
    const [filter,setFilter] = useState('');
    const [search,setSearch] = useState('');
    const [loading,setLoading] = useState(true);
    // const [service,setService] = useState([])
    // const [currentPage,setCurrentPage] = useState(0)
    // const [itemsPerPage,setItemsPerPage] = useState(10)
    // const [count,setCount] = useState(50)
  
    // const servicePerPage = 5;
    // const numberOfPages = Math.ceil(count/servicePerPage)
    // const pages = [...Array(numberOfPages).keys()]

  // const handlePrevPage = () => {
  //   if(currentPage > 0){
  //       setCurrentPage(currentPage - 1)
  //   }
  // }

  // const handleNextPage = () => {
  //   if(currentPage < pages.length -1){
  //       setCurrentPage(currentPage + 1)
  //   }
  // }

    // useEffect(()=>{
    //  await axios.get('https://service-review-system-server.vercel.app/serviceCount')
    //   .then(res=>{
    //     setCount(res.data.count)
    //   })
    //   axios.get(`https://service-review-system-server.vercel.app/servicePage?page=${currentPage}&size=${itemsPerPage}`)
    //   .then(res => {
    //     setService(res.data)
    //   })
    // },[service.length])

    useEffect(()=>{
       const fetchAllService = async () => {
        const {data} = await axios.get(`https://service-review-system-server.vercel.app/services?filter=${filter}&search=${search}`,{withCredentials: true})
        setServices(data)
       } 
       setLoading(false)
        fetchAllService()
    },[filter,search]) 

    if(loading){
      return (
        <div>
          <span className="loading loading-bars loading-lg"></span>
        </div>
      )
    }

    return (
        <div className="bg-purple-300 px-2">
               <Helmet>
                  <title>Service Review || Services</title>
                </Helmet>
           <div className="lg:flex gap-4 justify-center text-center items-center pt-4">
           <div>
            <select
              name='category'
              id='category'
              className='border p-3 mt-2 rounded-lg items-center'
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
            <div className='flex justify-center p-1 rounded-lg'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                onChange={(e)=>setSearch(e.target.value)}
                placeholder='Enter Service Title'
                aria-label='Enter Job Title'
              />
              <button className='px-1 md:px-4 py-3 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
           </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {
                services.map(service=><ServiceCard key={service._id} service={service}></ServiceCard>)
            }
            </div>
            {/* <div className="text-center space-x-4 pb-4">
            <p className='mb-4 text-center font-bold'>Current Page: {currentPage+1}</p>
                <button className='btn' onClick={handlePrevPage}>Prev</button>
                {
                    pages.map((page,index)=><button className={currentPage === page ? 'bg-orange-300 p-2 border-2' : 'p-2 border-2'} onClick={()=>setCurrentPage(page)} key={page}>{page + 1}</button>)
                }
                <button className='btn' onClick={handleNextPage}>Next</button>
            </div> */}
        </div>
    );
};

export default Service;