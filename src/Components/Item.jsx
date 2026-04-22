import React from "react";

const Item = ({ book }) => {
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

export default Item;
