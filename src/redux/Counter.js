import { createSlice,PayloadAction } from "@reduxjs/toolkit";


const counterSlice=createSlice({
    name:'Counter',
    initialState:{
        count:0,
        data:[]
    },
    reducers:{
        increment:(state, action)=>{
            state.count+=1
        },
        decrement:(state, action)=>{
            state.count-=1
        },
        addItem:(state, action:PayloadAction<object>)=>{
            let item=action.payload
            let isExist=false
            for(let i=0; i<state.data.length; i++){
                if(state.data[i].name==item.name){
                    isExist=true
                }
            }
            if(isExist==false){
                state.data.push(item)
            }else{
                console.log('The item already exist')
            }
          
            
        },
        remove:(state,action:PayloadAction<object>)=>{
            let item=action.payload

            let filtered=state.data.filter(it=>it.name!=item.name)
            state.data=filtered
        },
        editing:(state, action:PayloadAction<object>)=>{
          
            let editingItem=action.payload
            console.log(editingItem)
            let index=state.data.findIndex(item=>
                item.name==editingItem.prevItem.name
            )
            state.data.splice(index, 1, 
                {name:editingItem.newName, date:new Date().toString()})


        }
    }
})
export const {increment, decrement, addItem, remove, editing}=counterSlice.actions
export default counterSlice.reducer;

