export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900" />
    </div>
  );
}
