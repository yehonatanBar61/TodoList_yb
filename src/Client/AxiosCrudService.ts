import axios, {type AxiosInstance, type AxiosResponse} from 'axios';
import type { CrudRemoteService } from './CrudRemoteService';


export class AxiosCrudService<T> implements CrudRemoteService<T> {
    private http: AxiosInstance;

    constructor(endpoint: string) {
        this.http = axios.create({
            baseURL: endpoint,
            headers: { 'Content-Type': 'application/json' },
        });
        
        this.http.interceptors.response.use(
            (response) => response,
            (error) => {
                const { response } = error;
                return this.handleError(response);
            }
        );
    }

    async getAll(): Promise<T[]> {
        const res = await this.http.get<T[]>('/');
        return res.data;
    }

    async getById(id: string): Promise<T> {
        const res = await this.http.get<T>(`/${id}`);
        return res.data;
    }

    async create(item: T): Promise<T> {
        const res = await this.http.post<T>('/', item);
        return res.data;
    }

    async update(id: string, item: Partial<T>): Promise<T> {
        const res = await this.http.put<T>(`/${id}`, item);
        return res.data;
    }

    async delete(id: string): Promise<void> {
        await this.http.delete(`/${id}`);
    }

  private handleError(response: AxiosResponse): Promise<never> {
    const { status } = response;

    switch (status) {
      case 500:
        console.error('Internal Server Error');
        break;
      case 403:
        console.warn('Forbidden');
        break;
      case 401:
        console.warn('Unauthorized');
        break;
      case 429:
        console.warn('Too Many Requests');
        break;
    }

    return Promise.reject(response);
  }

}