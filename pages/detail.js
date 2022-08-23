import DetailTop from "../components/detail/DetailTop";
import { handleGetAllTrackList, handleGetDetailList } from "../api/detailApi";
import MusicPlayList from "../components/detail/MusicPlayList";
import { addStore } from "../utils/store";
import { Observer } from "mobx-react-lite";

const createStore = (defaultData) => {
    return {
        ...defaultData,
    }
}

const Detail = ({ id, detailData, trackListData }) => {
    const playListContent = detailData.playlist || {};
    const trackListContent = trackListData.songs || {};
    addStore('detailStore', createStore({ listId: id, playListContent, trackListContent }));
    return (
        <Observer>
            {
                () => (
                    <>
                        <DetailTop />
                        <MusicPlayList />
                    </>
                )
            }
        </Observer>
    )
}

export default Detail;

export async function getServerSideProps(context) {
    const { id } = context.query;
    const detailData = await handleGetDetailList(id);
    const trackListData = await handleGetAllTrackList(id);
    return {
        props: {
            id,
            detailData,
            trackListData
        }
    }
}