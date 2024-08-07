"use client";
import InvoiceApi from "@/actions/invoices";
import Page from "@/components/PageProps";
import TyphoField from "@/components/TyphoField ";
import {
  InvoiceDetailSchema,
  TInvoice,
} from "@/schemaValidations/invoice.schema";
import {
  formatDate,
  formatPriceVND,
  formattedDateTime,
} from "@/utils/formater";
import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Button, Card, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import React from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { invoiceStatusOptions } from "./config";
import { Tag } from "antd";
import OrganizationsInvoiceTemplatePage from "../invoiceTemplates";
import PDFViewerComponent from "../invoiceTemplates";
type Props = {
  data: TInvoice;
};

export default function OrganizationsInvoiceDetailPage({ data }: Props) {
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const methods = useForm<TInvoice>({
    resolver: zodResolver(InvoiceDetailSchema),
    defaultValues: {
      ...data,
    },
  });

  const { handleSubmit, control } = methods;

  const {
    fields: fieldsItems,
    remove: removeItem,
    append: appendItem,
  } = useFieldArray<TInvoice>({
    control,
    name: `items`,
  });

  const {
    fields: fieldsTaxTypes,
    remove: removeTaxTypes,
    append: appendTaxTypes,
  } = useFieldArray<TInvoice>({
    control,
    name: `taxTypes`,
  });

  const onSubmit = async (values: TInvoice) => {
    console.log("Form submitted with values:", values);
    const status = 2;
    try {
      const response = await InvoiceApi.updateStatusInvoice(data.id, status);
      if (response.status === 200) {
        enqueueSnackbar("Cập nhật trạng thái thành công", {
          variant: "success",
        });
        router.refresh();
      }
    } catch (error) {
      enqueueSnackbar("Cập nhật trạng thái thất bại", { variant: "error" });
    }
  };
  const hanleSend = async () => {
    const status = 2;
    try {
      const response = await InvoiceApi.updateStatusInvoice(data.id, status);
      if (response.status === 200) {
        enqueueSnackbar("Cập nhật trạng thái thành công", {
          variant: "success",
        });
        router.refresh();
      }
    } catch (error) {
      enqueueSnackbar("Cập nhật trạng thái thất bại", { variant: "error" });
    }
  };
  return (
    <FormProvider {...methods}>
      <Grid container spacing={2}>
        <PDFViewerComponent data={data} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={11} className="text-right">
            <Button
              variant="contained"
              color="primary"
              onClick={hanleSend}
              disabled={data.status === 1}
            >
              Gửi
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card style={{ width: "100%" }}>
            <Grid container item xs={12} spacing={1}>
              <Page title="Chi tiết hóa đơn" spacing={2}>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.receiptCode"
                    label="Mã biên nhận"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerCustomerCode"
                    label="Mã khách hàng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerTaxCode"
                    label="Mã số thuế"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerName"
                    label="Tên khách hàng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerAddress"
                    label="Địa chỉ khách hàng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerFullName"
                    label="Tên đầy đủ khách hàng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerPhoneNumber"
                    label="Số điện thoại khách hàng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerEmail"
                    label="Email khách hàng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerBankName"
                    label="Tên ngân hàng của khách hàng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.buyerBankAccountNumber"
                    label="Số tài khoản ngân hàng của khách hàng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.invoiceNote"
                    label="Ghi chú hóa đơn"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.internalNote"
                    label="Ghi chú nội bộ"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.discount"
                    label="Chiết khấu"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.code"
                    label="Mã sản phẩm"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.quantity"
                    label="Số lượng"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.totalAmount "
                    convert={formatPriceVND}
                    label="Tổng số tiền (VND)"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.discountAmount"
                    convert={formatPriceVND}
                    label="Số tiền chiết khấu (VND)"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="invoiceDetail.finalAmount"
                    convert={formatPriceVND}
                    label="Số tiền cuối cùng"
                    fullWidth
                    showBorder
                  />
                </Grid>
              </Page>
            </Grid>
          </Card>
        </Grid>
        <Grid container item xs={12} md={6} lg={6} spacing={2}>
          <Grid item xs={12}>
            <Card style={{ width: "100%" }}>
              <Grid container item xs={12} spacing={1}>
                <Page title="Chi tiết hóa đơn" spacing={2}>
                  <Grid item xs={12}>
                    <TyphoField
                      name="invoiceCode"
                      label="Mã hóa đơn"
                      fullWidth
                      showBorder
                    />
                  </Grid>

                  <Grid item xs={4}>
                    <TyphoField
                      name="lookupCode"
                      label="Mã tra cứu"
                      fullWidth
                      showBorder
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TyphoField
                      name="type"
                      label="Loại hóa đơn"
                      fullWidth
                      showBorder
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TyphoField
                      name="status"
                      label="Trạng thái"
                      fullWidth
                      showBorder
                      options={invoiceStatusOptions}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TyphoField
                      name="createdDate"
                      label="Ngày tạo"
                      convert={formattedDateTime}
                      fullWidth
                      showBorder
                    />
                  </Grid>
                </Page>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card style={{ width: "100%" }}>
              <Grid container item xs={12} spacing={1} padding={1}>
                <Grid item xs={6}>
                  <TyphoField
                    name="billCode"
                    label="Mã hóa đơn"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="paymentMethod"
                    label="Phương thức thanh toán"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="currencyUnit"
                    label="Đơn vị tiền tệ"
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="currencyExchangeRate"
                    label="Tỷ giá hối đoái"
                    fullWidth
                    showBorder
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card style={{ width: "100%" }}>
              <Grid container item xs={12} spacing={1} padding={1}>
                <Grid item xs={6}>
                  <TyphoField
                    name="totalTaxAmount"
                    label="Tổng số tiền thuế"
                    convert={formatPriceVND}
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="totalAmountAfterTax"
                    label="Tổng số tiền sau thuế"
                    convert={formatPriceVND}
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="totalSaleAmount"
                    label="Tổng số tiền bán hàng"
                    convert={formatPriceVND}
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="totalDiscountAmount"
                    label="Tổng số tiền chiết khấu"
                    convert={formatPriceVND}
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="totalAmountWithoutTax"
                    label="Tổng số tiền trước thuế"
                    convert={formatPriceVND}
                    fullWidth
                    showBorder
                  />
                </Grid>
                <Grid item xs={6}>
                  <TyphoField
                    name="totalAmount"
                    label="Tổng số tiền"
                    convert={formatPriceVND}
                    fullWidth
                    showBorder
                  />
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6} lg={6}>
          <Card style={{ width: "100%" }}>
            <Page title="Thuế" spacing={2}>
              {fieldsTaxTypes.map((taxType, index) => (
                <Card style={{ width: "100%" }} key={index}>
                  <Grid item xs={12} key={index}>
                    <Grid container spacing={1} padding={1}>
                      <Grid item xs={4}>
                        <TyphoField
                          name={`taxTypes.${index}.tax`}
                          label="Thuế"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TyphoField
                          name={`taxTypes.${index}.amountWithoutTax`}
                          convert={formatPriceVND}
                          label="Số tiền trước thuế"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={4}>
                        <TyphoField
                          name={`taxTypes.${index}.taxAmount`}
                          convert={formatPriceVND}
                          label="Số tiền thuế"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              ))}
            </Page>
          </Card>
        </Grid>
        <Grid container item xs={12} md={6} lg={6}>
          <Card style={{ width: "100%" }}>
            <Page title="Hàng hóa" spacing={2}>
              <Box
                style={{
                  maxHeight: "400px", // Adjust the height as needed
                  overflowY: "auto",
                }}
              >
                {fieldsItems.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <Grid container spacing={1} padding={1}>
                      <Grid item xs={3}>
                        <TyphoField
                          name={`items.${index}.ordinalNumber`}
                          label="Số Thứ Tự"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TyphoField
                          name={`items.${index}.code`}
                          label="Mã"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TyphoField
                          name={`items.${index}.name`}
                          label="Tên"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TyphoField
                          name={`items.${index}.quantity`}
                          label="Số Lượng"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TyphoField
                          name={`items.${index}.unit`}
                          label="Đơn Vị"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TyphoField
                          name={`items.${index}.price`}
                          convert={formatPriceVND}
                          label="Giá"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TyphoField
                          name={`items.${index}.taxAmount`}
                          convert={formatPriceVND}
                          label="Số Tiền Thuế"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                      <Grid item xs={3}>
                        <TyphoField
                          name={`items.${index}.amountAfterTax`}
                          convert={formatPriceVND}
                          label="Số Tiền Sau Thuế"
                          fullWidth
                          showBorder
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Page>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
