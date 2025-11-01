export const info = (funcName: string, info: string) => {
    console.log(`INFO [funcName: ${funcName} | info: ${info}]` );
}

export const error = (funcName: string, detial: string, error?: any) => {
    console.log(`ERROR [funcName: ${funcName} | detail: ${detial} | error: ${error}]` );
}

export const logger = {
    info, 
    error
}