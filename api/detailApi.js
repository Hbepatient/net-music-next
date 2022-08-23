import service from "../public/js/service";

export async function handleGetDetailList(id) {
    const res = await service({
        url: '/playlist/detail',
        method: 'GET',
        params: {
            id
        }
    });
    return res.data || {};
}

// 获取歌单所有歌曲
export async function handleGetAllTrackList(id, limit = 10, offset = 1) {
    const res = await service({
        url: '/playlist/track/all',
        method: 'GET',
        params: {
            id,
            limit,
            offset,
        }
    });
    return res.data || {};
}