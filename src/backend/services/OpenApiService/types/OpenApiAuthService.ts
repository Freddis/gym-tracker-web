import {Client} from './Client';

export interface OpenApiAuthService {
  getClientFromRequest(request: Request): Promise<Client| null>
}
