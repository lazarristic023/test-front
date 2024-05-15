import { Company } from "./company.model";
import { User } from "./user.model";

export interface Employee extends User{
    firstName:string,
    lastName:string,
    company: Company
}