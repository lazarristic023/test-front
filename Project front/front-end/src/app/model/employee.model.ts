import { Company } from "./company.model";
import { User } from "./user.model";

export interface Employee extends User{
    firstName:string,
    lastName:string,
    company: Company

}

/*export interface Employee{
    id:number;

    username: string;

    email:string;

    password:string;

    role:string;

    emailChecked:boolean;
}*/