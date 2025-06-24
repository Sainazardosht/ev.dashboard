import { useSelector, useDispatch } from "react-redux";
import VariablesPanel from "./VariablesPanel";
import { BsFillLightningChargeFill, BsStars } from "react-icons/bs";
import { CiExport } from "react-icons/ci";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import LineChartBox from "./LineChartBox";
import Card from "./Card";
import { openPanel, closePanel } from "../features/variables/variablesSlice";
import { toggleBestScenario } from "../features/expandMore/expandSlice";

function SimulationResults() {
  // Get panel open state from redux store
  const variablePanelOpen = useSelector(
    (state) => state.variables.variablesPanelOpen
  );
  // Get "best scenario" expansion state
  const isExpanded = useSelector((state) => state.expand.bestScenarioExpanded);
  const dispatch = useDispatch();

  return (
    <div className="w-full p-6 sm:p-10 md:p-12 bg-zinc-900 text-zinc-50 border border-zinc-700 rounded-lg overflow-hidden relative">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center pb-12 gap-4">
        <div className="flex flex-row items-center gap-4 text-2xl md:text-3xl font-bold">
          <BsFillLightningChargeFill />
          <h1>Charging Station</h1>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="h-8 px-2 flex items-center justify-center border border-zinc-700 rounded-sm text-sm text-zinc-50 hover:bg-zinc-800 transition cursor-pointer">
            <RxCounterClockwiseClock />
          </button>
          <button
            onClick={() => dispatch(openPanel())}
            className="h-8 px-2 flex items-center justify-center border border-zinc-700 rounded-sm text-sm text-zinc-50 hover:bg-zinc-800 transition cursor-pointer"
          >
            Edit Variables
          </button>
          <button className="h-8 px-2 flex items-center justify-center border border-zinc-700 rounded-sm text-sm text-zinc-50 hover:bg-zinc-800 transition cursor-pointer">
            <CiExport />
          </button>
        </div>
      </header>

      {/* Best Scenario Header */}
      <div className="text-lime-200 flex justify-between items-center pb-8">
        <div className="flex items-center text-xl md:text-2xl font-semibold">
          <BsStars className="rotate-90" />
          <h2 className="pl-3">Best Scenario Results</h2>
        </div>
        <button
          className={`border border-lime-200 rounded-2xl px-3 py-2 hover:bg-lime-200 hover:text-zinc-800 duration-300 ease-in-out transform transition cursor-pointer ${
            !isExpanded ? "rotate-180" : ""
          }`}
          onClick={() => dispatch(toggleBestScenario())}
          aria-label="Toggle Best Scenario Results"
        >
          {isExpanded ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>

      {/* Best Scenario Content with expand/collapse animation */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden ${
          isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-lime-300 text-start">
          <div className="flex flex-row justify-between items-center border border-lime-300 px-6 py-4 mb-4 rounded-md">
            <p>
              The best found configuration based on profit is characterized by
              11 zones (max) with charging stations and 48 total number of
              poles.
            </p>
            <FiMoreHorizontal />
          </div>
          <div className="flex flex-row justify-between items-center border border-lime-300 px-6 py-4 mb-4 rounded-md">
            <p>
              The best found configuration based on satisfied demand is
              characterized by 11 zones (max) with charging stations and 48
              total number of poles.
            </p>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>

      {/* Chart + KPI Section */}
      <div className="flex flex-col md:flex-row justify-between gap-8">
        <section className="md:w-4/5 w-full">
          <h2 className="text-lg font-semibold mb-6 text-zinc-50">Graphs</h2>
          <div className="border border-zinc-700 rounded-md bg-zinc-800 pt-8 pr-12">
            <div className="flex flex-row justify-end items-end pb-3">
              <button className="text-sm px-4 py-2 bg-zinc-900 rounded-md border border-zinc-700 flex flex-row justify-between items-center gap-2">
                Unsatisfied Demand % <FaAngleDown className="inline" />
              </button>
            </div>
            <LineChartBox />
          </div>
        </section>

        <section className="w-full md:w-1/2">
          <div className="flex justify-between items-center ">
            <h3 className="font-semibold text-lg">Key Performance Indicators</h3>
            <button className="flex flex-row items-center border border-zinc-700 px-2 py-1 rounded-md hover:bg-zinc-800 cursor-pointer">
              <div>Variables</div>
              <div className="text-xl pl-1">+</div>
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card
              square
              title="Infrastructure Units"
              description="This describes variable two and what the shown data means."
              amount="€421.07"
            />
            <Card
              square
              title="Charging Growth"
              description="This describes variable two and what the shown data means."
              amount="33.07 "
            />
            <Card
              square
              title="Localization change"
              amount="21.9%"
              description="This describes variable two and what the shown data means."
            />
            <Card
              square
              title="Fleet growth"
              description="This describes variable two and what the shown data means."
              amount="7.03%"
            />
          </div>
        </section>
      </div>

      {/* Slide-over Side Panel & Backdrop */}

      {/* Backdrop - always in DOM, show/hide with opacity and pointer-events */}
      <div
        onClick={() => dispatch(closePanel())}
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm z-30 transition-opacity duration-300 ${
          variablePanelOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!variablePanelOpen}
      />

      {/* Slide-over Panel - always in DOM, slide in/out with translate-x */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-1/2 z-40 shadow-lg border-l border-zinc-700 bg-zinc-950
          transform transition-transform duration-300 ease-in-out
          ${variablePanelOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!variablePanelOpen}
      >
        <VariablesPanel onClose={() => dispatch(closePanel())} />
      </div>
    </div>
  );
}

export default SimulationResults;
