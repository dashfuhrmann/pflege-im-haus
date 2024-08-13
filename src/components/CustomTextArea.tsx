import {
  FieldError,
  Label,
  TextArea,
  TextField,
  ValidationResult,
} from "react-aria-components";

export const CustomTextArea = ({
  label,
  name,
  required,
  errorMessage,
}: {
  label: string;
  name: string;
  required: boolean;
  errorMessage?: string | ((validation: ValidationResult) => string);
}) => {
  return (
    <TextField name={name} className="flex flex-col w-full gap-2">
      <Label className="text-lg font-bold">{label}</Label>
      <TextArea
        placeholder={label}
        required={required}
        className="px-4 py-4 text-lg font-normal border-2 border-black border-solid rounded-lg"
      />
      <FieldError className="text-lg font-bold text-red-500">
        {errorMessage}
      </FieldError>
    </TextField>
  );
};
