import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Text, View, FlatList, Dimensions } from 'react-native'
import SinglePost from "../../components/post";
import styles from "./Styles";
const TOKEN = "U2FsdGVkX18Yt+lyZllGpPYJJqcdCYZOP0iiqQ4U3nIq/L9of280U2/xWoDVujOWys7qnYyiZ5BtKZ7qyrkMfCex8Ous/Sg+bKKv1rNjfBn/KK2MSx3Z8UB0hHxz4t6PMozqOiut1h9gqOjEbYfAjBafUKqq4zJLKSuA3CCfp7t6tC9VK1gA5pvXsHsD0rvT02uITcVfwXXEwyJvpDETMngVuNoHUxN8pDib3sDp0n+nW71jArNRmUuiBsYWHio/tGNImNJAQteCOosroaabPGIoNej8z4dq1idgS5r/gfZ3rN+CL0Bc44GhSwx8ObNegfErMOYzE8zG5/Z3ZhCF8RpEJhBacj5u+wBViotf6l3M/in5RAn5Seu+KtTLTEffqbYyvEoeEcIvSuFvj0Zt6g=="
const DATASAVAIL = [{
    _id: 1,
    title: "Test Video 1",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/617b2b8c7e44f48d4879eb306fe89ad9/coconut/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/33112c63e19dfb3aea32da7a2c7317ec/coconut/dash/1/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/33112c63e19dfb3aea32da7a2c7317ec/coconut/hls/1/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/33112c63e19dfb3aea32da7a2c7317ec/coconut/dash/1/master.m3u8'
    }
    ]
    },
    {
    _id: 2,
    title: "Test Video 2",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/a6e6c3d82dc3550bf71b5728830faaef/coconut/2/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/2d089dc3e31c6970742ce9d93b8579a3/coconut/dash/2/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/2d089dc3e31c6970742ce9d93b8579a3/coconut/hls/2/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/2d089dc3e31c6970742ce9d93b8579a3/coconut/dash/2/master.m3u8'
    }
    ]
    },
    {
    _id: 3,
    title: "Test Video 3",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/5edd1120979c03facbab84e2caf5cb1f/coconut/3/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/19f41ae896ec7717e9ac1b96aa3869a6/coconut/dash/3/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/19f41ae896ec7717e9ac1b96aa3869a6/coconut/hls/3/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/19f41ae896ec7717e9ac1b96aa3869a6/coconut/dash/3/master.m3u8'
    }
    ]
    },
    {
    _id: 4,
    title: "Test Video 4",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/05eb9690841f19a0361f265b3dd6c3f4/coconut/4/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/0a348e081e8db6a6851c2441e9e1109d/coconut/dash/4/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/0a348e081e8db6a6851c2441e9e1109d/coconut/hls/4/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/0a348e081e8db6a6851c2441e9e1109d/coconut/dash/4/master.m3u8'
    }
    ]
    },
    {
    _id: 5,
    title: "Test Video 5",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/b6c7b02b12e3a89717af0e3f2dfaf827/coconut/5/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/b0e70fef6ae7e0a6a5e223418be41ea6/coconut/dash/5/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/b0e70fef6ae7e0a6a5e223418be41ea6/coconut/hls/5/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/b0e70fef6ae7e0a6a5e223418be41ea6/coconut/dash/5/master.m3u8'
    }
    ]
    },
    {
    _id: 6,
    title: "Test Video 6",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/24fc52485b95e023b6d7e2a41accc6f7/coconut/6/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/a0ef879afe43d39037ab5090a77cdb59/coconut/dash/6/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/a0ef879afe43d39037ab5090a77cdb59/coconut/hls/6/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/a0ef879afe43d39037ab5090a77cdb59/coconut/dash/6/master.m3u8'
    }
    ]
    },
    {
    _id: 7,
    title: "Test Video 7",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/0b1dcb238a16d7ad2bbdec4e31352d83/coconut/7/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/ef107d1d1f4ecb4313134264a5902e00/coconut/dash/7/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/ef107d1d1f4ecb4313134264a5902e00/coconut/hls/7/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/ef107d1d1f4ecb4313134264a5902e00/coconut/dash/7/master.m3u8'
    }
    ]
    },
    {
    _id: 8,
    title: "Test Video 8",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/06/d91d73810f8a8ad8e9c2f4a3dc42bb14/coconut/8/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/c1603f39d126f71a34e320149ff12bcc/coconut/dash/8/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/c1603f39d126f71a34e320149ff12bcc/coconut/hls/8/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/c1603f39d126f71a34e320149ff12bcc/coconut/dash/8/master.m3u8'
    }
    ]
    },
    {
    _id: 9,
    title: "Test Video 9",
    videos: [
    {
      thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/323a3793ad59916fe85005c405d48a85/coconut/9/image.jpg',
      dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/c81613298ee6297a9daaf63c393fc45d/coconut/dash/9/master.mpd',
      hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/c81613298ee6297a9daaf63c393fc45d/coconut/hls/9/master.m3u8',
      hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/c81613298ee6297a9daaf63c393fc45d/coconut/dash/9/master.m3u8'
    }
    ]
    },
    {
    _id: 10,
    title: "Test Video 10",
    videos: [
        {
            thumbnail: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/5d7602a0e981c40a4f10c608f7b2a3b0/coconut/10/image.jpg',
            dash: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/8b60c975124dc7f1e6fbd81732fc56f2/coconut/dash/10/master.mpd',
            hls: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/8b60c975124dc7f1e6fbd81732fc56f2/coconut/hls/10/master.m3u8',
            hlsfmp4: 'https://s3.amazonaws.com/aws-us-east-1-media-test.coconut.co/11/07/8b60c975124dc7f1e6fbd81732fc56f2/coconut/dash/10/master.m3u8'
          }
    ]
    },]
