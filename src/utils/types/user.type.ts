export interface User {
//   id: string;
  fullname: string;
  email: string;
  number: string;
  password: string;
  dateBirth: string;
  address: string;
  profile_pic: string | null
}

export interface LoginUser {
  email: string;
  password: string;
}