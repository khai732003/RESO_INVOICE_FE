import { httpInvoice } from "@/lib/http";
import { TInvoiceReport } from "@/schemaValidations/invoice-report.schema";
import { TReportInvoicePaymentInDateSchemaResponse } from "@/schemaValidations/invoice.schema";
import { TInvoiceTemplateBody } from "@/schemaValidations/invoiceTemplate.schema";
import {
  TOrganizationAccountsRequest,
  TOrganizationAccountsResponse,
} from "@/schemaValidations/organizationaccounts.schema";
import { TCreateOrganizationSchema, TOrganizationsBody } from "@/schemaValidations/organizations.schema";
import { TStore } from "@/schemaValidations/store.schema";
import { TStoreAccountsBase } from "@/schemaValidations/storeaccounts.schema";
import { TOrganizationsBase } from "@/types/Organization";
import { TTableResponse } from "@/types/Table";
import { create } from "lodash";

const organizationsApi = {
  getOrganizations: (accessToken: string, params?: any) => {
    return httpInvoice.get<TTableResponse<TOrganizationsBody>>(
      "organizations",
      {
        params,
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
  },

  getStoreAccountsByOrganizationById: (
    organizationId: string,
    sessionToken: string,
    params?: any
  ) => {
    return httpInvoice.get<TTableResponse<TStoreAccountsBase>>(
      `organizations/${organizationId}/users`,
      { params, headers: { Authorization: `Bearer ${sessionToken}` } }
    );
  },

  createOrganization: (data: TCreateOrganizationSchema) => {
    return httpInvoice.post<TCreateOrganizationSchema>("organizations", data);
  },
  getOrganizationById: (organizationId: string, sessionToken: string) => {
    return httpInvoice.get<TTableResponse<TOrganizationsBase>>(
      `organizations/${organizationId}`,
      {
        headers: { Authorization: `Bearer ${sessionToken}` },
      }
    );
  },
  createOrganizationAccount: (
    id: string,
    data: TOrganizationAccountsRequest
  ) => {
    return httpInvoice.post<TOrganizationAccountsResponse>(
      `/organizations/${id}/users`,
      data
    );
  },
  getInvoicesByOrganizationById: (
    organizationId: string,
    sessionToken: string,
    params?: any
  ) => {
    return httpInvoice.get<TTableResponse<TOrganizationsBase>>(
      `organizations/${organizationId}/invoices`,
      { params, headers: { Authorization: `Bearer ${sessionToken}` } }
    );
  },
  getTemplatesByOrganizationById: (
    id: string,
    accessToken?: string,
    params?: any
  ) => {
    return httpInvoice.get<TTableResponse<TInvoiceTemplateBody>>(
      `invoice-templates/${id}`,
      { params, headers: { Authorization: `Bearer ${accessToken}` } }
    );
  },

  getStoresByOrganizationById: (
    organizationId: string,
    sessionToken: string,
    params?: any
  ) => {
    return httpInvoice.get<TTableResponse<TStore>>(
      `organizations/${organizationId}/stores`,
      { params, headers: { Authorization: `Bearer ${sessionToken}` } }
    );
  },
  getInvoiceReportByOrganizationId: (
    organizationId: string,
    sessionToken: string,
    params?: any
  ) => {
    return httpInvoice.get<TInvoiceReport>(
      `organizations/${organizationId}/invoice-report`,
      { params, headers: { Authorization: `Bearer ${sessionToken}` } }
    );
  },
  getInvoiceReportInDateByOrganizationId: (
    organizationId: string,
    sessionToken: string,
    params?: any
  ) => {
    return httpInvoice.get<
      TTableResponse<TReportInvoicePaymentInDateSchemaResponse>
    >(`organizations/${organizationId}/invoice-payment-report-in-date`, {
      params,
      headers: { Authorization: `Bearer ${sessionToken}` },
    });
  },
};

export default organizationsApi;
