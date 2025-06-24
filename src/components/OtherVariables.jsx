import { FaChevronDown } from "react-icons/fa";

function OtherVariables({ otherName }) {
  return (
    <div className="my-7">
      {/* Container for the variable section header */}
      <div className="bg-zinc-800 p-4 border border-zinc-500 rounded-sm flex flex-row justify-between items-center text-lime-300">
        {/* Section title */}
        <h3 className="text-lg">{otherName}</h3>

        {/* Button to toggle expansion, currently static without functionality */}
        <button
          aria-label={`Toggle ${otherName} section`}
          className="bg-zinc-900 px-3 py-2 border border-lime-300 rounded-2xl cursor-pointer hover:bg-zinc-800"
        >
          <FaChevronDown className="transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
}

export default OtherVariables;
