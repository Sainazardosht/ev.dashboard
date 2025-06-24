import { IoMdInformationCircleOutline } from "react-icons/io";

function ContextWindow({ name, context }) {
  return (
    // Container with background, padding, border and rounded corners at bottom
    <div className="bg-zinc-800 p-8 border-1 border-t-0 border-zinc-500 rounded-b-sm">
      
      {/* Header: variable name with info icon button */}
      <div className="text-lg text-zinc-50 mb-6 flex flex-row justify-start gap-3 items-center">
        <h3>{name}</h3>
        <button aria-label="Information" className="hover:text-lime-300 cursor-pointer">
          <IoMdInformationCircleOutline />
        </button>
      </div>

      {/* Context description text */}
      <p className="text-zinc-500">{context}</p>
    </div>
  );
}

export default ContextWindow;
