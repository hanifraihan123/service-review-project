import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Modal = ({ service ,fetchAllService}) => {
    const {_id} = service;
    const [updatePrice,setUpdatePrice] = useState(0)
    const [categori,setCategori] = useState('')

  const handleSubmit = (e) => {
    
    e.preventDefault();
    const form = e.target;
    const title = form.title.value;
    const category = categori;
    const price = parseFloat(updatePrice);
    const updatedData = { title,price,category };
    
    axios.patch(`https://service-review-system-server.vercel.app/services/${_id}`,updatedData,{withCredentials: true})
    .then(res=>{
      if(res.data.modifiedCount > 0) {
        toast.success('Service Updated Successfully')
        fetchAllService()
      }
    })
  };

  return (
    <div>
      <dialog id="customModal" className="modal">
        <div className="modal-box">
          <form
            onSubmit={handleSubmit}
            className="mx-auto flex flex-col gap-2 justify-center"
          >
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Service Title</span>
              </label>
              <input
                type="text"
                name="title"
                className="input input-bordered"
                defaultValue={service.title}
              />
            </div>
            <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input
              type="number"
              name="price"
              className="input input-bordered"
              onChange={(e)=>setUpdatePrice(e.target.value)}
              defaultValue={service.price}
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select name="category" defaultValue={service.category} onChange={(e)=>setCategori(e.target.value)} className="select select-bordered w-full">
              <option>Electronics</option>
              <option>Automobiles</option>
              <option>Transport</option>
              <option>Restaurant</option>
              <option>Travel Agency</option>
            </select>
          </div>
            <button className="btn justify-center">Update</button>
          </form>
          <p className="py-4 text-center">Press ESC key to close modal</p>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
