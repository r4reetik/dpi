import React from "react";

interface Props {
  children: React.ReactNode;
  label: string;
  rightLabel?: string;
  rightLabelClassName?: string;
  rightLabelOnClick?: () => void;
  overrideSmallScreenStyle?: boolean;
  containerClassName?: string;
  wrapperClassName?: string;
}

function ContentWrapper(props: Props) {
  const {
    children,
    label,
    rightLabel,
    rightLabelOnClick,
    wrapperClassName,
    containerClassName,
    rightLabelClassName,
    overrideSmallScreenStyle = false,
  } = props;

  function handleRightLabelClick(e: any) {
    e?.preventDefault();
    e?.stopPropagation();
    rightLabelOnClick?.();
  }

  const RightLabel = (
    <p className={`mt-1 mb-2 mr-1 text-sm font-semibold tracking-wide ${rightLabelClassName}`}>
      {rightLabel}
    </p>
  );
  return (
    <div
      className={`p-1 rounded-2xl ${wrapperClassName} ${
        overrideSmallScreenStyle ? "bg-black-900" : `bg-black-800 md:bg-black-900`
      }`}>
      <div className='flex items-center justify-between mx-3'>
        <p className='mt-1 mb-2 text-sm font-semibold tracking-wide capitalize text-grey-500'>
          {label}
        </p>
        {rightLabel && rightLabelOnClick && (
          <button onClick={handleRightLabelClick}>{RightLabel}</button>
        )}
        {rightLabel && !rightLabelOnClick && RightLabel}
      </div>
      <div className={containerClassName}>{children}</div>
    </div>
  );
}

export default ContentWrapper;
