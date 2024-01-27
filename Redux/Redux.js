import {createStore} from 'redux'
import axios from 'axios'
const initState = []; 

const reducer=(state=initState,action)=>{
    switch(action.type){
        case 'save':
            return action.payload;
        default:
            return state;
    }
}
const store =createStore(reducer)
export default store;