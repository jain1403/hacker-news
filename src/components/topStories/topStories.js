import React, { Component } from 'react';
import './topStories.css';

class topStoriesRender extends Component {
    render() {
        console.log(this.props);
        return (
            <div className="flexWrapper">
                <span>{this.props.data && this.props.data.index}.</span>
                <div className="paraWrap">
                    <p className="mainTitle">{this.props.data && this.props.data.title}<span className="subtitle">({this.props.data && this.props.data.domainURL})</span></p>
                    <p className="subtitle">{this.props.data && this.props.data.score} points by {this.props.data && this.props.data.by} {this.props.data && this.props.data.time} hours ago | hide |  {this.props.data && this.props.data.descendants} comments</p>
                </div>
            </div>
        );
    }
}
export default topStoriesRender;