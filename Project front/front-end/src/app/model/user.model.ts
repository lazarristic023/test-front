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

    firstName:string; //dodato da bi se kompajliralo
    lastName:string;
    city:string,
    country:string,
    phone:string
}