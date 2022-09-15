import DetailTop from "../components/detail/DetailTop";
import { handleGetAllTrackList, handleGetDetailList } from "../api/detailApi";
import MusicPlayList from "../components/detail/MusicPlayList";
import { useStore } from "../utils/useStore";

const Detail = ({ id, detailData, trackListData }) => {
    const { detailStore = {} } = useStore() || {};
    const playListContent = detailData.playlist || {};
    const trackListContent = trackListData.songs || {};
    detailStore?.updatePlayListContent(playListContent);
    detailStore?.updateTrackListContent(trackListContent);
    detailStore?.updateListId(id);
    return (
        <>
            <DetailTop />
            <MusicPlayList />
        </>
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