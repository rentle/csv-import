import { useState } from "react";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
import defaults from "../../settings/defaults";
import { CSVImporterProps } from "../../types";
import ImporterComponent from "./index";

export default {
  title: "User Interface/Importer",
  component: ImporterComponent,
  argTypes: {
    primaryColor: {
      control: { type: "color" },
    },
    labelColor: {
      control: { type: "color" },
    },
  },
} as ComponentMeta<typeof ImporterComponent>;

const template = {
  columns: [
    {
      name: "First Name",
      key: "first_name",
      required: true,
      description: "The first name of the user",
      suggested_mappings: ["first", "mame"],
    },
    {
      name: "Last Name",
      suggested_mappings: ["last"],
    },
    {
      name: "Email",
      required: true,
      description: "The email of the user",
    },
  ],
};

const Template: Story<typeof ImporterComponent> = (args: CSVImporterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { isModal } = args;

  const props = {
    ...(isModal ? { modalIsOpen: isOpen } : {}),
    ...(isModal ? { modalOnCloseTriggered: () => setIsOpen(false) } : {}),
    ...(isModal ? { modalCloseOnOutsideClick: args.modalCloseOnOutsideClick } : {}),
    ...args,
  };

  console.log(props);

  return (
    <div>
      {args.isModal && <button onClick={() => setIsOpen(true)}>Import</button>}
      <ImporterComponent key={props.isModal?.toString()} {...props} />
    </div>
  );
};

export const Importer = Template.bind({});
Importer.args = {
  language: "en",
  ...defaults,
  template: template,
  customTranslations: {
    jp: {
      Upload: "アップロード",
      "Browse files": "ファイルを参照",
    },
    pt: {
      Upload: "Carregar",
      "Browse files": "Procurar arquivos",
    },
  },
};

const onHeadersMapped: CSVImporterProps['onHeadersMapped'] = async (selectedHeaderRow, mappedHeaders, originalFile) => {
  console.log("onHeadersMapped:", selectedHeaderRow, mappedHeaders, originalFile);
  return;
};

export const ImporterWithHeadersMapped = Template.bind({});
ImporterWithHeadersMapped.args = {
  ...Importer.args,
  onHeadersMapped,
};
