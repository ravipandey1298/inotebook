import NoteContext from "./noteContext";
import {useState} from "react";    

const NoteState = (props)=>{
    const s1 ={
        "name" : "Ravi",
        "designation" : "Application Developer"
    }

    const [state, setState] = useState(s1);
    const update = () => {
        setTimeout(()=>{
            setState({
                "name" : "Ravi Pandey",
                "designation" : "Full Stack Developer"
            })
        },3000)
    }
    return (
        <NoteContext.Provider value={{state, update}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;