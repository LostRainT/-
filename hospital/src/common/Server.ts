import Taro from '@tarojs/taro'
import {  UserLoginRequestParams, GetLessonsRequestParams, GetClockInRecordDatesRequest, RecordClockInRequest, UserPatientModel, UserDoctorModel, UserLoginResponse, UserRegisterResponse, UserPatientRequest} from './NetInterface'
import { LessonModel, LessonDetailModel} from './HomeInterfaces'

export enum RequestMethod {
    Get = "GET",
    Post = "POST"
}

// const baseurl = "http://time-machine-firefox.cn:7001"
const baseurl = "https://time-machine-firefox.cn"

interface RequestOptions {
    method: RequestMethod
    path: string
    params: {}
} 

interface ResponseOptions<T> {
    data: T
    message: string
    status: number
}

export const LoginRequest = async function loginRequest(params:UserLoginRequestParams) {
    {
        return await request<UserLoginResponse>({method: RequestMethod.Post, path:'/user/login', params})
    }
}

export const GetLessonListRequest = async function getLessonListRequest(params: GetLessonsRequestParams) {
    {
        return await request<[LessonModel]>({method: RequestMethod.Get, path: '/lesson/list', params})
    }
} 

export const GetLessonDetailRequest = async function getLessonDetailRequest(params: {lessonId: string}) {
    return await request<LessonDetailModel>({method: RequestMethod.Get, path: '/lesson/detail', params})
}

export const GetClockRecordDatesRequest = async function getClockRecordDatesRequest(params: GetClockInRecordDatesRequest) {
    {
        return await request<string[]>({method: RequestMethod.Get, path: '/clockin/record', params})
    }
} 

export const RecordClockIn = async function recordClockIn(params:RecordClockInRequest) {
    return request<{}>({params, method: RequestMethod.Post, path: '/clockin/update'})
}

export const PatientRegister = async function patientRegister(params:UserPatientRequest) {
    return request<UserRegisterResponse>({params, method: RequestMethod.Post, path: '/user/register/patient'})
}

export const DoctorRegister = async function doctorRegister(params:UserDoctorModel) {
    return request<{}>({params, method: RequestMethod.Post, path: '/user/register/patient'})
}

export const request = async function request<T>(options: RequestOptions){
    let p = new Promise<T>((resolve, reject) => {
        Taro.request({
            url: baseurl + options.path,
            data: {
                ...{wxid: UserManager.getInstance().getWxId()},
                ...options.params
            },
            header: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + UserManager.getInstance().getToken(),
            },
            method: options.method,
        }).then(res => {
            console.log('response: ',res)
            let dd = res.data as unknown as ResponseOptions<T>
            if (dd.status != 200) {
                reject(dd.message)
            }
            resolve(dd.data)
        })
    })
    return p
}

// 
export class UserManager {
    private static instance: UserManager;
    private constructor() {
        this.token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3eGlkIjoiMTIzIiwiaWF0IjoxNjI2NTE0NjAyLCJleHAiOjE2MjY3NzM4MDJ9.b-0m4w8lbwEGK5aTSvwVDw1p1acAw6XHxFnN5WMUoI8'
    }

    private openId: string
    private token: string

    public getWxId(): string {
        return this.openId
    }

    public getToken(): string {
        return this.token
    }

    public updateToken(tok: string) {
        this.token = tok
    }
  
    public static getInstance(): UserManager {
      if (!UserManager.instance) {
        UserManager.instance = new UserManager();
      }
      return UserManager.instance;
    }
  
    async geOpenId(): Promise<string> {
        const loginRes = await Taro.login()
        const wxConfig = await request<{session_key: string, openid: string}>({path: "/user/getOpenid", params: { code: loginRes.code}, method: RequestMethod.Get})
        this.openId = wxConfig.openid
        return this.openId
    }
  }