import { User } from "./user.model";

export interface Administrator extends User{
    isPredefined:boolean
    firstName:string,
    lastName:string
}