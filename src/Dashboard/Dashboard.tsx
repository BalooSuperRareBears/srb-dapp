import { AuthRedirectWrapper } from 'wrappers';
import { Account } from './widgets';
import { useScrollToElement } from 'hooks';
import { Widget } from './components';
import { WidgetType } from 'types/widget.types';
import { DashboardAis } from './widgets/Ais';
import { DashboardClaimHype } from './widgets/ClaimHype';

const WIDGETS: WidgetType[] = [
  {
    title: 'Account',
    widget: Account,
    description: 'Connected account details',
    reference: 'https://docs.multiversx.com/sdk-and-tools/sdk-dapp/#account'
  },
  {
    title: 'AIS - Active In-Wallet Staking',
    widget: DashboardAis,
    description:
      'Interact to be eligible for the staking rewards',
    reference:
      ''
  },
  {
    title: 'Claim HYPE',
    widget: DashboardClaimHype,
    description:
      '1 claim/epoch',
    reference:
      ''
  },
];

export const Dashboard = () => {
  useScrollToElement();

  return (
    <AuthRedirectWrapper>
      <div className='flex flex-col gap-6 max-w-3xl w-full'>
        {WIDGETS.map((element) => (
          <Widget key={element.title} {...element} />
        ))}
      </div>
    </AuthRedirectWrapper>
  );
};
