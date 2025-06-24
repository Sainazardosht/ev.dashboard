import MenuBar from "../components/MenuBar";
import TabNavigation from "../components/TabNavigation";
import SimulationResults from "../components/SimulationResults";
function Dashboard() {

  return (
    <main className="md:p-12 bg-zinc-900">
      <div className="flex border-1 border-zinc-600 rounded-lg overflow-hidden">
      <MenuBar />
      <div className="flex flex-col flex-1">
        <TabNavigation />
        <div className="flex flex-1">
          <SimulationResults />
        </div>
      </div>
    </div>
    </main>
  );
}


export default Dashboard;

