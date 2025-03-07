const LoadingCircle = () => {
  return (
    <div className="flex items-center justify-center mt-6 w-full h-full">
      <div
        className="w-16 h-16 border-4 border-t-4 rounded-full animate-spin"
        style={{
          borderColor: "rgba(217, 87, 57, 0.2)",
          borderTopColor: "var(--color-primary)",
        }}
      />
    </div>
  );
};

export default LoadingCircle;
