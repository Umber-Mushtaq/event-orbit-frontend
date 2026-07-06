function ModalShell({ open, children, outerClassName = "", innerClassName = "" }) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] overflow-y-auto bg-black/70 px-4 py-8 backdrop-blur-sm ${outerClassName}`}
    >
      <div className='flex min-h-full items-center justify-center'>
        <div className={`w-full ${innerClassName}`}>{children}</div>
      </div>
    </div>
  );
}

export default ModalShell;
