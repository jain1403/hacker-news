import React, { Component } from 'react';
import Service from '../../services/getStories';
import Spinner from '../../UI/Spinner/Spinner';
import TopStoriesRender from '../../components/topStories/topStories'

class topStories extends Component {

    state = {
        stories:[],
        loader:true
    }

    componentDidMount() {
        Service.getStories('topstories').then((data) => {
            Service.getStoryIds(data.splice(0, 30)).then((res) => {
                this.setState({stories:[...res],loader:false})
            });
        })
    }

     domain_from_url= (url = '') => {
        var result
        var match
        if (match = url.match(/^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n\?\=]+)/im)) {
            result = match[1]
            if (match = result.match(/^[^\.]+\.(.+\..+)$/)) {
                result = match[1]
            }
        }
        return result
    }

    render() {
        console.log("------",this.state.stories)
        let stories = <Spinner></Spinner>;
        if(!this.state.loader){
            stories = this.state.stories.map((element,index)=>{
                console.log(element);
                element.index = index + 1;
                element.domainURL = this.domain_from_url(element.url)
                return (<TopStoriesRender data={element}></TopStoriesRender>);
            })
        }
        return (
            <div>
                {stories}
            </div>
        );
    }
}

export default topStories;