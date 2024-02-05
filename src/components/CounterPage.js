import React, { useState } from "react";
import { addItem, decrement, increment, remove,editing} from "../redux/Counter";
import { useDispatch, useSelector } from "react-redux";

export default function CounterPage() {
  const [item, setItem] = useState("");
  const [editItem, setEditItem]=useState(false)
  const [prevItem, setPrevItem]=useState(null)

  const dispatch = useDispatch();

  const count = useSelector((state) => {
    return state.count.count;
  });

  const data = useSelector((state) => {
    return state.count.data;
  });



  class Item {
    constructor(name) {
      this.name = name;
      this.date = new Date().toString();
    }
  }

  function add(e) {
    e.preventDefault();

    if (item) {
      let newItem = new Item(item);
      console.log(newItem);
      dispatch(addItem(newItem));
      setItem('')
    }
  }
  function edit(e){
    e.preventDefault()
    let itemEdit={
        newName:item,
        prevItem
    }
    dispatch(editing(itemEdit))
    setEditItem(false)
    setItem('')

  }
  return (
    <div>
      <h1>Count</h1>
      <p>{count}</p>
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <form onSubmit={editItem? edit:add}>
        <input 
        placeholder="item" 
        onChange={(e) => setItem(e.target.value)} 
        value={item}/>
        {
            <button type="submit">{editItem? 'edit':'add'}</button>
        }

        
      </form>
      {
      data?.map((item, index) => {
        return <p key={index}>{item.name}
    <button onClick={()=>dispatch(remove(item))}>delete</button>
    <button 
    onClick={()=>{
        setItem(item.name)
        setEditItem(true)
        setPrevItem(item)
    }}>Edit
    </button>
    </p>;
      })
      }
    </div>
  );
}
