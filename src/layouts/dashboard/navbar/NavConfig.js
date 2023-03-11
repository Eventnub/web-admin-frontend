// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  transfer: getIcon('ic_home'),
  withdraw: getIcon('ic_booking'),
  transactions: getIcon('ic_sdt'),
  profile: getIcon('ic_user'),
  settings: getIcon('ic_settings')
};

const navConfig = [
  {
    subheader: 'general',
    items: [
      { title: 'Transfer', path: PATH_DASHBOARD.general.transfer, icon: ICONS.transfer },
      { title: 'Withdraw', path: PATH_DASHBOARD.general.withdraw, icon: ICONS.withdraw },
      { title: 'Transactions', path: PATH_DASHBOARD.general.transactions, icon: ICONS.transactions },
      { title: 'profile', path: PATH_DASHBOARD.general.profile, icon: ICONS.profile },
      { title: 'settings', path: PATH_DASHBOARD.general.settings, icon: ICONS.settings }
    ],
  }
];

export default navConfig;
