export interface User {
    email: string;
    password: string;
    returnSecureToken: boolean;
}

export interface FbAuthResponse {
    idToken: string;
    expiresIn: string;
}

export interface Item {
    id?: string;
    name: string;    
    description: string;
    link: string;
    source: string;
    techs: string[];
    photo: FileReader;
}

export interface FbCreateResponse {
    name: string
}

export interface Message {
    name: string;
    email: string;
    message: string;
    id?: string;
  }