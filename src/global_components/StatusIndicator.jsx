function StatusIndicator({ error, success, className }) {
  if (!error && !success) return null;

  const layoutClass =
    className ||
    "w-full mb-4 text-center text-xs font-poppins rounded-xl py-2.5";

  return (
    <>
      {error && (
        <div
          className={`${layoutClass} text-red-400 bg-red-500/10 border border-red-500/20`}
        >
          {error}
        </div>
      )}
      {success && (
        <div
          className={`${layoutClass} text-emerald-400 bg-emerald-500/10 border border-emerald-500/20`}
        >
          {success}
        </div>
      )}
    </>
  );
}

export default StatusIndicator;
