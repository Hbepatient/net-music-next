import React, { useState } from "react";
import { List } from "react-vant"
import { handleGetAllTrackList } from "../../../api/detailApi";
import { useStore } from "../../../utils/useStore";
import ListTop from "./ListTop"

export default function MusicPlayList() {
    const { globalStore, detailStore } = useStore();
    const { listId, trackListContent } = detailStore;
    const [trackList, setTrackList] = useState(trackListContent);
    const [finished, setFinished] = useState(false);
    const initActiveList = () => {
        return trackList.map(() => '');
    }
    const [activeList, setActiveList] = useState(initActiveList());
    // 将歌曲列表传给global
    const playMusic = ({trackList, index}) => {
        globalStore.updateGlobalPlayList(trackList);
        globalStore.updateCurrentTime(0);
        globalStore.updateIndex(index);
        globalStore.updateLength(trackList.length);
    }
    return (
        <div className="playListContainer">
            <ListTop />
            <List
                finished={finished}
                onLoad={async () => {
                    const data = await handleGetAllTrackList(listId, 10, trackList.length + 10);
                    const newTrackList = data.songs || [];
                    if (!newTrackList.length) {
                        setFinished(true);
                    }
                    setTrackList([...trackList, ...newTrackList]);
                }}
                errorText='请求失败，点击重新加载'
            >
                {
                    trackList.map((track, index) => {
                        const singerList = track.ar || [];
                        return (
                            <div
                                className="trackListItem"
                                key={track.id}
                                onClick={() => {
                                    const newActiveList = activeList.map((isActive, pos) => {
                                        if (pos === index) {
                                            isActive = 'active';
                                        } else {
                                            isActive = '';
                                        }
                                        return isActive;
                                    })
                                    playMusic({ trackList, index });
                                    setActiveList(newActiveList);
                                }}
                            >
                                <div className="listLeft">
                                    <span className="index">{index + 1}</span>
                                    <div className="trackInfo">
                                        <span className="trackName">{track.name}</span>
                                        <span className="singerName">
                                            {
                                                singerList.map((singer, sIndex) => {
                                                    let name = '';
                                                    if (sIndex > 0 || sIndex < singer.length - 1) {
                                                        name += ' / ';
                                                    }
                                                    name += singer.name;
                                                    return name;
                                                })
                                            }
                                        </span>
                                    </div>
                                </div>
                                <div className="listRight">
                                    <svg className={`icon play ${activeList[index]}`} aria-hidden="true">
                                        <use xlinkHref="#icon-bofang1"></use>
                                    </svg>
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#icon-xuanxiang"></use>
                                    </svg>
                                </div>
                            </div>
                        )
                    })
                }
            </List>
        </div>
    )
}