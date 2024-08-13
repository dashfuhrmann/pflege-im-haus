import { useToast } from "@/app/hooks/useToast";
import { sendEmail } from "@/app/lib/sendEmail";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useRef, useState } from "react";
import {
  Button,
  FieldError,
  Form,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  ToggleButton,
} from "react-aria-components";
import { CustomInput } from "./CustomInput";
import { CustomTextArea } from "./CustomTextArea";
import { FileUpload } from "./FileUpload";

const workingPlaces = [
  {
    label: "Knüllwald Rengshausen",
  },
  {
    label: "Homberg (Efze)",
  },
];

export type Slice = SliceComponentProps<Content.ApplicationFormSlice>;

type CustomFormProps = {
  variation: string;
  items: Content.ApplicationFormSliceDefaultItem[];
};

export function CustomForm({ variation, items }: CustomFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [error, setError] = useState({
    message: "",
    show: false,
  });

  const formRef = useRef<HTMLFormElement>(null);

  const { addToast } = useToast();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    let data = Object.fromEntries(new FormData(e.currentTarget));

    data = {
      ...data,
      job: selectedJob,
    };

    // Check only if application form
    if (variation === "default") {
      if (selectedJob === "" && variation === "default") {
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

    await sendEmail(formData).then((response) => {
      if (response.status === 500) {
        addToast("Es ist ein Fehler aufgetreten.", "error");
      }
      if (response.status === 200) {
        addToast("Vielen Dank, wir haben ihre Email erhalten.", "success");

        formRef.current?.reset();
        setFiles([]);
        setSelectedJob("");
      }
    });
  };

  return (
    <>
      {variation === "default" && (
        <ul className="flex flex-col flex-wrap gap-16 md:flex-row gap-y-8">
          {items.map((item, index) => (
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
      <Form
        className="flex flex-col w-full gap-4"
        onSubmit={onSubmit}
        ref={formRef}
      >
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
          {variation === "default" && (
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
        {variation === "default" && (
          <FileUpload name="files" files={files} setFiles={setFiles} />
        )}
        <Button
          className="w-full px-4 py-4 text-2xl font-bold text-white rounded-lg bg-secondary hover:bg-secondary50"
          type="submit"
        >
          {variation === "default"
            ? "Bewerbung abschicken"
            : "Jetzt kontaktieren"}
        </Button>
      </Form>
    </>
  );
}

export default Form;
