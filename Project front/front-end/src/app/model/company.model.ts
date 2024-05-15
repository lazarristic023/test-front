import { Client } from "./client.model";
import { Employee } from "./employee.model";
import { User } from "./user.model";

export interface Company{
    id:number;
    name:string;
    address:string;
    clients:Client[];
    employees:Employee[]
}