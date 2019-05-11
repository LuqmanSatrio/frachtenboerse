import * as request from "request";
import {EndFreight} from "../../lib/models/freight";
import {Vehicle} from "../../lib/models/util";


interface GetRequestParams {
    path: string;
    qs?: Object;
}

interface PostRequestParams<ObjectType> {
    path: string;
    body: ObjectType;
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

    getFreights(vehicle: Vehicle): Promise<any> {
        const qs: any = {vehicle: vehicle};
        return this.getRequest({
            path: `/api/freight`, qs: qs
        });
    }

    sendFreights(freight: EndFreight): Promise<any> {
        return this.putRequest({path: `/api/freight`, body: freight})
    }

    private putRequest<C>(params: PostRequestParams<C>): Promise<C> {
        return new Promise((resolve, reject) => {
            request.post(
                {
                    url: this.urlFromPath(params.path),
                    body: params.body,
                    json: true
                },
                (error, response, body) => {
                    if (
                        response &&
                        response.statusCode >= 200 &&
                        response.statusCode <= 299 &&
                        body &&
                        body.success == true
                    ) {
                        console.log(response);
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
                        console.log(response);
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