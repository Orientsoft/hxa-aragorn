import { Input } from '@alifd/next';
import React from 'react';

// eslint-disable-next-line @iceworks/best-practices/recommend-functional-component
export default class EditablePane extends React.Component {
  constructor(props) {
    super(props);
    this.onKeyDown = (e) => {
      const { keyCode } = e;
      if (keyCode > 36 && keyCode < 41) {
        e.stopPropagation();
      }
    };
    this.onBlur = (e) => {
      this.setState({
        editable: false,
        cellTitle: e.target.value,
      });
    };
    this.onDblClick = () => {
      this.setState({
        editable: true,
      });
    };
    this.state = {
      cellTitle: props.defaultTitle,
      editable: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.defaultTitle !== this.state.cellTitle) {
      this.setState({
        cellTitle: nextProps.defaultTitle,
      });
    }
  }

  // Stop bubble up the events of keyUp, keyDown, keyLeft, and keyRight
  render() {
    const { cellTitle, editable } = this.state;
    if (editable) {
      return <Input autoFocus defaultValue={cellTitle} onKeyDown={this.onKeyDown} onBlur={this.onBlur} />;
    }
    return <span onDoubleClick={this.onDblClick}>{cellTitle}</span>;
  }
}
