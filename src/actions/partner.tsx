import { httpInvoice, httpMock } from "@/lib/http";
import { TInvoiceTemplateBody } from "@/schemaValidations/invoiceTemplate.schema";
import { TPartnersBody } from "@/schemaValidations/partners.schema";
import { TInvoiceTemplateBase } from "@/types/InvoiceTemplate";
import { TPartnersBase } from "@/types/Partner";
import { TTableResponse } from "@/types/Table";

const partnersApi = {
  getPartners: (accessToken?: string, params?: any) => {
    return httpInvoice.get<TTableResponse<TPartnersBase>>("partners", {
      params,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  getPartnersById: (id: string, accessToken?: string, params?: any) => {
    return httpInvoice.get<TPartnersBase>(`partners/${id}`, {
      params,
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
  createPartners: (data: TPartnersBody) => {
    return httpInvoice.post<TPartnersBody>("partners", data);
  },
};

export default partnersApi;
