import { Form as RemixForm } from "@remix-run/react";
import { memo } from "react";

const Form = ({ children, ...props }) => {
  return (
    <RemixForm
      method="post"
      className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 space-y-4"
      {...props}
    >
      {children}
    </RemixForm>
  );
};

export default memo(Form);
