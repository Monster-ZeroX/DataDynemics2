// Mirror the type from the server side for consistency
export interface Student {
  "Index Number": string;
  "Name": string;
  "Z-Score": string;
  "District Rank": string;
  "Island Rank": string;
  "NIC Number": string;
  "Subjects": Record<string, string>;
}
