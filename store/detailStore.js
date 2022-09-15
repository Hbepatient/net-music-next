import { action, observable, makeAutoObservable } from 'mobx';

class detailStore {
    constructor(){
        makeAutoObservable(this);
    }
    @observable playListContent = {};
    @observable trackListContent = {};
    @observable listId;

    @action.bound
    updatePlayListContent(data) {
        this.playListContent = data;
    }
    @action.bound
    updateTrackListContent(data) {
        this.trackListContent = data;
    }
    @action.bound
    updateListId(data){
        this.listId = data;
    }
}

export default detailStore