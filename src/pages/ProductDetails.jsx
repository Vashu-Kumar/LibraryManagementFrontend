import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { dummyBooks } from '../assets/data'
import { TbStarFilled, TbStarHalf, TbHeart } from "react-icons/tb"

const ProductDetails = () => {

  const { id } = useParams()
  const book = dummyBooks.find((b) => String(b.id) === String(id))
  const [image, setImage] = useState(book?.image)

  useEffect(() => {
    if (book) {
      setImage(book.image)
    }
  }, [book])

  if (!book) {
    return <h2 className="text-center mt-20">Book not found</h2>
  }

  return (
    book && (
      <div className='max-padd-conatainer py-16 pt-28'>
        <p className='ml-8'>
          <Link to={'/'} className='text-black'>Home</Link> /
          <Link to={'/shop'} className='text-black'>Shop</Link> /
          <span className='medium-14 text-black'>{book.name}</span>
        </p>
        {/* BOOK DATA */}
        <div className="flex gap-10 flex-col ml-2 sm:ml-4 md:ml-6 lg:ml-8 xl:flex-row my-6">
          {/* IMAGE  */}
          <div className='flex gap-x-2 max-w-[400px] rounded-xl'>
            <div className='flex-1 flexCenter flex-col gap-[7] flex-wrap'>
              <img
                src={book.image}
                alt="BookImg"
                className='rounded-lg overflow-hidden'
              />
            </div>

            <div className='flex flex-[4]'>
              <img
                src={book.image}
                alt="BookImg"
                className='rounded-lg overflow-hidden'
              />
            </div>

          </div>
          {/* INFO  */}
          <div className="px-6 py-6 w-full flex-wrap sm:w-92 md:w-[24rem] lg:w-[36rem] bg-primary rounded-xl">
            <h3 className="h3 leading-none">{book.name}</h3>
            <div className="flex items-center gap-x-2 pt-2">
              <div className='flex gap-x-2 text-yellow-400'>
                <TbStarFilled />
                <TbStarFilled />
                <TbStarFilled />
                <TbStarFilled />
                <TbStarHalf />
              </div>
              <p className='medium-22'>(22)</p>
            </div>
            <div>
              <h3 className='h3'><span className='text-cyan-600'>By: </span>{book.author}</h3>
              <p className='max-w-[360px]'>{book.description}</p>
            </div>
            <div className='flex items-center gap-x-4 mt-6'>
              <button className='btn-dark sm:w-1/2 flexCenter gap-x-2 capitalize !rounded-md'>
                Borrow
              </button>

              <button className="btn-secondary !rounded-md">
                <TbHeart className='text-xl' />
              </button>
            </div>
          </div>
        </div>
      </div>

    )
  )
}
export default ProductDetails