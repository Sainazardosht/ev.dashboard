import { useSelector, useDispatch } from "react-redux";
import { useState, useRef } from "react";
import ContextWindow from "./ContextWindow";
import { IoClose, IoReloadOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import OtherVariables from "./OtherVariables";
import { FaCheck } from "react-icons/fa";
import { toggleContextWindow } from "../features/expandMore/expandSlice";

// Categories and their variables data
const categories = [
  {
    title: "Variable Category 1",
    variables: ["Carbon 1", "Co2 Distribution", "Fleet sizing"],
  },
  {
    title: "Variable Category 2",
    variables: [
      "Parking Rate",
      "Border Rate",
      "Request rate",
      "Variable 1",
      "Variable 1",
      "Variable 1",
    ],
  },
  {
    title: "Variable Category 3",
    variables: ["Variable 1", "Variable 1", "Variable 1"],
  },
];

function VariablesPanel({ onClose }) {
  // Search input state
  const [search, setSearch] = useState("");

  // List of currently active/selected variables by their ids
  const [activeVariables, setActiveVariables] = useState([]);

  // Redux selector to check if the ContextWindow is expanded (visible)
  const isContextWindowExpanded = useSelector(
    (state) => state.expand.contextWindowExpanded
  );

  const dispatch = useDispatch();

  // Ref to hold the timer id for hover delay
  const hoverTimer = useRef(null);

  // When user hovers on a variable, start a timer to show context window after 1.5 seconds

  const handleMouseEnter = () => {
    // Reset any existing timer
    clearTimeout(hoverTimer.current);

    // Only open if it's not already open, after delay
    if (!isContextWindowExpanded) {
      hoverTimer.current = setTimeout(() => {
        dispatch(toggleContextWindow());
      }, 1500); // 1.5 seconds delay
    }
  };

  const handleMouseLeave = () => {
    // Cancel the delayed open
    clearTimeout(hoverTimer.current);

    // Only close if it's currently open
    if (isContextWindowExpanded) {
      dispatch(toggleContextWindow());
    }
  };

  // Toggle the selection state of a variable by its unique id
  const handleToggleVariable = (id) => {
    setActiveVariables(
      (prev) =>
        prev.includes(id)
          ? prev.filter((item) => item !== id) // Remove if already active
          : [...prev, id] // Add if inactive
    );
  };

  // Autofill selected variables with a predefined set of important variable ids
  const handleAutofill = () => {
    const ids = [];
    let variable1Count = 0;

    categories.forEach((cat, i) =>
      cat.variables.forEach((v, j) => {
        const id = `${i}-${j}`;

        // Add specific named variables to autofill list
        if (
          v === "Co2 Distribution" ||
          v === "Fleet sizing" ||
          v === "Border Rate" ||
          v === "Request rate"
        ) {
          ids.push(id);
        }

        // Add certain instances of "Variable 1" based on count
        if (v === "Variable 1") {
          variable1Count++;

          if (
            variable1Count === 3 ||
            variable1Count === 5 ||
            variable1Count === 6
          ) {
            ids.push(id);
          }
        }
      })
    );

    // Update active variables to autofill selection
    setActiveVariables(ids);
  };

  // Clear all active variables (reset selections)
  const handleReturn = () => {
    setActiveVariables([]); // Make all variables inactive
  };

  return (
    <div className="px-7 py-10">
      {/* Header section with title and close button */}
      <div className="flex flex-row justify-between items-center text-zinc-50 pb-6 text-2xl">
        <h2>Edit Variables</h2>
        <span
          className="cursor-pointer hover:text-red-400 transition duration-200 ease-in-out transform hover:scale-110"
          onClick={onClose}
        >
          <IoClose />
        </span>
      </div>

      {/* Search input and action buttons */}
      <div className="flex flex-row justify-between gap-3 mb-10">
        <div className="relative w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="bg-zinc-900 w-full border border-zinc-50 rounded-sm border-1 border-zinc-700 px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-zinc-500 placeholder:text-zinc-50 placeholder:bold"
          />
          {/* Search icon inside input */}
          <svg
            className="w-4 h-4 absolute left-3 top-2.5 text-zinc-50"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>
        </div>

        {/* Autofill and Reset buttons */}
        <div className="flex flex-row gap-3">
          <button
            onClick={handleAutofill}
            className="flex flex-row items-center gap-3 bg-zinc-800 px-6 py-1 border border-zinc-600 rounded-md text-zinc-200 cursor-pointer transition duration-300 ease-in-out hover:bg-lime-950 hover:border-lime-300 hover:text-lime-300"
          >
            <BsStars className="rotate-90" />
            Autofill
          </button>

          <button
            onClick={handleReturn}
            className="flex flex-row items-center gap-3 px-6 py-1 border border-lime-300 rounded-md text-lime-300 bg-zinc-800 cursor-pointer transition duration-300 ease-in-out hover:bg-lime-950 hover:border-lime-300 hover:text-lime-300"
          >
            <IoReloadOutline className="rotate-45" />
            Return
          </button>
        </div>
      </div>

      {/* Categories with their variables displayed as selectable buttons */}
      <div className="bg-zinc-900 p-8 border border-zinc-500 rounded-t-sm">
        {categories.map((category, i) => (
          <div key={i}>
            <h2 className="my-4">{category.title}</h2>
            <div className="flex flex-wrap gap-4">
              {category.variables.map((v, j) => {
                const id = `${i}-${j}`;
                const isActive = activeVariables.includes(id);

                return (
                  <button
                    key={id}
                    onClick={() => handleToggleVariable(id)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={`flex justify-between gap-3 px-3 py-1 border rounded-3xl text-sm cursor-pointer transition duration-300 ease-in-out ${
                      isActive
                        ? "bg-lime-950 text-lime-300 border-lime-300"
                        : "bg-zinc-800 text-zinc-400 border-zinc-600 hover:bg-lime-950 hover:text-lime-300 hover:border-lime-300 hover:shadow-sm hover:shadow-lime-300/50"
                    }`}
                  >
                    <span className="pr-2">{v}</span>
                    <div className="inline">
                      <BsStars className="inline rotate-90" />
                      <span className="pl-2">
                        {isActive ? <FaCheck className="inline" /> : "+"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Show ContextWindow with description when expanded */}
      {isContextWindowExpanded && (
        <ContextWindow
          context="But what truly sets Switch apart is its versatility. It can be used as a scooter, a bike, or even a skateboard, making it suitable for people of all ages. Whether you're a student, a professional, or a senior citizen, Switch adapts to your needs and lifestyle."
          name="Co2 Distribution"
        />
      )}

      {/* Additional sections for other variable groups */}
      <OtherVariables otherName="Primary Variables" />
      <OtherVariables otherName="Secondary Variables" />
    </div>
  );
}

export default VariablesPanel;
