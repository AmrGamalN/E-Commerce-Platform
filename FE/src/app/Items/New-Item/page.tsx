"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import "react-loading-skeleton/dist/skeleton.css";
import Paragraph from "@/components/UI/Paragraph";
import TextInput from "@/components/UI/TextInput";
import { Textarea } from "@/components/UI/Textarea";
import { Select } from "@/components/UI/Select";
import { Switch } from "@/components/UI/Switch";
import Button from "@/components/UI/Button/index";
import { Checkbox } from "@/components/UI/CheckBox";
import UserAddress from "@/components/UserAddress";
import { NewItemStyles } from "./className";
import { IoAdd } from "react-icons/io5";
import { VscCloudUpload } from "react-icons/vsc";
import { HD_SELL_TAGLINE } from "@/constants/content";
import CategorySelections from "@/containers/CategorySelections";
import { CommunicationOption, FormValues } from "@/types/sellItem";
import dynamic from "next/dynamic";
import { FormatAddress } from "@/utils/FormatUserAddress";
import { Address } from "@/types/address";
import { useAddData } from "@/Hooks/apiHooks/useAdd";
import { toast } from "sonner";
import { useFetchAddresses } from "@/Hooks/Address/useFetchAddresses";
import { UseFetchPayment } from "@/Hooks/Payments/useFetchPayments";
import { CgSpinnerAlt } from "react-icons/cg";
import { useRouter } from "next/navigation";
import Head from "next/head";
import { UsePerviewItemsStore } from "@/store/UsePerviewItem";
import { validationSchema } from "./validationSchema";
import UploadItemImgs from "@/components/UI/Upload_Item_Img";
import { initialValues } from "./ItemInitialValues";
const Page = () => {
  const [communicationOptions, setCommunicationOptions] = useState<CommunicationOption>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [newAddress, setNewAddress] = useState<boolean>(false);
  const [successAdding, setSuccessAdding] = useState<"idle" | "success" | "error">("idle");
  const { data: addressData, isLoading: addressLoading, isError: addressError } = useFetchAddresses(); //fetch user addreesses
  const { data: PaymentsData, isLoading: PaymentsLoading, isError: PaymentsError } = UseFetchPayment(); //fetch user Payments
  const { mutate, isPending } = useAddData<FormData>("item/add");
  const { setPerviewItem } = UsePerviewItemsStore();
  const router = useRouter();
  // Formik implement
  const formik = useFormik<FormValues>({
    initialValues: initialValues,
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = new FormData();
      (Object.keys(values) as Array<keyof typeof values>)?.forEach((key) => {
        if (key !== "itemImages" && key !== "angles") {
          formData.append(key, String(values[key]) || "");
        }
      });
      values?.itemImages?.forEach((file) => {
        formData.append("itemImages", file);
      });
      values.angles?.forEach((angle: string) => {
        formData.append("angles", angle);
      });

      mutate(formData, {
        onSuccess: () => {
          resetForm();
          setSuccessAdding("success");
          toast.success("New Item added successfully!");
        },
        onError: (error) => {
          console.log(error);
          const errorMessage = error?.message || "An unknown error occurred.";
          toast.error(`Error adding item: ${errorMessage}`);
        },
      });
    },
  });
  // choose between HallaDealChat, phone num or Both
  const handleCommunicationChange = (option: CommunicationOption) => {
    if (option === "both") {
      formik.setFieldValue("communications", ["HdChat", "phone"]);
    } else {
      formik.setFieldValue("communications", [option]);
    }
    setCommunicationOptions(option);
  };
  useEffect(() => {
    const images = formik.values.itemImages;
    if (typeof window !== "undefined" && Array.isArray(images)) {
      const filesOnly = images.filter((img): img is File => img instanceof File); // Filter out non-File objects
      const urls = filesOnly.map((file) => URL.createObjectURL(file));
      setImageUrls(urls);
      return () => {
        urls.forEach((url) => URL.revokeObjectURL(url));
      };
    }
  }, [formik.values.itemImages]);

  // handle add values to pass it perview page
  const handleAddValues = () => {
    setPerviewItem(formik.values);
    router.push("/Items/Preview-Item");
  };
  return (
    <>
      <Head>
        <title>Sell item | Halla Deals</title>
        <meta name="description" content="Sell Item Here" />
      </Head>
      <div className="px-4 py-10">
        <div>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-gray-70">Upload Item</h3>
          <Paragraph color="lightGray" align="left" className="font-semibold text-sm">
            {HD_SELL_TAGLINE}
          </Paragraph>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="my-6 grid grid-cols-12 gap-6">
            <UploadItemImgs formik={formik} imageUrls={imageUrls} setImageUrls={setImageUrls} />
            {/* <div className="col-span-12 md:col-span-4">
              <div className={`${NewItemStyles.uploadImagesContainer} ${formik.errors.itemImages && "border-red-500"}`}>
                <Paragraph color="darkGray" align="left" size="sm" className="font-semibold underline mb-6">
                  Add Up to 6 images
                </Paragraph>
                <div className="pt-6 pb-10">
                  {loadImagesStatus === "pending" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {Array.from({ length: 5 })?.map((_, index) => (
                        <Skeleton height={60} key={index} className="rounded-lg" />
                      ))}
                    </div>
                  ) : imageUrls?.length > 0 && loadImagesStatus === "success" ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {imageUrls &&
                        imageUrls.length > 0 &&
                        imageUrls.map((img, index) => (
                          <ImageCard

                            key={index}
                            imgSrc={img}
                            onDelete={() => removeSingleImg(index)}
                            onRotate={() => handleRotateImages(index)}
                            rotateDeg={imageRotateAngles[index]}
                          />
                        ))}
                      {imageUrls?.length < 6 && (
                        <div className="flex flex-col justify-center gap-2">
                          <label className={NewItemStyles.uploadIMoreLabel}>
                            <IoAdd size={16} />
                            Upload More
                            <input type="file" accept="image/*" multiple onChange={handleUploadImgs} hidden />
                          </label>
                          <Button type="button" variant="btn-delete" onClick={removeAllImages} className="px-0 text-xs">
                            <MdDelete size={16} />
                            Remove All
                          </Button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <UplpoadFile
                      accetpType="image"
                      onChange={handleUploadImgs}
                      name="itemImages"
                      onBlur={formik.handleBlur}
                    />
                  )}
                </div>

                {formik.errors.itemImages && <HandleError error={formik.errors.itemImages} />}
              </div>
            </div> */}

            <div className={NewItemStyles.InputsContainer}>
              <TextInput
                label="Title"
                id="title"
                name="title"
                type="text"
                placeholder="e.g. White COS Jumper"
                mandatory={true}
                value={formik.values.title}
                error={formik.errors.title}
                touched={formik.touched.title}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />

              <Textarea
                label="Description"
                id="description"
                name="description"
                placeholder="Describe your item."
                mandatory={true}
                value={formik.values.description}
                error={formik.errors.description}
                touched={formik.touched.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                maxLength={500}
                showCharCount={true}
              />
              {/* select category ,subctegory,brands... */}
              <CategorySelections formik={formik} addingStatus={successAdding} />
              <div className="flex flex-col gap-3">
                <TextInput
                  label="Price"
                  id="price"
                  name="price"
                  type="number"
                  placeholder="e.g. 100EGP"
                  mandatory={true}
                  value={formik.values.price}
                  error={formik.errors.price}
                  touched={formik.touched.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.values.isDiscount && (
                  <TextInput
                    label="Discount"
                    id="discount"
                    name="discount"
                    type="number"
                    placeholder="e.g. 80EGP"
                    value={formik.values.discount}
                    error={formik.errors.discount}
                    touched={formik.touched.discount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                )}
              </div>

              <div className="flex flex-col gap-4">
                <Switch
                  label="Allow Negotiate"
                  id="allowNegotiate"
                  name="allowNegotiate"
                  checked={formik.values.allowNegotiate}
                  onCheckedChange={(checked) => {
                    if (checked !== formik.values.isDiscount) {
                      formik.setFieldValue("allowNegotiate", checked);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.errors.allowNegotiate}
                  touched={formik.touched.allowNegotiate}
                />
                <Switch
                  label="Discount"
                  id="isDiscount"
                  name="isDiscount"
                  checked={formik.values.isDiscount}
                  onCheckedChange={(checked) => {
                    if (checked !== formik.values.isDiscount) {
                      formik.setFieldValue("isDiscount", checked);
                    }
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.errors.isDiscount}
                  touched={formik.touched.isDiscount}
                />
              </div>

              <div className="mt-4">
                <Select
                  options={
                    PaymentsData?.data?.map((payment: string) => ({
                      _id: payment,
                      value: payment,
                      label: payment,
                    })) || []
                  }
                  title="Payment Options"
                  id="paymentOptions"
                  name="paymentOptions"
                  mandatory={true}
                  value={formik.values.paymentOptions || []}
                  onSelect={(value) => formik.setFieldValue("paymentOptions", value)}
                  onBlur={formik.handleBlur}
                  error={formik.errors.paymentOptions}
                  touched={formik.touched.paymentOptions}
                  isMultiple={true}
                  loadingError={PaymentsError}
                  loadingStatus={PaymentsLoading}
                  selectValueType="value"
                />
              </div>

              <div className="mt-2">
                <Select
                  options={
                    addressData?.data?.map((address: Address) => ({
                      _id: address._id,
                      value: address._id, // or any unique value you need
                      label: FormatAddress(address), // formatted address string
                    })) || []
                  }
                  title="Location"
                  id="location"
                  name="location"
                  mandatory={true}
                  value={formik.values.location || []}
                  onSelect={(value) => formik.setFieldValue("location", value)}
                  onBlur={formik.handleBlur}
                  error={formik.errors.location}
                  touched={formik.touched.location}
                  loadingStatus={addressLoading}
                  loadingError={addressError}
                />
                {!newAddress && (
                  <div className="flex flex-row justify-end items-center ">
                    <Button
                      ariaLabel="Add New Address Button"
                      variant="btn-secondary"
                      onClick={() => setNewAddress(!newAddress)}
                      type="button"
                      className="mt-2"
                    >
                      New Address
                      <IoAdd size={18} className="text-gray-20" />
                    </Button>
                  </div>
                )}
                {newAddress && <UserAddress onCancel={() => setNewAddress(!newAddress)} />}
              </div>

              <div>
                <label className="text-md font-semibold text-gray-60 ">Communication</label>
                <div className="flex flex-col md:flex-row  gap-4 md:gap-10 mt-2">
                  <Checkbox
                    label="Phone Number"
                    checked={communicationOptions === "phone" || communicationOptions === "both"}
                    onCheckedChange={() => handleCommunicationChange("phone")}
                  />
                  <Checkbox
                    label="Halla Deals Chat"
                    checked={communicationOptions === "HDchat" || communicationOptions === "both"}
                    onCheckedChange={() => handleCommunicationChange("HDchat")}
                  />
                  <Checkbox
                    label="Both"
                    checked={communicationOptions === "both"}
                    onCheckedChange={() => handleCommunicationChange("both")}
                  />
                </div>
                {formik.errors.communications && (
                  <Paragraph color="error" align="left">
                    {formik.errors.communications}
                  </Paragraph>
                )}
              </div>

              <div className="flex flex-col-reverse md:flex-row justify-between gap-4 mt-6">
                <div className="flex flex-col-reverse md:flex-row gap-2">
                  <Button type="reset" variant="btn-cancel" onClick={() => formik.resetForm()}>
                    Cancel
                  </Button>
                  <Button type="button" variant="btn-secondary">
                    Save as draft
                  </Button>
                </div>
                <div className="flex flex-col-reverse md:flex-row gap-2">
                  <Button
                    type="button"
                    variant="btn-secondary"
                    disabled={!formik.isValid}
                    onClick={() => handleAddValues()}
                  >
                    Preview
                  </Button>
                  <Button
                    type="submit"
                    variant="btn-primary"
                    className="px-3"
                    disabled={!formik.isValid || formik.isSubmitting || isPending}
                  >
                    {isPending ? (
                      <CgSpinnerAlt className="animate-spin duration-600 ease-in-out transition-all" />
                    ) : (
                      <>
                        Publish
                        <VscCloudUpload size={18} />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
export default dynamic(() => Promise.resolve(Page), { ssr: false });
