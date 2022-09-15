import { action, observable, makeAutoObservable, runInAction, computed } from 'mobx';
import { makePersistable } from 'mobx-persist-store';
import service from '../public/js/service';

const globalPlayList = [{
    al: {
        id: 126583656,
        name: "热爱105°C的你",
        pic: 109951166098679120,
        picUrl: "https://p2.music.126.net/6Herq6VjqEM2wJYiML3y4A==/109951166098679116.jpg",
        pic_str: "109951166098679116",
    },
    ar: [{
        id: 7122,
        name: "阿肆"
    }],
    name: "热爱105°C的你",
    id: 1840459406
}]

class globalStore {
    constructor(rootStore) {
        // this.rootStore = rootStore;
        makeAutoObservable(this);
        // makePersistable(this, {
        //     name: 'globalStore',
        //     properties: ['globalPlayList'],
        //     storage: window.sessionStorage
        // })
    };

    @observable globalPlayList = globalPlayList;
    @observable index = 0
    @observable update = false;
    @observable currentTime = 0;
    @observable durationTime = 1;
    @observable length = 1;
    @observable lyrics = '';

    @computed get lyricList() {
        const arr = this.lyrics.split(/[(\r\n)\r\n]+/).map(item => {
            let min = item.slice(1, 3);
            let sec = item.slice(4, 6);
            let mill = item.slice(7, 10);
            let lyric = item.slice(11, item.length);
            let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
            if (isNaN(Number(mill))) {
                mill = item.slice(7, 9);
                lyric = item.slice(10, item.length);
            }
            return { min, sec, mill, lyric, time };
        });
        arr.forEach((item, index) => {
            if (index === arr.length - 1) {
                item.after = 0;
            } else {
                item.after = arr[index + 1].time;
            }
        });
        return arr;
    }

    @action.bound
    updateGlobalPlayList(data) {
        this.globalPlayList = data;
        this.update = true;
    }
    @action.bound
    updateCurrentTime(data) {
        this.currentTime = data;
        // console.log(this.currentTime);
    }
    @action.bound
    updateIndex(data) {
        this.index = data;
    }
    @action.bound
    updateDurationTime(data) {
        this.durationTime = data;
    }
    @action.bound
    updateLength(data) {
        this.length = data;
    }

    @action
    async fetchLyrics(id) {
        const { data } = await service({
            method: 'GET',
            url: '/lyric',
            params: {
                id
            },
        });
        runInAction(() => {
            this.lyrics = data.lrc.lyric;
        })
    }
};

export default globalStore;