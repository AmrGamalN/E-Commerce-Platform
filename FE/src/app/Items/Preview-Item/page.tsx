"use client";
import React from "react";
import { PerviewItemStyles } from "./classNames";
import BreadCrump from "@/components/UI/BreadcrumbComp/BreadCrump";
import ProductSlider from "@/components/ProductSlider";
import Paragraph from "@/components/UI/Paragraph";
import Button from "@/components/UI/Button";
import { MdOutlineDiscount } from "react-icons/md";
import { CgSpinnerAlt } from "react-icons/cg";
import { VscCloudUpload } from "react-icons/vsc";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { renderWithSkeleton } from "@/components/RenderWithSkeleton";
import { useFetchAddressesById } from "@/Hooks/Address/useFetchAddressById";
import { useAddData } from "@/Hooks/apiHooks/useAdd";
import { toast } from "sonner";
import { FormatNumber } from "@/utils/FormatNumber";
import { base64ToFile } from "@/utils/convertFileToBase64 ";
import { sizeOptions } from "@/utils/HelpersData/sizeOptions";
import { getInitialPerviewItem } from "@/store/UsePerviewItem";

const Page = () => {
  const router = useRouter();
  const PerviewItems = getInitialPerviewItem();
  // Post item
  const { mutate, isPending } = useAddData<FormData>("item/add");
  // get user Address
  const { data: userAddress, isError: addressError } = useFetchAddressesById(PerviewItems ? PerviewItems.location : "");
  // Bread crump
  const List = [
    { _id: 1, title: PerviewItems?.category ? PerviewItems.category : null },
    { _id: 2, title: PerviewItems?.subcategory ? PerviewItems.subcategory : null },
    { _id: 3, title: PerviewItems?.type ? PerviewItems.type : null },
  ];
  const Specifications = [
    { _id: 1, name: "Brand", value: PerviewItems?.brand },
    { _id: 2, name: "Condition ", value: PerviewItems?.condition },
    {
      _id: 3,
      name: "Negotiability",
      value: PerviewItems?.allowNegotiate != null ? (PerviewItems.allowNegotiate ? "Yes" : "No") : null,
    },
  ];
  const sellerPreference = [
    { _id: 1, name: "contact ", value: PerviewItems?.communications?.join("  -  ") },
    { _id: 2, name: "Delivery ", value: PerviewItems ? "Halla Deals Direct" : null },
    { _id: 3, name: "payment ", value: PerviewItems?.paymentOptions?.join("  -  ") },
  ];

  // publish Item Func
  const PublishItem = async () => {
    if (!PerviewItems?.itemImages) return;
    // convert images back to be File
    const ConvertedItemImages = PerviewItems?.itemImages
      .filter((item) => !!item)
      .map((item) => {
        if (typeof item === "string") {
          return base64ToFile(item, "Image");
        }
        return item;
      });

    const dataToSend = { ...PerviewItems, itemImages: ConvertedItemImages };
    // handle form data to send it to api req
    const formData = new FormData();
    (Object.keys(dataToSend) as Array<keyof typeof dataToSend>)?.forEach((key) => {
      if (key !== "itemImages" && key !== "angles") {
        formData.append(key, String(dataToSend[key]) || "");
      }
    });
    dataToSend?.itemImages
      ?.filter((file): file is File => file !== null)
      .forEach((file: File) => {
        formData.append("itemImages", file);
      });
    dataToSend.angles?.forEach((angle: string) => {
      formData.append("angles", angle);
    });
    mutate(formData, {
      onSuccess: () => {
        router.push("/");
        toast.success("New Item added successfully!");
      },
      onError: (error) => {
        console.log(error);
        const errorMessage = error?.message || "An unknown error occurred.";
        toast.error(`Error adding item: ${errorMessage}`);
      },
    });
  };
  // save Item as Draft Func

  return (
    <>
      <Head>
        <title>Preview item | Halla Deals</title>
        <meta name="description" content="preview item bfore upload it" />
      </Head>

      <div className="container py-10">
        <div className="flex flex-row items-center">
          <BreadCrump List={List} />
        </div>

        <div className="grid grid-cols-12  md:gap-10 py-4">
          {/* Left: Slider */}
          <div className="md:col-span-6 col-span-12">
            <ProductSlider Images={PerviewItems?.itemImages as string[]} angles={PerviewItems?.angles} />
          </div>
          {/* Right: Info */}
          <div className="md:col-span-6 col-span-12 md:mt-0 mt-10">
            <div className="space-y-1">
              <div className="flex flex-row items-center flex-wrap justify-between  ">
                {/* Title & Description */}
                {renderWithSkeleton(
                  PerviewItems?.title,
                  () => (
                    <h1 className="text-[18px] md:text-[24px] font-semibold text-gray-80">{PerviewItems?.title}</h1>
                  ),
                  200,
                )}
                {/* edit button */}
                {PerviewItems && (
                  <Button
                    type="button"
                    variant="btn-cancel"
                    className="w-full md:max-w-[100px] max-w-[60px]"
                    size="sm"
                    onClick={() => router.push("/Items/New-Item")}
                  >
                    Edit
                  </Button>
                )}
              </div>
              {/* Price & discount*/}
              <div className="flex items-center justify-start gap-2 ">
                {renderWithSkeleton(
                  PerviewItems?.price,
                  () => (
                    <span
                      className={`text-base  font-bold text-gray-80 ${
                        PerviewItems?.isDiscount ? "line-through text-sm" : "text-base md:text-xl"
                      }`}
                    >
                      {FormatNumber(Number(PerviewItems?.price) || 0)} Egp
                    </span>
                  ),
                  100,
                )}
                {PerviewItems?.isDiscount && (
                  <div>
                    {renderWithSkeleton(
                      PerviewItems?.discount,
                      () => (
                        <span className="text-gray-50 text-lg font-medium ">
                          {FormatNumber(Number(PerviewItems?.discount))} EGP
                        </span>
                      ),
                      70,
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Specifications */}
            <div className={PerviewItemStyles.specificationContainer}>
              {Specifications?.map((item) => (
                <div className="flex flex-col items-start justify-center" key={item._id}>
                  {renderWithSkeleton(
                    item.value,
                    () => (
                      <Paragraph className={PerviewItemStyles.keyName}>{item.name}</Paragraph>
                    ),
                    100,
                  )}
                  {renderWithSkeleton(
                    item.value,
                    () => (
                      <span className={PerviewItemStyles.keyValue}>{item.value}</span>
                    ),
                    100,
                  )}
                </div>
              ))}
              {/* Location */}
              <div className="flex flex-col  items-start ">
                {renderWithSkeleton(
                  !addressError && userAddress?.data?.governorate && userAddress?.data?.city,
                  () => (
                    <Paragraph className={PerviewItemStyles.keyName}>location</Paragraph>
                  ),
                  100,
                )}
                {renderWithSkeleton(
                  !addressError && userAddress?.data?.governorate && userAddress?.data?.city,
                  () => (
                    <span
                      className={PerviewItemStyles.keyValue}
                    >{`${userAddress?.data?.governorate} - ${userAddress?.data?.city}`}</span>
                  ),
                  100,
                )}
              </div>

              {/* colors */}
              <div className="flex flex-col gap-1 items-start mt-4">
                {renderWithSkeleton(
                  PerviewItems?.color?.length,
                  () => (
                    <>
                      <Paragraph className={PerviewItemStyles.keyName}>Colors</Paragraph>
                      <div className="flex gap-2">
                        {PerviewItems?.color.map((item, index) => (
                          <span
                            className="w-6 h-6 rounded-full block"
                            style={{ backgroundColor: item }}
                            key={item + index}
                          ></span>
                        ))}
                      </div>
                    </>
                  ),
                  160,
                )}
              </div>
              {/* sizes */}
              <div className="mt-4 space-y-1 flex flex-col items-start">
                {renderWithSkeleton(
                  PerviewItems?.size,
                  () => (
                    <>
                      <Paragraph className={PerviewItemStyles.keyName}>sizes</Paragraph>
                      <div className="flex flex-row  items-center flex-wrap md:gap-2 gap-3">
                        {sizeOptions?.map((size) => (
                          <span
                            key={size._id}
                            className={`${PerviewItemStyles.sizeBlock} ${
                              PerviewItems?.size == size.value ? "bg-black text-white" : "text-gray-90 bg-gray-10"
                            } `}
                          >
                            {size.value}
                          </span>
                        ))}
                      </div>
                    </>
                  ),
                  100,
                )}
              </div>
            </div>

            {/* seller Preference*/}
            <ul className="space-y-2 mt-6">
              {PerviewItems && <h2 className={PerviewItemStyles.HeadingStyle}>seller Preference </h2>}
              {sellerPreference?.map((item) => (
                <li className="flex flex-row items-center gap-2 " key={item._id}>
                  {item.value && <span className=" w-1 h-1 bg-gray-70 rounded-full"></span>}
                  {renderWithSkeleton(
                    item.value,
                    () => (
                      <span className={"text-sm text-gray-80 font-semibold capitalize"}>{item.name} : </span>
                    ),
                    100,
                  )}
                  {renderWithSkeleton(
                    item.value,
                    () => (
                      <Paragraph align="center" className={"text-sm font-medium  text-gray-60  capitalize"}>
                        {item.value}
                      </Paragraph>
                    ),
                    100,
                  )}
                </li>
              ))}
            </ul>
            {/* Description */}
            <div className="!mt-4 border-t border-solid border-gray-30">
              {/* {PerviewItems && <h2 className={`${PerviewItemStyles.HeadingStyle} !my-1 text-gray-90`}> Description</h2>} */}
              {renderWithSkeleton(
                PerviewItems?.description,
                () => (
                  <Paragraph
                    color="darkGray"
                    size="sm"
                    align="left"
                    className="text-gray-60 my-1  leading-relaxed py-2"
                  >
                    {PerviewItems?.description}
                  </Paragraph>
                ),
                300,
              )}
            </div>
            {PerviewItems && (
              <div className={PerviewItemStyles.buttonsContainer}>
                <Button type="button" variant="btn-secondary" className="w-full">
                  Save as draft
                  <MdOutlineDiscount size={18} />
                </Button>
                <Button type="button" variant="btn-primary" className=" w-full" onClick={PublishItem}>
                  {isPending ? (
                    <>
                      <CgSpinnerAlt className="animate-spin duration-600 ease-in-out transition-all" />
                      Loading...
                    </>
                  ) : (
                    <>
                      Publish
                      <VscCloudUpload size={18} />
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
