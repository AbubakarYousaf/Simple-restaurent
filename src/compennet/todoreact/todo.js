import React, { useState, useEffect } from 'react'

import "./style.css"

//get data back from local storage

const getLocalData=()=>{
    const lists = localStorage.getItem("mytodoList")
    if(lists){
        return JSON.parse(lists)
    }
    
    else {
        return []
    }
}

export const Todo = () => {
    const [inputData, setInputData]=useState("")
    const [items, setItems]=useState(getLocalData())
    const [isEditItem, setIsEditItem]= useState("")
    const [toggleButton, setToggleButton]= useState(false)
    //add Items function
    const addItem=()=>{
        if(!inputData){
            alert("plz fill up th input data")
        }else if(inputData && toggleButton){
            setItems(
                items.map((curElem)=>{
                    if(curElem.id===isEditItem){
                        return{...curElem,name: inputData}
                    }
                    return curElem
                })
            )
            setInputData("")
            setIsEditItem(null)
            setToggleButton(false)
        }
        else {
            const myNewInputData={
                id: new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewInputData])
            setInputData("")
        }
    }
    //delete items function
    const deleteItem= (index)=>{
        const updatedItems = items.filter((curElem)=>{
            return curElem.id !== index
        })
        setItems(updatedItems)
    }
    //remove all button
    const removeAll=()=>{
        setItems([])
    }
    //storing in local storage
    useEffect(() => {
       localStorage.setItem("mytodoList", JSON.stringify(items))
    }, [items])

    //edit the Items
    const editItems =(index)=>{
        const item_todo_edited = items.find((curElem)=>{
            return curElem.id === index
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }
    return (
        <>
        <div className='main-div'>
            <div className='child-div'>
                <figure>
                    <img src='./images/todo.svg' alt="todologo "/>
                    <figcaption>Add your List Here</figcaption>
                </figure>
                <div className='addItems'>
                    <input 
                    type="text"
                    placeholder='🏏 Add Item'
                    value={inputData}
                    onChange={(e)=> setInputData(e.target.value)}
                    className='form-control'/>
                    {toggleButton ? (<i className="fa fa-edit add/btn" onClick={addItem}></i>)
                    :(<i className="fa fa-plus add/btn" onClick={addItem}></i>)}
                    
                </div>


                {/*show our items  */}
                <div className='showItems'>
                    {items.map((curElem)=> {
                        return(
                         <div className='eachItem' key={curElem.id}>           
                        <h3>{curElem.name}</h3>
                        <div className='todo-btn'>
                        <i className="far fa-edit add/btn"
                        onClick={()=> editItems(curElem.id)}></i>
                        <i className="far fa-trash-alt add/btn"
                        onClick={()=> deleteItem(curElem.id)}></i>
                        </div>
                         </div>
                        )
                     })}
                 </div>

                {/* remove all buttons */}
                <div className="showItems">
                    <button className="btn effect04" data-sm-link-text="Remove All"
                    onClick={removeAll}>
                            <span>CHECK LIST</span>
                    </button>       
                </div>

            </div>

        </div>
            
        </>
    )
}
export default Todo
