import { UilAngleDown } from "@iconscout/react-unicons";

const AngleDownCircle = ({
  className,
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) => {
  return (
    <div
      className={`rounded-full border-black-800  md:border-black-900 bg-black-900 md:bg-black-800 border-4 border-solid ${className}`}>
      <UilAngleDown className={`w-4 h-4 text-[#999999] ${iconClassName}`} />
    </div>
  );
};

export default AngleDownCircle;
