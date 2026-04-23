import React, { useContext } from "react";

const Item = ({ book, fromHero }) => {
 
 return (
     <div className="flex flex-col items-center text-center bg-white rounded-xl shadow-md overflow-hidden">
       <img
         src={book.image}
         alt={book.name}
         className="h-[200px] w-full object-cover rounded-t-xl"
       />
       <div className="p-4">
         <h4 className="font-bold text-gray-900">{book.name}</h4>
         {book.author && (
           <p className="text-sm text-gray-600 mt-1">by {book.author}</p>
         )}
       </div>
     </div>
   );

  
};
 export default Item

// export default Item;
// import React, { useContext } from "react";
// import { TbShoppingBagCheck } from "react-icons/tb";

// const Item = ({ book, fromHero }) => {

//   return (
//     <div className={`overflow-hidden sm:p-4 ${fromHero ? "bg-white" : "sm:bg-primary"}`}>
//       <div className=" overflow-hidden rounded-xl shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.1)] ">
//         <img src={book.image} alt={book.name} className="w-full h-40 object-cover rounded-lg" />
//       </div>
//         <div className="pt-4 ">
//       <div className="flexBetween gap-2 ">
//           <h4 className="h5 line-clamp-1">{book.name}</h4>
//         </div>
//         <div className="flex justify-between items-start gap-2 mt-1">
//           <p className="line-clamp-1">{book.description}</p>
//           <button className="cursor-pointer"><TbShoppingBagCheck className="text-xl" /></button>
//         </div>
//       </div>
//     </div>
//   )
// };

// export default Item
