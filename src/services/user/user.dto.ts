import { ISchool } from "../school/school.dto"

export enum IUserState {
    INLINE = "INLINE",
    NOT_INLINE = "NOT_INLINE",
}

export interface IUser {
    parentId: string
    email: string
    accessToken: string
    expiresIn?: number
    idToken?: string
    issuedAt: number
    refreshToken?: string
    school: ISchool
    state: IUserState
}

export interface IChildren {
    StudentName: string
    StudentID: string
}
