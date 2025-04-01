import { Resource } from "i18next";
import { HTMLAttributes } from "react";
import { TemplateColumnMapping } from "../importer/features/map-columns/types";

type ModalParams = {
  isModal?: boolean;
  modalIsOpen?: boolean;
  modalOnCloseTriggered?: () => void;
  modalCloseOnOutsideClick?: boolean;
};

export type CSVImporterProps = (HTMLAttributes<HTMLDialogElement> & HTMLAttributes<HTMLDivElement>) & {
  template?: Record<string, unknown> | string;
  darkMode?: boolean;
  primaryColor?: string;
  className?: string;
  onComplete?: (data: any) => void;
  onHeadersMapped?: (selectedHeaderRow: number | null, mappedHeaders: { [index: number]: TemplateColumnMapping }, originalFile: File | null) => Promise<void>;
  waitOnComplete?: boolean;
  customStyles?: Record<string, string> | string;
  showDownloadTemplateButton?: boolean;
  skipHeaderRowSelection?: boolean;
  language?: string;
  customTranslations?: Resource;
} & ModalParams;
