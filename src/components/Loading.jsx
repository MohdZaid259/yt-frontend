const LoadingLine = () => {

  return (
    <div className="h-[1px] w-full overflow-hidden relative">
      <div
        className="h-full w-full"
        style={{
          background: "linear-gradient(to right, #ef4444, #ec4899)",
          animation: "loading-line-animation 2s ease-in-out infinite",
          position: "relative",
        }}
      >
      </div>
    </div>
  );
};

export default LoadingLine;
