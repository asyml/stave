import React from 'react';

import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';

import './JsonEditor.css';

export default class JsonEditor extends React.Component<{
    onChangeJsonText: Function, 
    jsonText: string, 
    className: string}> {
  private jsoneditor = new JSONEditor();
  private container = React.createRef<HTMLDivElement>();

  componentDidMount () {
    const options = {
      mode: 'tree',
      onChangeText: this.props.onChangeJsonText
    };

    this.jsoneditor = new JSONEditor(this.container.current, options);
    this.jsoneditor.setText(this.props.jsonText);
  }

  componentWillUnmount () {
    if (this.jsoneditor) {
      this.jsoneditor.destroy();
    }
  }

  componentDidUpdate() {
    this.jsoneditor.updateText(this.props.jsonText);
  }

  render() {
    return (
        <div className={`jsoneditor-react-container ${ this.props.className }`} ref={this.container} />
    );
  }
}