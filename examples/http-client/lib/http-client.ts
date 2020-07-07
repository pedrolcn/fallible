import Axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { Result } from 'fallible'

export interface HttpClientOptions extends AxiosRequestConfig {}

export class HttpClient {
    private readonly instance: AxiosInstance;

    constructor(public readonly options: HttpClientOptions) {
        this.instance = Axios.create(options);
    }

    public async get<T>(path: string, data?: any): Promise<Result<T, AxiosError>> {
        try {
            const response = await this.instance.get<T>(path, { data });
            return Result.ok(response.data);
        } catch (error) {
            return Result.err(error);
        }
    }


    public async post<T>(path: string, data?: any): Promise<Result<T, AxiosError>> {
        try {
            const response = await this.instance.post<T>(path, { data });
            return Result.ok(response.data);
        } catch (error) {
            return Result.err(error);
        }
    }

    public async put<T>(path: string, data?: any): Promise<Result<T, AxiosError>> {
        try {
            const response = await this.instance.put<T>(path, { data });
            return Result.ok(response.data);
        } catch (error) {
            return Result.err(error);
        }
    }

    public async delete<T>(path: string, data?: any): Promise<Result<T, AxiosError>> {
        try {
            const response = await this.instance.delete<T>(path, { data });
            return Result.ok(response.data);
        } catch (error) {
            return Result.err(error);
        }
    }
}
