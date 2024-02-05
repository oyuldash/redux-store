import Book from "./Book";
import Counter from "./Counter";
import {configureStore} from "@reduxjs/toolkit"


export  const Store =configureStore({
    reducer:{
        count:Counter,
        book:Book
    }
   
})
Store.subscribe(()=>console.log('Store state', Store.getState()))

