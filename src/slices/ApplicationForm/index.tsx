"use client";

import { sendEmail } from "@/app/lib/sendEmail";
import BoundedFull from "@/components/BoundedFull";
import RichTextWithComponents from "@/components/RichTextWithComponents";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { useState } from "react";
import {
  Button,
  Input,
  Label,
  TextField,
  ToggleButton,
  Select,
  SelectValue,
  Popover,
  ListBox,
  ListBoxItem,
  Form,
} from "react-aria-components";

type InputProps = {
  type: string;
  label: string;
  name: string;
  block?: boolean;
};

const CustomInput = ({ type, label, name, block }: InputProps) => {
  return (
    <TextField
      name={name}
      className={`flex flex-col gap-2 ${block ? "w-full" : "w-auto"}`}
    >
      <Label className="text-lg font-bold">{label}</Label>
      <Input
        type={type}
        placeholder={label}
        className={`border-solid border-black rounded-lg border-2 px-4 py-4 text-lg font-normal  `}
      />
    </TextField>
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
  const [submitted, setSubmitted] = useState(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Prevent default browser page refresh.
    e.preventDefault();

    // Get form data as an object.
    let data = Object.fromEntries(new FormData(e.currentTarget));

    data = {
      ...data,
      job: selectedJob,
    };

    // Submit to your backend API...
    console.log(data);

    const formData = new FormData();
    formData.append("name", data.vorname + " " + data.nachname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("job", data.job);
    formData.append("arbeitsort", data.arbeitsort);

    console.log(formData);

    sendEmail(formData);
  };

  const workingPlaces = [
    {
      label: "Knüllwald",
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
      <div className="flex flex-col gap-2">
        <RichTextWithComponents richText={slice.primary.heading} />
        <RichTextWithComponents richText={slice.primary.subheading} />
      </div>

      <ul className="flex flex-row flex-wrap gap-16">
        {slice.items.map((item, index) => (
          <li key={index}>
            <ToggleButton
              isSelected={selectedJob === item.job_title}
              onChange={() => {
                setSelectedJob(item.job_title as string);
              }}
              className="border border-solid border-secondary text-secondary selected:bg-secondary selected:text-white hover:bg-secondary50 hover:text-white rounded-xl px-4 py-4 text-2xl font-bold"
            >
              {item.job_title}
            </ToggleButton>
          </li>
        ))}
      </ul>
      <Form className="flex flex-col w-full gap-4" onSubmit={onSubmit}>
        <div className="flex flex-row w-full gap-4">
          <CustomInput
            type="text"
            name="vorname"
            label="Vorname*"
            block={true}
          />
          <CustomInput
            type="text"
            name="nachname"
            label="Nachname*"
            block={true}
          />
        </div>
        <div className="flex flex-row w-full">
          <CustomInput type="email" name="email" label="E-Mail*" block={true} />
        </div>
        <div className="flex flex-row w-full gap-4">
          <CustomInput type="text" name="phone" label="Telefon*" block={true} />
          <Select
            name="arbeitsort"
            className="flex flex-col w-full gap-2"
            placeholder="Wunschort*"
          >
            <Label className="text-lg font-bold">Arbeitsort</Label>
            <Button className="border-2 border-black rounded-lg px-4 py-4 flex justify-between">
              <SelectValue className="text-lg text-black placeholder-shown:text-gray-400" />
              <span aria-hidden="true">▼</span>
            </Button>
            <Popover className="w-[--trigger-width] overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black/5 entering:animate-in entering:fade-in exiting:animate-out exiting:fade-ou">
              <ListBox className="flex flex-col w-full outline-none p-1">
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
          </Select>
        </div>
        <Button
          className="w-full text-white bg-secondary hover:bg-secondary50 text-2xl font-bold px-4 py-4 rounded-lg"
          type="submit"
        >
          Jetzt bewerben
        </Button>
      </Form>
    </BoundedFull>
  );
};

export default ApplicationForm;
