"use client";

import { ToastProvider } from "@/app/hooks/ToastContext";
import BoundedFull from "@/components/BoundedFull";
import { CustomForm } from "@/components/Form";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { ToastContainer } from "@/components/ToastContainer";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { DropEvent, FileDropItem } from "react-aria";
import {
  Button,
  DropZone,
  FieldError,
  FileTrigger,
  Input,
  Label,
  Text,
  TextArea,
  TextField,
  ValidationResult,
} from "react-aria-components";
import { FiMinusCircle } from "react-icons/fi";

const CustomTextArea = ({
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

type InputProps = {
  type: string;
  label: string;
  name: string;
  required: boolean;
  block?: boolean;
  errorMessage?: string | ((validation: ValidationResult) => string);
};

const CustomInput = ({
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

type FileUploadProps = {
  name: string;
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const FileUpload: React.FC<FileUploadProps> = ({ name, files, setFiles }) => {
  const handleDrop = async (e: DropEvent) => {
    const droppedFilesPromises = e.items
      .filter((item) => item.kind === "file")
      .map((item) => (item as FileDropItem).getFile());

    const droppedFiles = await Promise.all(droppedFilesPromises);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleSelect = (e: FileList | null) => {
    if (e === null) return;
    const selectedFiles = Array.from(e);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleDelete = (index: number) => {
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  return (
    <DropZone onDrop={handleDrop}>
      <div className="flex flex-col gap-4">
        <FileTrigger allowsMultiple onSelect={handleSelect}>
          <Button className="w-fit">
            Hier klicken um Dokumente hinzuzufügen
          </Button>
        </FileTrigger>
        <Text
          slot="description"
          className="flex flex-col items-center justify-center w-full p-4 border-2 border-black rounded-lg"
        >
          Oder per Drag & Drop hier hinzufügen
          <ul>
            {files.map((file, index) => (
              <li
                key={index}
                className="flex flex-row items-center justify-center gap-4"
              >
                {file.name}
                <Button onPress={() => handleDelete(index)}>
                  <FiMinusCircle width={24} height={24} />
                </Button>
              </li>
            ))}
          </ul>
        </Text>

        <input
          type="hidden"
          name={name}
          value={files.map((file) => file.name).join(", ")}
        />
      </div>
    </DropZone>
  );
};

/**
 * Props for `ApplicationForm`.
 */
export type ApplicationFormProps =
  SliceComponentProps<Content.ApplicationFormSlice>;

/**
 * Component for "ApplicationForm" Slices.
 */
const ApplicationForm = ({ slice }: ApplicationFormProps): JSX.Element => {
  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex-col gap-8"
    >
      <div className="flex flex-col gap-2" id={slice.primary.scroll_id || ""}>
        <RichTextWithComponents richText={slice.primary.heading} />
        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>
      <ToastProvider>
        <ToastContainer />
        <CustomForm variation={slice.variation} items={slice.items} />
      </ToastProvider>
    </BoundedFull>
  );
};
export default ApplicationForm;
