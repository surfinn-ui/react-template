import { Contact } from "./ContactObject";
import { License } from "./LicenseObject";

export class Info {
  title: string;
  summary?: string;
  description?: string;
  termsOfService?: string;
  contact?: Contact;
  license?: License;
  version: string;
}