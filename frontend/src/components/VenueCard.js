// import { Link } from "react-router-dom";

// const VenueCard = ({ venue }) => {
//   return (
//     <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">
      
//       <img 
//         src={venue.image} 
//         alt="venue" 
//         className="w-full h-48 object-cover"
//       />

//       <div className="p-4">
//         <h2 className="text-xl font-semibold">{venue.name}</h2>
//         <p className="text-gray-600">📍 {venue.location}</p>
//         <p className="text-green-600 font-bold">₹{venue.price}</p>
//         <p className="text-sm text-gray-500">👥 {venue.capacity} people</p>

//         <Link to={`/venue/${venue.id}`}>
//           <button className="w-full bg-green-500 text-white py-2 mt-3 rounded hover:bg-green-600">
//             Book Now
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default VenueCard;