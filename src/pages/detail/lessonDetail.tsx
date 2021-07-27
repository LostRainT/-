import { Component } from 'react'
import { View, Text, ScrollView, Image, CoverImage, Video } from '@tarojs/components'
import { getCurrentInstance } from '_@tarojs_taro@3.2.8@@tarojs/taro'

interface LessonDetailProps {
}

interface LessonDetailState {
    imageurl?: string
    videourl?: string
    title?: string
    info?: string
}

export default class LessonDetailPage extends Component<LessonDetailProps, LessonDetailState> {
    constructor(props: LessonDetailProps){
        super(props)

        this.state = {
            imageurl: "",
            videourl: "",
            title: "",
            info: ""
        }
    }

    componentDidMount() {
        let value  = getCurrentInstance().router.params
        console.log(value)

        this.setState({
            imageurl: value.imageurl,
            videourl: value.videourl,
            title: value.title,
            info: value.info
        })
    }

    videoEnded() {
        console.log('video end')
    }

    videoOnPlay() {
        console.log('video start')
    }

    render() {
        return (
            <View>
                <Text> {this.state.title} </Text>
                <Text> {this.state.info} </Text>
                <Image src={this.state.imageurl}></Image>
                <Video onPlay={this.videoOnPlay} onEnded={this.videoEnded} src={this.state.videourl} controls ></Video>
            </View>
        )
    }
}
