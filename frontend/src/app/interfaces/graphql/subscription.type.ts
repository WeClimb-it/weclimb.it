import { SubscriptionResult } from './subscriptionresult.type';

export interface Subscription {
  onData?: SubscriptionResult | null;
}
