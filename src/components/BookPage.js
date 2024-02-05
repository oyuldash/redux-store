import React, { useCallback, useState } from "react";
import { search, fetchDataAsync } from "../redux/Book";
import { useDispatch, useSelector, } from "react-redux";

export default function Book() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const data = useSelector((state) => {
    console.log('book data',state.book.data)
    return state.book.data;
  });

  const submitHandler=useCallback((e)=>{
    e.preventDefault();
    dispatch(fetchDataAsync(name));
  }, [name])

  return (
    <div>
      <h1>Book finder</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="Enter book name"
          onChange={(e) => setName(e.target.value)}
        />
        <button type='submit'>Find</button>
      </form>
      {
        data?.map((item,index)=>{
            return (
              <div key={index}>
                 <h1>{item?.volumeInfo?.title}</h1>
                 <h3>{item?.volumeInfo?.subtitle}</h3>
                 <p>{item?.volumeInfo?.description}</p>
              </div>
            )

           
        })
      }
    </div>
  );
}
