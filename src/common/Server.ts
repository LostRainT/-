import Taro from '@tarojs/taro'

export enum RequestMethod {
    Get = "GET",
    Post = "POST"
}

const baseurl = "http://time-machine-firefox.cn:7001"

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
            },
            method: options.method,
        }).then(res => {
            let dd = res.data as unknown as ResponseOptions<T>
            if (dd.status != 200) {
                reject(dd.message)
            }
            resolve(dd.data)
        })
    })
    return p
}


export class UserManager {
    private static instance: UserManager;
    private constructor() {  
    }

    private openId: string

    public getWxId(): string {
        return this.openId
    }
  
    public static getInstance(): UserManager {
      if (!UserManager.instance) {
        UserManager.instance = new UserManager();
      }
      return UserManager.instance;
    }
  
    async geOpenId(): Promise<string> {
        const loginRes = await Taro.login()
        const wxConfig = await request<{session_key: string, openid: string}>({path: "/usr/getOpenid", params: { code: loginRes.code}, method: RequestMethod.Get})
        this.openId = wxConfig.openid
        return this.openId
    }
  }