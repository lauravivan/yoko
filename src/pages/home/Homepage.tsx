import InfoCard from '@/pages/home/components/InfoCard';
import navigation from '@/navigation';

const Homepage = () => {
  return (
    <main className="p-homepage">
      <InfoCard
        title="Occurrences"
        desc="Access all your important events and recurring actions and keep track on 
their counting days"
        to={navigation.navigateToOccurrences()}
      />
      <InfoCard
        title="Notes"
        desc="Access all your annotations"
        to="#"
        isDisabled
      />
      <InfoCard
        title="Tasks"
        desc="Access all your daily tasks"
        to="#"
        isDisabled
      />
      <InfoCard
        title="Mood history"
        desc="Access your mood history and get mood analysis"
        to="#"
        isDisabled
      />
    </main>
  );
};

export default Homepage;
