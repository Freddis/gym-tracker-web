import {Image} from '../../ImageService/types/Image';
export interface User {
  id: number
  name: string
  profilePicture: Image | null
}
