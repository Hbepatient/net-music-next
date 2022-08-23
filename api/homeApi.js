import service from "../public/js/service";

export async function handleGetBanner(){
    const res = await service({
        url: "/banner?type=2",
        method: "GET"
    });
    return res.data || {};
}

export async function handleGetMusicList(){
    const res = await service({
        url: "/personalized?limit=10",
        method: "GET"
    });
    return res.data || {};
}