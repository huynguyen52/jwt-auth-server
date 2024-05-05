import { Request } from 'express';
import { User } from 'src/module/users/entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export default RequestWithUser;
