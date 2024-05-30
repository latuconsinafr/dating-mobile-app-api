import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { SubscriptionsService } from './subscriptions.service';
import { IsSubscriptionExistValidator } from './validators/is-subscription-exist.validator';
import { SubscriptionsController } from './subscriptions.controller';

/**
 * Defines the subscriptions module.
 */
@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  providers: [SubscriptionsService, IsSubscriptionExistValidator],
  controllers: [SubscriptionsController],
  exports: [],
})
export class SubscriptionsModule {}
