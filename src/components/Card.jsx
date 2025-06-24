import { FaRegQuestionCircle } from "react-icons/fa";

function Card({ title, description, amount }) {
  return (
    // Card container with responsive aspect ratio, background, and hover effects
    <div
      className="
        w-full
        md:aspect-square
        bg-zinc-800
        text-zinc-500
        border
        border-zinc-700
        rounded-md
        p-6
        flex
        flex-col
        justify-between
        cursor-pointer
        transition-transform
        duration-300
        hover:scale-105
        hover:border-lime-300
        hover:text-lime-300
      "
    >
      <div>
        {/* Card header: title and info icon */}
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-zinc-50 text-lg font-medium">{title}</h4>
          {/* Info icon changes color on hover */}
          <FaRegQuestionCircle className="text-zinc-500 hover:text-lime-300 transition" />
        </div>
        {/* Short description below the title */}
        <p className="text-xs">{description}</p>
      </div>

      {/* Main amount displayed with large, bold font aligned to right */}
      <h2 className="text-end text-zinc-50 font-bold text-3xl">{amount}</h2>
    </div>
  );
}

export default Card;
