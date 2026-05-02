import React, { useContext } from "react";
import { TbShoppingBagCheck } from "react-icons/tb";
import { useNavigate } from "react-router-dom"

const Item = ({ book, fromHero }) => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/book/${book.id}`)
  }

  return (
    <div
     onClick={handleClick}  
    className={`cursor-pointer overflow-hidden sm:p-4 ${fromHero ? "bg-white" : "sm:bg-primary"
       }`}>
      {/* IMAGE  */}
      <div className="overflow-hidden rounded-xl shadow-[0px_0px_2px_0px_rgba(0,_0,_0,_0.1)]">
        <img
          src={book.image}
          alt={book.name}
          className="rounded-lg h-68"
        />
      </div>
      {/* INFO  */}
      <div className="pt-4">
        <div>
          <h4 className="h5 line-clamp-1 mb-2">{book.name}</h4>
          <p className="text-black bold-15 mb-2">{book.author}</p>
        </div>
        <div className="flex justify-between items-start gap-2 mt-1">
          <p className="line-clamp-1">{book.description}</p>
            <button onClick={(e) => {
             e.stopPropagation()
            }}
             className="cursor-pointer"><TbShoppingBagCheck className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Item