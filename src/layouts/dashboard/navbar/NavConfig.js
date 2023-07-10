// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  home: getIcon('ic_home'),
  withdraw: getIcon('ic_booking'),
  transactions: getIcon('ic_sdt'),
  artists: getIcon('ic_artists'),
  archived: getIcon('ic_archived'),
};

const navConfig = [
  {
    subheader: 'general',
    items: [
      { title: 'Home', path: PATH_DASHBOARD.general.home, icon: ICONS.home },
      { title: 'Artists', path: PATH_DASHBOARD.general.artists, icon: ICONS.artists },
      { title: 'Archived', path: PATH_DASHBOARD.general.archived, icon: ICONS.archived },
    ],
  },
  {
    subheader: 'manage activities',
    items: [
      { title: 'Manage Games', path: '/dashboard/manage-games', icon: '' },
      { title: 'Audio Validation', path: '/dashboard/audio-validation', icon: '' },
    ],
  },
];

export default navConfig;
