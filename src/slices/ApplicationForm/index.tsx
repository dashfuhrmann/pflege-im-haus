"use client";

import BoundedFull from "@/components/BoundedFull";
import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import {
  Button,
  Input,
  Label,
  TextField,
  ToggleButton,
} from "react-aria-components";

/**
 * Props for `ApplicationForm`.
 */
export type ApplicationFormProps =
  SliceComponentProps<Content.ApplicationFormSlice>;

/**
 * Component for "ApplicationForm" Slices.
 */
const ApplicationForm = ({ slice }: ApplicationFormProps): JSX.Element => {
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <BoundedFull
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="flex-col"
    >
      {slice.items.map((item, index) => (
        <ToggleButton
          key={index}
          className="border border-solid border-secondary text-white selected:bg-secondary"
        >
          {item.job_title}
        </ToggleButton>
      ))}
      <form onSubmit={onSubmit}>
        <TextField className="flex flex-col">
          <Label>Name</Label>
          <Input type="text" className="border border-solid border-black" />
        </TextField>
      </form>
      <Button type="submit">Submit</Button>
    </BoundedFull>
  );
};

export default ApplicationForm;
