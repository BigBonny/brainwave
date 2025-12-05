import  { forwardRef } from "react";

const TextRevealButton = forwardRef(
  (
    {
      text = "shadcn.io",
      revealColor = "#37FF8B",
      className = "",
      style = {},
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`group relative cursor-pointer bg-transparent border-none p-0 m-0 h-auto uppercase${className}`}
        style={{
          fontSize: "2em",
          letterSpacing: "3px",
          color: "transparent",
          ...style,
        }}
        {...props}
      >
        <span>&nbsp;{text}&nbsp;</span>
        <span
          aria-hidden="true"
          className="absolute inset-0 w-0 overflow-hidden transition-all duration-500 group-hover:w-full"
          style={{
            color: revealColor,
            borderRight: `6px solid ${revealColor}`,
            transition: "all 0.5s",
          }}
        >
          &nbsp;{text}&nbsp;
        </span>
      </button>
    );
  }
);

TextRevealButton.displayName = "TextRevealButton";

export default TextRevealButton;
