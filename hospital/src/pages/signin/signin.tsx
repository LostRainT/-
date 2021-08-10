import { Component } from "@tarojs/taro";
import { AtCalendar } from "taro-ui"
import { GetClockRecordDatesRequest } from "../../common/Server";
import { SignInDesc } from '../../common/HomeInterfaces'
import { daysCount } from "../../static/helpFuncs";
interface MyProps {

}
interface MyState {
    signs: SignInDesc[]
}
export default class Signin extends Component<MyProps, MyState> {
    config = {
        navigationBarTitleText: '打卡记录'
    }
    constructor(props: MyProps) {
        super(props)
        this.state = {
            signs: []
        }
    }
    componentWillMount() {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        this.requestMonth(month, year)
    }

    requestMonth(month: number, year: number) {
        var conti = true
        this.state.signs.map((res)=>{
            if (res.year == year && res.month == month) {
                console.log('日期有了')
                conti = false
                return
            }
        })
        if (!conti) {
            return
        }
        let uid = this.$router.params.id
        console.log('record id: ', uid)
        let days = daysCount(month, year)
        var monStr = month.toString()
        if (month < 10) {
            monStr = '0' + monStr
        }
        let prefix = year.toString() + '-' + monStr
        let from = prefix + '-01'
        let to = prefix + '-' + days.toString()
        GetClockRecordDatesRequest({uid: uid, startDate: from, endDate: to}).then(res=> {
            console.log('siginin: ', res)
            var modi: string[] = []
            res.forEach((value) => {
                let str = value.replace('-', '/')
                modi.push(year + '/' + str)
            })
            let sign = new SignInDesc( year, month, modi)
            var signs = this.state.signs
            signs.unshift(sign)
            this.setState({
                signs: signs
            })
        }).catch(err=> {
            console.log(err)
        })
    }

    monthChange(mon: string) {
        console.log('currentmonth: ', mon)
        let seps = mon.split('-')
        let year = seps[0]
        let month = seps[1]
        let day = seps[2]
        this.requestMonth(Number(month), Number(year))
    }

    render() {
        let res: {}[] = []
        this.state.signs.map((ele) => {
            ele.signDays.map((sub) => {
                res.push({value: sub})
            })
        })
        
        let test = [{value: '2021/07/10'}, {value: '2021/0715'}]
        console.log('render: ', res, test)
        return (
            <AtCalendar marks={res} onMonthChange={this.monthChange.bind(this)}/>
        )
    }
}