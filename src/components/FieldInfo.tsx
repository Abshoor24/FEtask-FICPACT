import { AnyFieldApi } from "@tanstack/react-form";

export default function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid && (
        <p className="text-[14px] text-red-500 mt-1">
          {field.state.meta.errors.map((err) => err.message).join(", ")}
        </p>
      )}
      {field.state.meta.isValidating && (
        <p className="text-sm text-gray-500 mt-1">Validating...</p>
      )}
    </>
  );
}