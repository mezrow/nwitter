import Nweet from "components/Nweet";
import { dbService } from "fbase";
import React, { useEffect, useState } from "react";

const Home = ({userObj}) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);

    // 먼저 해본것.. 예전 방식이라고 함...
    // const getNweets = async () => {
    //     const dbnweets = await dbService.collection("nweets").get();
    //     dbnweets.forEach((document) => {
    //         const nweetObject = {
    //             ...document.data(),
    //             id: document.id,                
    //         };
    //         setNweets((prev) => [nweetObject, ...prev]);
    //     });
    // }


    useEffect( ()=> {
        // getNweets(); //위에 먼저 해본 예전 방식...
        // 밑에 방식은 실시간형태로 반영됨, 작성, 수정, 삭제 등등 상황에서..
        dbService.collection("nweets").onSnapshot((snapshot) => {
            const nweetArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                ...doc.data(),
            }));
            setNweets(nweetArray);
        });
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("nweets").add({
            text: nweet,
            createAt: Date.now(),
            creatorId: userObj.uid,
        });
        setNweet("");
    };

    const onChange = (event) => {
        const {target: {value}} = event;
        setNweet(value);
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={nweet} onChange={onChange} type="text" placeholder="What's on your main?" maxLength={120} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {nweets.map((nweet) => (
                    <Nweet
                        key={nweet.id}
                        nweetObj={nweet}
                        isOwner={nweet.creatorId === userObj.uid}
                    />
                ))}
            </div>
        </div>
    );
};

export default Home;