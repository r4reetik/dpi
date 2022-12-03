import { UilSpinnerAlt } from "@iconscout/react-unicons";

interface LoadingProps {
  className?: string;
  showLoadingLabel?: boolean;
  spinnerStyleClassName?: string;
}
export const LoadingIndicator = ({
  showLoadingLabel,
  className = "",
  spinnerStyleClassName = "",
}: LoadingProps) => {

  return (
    <div className={`flex justify-center gap-2 capitalize ${className}`}>
      {showLoadingLabel && "Loading"}
      <div className='ease-in-out w-max spin animate-spin '>
        <UilSpinnerAlt className={spinnerStyleClassName} />
      </div>
    </div>
  );
};
