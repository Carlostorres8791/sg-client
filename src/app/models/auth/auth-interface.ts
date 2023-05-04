import { MainRouting } from "src/app/shared/models/main-routing";

export interface AuthInterface {

    username: string;
    password: string;

}

export interface recoverPassword {
    username: string;
}


export interface RolesModel {
    id: number;
    name: string;
    mains: MainRouting[];
}

export interface AuthServiceResponse extends AuthInterface {
    id: number;
    name: string;
    email: string;
    roles: RolesModel;
    auth_token: string;

}
