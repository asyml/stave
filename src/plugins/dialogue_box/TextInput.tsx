import React, {Component} from 'react'
import style from './TextInput.module.css'
import {ISinglePack} from "../../nlpviewer"

export interface TextInputProp{
    textValue: string;
    textPack: ISinglePack;
}

interface TextInputState{
    textValue: string;
}

function createUtterance(textPack: ISinglePack, newUtterance: string){
    let {annotations, text} = textPack;
    text = text + '\n' + newUtterance;
    console.log(textPack);
}

class TextInput extends React.Component<TextInputProp, TextInputState>{
    constructor(props: TextInputProp){
        super(props);
        this.state = {
            textValue: ''
        };
    }

    render(){
        return <form>
            <label>
                <input className={style.field} type="text" value={this.state.textValue} onChange={e => {
                    this.setState({textValue: e.target.value})
                }}/>                
            </label>
            <input type="button" value="Submit" onClick={e => createUtterance(this.props.textPack, this.state.textValue)}/>
        </form>
    };
}

export default TextInput;
