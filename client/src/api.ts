import * as request from "request";


interface GetRequestParams {
    path: string;
    qs?: Object;
}


export class Api {
    private baseUrl: string;
    public loading: boolean = false;

    constructor() {
        this.baseUrl = `${location.protocol}//localhost:3001`;
    }

    private urlFromPath(path: string) {
        return this.baseUrl + path;
    }

    getFreight(): Promise<any> {
        return this.getRequest({
            path: `/api/todo/yeet`
        });
    }


    private getRequest<C>(params: GetRequestParams): Promise<C> {
        return new Promise((resolve, reject) => {
            request.get(
                {
                    url: this.urlFromPath(params.path),
                    qs: params.qs || {},
                    json:true
                },
                (error, response, body) => {
                    if (
                        response &&
                        response.statusCode >= 200 &&
                        response.statusCode <= 299 &&
                        body &&
                        body.success == true
                    ) {
                        console.log(response)
                        resolve(body);
                    } else if (response && body && body.success == false) {
                        reject(error);
                    } else if (error) {
                        reject(error);
                    } else {
                        resolve(body);
                    }
                }
            );
        });
    }


}