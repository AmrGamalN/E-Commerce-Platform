export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full z-50 flex items-center justify-center bg-white">
      <div
        className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
        role="status"
      ></div>
    </div>
  );
}
