
const ServiceCard = ({service}) => {
    console.log(service)
    return (
        <div className="card bg-violet-100 w-96 shadow-xl">
        <figure>
          <img className="h-36 w-full object-cover" src={service.image}/>
        </figure>
        <div className="card-body">
          <h2 className="card-title">{service.title}</h2>
          <p>{service.description}</p>
          <p>{service.category}</p>
          <p>{service.price}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-warning">See Details</button>
          </div>
        </div>
      </div>
    );
};

export default ServiceCard;