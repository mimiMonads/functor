import { ParamsMethod } from "../types.ts";

export type ParamsOptions = {
  elements: string[];
};
export type QueryOptions = {
  only?: string[];
};
export type AddOption = "req" | "query" | "param";
export type AddOptions = AddOption[];
export type RequestArguments = {
  req: Request;
  query: Record<string, string | undefined>;
  param: Record<string, string>;
};
export type ObjectRawResponse =
  | ObjectRawResponseCommon
  | ObjectRawResponseReturn
  | ObjectRawCommonRequest
  | ObjectRawResponseStatic;

export type ObjectRawResponseCommon = {
  path: string;
  f: (r: RequestArguments) => BodyInit | Promise<BodyInit>;
  param?: ParamsOptions;
  query?: QueryOptions;
  add?: AddOptions;
  delete?: AddOptions;
  dev?: "test";
  method?: ParamsMethod;
  status?: number;
  header?: Record<string, string>  | defaultMime;
};

export type ObjectRawCommonRequest = {
  type: "request";
  path: string;
  f: (r: RequestArguments) => Response | Promise<Response>;
  param?: ParamsOptions;
  query?: QueryOptions;
  add?: AddOptions;
  delete?: AddOptions;
  dev?: "test";
  method?: ParamsMethod;
};

export type ObjectRawResponseReturn = {
  type: "response";
  path: string;
  r: (r: Request) => Response | Promise<Response>;
  method?: ParamsMethod;
};

export type ObjectRawResponseStatic = {
  type: "static";
  name: string;
  path: string;
} | {
  type: "static";
  name: string;
  path: string;
  mime?: true;
  extra: [string, string][];
} | {
  type: "static";
  name: string;
  path: string;
  mime: false;
} ;

export type defaultMime =
  | ".aac"
  | ".abw"
  | ".arc"
  | ".avif"
  | ".avi"
  | ".azw"
  | ".azw"
  | ".bmp"
  | ".bz"
  | ".bz2"
  | ".cda"
  | ".csh"
  | ".css"
  | ".csv"
  | ".doc"
  | ".docx"
  | ".eot"
  | ".epub"
  | ".gz"
  | ".gif"
  | ".htm"
  | ".html"
  | ".ico"
  | ".ics"
  | ".jar"
  | ".jpeg"
  | ".js"
  | ".json"
  | ".jsonld"
  | ".mid"
  | ".mjs"
  | ".mp3"
  | ".mp4"
  | ".mpeg"
  | ".mpkg"
  | ".odp"
  | ".ods"
  | ".odt"
  | ".oga"
  | ".ogv"
  | ".ogx"
  | ".opus"
  | ".otf"
  | ".png"
  | ".pdf"
  | ".php"
  | ".ppt"
  | ".pptx"
  | ".rar"
  | ".rtf"
  | ".sh"
  | ".svg"
  | ".tar"
  | ".tif"
  | ".tiff"
  | ".ts"
  | ".ttf"
  | ".txt"
  | ".vsd"
  | ".wav"
  | ".weba"
  | ".webm"
  | ".webp"
  | ".woff"
  | ".woff2"
  | ".xhtml"
  | ".xls"
  | ".xlsx"
  | ".xml"
  | ".xul"
  | ".zip"
  | ".3gp"
  | ".3g2"
  | ".7z";