import { Loader2 } from "lucide-react";

function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full animate-in fade-in duration-500">
      <div className="relative flex items-center justify-center">
        {/* Outer Pulsing Ring */}
        <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />

        {/* Main Spinning Icon */}
        <Loader2 className="w-12 h-12 text-primary animate-spin transition-all" />
      </div>

      {/* Brand Text */}
      <div className="mt-4 flex flex-col items-center gap-1">
        <h2 className="text-lg font-bold tracking-tighter italic text-gray-900">
          SHOPNEST
        </h2>
        <p className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] animate-pulse">
          Loading...
        </p>
      </div>
    </div>
  );
}

export default Loader;
