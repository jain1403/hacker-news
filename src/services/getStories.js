import axios from '../axios-orders';

const getStories = (getStories) => {
    let promise = new Promise((resolve, reject) => {
        axios.get(`/${getStories}.json`).then((res) => {
            resolve(res.data);
        }).catch((err) => {
            reject(err);
            console.error(err);
        })
    });
    return promise;
}
const getStoryIds = (getStoryIds = []) => {
    let topStories = [];
    let promise;
    getStoryIds.forEach((element,index) => {
        promise = new Promise((resolve, reject) => {
            axios.get(`/item/${element}.json`).then((res) => {
                topStories.push(res.data);
                if(index == 29){
                    resolve(topStories);
                }
            }).catch((err) => {
                reject(err);
                console.error(err);
            })
        });
    });
    return promise;
}

export default {
    getStories: getStories,
    getStoryIds: getStoryIds
};