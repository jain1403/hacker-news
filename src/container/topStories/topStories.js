import React, { Component } from 'react';
import Service from '../../services/getStories';
import { css } from "@emotion/core";
import TopStoriesRender from '../../components/topStories/topStories';
import DotLoader from "react-spinners/DotLoader";


class topStories extends Component {

    state = {
        stories: [],
        loader: true,
        allStories: [],
        index: 0
    }

    componentDidMount() {
        this.loadStories('topstories', 0, 30)
    }

    loadStories = (storyType, from, to) => {
        this.setState({ loader: true,stories:[] })
        Service.getStories(storyType).then((data) => {
            this.setState({ allStories: [...data] });
            this.loadStory(data.splice(from, to), to)
        })
    }

    loadStory(data, to) {
        Service.getStoryIds(data).then((res) => {
            let response = this.state.stories.concat(res);
            this.setState({ stories: [...response], loader: false, index: to })
        });
    }

    showMore = () => {
        let from = this.state.index;
        let to = this.state.index+30;
        this.loadStory(this.state.allStories.splice(from, 30),to)
    }

    domain_from_url = (url = '') => {
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
        const override = css`
        display: block;
        margin: 0 auto;
        border-color: red;
        margin-top: 17%;
      `;
        let stories = <div>
            <DotLoader
                css={override}
                size={50}
                color={"#36D7B7"}
                loading={this.state.loading}
            />
            Loading....
        </div>;
        if (!this.state.loader) {
            stories = this.state.stories.map((element, index) => {
                element.index = index + 1;
                element.domainURL = this.domain_from_url(element.url)
                return (<TopStoriesRender data={element}></TopStoriesRender>);
            })
        }
        return (
            <div>
                <div className="mainContainer">
                    <div className="header">
                        <span onClick={() => this.loadStories('topstories', 0, 30)}>Top Stories</span>
                        <span onClick={() => this.loadStories('newstories', 0, 30)}>New Stories</span>
                        <span onClick={() => this.loadStories('beststories', 0, 30)}>Best Stories</span>
                    </div>
                    {stories}
                    <div onClick={this.showMore}>
                        Show more
                    </div>
                </div>
            </div>
        );
    }
}

export default topStories;