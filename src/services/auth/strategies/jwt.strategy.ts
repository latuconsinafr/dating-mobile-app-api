import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { PinoLogger } from 'nestjs-pino';
import { JwtModuleOptions } from '@nestjs/jwt';
import { User } from '../../users/entities/user.entity';
import { UnauthorizedException } from '../../../common/exceptions/unauthorized.exception';
import { TokenPayload } from '../types/token-payload.interface';

/**
 * Defines the strategy for jwt strategy by extending PassportStrategy with Strategy from `passport-jwt`.
 *
 * @usageNotes
 * This strategy being used by the guards under `AuthGuard('jwt')`.
 *
 * @see [Implementing Passport Strategy](https://docs.nestjs.com/security/authentication#implementing-passport-strategies)
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  /**
   * The constructor.
   *
   * @param logger The pino logger
   * @param configService The config service
   * @param usersService The users service
   */
  constructor(
    private readonly logger: PinoLogger,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: configService.get<JwtModuleOptions>('jwt')?.signOptions
        ?.expiresIn
        ? true
        : false,
      secretOrKey: configService.get<JwtModuleOptions>('jwt')?.secret,
    });

    this.logger.setContext(JwtStrategy.name);
  }

  /**
   * To validate the {@link JwtAuthGuard}.
   *
   * @usageNotes
   * For each strategy, Passport will call the verify function (implemented with the validate() method in nestjs/passport) using an appropriate strategy-specific set of parameters.
   *
   * @param payload The payload to validate
   *
   * @returns The authenticated user entity.
   */
  async validate(payload: TokenPayload): Promise<User> {
    this.logger.info(`Try to call ${JwtStrategy.prototype.validate.name}`);

    const authenticatedUser: User | null = await this.usersService.findById(
      payload.sub,
    );

    if (!authenticatedUser) {
      throw new UnauthorizedException({ message: 'Unauthorized' });
    }

    return authenticatedUser;
  }
}