const Feeds = (props) => {
    let mediaRef = useRef([])
    let [data, setData] = useState([]);
    let [pageNo, setPageNo] = useState(1)
    let [selected, setSelected] = useState('')

    useEffect(() => {
        setData(DATASAVAIL)
        // var postData = {
        //     "pageNo": pageNo,
        //     "recordsPerPage": 5
        // }

        // let axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         "Access-Control-Allow-Origin": "*",
        //         'Authorization': `Bearer ${TOKEN}`
        //     }
        // };
        // axios.post('https://quantumapi.taramsys.com/api/v1/feeds', postData, axiosConfig)
        //     .then((res) => {
        //         // console.log("RESPONSE RECEIVED: ", res.data.result);
        //         setData(res.data.result)

        //         console.log("RESPONSE RECEIVED: ", data.length);

        //     })
        //     .catch((err) => {
        //         console.log("AXIOS ERROR: ", err);
        //     })
        
      
    }, [])
    let onViewableItemChanged = useRef(({ changed }) => {
        changed.forEach(element => {
            console.log('EEEEEEE', element.item._id)
            setSelected(element.item._id)
            let cells = mediaRef.current[element.key];
            if (cells) {
                if (element.isViewable) {
                    cells.play()
                } else {
                    cells.stop()
                }
            }
        });
    })
    const array = [1, 2, 3, 4, 5, 6, 7]

    const renderItems = ({ item, index }) => {
        return (
            <View style={[{ flex: 1, height: Dimensions.get('window').height - 50 }, index % 2 ? { backgroundColor: 'blue' } : { backgroundColor: 'red' }]}>
                <SinglePost selected={selected} item={item} ref={PostSingleRef => (mediaRef.current[item] = PostSingleRef)} />
            </View>
        )
    }

    const nextPage = () => {
        setPageNo(pageNo++)
        // console.log("next page Reached", pageNo)

        let demo = {
            "pageNo": pageNo,
            "recordsPerPage": 5
        }
                console.log("next page Reached", demo)



        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${TOKEN}`
            }
        };
        axios.post('https://quantumapi.taramsys.com/api/v1/feeds', demo, axiosConfig)
            .then((res) => {
                // console.log("RESPONSE RECEIVED: ", res.data.result);
                setData([...data, ...res.data.result])
                let page = pageNo++
                setPageNo(page)


                // console.log("RESPONSE RECEIVED: ", data);

            })
            .catch((err) => {
                console.log("AXIOS ERROR: ", err);
            })
    }

    return (
    <View style={styles.container}>
        <FlatList
            data={data}
            renderItem={renderItems}
            pagingEnabled={true}
            keyExtractor={item => item._id}
            decelerationRate={'fast'}
            onViewableItemsChanged={onViewableItemChanged.current}
            windowSize={4}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            initialNumToRender={4}
            removeClippedSubviews={true}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 100
            }}
            // onEndReached={() => {

            //     nextPage()
            // }}

        />
    </View>)
}


export default Feeds;