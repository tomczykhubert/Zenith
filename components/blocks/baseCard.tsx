interface BaseCardProps {
  children: React.ReactNode;
}

const BaseCard: React.FC<BaseCardProps> = ({ children }) => {
  return (
    <div
      className="bg-slate-700 border border-slate-700 shadow-md rounded-md p-4 min-h-[200px] drop-shadow-3xl break-words
      "
    >
      {children}
    </div>
  );
};

export default BaseCard;
