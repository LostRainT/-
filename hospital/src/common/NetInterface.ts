
export interface GetLessonsRequestParams {
    page: number
}

export interface UserLoginRequestParams {
    wxid: string
}

export interface PatientModel {
    gender: boolean
    name: string
    contact: string
    address: string
    age: number
    avatar: string
}

export interface DoctorModel {
    jobNumber: string
    name: string
    contact: string
    review: boolean
}



export interface UserPatientModel {
    wxid: string
    age: number
    name: string
    address?: string
    contact?: string
    gender?: boolean
    id: string
}

export interface UserPatientRequest {
    wxid: string
    age: number
    name: string
    address?: string
    contact?: string
    gender?: boolean
}

export interface UserDoctorModel {
    wxid: string
    name: string
    contact?: string
    jobNumber?: string
}

export interface GetClockInRecordDatesRequest {
    uid: string,
    startDate: string, // 2012-12-12
    endDate: string
}

export interface RecordClockInRequest {
    uid: string,
    date: string, // yyyy-mm-dd hh:ss
    duration: number,
    lessonid: string
}

export interface RecordClockInResponse {
    createdAt: string,
    updatedAt: string,
    id: string,
    patientId: string,
    date: string,
    lessonId: string,
    training_time: string,
}

export interface UserLoginResponse {
    userInfo: UserPatientModel | UserDoctorModel
    type: number
    token: string
}

export interface UserRegisterResponse {
    token: string
}
// "createdAt": "2021-07-08T09:31:20.000Z",
// "updatedAt": "2021-07-08T09:31:20.000Z",
// "id": "9",
// "gender": 1,
// "name": "王二狗",
// "contact": "110",
// "address": "address",
// "age": 22,
// "doctor_id": null,
// "wxID": "245",
// "type": 1