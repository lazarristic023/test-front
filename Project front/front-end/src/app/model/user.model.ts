export enum Role{
    ADMINISTRATOR,
    CLIENT,
    EMPLOYEE
}

export interface User{
    id:number,
    username:string;
    email:string,
    password:string;
    role:Role;
    emailChecked:boolean;
    city:string,
    country:string,
    phone:string
}