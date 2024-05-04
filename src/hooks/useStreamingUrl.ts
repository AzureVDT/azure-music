import axios from "axios";
import { zingmp3Api } from "../apis/constants";
import { useEffect, useState } from "react";
import { NewReleaseSongTypes } from "../types/newReleaseTypes";

export default function useStreamingUrl(data: NewReleaseSongTypes) {
    const [audioUrl, setAudioUrl] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAudioUrl = async () => {
            if (data) {
                setLoading(true);
                const res = await axios.get(
                    zingmp3Api.getStreaming(data.encodeId)
                );
                if (res.data.msg === "Success") {
                    setAudioUrl(res.data.data[128]);
                } else {
                    setAudioUrl(
                        `http://api.mp3.zing.vn/api/streaming/audio/${data?.encodeId}/320`
                    );
                }
                setLoading(false);
            }
        };
        fetchAudioUrl();
    }, [data]);

    return { audioUrl, loading, setAudioUrl };
}
