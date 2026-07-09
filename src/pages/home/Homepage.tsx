import InfoCard from '@/pages/home/components/InfoCard';
import navigation from '@/navigation';

const Homepage = () => {
  return (
    <main className="p-homepage">
      <InfoCard
        title="Events"
        desc="Access all your important events and keep track on 
their counting days"
        to={navigation.navigateToEvents()}
      />
      <InfoCard
        title="Recurring actions"
        desc="Access all your important events and keep track on 
their counting days"
        to={navigation.navigateToActions()}
      />
      <InfoCard
        title="Notes and tasks"
        desc="Access all your important events and keep track on 
their counting days"
        to="#"
        isDisabled
      />
      <InfoCard
        title="Mood history"
        desc="Access all your important events and keep track on 
their counting days"
        to="#"
        isDisabled
      />
    </main>
  );
};

export default Homepage;
