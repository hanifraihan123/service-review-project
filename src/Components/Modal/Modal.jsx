

const Modal = () => {


    const handleReviewSubmit = (e) => {
          e.preventDefault();
          const form = e.target;
          const updateRating = rating;
          const textReview = form.reviewEdit.value;
          const updateReview = {rating:updateRating,review:textReview}
        
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const price = form.price.value;
        const category = form.category.value;
        const updatedData = { title, price, category };
        console.log(updatedData);
      };
    

    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            <dialog id="my_modal_3" className="modal">
               <div className="modal-box">
                 <form onSubmit={handleReviewSubmit} className="mx-auto flex flex-col gap-2 justify-center">
                   {/* if there is a button in form, it will close the modal */}
                   <textarea name="reviewEdit" defaultValue={review.review}
                placeholder="Write Your Review Here" className="textarea textarea-bordered textarea-lg w-full">
                 </textarea>
                 <label><Rating
                style={{ maxWidth: 150 }}
                onChange={setRating}
                value={review.rating}
              /></label>
                  <button className="btn justify-center">Update</button>
                 </form>
                 <p className="py-4 text-center">Press ESC key to close modal</p>
               </div>
             </dialog>
        </div>
    );
};

export default Modal;