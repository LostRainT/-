// import { Component } from 'react'
import { View, Text, Image, Video } from '@tarojs/components'
import Taro, {Component, VideoContext} from '@tarojs/taro'
import { GetLessonDetailRequest, RecordClockIn } from '../../common/Server'
// import { LessonDetailModel } from "../../common/HomeInterfaces";
import play from '../../images/detail/play.jpg'
import {UserPatientModel} from '../../common/NetInterface'
import './lessonDetail.scss' 
let Keys = require('../../static/consts')
interface MyProps {
}

interface LessonDetailState {
    id: string
    title: string
    imageUrl: string
    videoUrl: string
    videoDuration: number
    updatedAt: string
    info: string
    showCoverImage: boolean
}

export default class LessonDetailPage extends Component<MyProps, LessonDetailState> {
    config = {
        navigationBarTitleText: '视频详情'
    }
    
    constructor(props: MyProps){
        super(props)
        // this.state = {
        //     value: undefined,
        //     showCoverImage: true
        // }
    }
    videoContext: VideoContext
    componentWillMount() {
        let lid = this.$router.params.lessonID
        console.log('request lessonid: ' + lid)
        GetLessonDetailRequest({lessonId: lid}).then(res=>{
            console.log('request result: ' + res)
            this.setState({
                id: res.id,
                title: res.title,
                imageUrl: res.imageUrl,
                videoUrl: res.videoUrl,
                videoDuration: res.videoDuration,
                updatedAt: res.updatedAt,
                info: res.info,
                showCoverImage: true
            })
        }).catch(err=> {
            console.log(err)
        })
    }

    componentDidMount() {
        // let value  = this.$router.params
        // console.log(value)
        this.videoContext = Taro.createVideoContext('lessonVideo', this)
        // this.setState({
        //     imageurl: value.imageurl,
        //     videourl: value.videourl,
        //     title: value.title,
        //     info: value.info,
        // })
    }

    videoEnded() {
        // console.log('video end')
        
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth()
        let day = date.getDay()
        let hour = date.getHours()
        let sec = date.getSeconds()
        let dateStr = year + '-' + month + '-' + day + ' ' + hour + ':' + sec
        let dura = this.state.videoDuration
        let leid = this.$router.params.lessonID
        console.log('ended', dateStr, dura, leid)
        Taro.getStorage({
            key: Keys.storageKeys.patient,
            success: function(res) {
                let mo = res.data as unknown as UserPatientModel
                RecordClockIn({uid: mo.id, date: dateStr, duration: dura, lessonid: leid}).then(res=>{
                    console.log('res: ', res)
                })
                
            }
        })
    //     uid: string,
    // date: string, // yyyy-mm-dd hh:ss
    // duration: number,
    // lessonid: string
    }

    videoOnPlay() {
        console.log('video start')
    }

    tapCoverImage = () => {
        console.log('tap cover image')   
        this.setState({
            showCoverImage: false
        })     
        this.videoContext.play()
    }

    render() {
        let showImage = this.state.showCoverImage
        
        return (
            <View className='back'>
                {/* {view} */}
                <View className='video-back'>
                    <Image className={showImage ? 'play-show' : 'play-hide'} src={play} onClick={this.tapCoverImage} ></Image>
                    <Image className={showImage ? 'background-icon-show' : 'background-icon-hide'} src={this.state.imageUrl}></Image>
                    <View className={showImage ? 'cover-show' : 'cover-hide'}></View>
                    <Video
                        className={!showImage ? 'background-icon-show' : 'background-icon-hide'}
                        onPlay={this.videoOnPlay} 
                        onEnded={this.videoEnded}
                        src={this.state.videoUrl}
                        showCenterPlayBtn={false}
                        id='lessonVideo'>
                    </Video>
                </View>
                <Text className='title'> {this.state.title} </Text>
                <Text className='sub-title'> {this.state.info} </Text>
                {/* <Text className='title'> {'感冒'} </Text>
                <Text className='sub-title'> {} </Text> */}
            </View>
        )
    }
}


