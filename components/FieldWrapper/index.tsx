import { PropsWithChildren } from "react";

export type FieldWrapperProps = PropsWithChildren<{
  label?: string;
  error?: any;
}>;

const FieldWrapper = ({ label, error, children }: FieldWrapperProps) => {
  return (
    <div>
      <label>{label}</label>
      {children}
      {error && <div>{error}</div>}
    </div>
  );
};

export default FieldWrapper;
