import React, { Fragment } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from ".";
import { renderWithSkeleton } from "@/components/RenderWithSkeleton";

type BreadcrumbItemType = {
  _id: number;
  title: string | null;
  Link?: string;
};

type BreadCrumpProps = {
  List: BreadcrumbItemType[];
};

const BreadCrump = ({ List }: BreadCrumpProps) => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          {List?.map((item, index) => (
            <Fragment key={item._id}>
              {renderWithSkeleton(item.title && item.title != "", () => (
                <>
                  <BreadcrumbItem>
                    {item.Link ? (
                      <BreadcrumbLink href={item.Link} className="text-gray-60 font-medium">
                        {item.title}
                      </BreadcrumbLink>
                    ) : (
                      <span className="text-gray-80 cursor-default font-medium">{item.title}</span>
                    )}
                  </BreadcrumbItem>
                  {index !== List.length - 1 && <BreadcrumbSeparator />}
                </>
              ))}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};

export default BreadCrump;
