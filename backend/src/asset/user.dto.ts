import { IsString, IsNotEmpty, IsEmpty } from 'class-validator';

export class UserDTO {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

// tslint:disable-next-line: max-classes-per-file
export class UserRO {
  id: string;
  name: string;
  username: string;
  token?: string;
}