/*
'感冒 （病症 \n 百姓所说的感冒是指“普通感冒”，又称“伤风”、急性鼻炎或上呼吸道感染。' + 
                '感冒是一种常见的急性上呼吸道病毒性感染性疾病，多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。' + 
                '临床表现为鼻塞、喷嚏、流涕、发热、咳嗽、头痛等，多呈自限性。大多散发，冬、春季节多发，季节交替时多发。' + 
                '别称伤风、急性鼻炎或上呼吸道感染就诊科室呼吸内科常见病因多由鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等引起。'+
                '常见症状鼻塞，喷嚏，流涕，发热，咳嗽，头痛 \n 病因 \n鼻病毒、副流感病毒、呼吸道合胞病毒、埃可病毒、柯萨奇病毒、冠状病毒、腺病毒等病毒感染引起。'+ 
                '临床表现 \n 本病起病较急，潜伏期1～3天，主要表现为鼻部症状，如喷嚏、鼻塞、流清水样鼻涕，也可表现为咳嗽、咽干、咽痒、咽痛或灼热感，甚至鼻后滴漏感。' + 
                '2～3天后鼻涕变稠，常伴咽痛、流泪、味觉减退、呼吸不畅、声嘶等。一般无发热及全身症状，或仅有低热、不适、轻度畏寒、头痛。\n 检查 \n 1.血常规病毒性感染时白细胞计数多为正常或偏低，淋巴细胞比例升高。\n' + 
                '2.病原学检查 \n（1）病毒核酸检测：呼吸道标本（鼻咽部、气管抽取物、痰）中的病毒核酸检测。\n（2）病毒抗原检测：可采用胶体金和免疫荧光法。\n（3）血清学检测：动态监测的IgG抗体水平恢复期比急性期≥4倍升高。\n' + 
                '（4）病毒分离培养。 \n 3.肺部X线片 \n 胸部X线片表现为正常。\n 诊断\n 主要结合流行病学史、临床表现和病原学检查。\n 1.临床表现 \n 出现咽干、咽痒、打喷嚏、鼻塞咳嗽、流眼泪、头痛等症状。 \n  2.血常规检查 \n ' + 
                '血常规显示白细胞总数正常或降低，淋巴细胞比例升高。 \n 3.病原学检查 \n 病毒核酸检测阳性，病毒抗原检测阳性，病毒特异性抗体IgG恢复期比急性期≥4倍升高，病毒分离培养阳性等。 \n ' + 
                '鉴别诊断 \n 1.流行性感冒 \n 流行性感冒潜伏期多为1～7天，临床表现主要以发热（体温可达39～40℃）、头痛、肌痛和全身不适起病。除了全身症状，常有咽喉痛、干咳，可有鼻塞、流涕、胸骨后不适等。部分有呕吐、腹痛、腹泻等消化道症状。流感病原学检测阳性。 \n  2.过敏性鼻炎 \n ' + 
                '有过敏史，常年打喷嚏和流涕，鼻黏膜苍白伴有瘙痒感，鼻分泌物内嗜酸粒细胞增加等。 \n  3.萎缩性鼻炎 \n  大多是鼻腔通畅，鼻和鼻咽部干燥，鼻分泌物为块状、管筒状脓痂，伴有呼气恶臭、嗅觉减退等症状。 \n ' + 
                ' 4.血管舒缩性鼻炎 \n  无过敏史，常出现鼻黏膜间歇性血管充盈、打喷嚏和流清涕，吸入干燥空气后症状加重。 \n  5.上呼吸道感染性疾病 \n ' + 
                ' 如细菌性咽-扁桃体炎，疱疹性咽峡炎等均有其病变部位的特异性体征。前者有咽部充血，扁桃体肿大，表面有脓性分泌物等；后者软腭、咽和扁桃体表面有灰白色疱疹和浅表溃疡伴周围红晕。 \n  治疗 \n ' + 
                ' 一般治疗包括注意休息，多饮水，饮食要容易消化，注意通风等。缓解症状可使用药物治疗。 \n  1.解热镇痛药 \n ' + 
                ' 包括复方阿司匹林、吲哚美辛、对乙酰氨基酚、布洛芬等药物，适用于发热、肌肉酸痛、头痛的患者。对于严重肝肾功能不全、有出血倾向、上消化道出血等人群，不宜使用此类药物。 \n ' + 
                ' 2.抗组胺药 \n  如马来酸氯苯那敏,对减少打喷嚏和鼻溢效果显著。 \n  3.镇咳药 \n  对于剧烈咳嗽，甚至影响休息时，可适量使用镇咳药，以右美沙芬的应用较多。 \n ' + 
                ' 4.拟肾上腺素药 \n  对于鼻塞、鼻黏膜充血水肿的患者，可以使用盐酸伪麻黄碱等药物。 \n  并发症 \n  中耳炎、急性鼻窦炎、化脓性咽炎、气管-支气管炎、风湿热、肾小球肾炎和心肌炎等。 \n  预后 \n ' + 
                '  本病具有自限性，从出现症状到痊愈，一般需要5～7天。 \n  护理 \n  1.多卧床休息，保证充足睡眠。 \n  2.清淡饮食，充分饮水，少吃油腻、煎炸、生冷的饮食。 \n  3.遵照医嘱,按时服药，不要滥用抗生素。 \n ' + 
                ' 4.劳逸结合，循序渐进地进行适当的体育运动。 \n 5.在呼吸道疾病高发季节（初春、秋末冬初），少去人员密集的公共场所，防止交叉感染，保持良好的个人卫生习惯，勤洗手；保持环境清洁和通风。'
**/