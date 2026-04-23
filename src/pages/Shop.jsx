import React from 'react'
import Title from '../Components/Title'
import { ClassNames } from '@emotion/react'
import Item from '../Components/Item'


const Shop = () => {

  return (
    <div className="max-padd-containerpy-16 pt-28 ">
      <Title title1={"All"}
        title2={"Books"}
        title1styles={"pb-10"} />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-8">
        {books.length > 0 ? (
          books.map((book) => (
            <Item book={book} />
          ))
        ) : (
          <h4 ClassName="h4">Oops! nothing found</h4>
        )}
      </div>
    </div>
  )
}

export default Shop


