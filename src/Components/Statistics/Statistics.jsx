import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const Statistics = () => {

      const [services,setServices] = useState([])
      const [reviews,setReviews] = useState([])
      const [users,setUsers] = useState([])
  
      useEffect(()=>{
        axios.get('http://localhost:5000/allService')
        .then(res=>setServices(res.data))
        axios.get('http://localhost:5000/reviews')
        .then(res=>setReviews(res.data))
        axios.get('http://localhost:5000/users')
        .then(res=>setUsers(res.data))
      },[services.length,reviews.length,users.length])
  
    return (
        <div className="text-center lg:py-6 p-2 bg-red-200 lg:px-6">
            <div className="stats inline-block lg:inline-flex gap-4 shadow w-full bg-sky-200">
  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </div>
    <div className="stat-title">Our Total Services</div>
    <div className="stat-value"> <CountUp start={0} end={services?.length} delay={0}>
  {({ countUpRef }) => (
    <div>
      <span ref={countUpRef} />
    </div>
  )}
</CountUp></div>
    <div className="stat-desc">First - Last</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
      </svg>
    </div>
    <div className="stat-title">Our Total Reviews</div>
    <div className="stat-value"><CountUp start={0} end={reviews?.length} delay={0}>
  {({ countUpRef }) => (
    <div>
      <span ref={countUpRef} />
    </div>
  )}
</CountUp></div>
    <div className="stat-desc">↗︎ 400 (22%)</div>
  </div>

  <div className="stat">
    <div className="stat-figure text-secondary">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="inline-block h-8 w-8 stroke-current">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path>
      </svg>
    </div>
    <div className="stat-title">Our Total Users</div>
    <div className="stat-value"><CountUp start={0} end={users?.length} delay={0}>
  {({ countUpRef }) => (
    <div>
      <span ref={countUpRef} />
    </div>
  )}
</CountUp></div>
    <div className="stat-desc">↘︎ 90 (14%)</div>
  </div>
</div>
        </div>
    );
};

export default Statistics;