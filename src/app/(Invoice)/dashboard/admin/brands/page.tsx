import brandApi from "@/actions/brands";
import BrandPage from "@/page/adminSys/brands";
import { cookies } from "next/headers";
import React from "react";

export default async function Brand(props: any) {
  const params = {
    page: props.searchParams.page ? +props.searchParams.page : 1,
    size: props.searchParams.size ? +props.searchParams.size : 10,
  };
  const cookieStore = cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const response = await brandApi.getBrands(accessToken!, params);
  console.log("brandsess:", response);

  return (
    <>
      <BrandPage props={props} data={response.payload} />
    </>
  );
}
