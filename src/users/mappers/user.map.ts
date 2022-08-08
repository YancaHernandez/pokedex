import { User } from '../entities/users.entity';
import { UserDto } from '../Dto/user.dto';
export const MapperUser = (entity: User): UserDto => ({
  id: entity.id,
  username: entity.username,
  password: entity.password,
  email: entity.email,
  createdAt: entity.createdAt,
  updatedAt: entity.updatedAt,
});
