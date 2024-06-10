import OrganizationsApi from "@/actions/organizations";
import OrganizationsInvoicePage from "@/page/organization/invoices";
import { cookies } from "next/headers";
import React from "react";

export default async function Organizations(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    size: props.searchParams.size ? +props.searchParams.size : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const storeUser = cookieStore.get("user")?.value;
  const organizationId = JSON.parse(storeUser!).organizationId;
  const response = await OrganizationsApi.getInvoicesByOrganizationById(
    organizationId,
    accessToken!,
    params
  );

  return (
    <>
      <OrganizationsInvoicePage props={props} data={response.payload} />
    </>
  );
}