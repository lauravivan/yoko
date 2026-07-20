import InfoCard from '@/pages/home/components/InfoCard';
import navigation from '@/navigation';

const Homepage = () => {
  return (
    <main className="p-homepage">
      <div className="p-homepage__intro">
        <div>
          <h1>Welcome to Yoko!</h1>
          <h3>Pick a card to get started.</h3>
        </div>
      </div>
      <div className="p-homepage__cards">
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
      </div>
    </main>
  );
};

export default Homepage;
