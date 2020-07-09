import React from 'react';
import './Track.css';

export class Track extends React.Component{
  constructor(props){
    super(props);
    this.renderAction = this.renderAction.bind(this);
  }
  renderAction(){
    if(this.props.isRemoval){
      return <button className="Track-action">-</button>
    } else {
      return <button className="Track-Action">+</button>
    }
  }
  render(){
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>Track Name will go here</h3>
          <p>track artist go here |  track album will go here </p>
        </div>
        <button className="Track-action">{this.renderAction}</button>
      </div>
    )
  }
}