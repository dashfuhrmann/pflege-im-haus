import {
  FieldError,
  Input,
  Label,
  TextField,
  ValidationResult,
} from "react-aria-components";

type InputProps = {
  type: string;
  label: string;
  name: string;
  required: boolean;
  block?: boolean;
  errorMessage?: string | ((validation: ValidationResult) => string);
};

export const CustomInput = ({
  type,
  label,
  name,
  block,
  required,
  errorMessage,
}: InputProps) => {
  return (
    <TextField
      name={name}
      className={`flex flex-col gap-2 ${block ? "w-full" : "w-auto"}`}
    >
      <Label className="text-lg font-bold">{label}</Label>
      <Input
        type={type}
        placeholder={label}
        required={required}
        className={`border-solid border-black rounded-lg border-2 px-4 py-4 text-lg font-normal`}
      />
      <FieldError className="text-lg font-bold text-red-500">
        {errorMessage}
      </FieldError>
    </TextField>
  );
};
