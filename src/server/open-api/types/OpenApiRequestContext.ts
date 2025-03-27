import {ZodObject, ZodRawShape, z} from 'zod';
import {Admin} from './Admin';
import {Client} from './Client';
import {Permission} from './Permission';
import {OptionalZodParams} from './OptionalZodParams';
import {RequestServices} from './RequestServices';

export interface OpenApiRequestContext<
  PathValidator extends ZodObject<ZodRawShape> | undefined,
  QueryValidator extends ZodObject<ZodRawShape> | undefined,
  BodyValidator extends ZodObject<ZodRawShape> | undefined,
  TViewer,
> {
  params: {
    body: BodyValidator extends ZodObject<ZodRawShape> ? z.infer<BodyValidator> : never
    query: OptionalZodParams<QueryValidator>
    path: OptionalZodParams<PathValidator>
  }
  viewer: TViewer extends Client | Admin ? TViewer : never
  permission: TViewer extends Admin ? Permission : never
  // req: Request
  // res: Response
  services: RequestServices
}
