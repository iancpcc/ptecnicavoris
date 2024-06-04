export enum AppState {
    LOADING, LOADED, ERROR
}


export interface IApiResponse<T>{
    data?: T
    state: AppState,
    error?: Error
}

export type Error = {
    code?:number,
    message?:string,
    messageDeveloper?:string
  }


