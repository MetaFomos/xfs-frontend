import React from "react";

declare module "react" {
  interface CSSProperties {
    "--value"?: string | number;
    "--size"?: string | number;
    "--thickness"?: string | number;
  }
}
  
  
interface IRegisterForm {
  userName: string,
  email: string,
  password: string,
  gitName: string,
  confirmPassword: string 
}

type RegisterAction = {
  type: string,
  registerForm: IRegisterForm
}

type DispatchType_Register = (args: RegisterAction) => RegisterAction