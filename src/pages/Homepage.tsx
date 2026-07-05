import InfoCard from '@/components/cards/InfoCard';
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
        to="#"
        isDisabled
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
