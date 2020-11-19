import React from 'react';
import style from './TextInput.module.css';
import {ISinglePack} from '../../nlpviewer';
import {OnEventType} from './DialogueBox';

export interface TextInputProp {
  textValue: string;
  textPack: ISinglePack;
  onEvent?: OnEventType;
}

interface TextInputState {
  textValue: string;
}

function submitUtterance(
  textPack: ISinglePack,
  newUtterance: string,
  onEvent?: OnEventType
) {
  let {text} = textPack;

  text = text + '\n' + newUtterance;
  const end = text.length;
  const begin = text.length - newUtterance.length;

  if (onEvent) {
    onEvent({
      type: 'new-utterance', // TODO: add strick type for event
      text: text,
      span: {
        begin: begin,
        end: end,
      },
      legendId: 'ft.onto.base_ontology.Utterance',
      attributes: {
        speaker: 'user',
      },
    });
  }
}

class TextInput extends React.Component<TextInputProp, TextInputState> {
  constructor(props: TextInputProp) {
    super(props);
    this.state = {
      textValue: '',
    };
  }
  addAIBubble = () => {
    this.setState({});
  };
  render() {
    return (
      <form
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <label>
          <input
            className={style.field}
            type="text"
            placeholder="Type your query here"
            value={this.state.textValue}
            onChange={e => {
              this.setState({textValue: e.target.value});
            }}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                //temporarily add ai bubble?
                this.addAIBubble();
                submitUtterance(
                  this.props.textPack,
                  this.state.textValue,
                  this.props.onEvent
                );
                this.setState({textValue: ''});
              }
            }}
          />
        </label>
        <input
          className={style.submit_button}
          type="button"
          value="Submit"
          onClick={() => {
            submitUtterance(
              this.props.textPack,
              this.state.textValue,
              this.props.onEvent
            );
            this.setState({textValue: ''});
          }}
        />
      </form>
    );
  }
}

export default TextInput;
