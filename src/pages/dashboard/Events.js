import Page from '../../components/Page';
import { EventsList } from '../../sections/dashboard/events'; 

export default function Events() {
  return (
    <Page title="Events">
      <EventsList/>
    </Page>
  );
}
