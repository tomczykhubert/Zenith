import HashLoader from "react-spinners/HashLoader";

export default function Spinner() {
  return (
    <div className="fixed inset-0 bg-secondary/90 flex items-center justify-center z-50">
      <HashLoader color="lime" />
    </div>
  );
}
