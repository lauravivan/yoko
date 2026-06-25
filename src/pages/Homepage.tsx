import InfoCard from '@/components/cards/InfoCard';

const Homepage = () => {
  return (
    <main className="p-homepage">
      <InfoCard
        title="Countdown"
        desc="Access all your important events and keep track on 
their counting days"
        to="/countdown"
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
