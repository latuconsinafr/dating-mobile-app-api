import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { userData } from '../../../../database/data/user.data';
import { USER_ID_DESCRIPTION } from '../../constants';
import { IsUserExist } from '../../validators/is-user-exist.validator';

/**
 * Defines the DTO that carries the user identifier request parameter.
 */
export class UserIdParam {
  @IsNotEmpty()
  @IsUUID('4')
  @IsUserExist()
  @ApiProperty({
    description: USER_ID_DESCRIPTION,
    format: 'uuid',
    example: userData[0].id,
  })
  id: string;
}
