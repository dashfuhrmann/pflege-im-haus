"use client";

import { sendEmail } from "@/app/lib/sendEmail";
import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import { DropEvent, FileDropItem } from "react-aria";
import {
  Button,
  DropZone,
  FieldError,
  FileTrigger,
  Form,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  Text,
  TextArea,
  TextField,
  ToggleButton,
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
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState({
    message: "",
    show: false,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    let data = Object.fromEntries(new FormData(e.currentTarget));

    data = {
      ...data,
      job: selectedJob,
    };

    // Check only if application form
    if (slice.variation === "default") {
      if (selectedJob === "" && slice.variation === "default") {
        setError({ message: "Bitte wählen Sie eine Stelle aus", show: true });
        return;
      } else {
        setError({ message: "", show: false });
      }
    }

    const formData = new FormData();
    formData.append("name", data.vorname + " " + data.nachname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("job", selectedJob);
    formData.append("arbeitsort", data.arbeitsort);
    formData.append("message", data.message);

    sendEmail(formData);
  };

  const workingPlaces = [
    {
      label: "Knüllwald Rengshausen",
    },
    {
      label: "Homberg (Efze)",
    },
  ];

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

      {slice.variation === "default" && (
        <ul className="flex flex-col flex-wrap gap-16 md:flex-row gap-y-8">
          {slice.items.map((item, index) => (
            <li key={index}>
              <ToggleButton
                isSelected={selectedJob === item.job_title}
                onChange={() => {
                  if (selectedJob === item.job_title) {
                    setSelectedJob("");
                    return;
                  }
                  setSelectedJob(item.job_title as string);
                }}
                className="w-full px-4 py-4 text-2xl font-bold border border-solid md:w-fit border-secondary text-secondary selected:bg-secondary selected:text-white hover:bg-secondary50 hover:text-white rounded-xl"
              >
                {item.job_title}
              </ToggleButton>
            </li>
          ))}
        </ul>
      )}
      <Form className="flex flex-col w-full gap-4" onSubmit={onSubmit}>
        <div className="flex flex-col w-full gap-4 md:flex-row">
          <CustomInput
            type="text"
            name="vorname"
            label="Vorname*"
            required
            block={true}
            errorMessage="Bitte geben Sie Ihren Vornamen ein"
          />
          <CustomInput
            type="text"
            name="nachname"
            label="Nachname*"
            required
            block={true}
            errorMessage="Bitte geben Sie Ihren Nachnamen ein"
          />
        </div>
        <div className="flex flex-row w-full">
          <CustomInput
            type="email"
            name="email"
            label="E-Mail*"
            required
            block={true}
            errorMessage="Bitte geben Sie Ihre E-Mail-Adresse ein"
          />
        </div>
        <div className="flex flex-col w-full gap-4 md:flex-row">
          <CustomInput
            type="text"
            name="phone"
            label="Telefon*"
            required
            block={true}
            errorMessage="Bitte geben Sie Ihre Telefonnummer ein"
          />
          {slice.variation === "default" && (
            <Select
              name="arbeitsort"
              className="flex flex-col w-full gap-2"
              placeholder="Wunschort*"
              isRequired
            >
              <Label className="text-lg font-bold">Arbeitsort</Label>
              <Button className="flex justify-between px-4 py-4 border-2 border-black rounded-lg">
                <SelectValue className="text-lg text-black placeholder-shown:text-gray-400" />
                <span aria-hidden="true">▼</span>
              </Button>
              <Popover className="w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-ou">
                <ListBox className="flex flex-col w-full p-1 outline-none">
                  {workingPlaces.map((item, index) => (
                    <ListBoxItem
                      key={index}
                      id={item.label}
                      className="w-full p-4"
                    >
                      {item.label}
                    </ListBoxItem>
                  ))}
                </ListBox>
              </Popover>
              <FieldError>
                Bitte wählen sie einen Arbeitsort aus der List aus
              </FieldError>
            </Select>
          )}
        </div>
        <div className="flex flex-row w-full gap-4">
          <CustomTextArea name="message" label="Nachricht" required={false} />
        </div>
        {slice.variation === "default" && (
          <FileUpload name="files" files={files} setFiles={setFiles} />
        )}
        <Button
          className="w-full px-4 py-4 text-2xl font-bold text-white rounded-lg bg-secondary hover:bg-secondary50"
          type="submit"
        >
          {slice.variation === "default"
            ? "Bewerbung abschicken"
            : "Jetzt kontaktieren"}
        </Button>
      </Form>
    </BoundedFull>
  );
};

export default ApplicationForm;
