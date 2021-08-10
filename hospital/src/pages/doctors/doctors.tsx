import { View, ScrollView } from "@tarojs/components";
import { Component } from "@tarojs/taro";
import { DoctorCardView } from '../../components'
import { DoctorModel } from '../../common/NetInterface'

interface MyProps {
}

interface MyState {
  values: DoctorModel[]
  loading: boolean
}

class Temp implements DoctorModel {
    name: string;
    age: number;
    review: boolean;
    contact: string;
    jobNumber: string;
  
    constructor(nm: string, ag: number, rev: boolean, con: string, job: string) {
      this.name = nm
      this.age = ag
      this.review = rev
      this.contact = con
      this.jobNumber = job
    }
  }


export default class Doctors extends Component<MyProps, MyState> {

    config = {
        navigationBarTitleText: '我的医生'
    }

    pageIndex: number = 1
    constructor(props: MyProps) {
        super(props)
        this.state = {
            values: [],
            loading: false
        }
    }

    componentWillMount () { 
        this.onRefreshPullDown()
    }

    onRefreshPullDown() {
        // this.setState({loading: true})

        // GetLessonListRequest({page: 1}).then(res=>{
        //     console.log(res)
        //     this.pageIndex = 2
        //     this.setState({values: res, loading: false})
        //   })
        let vals = this.state.values
        for (let index = 0; index < 5; index++) {
            let name = "医生"
            let age = index * 2 + 30
            let con = "13000000000"
            let rev = true
            let jobNum = index.toString()
            let val = new Temp(name, age, rev, con, jobNum)
            vals.push(val)
        }
        this.setState({
            values: vals,
            loading: false
        })
    }

    cardClick(doctor: DoctorModel) {
        console.log(doctor)
    }

    render() {
        let doctors = this.state.values
        let loading = this.state.loading
        let height = Taro.getSystemInfoSync().windowHeight
        return (
            <View className='index' style={{display: 'flex'}}>
            <ScrollView 
                style={{flex: 1, height: height}}
                scrollY refresherEnabled={true} 
                refresherTriggered={loading}
                onRefresherRefresh={()=>{this.onRefreshPullDown()} }>
            {doctors.map((doctor)=>{
              return (
                <View onClick={()=>{
                  this.cardClick(doctor)
                }}>
                  <DoctorCardView name={doctor.name} jobNumber={doctor.jobNumber} contact={doctor.contact} review={true}/>
                </View>
              )
            })}
          </ScrollView>
        </View>
        )
    }
}