import React from "react";
import { CompanyInfo } from "../types/types";

interface InfoWidgetProps {
  company: CompanyInfo;
}

const InfoWidget: React.FC<InfoWidgetProps> = ({ company }) => {
  return (
    <div className="h-fit overflow-auto p-4 border rounded shadow-md bg-white text-sm sm:text-base">
      <div key={company.id} className="flex flex-col gap-2">
        <div>
          <span className="font-bold text-xs">ticker: </span>
          {company.ticker}
        </div>
        <div>
          <span className="font-bold text-xs">Name:</span> {company.name}
        </div>
        <div>
          <span className="font-bold text-xs">Legal name:</span>{" "}
          {company.legal_name}
        </div>
        <div>
          <span className="font-bold text-xs">Stock exchange:</span>{" "}
          {company.stock_exchange}
        </div>
        <div>
          <span className="font-bold text-xs">Short description:</span>{" "}
          {company.short_description}
        </div>
        <div>
          <span className="font-bold text-xs">Long description:</span>{" "}
          {company.long_description}
        </div>
        <div>
          <span className="font-bold text-xs">Website:</span>{" "}
          <a
            href={company.company_url}
            target="_blank"
            rel="noopener noreferrer"
            className="no-underline text-black"
          >
            {company.company_url}
          </a>
        </div>
        <div>
          <span className="font-bold text-xs">Business address:</span>{" "}
          {company.business_address}
        </div>
        <div>
          <span className="font-bold text-xs">Business phone no:</span>{" "}
          {company.business_phone_no}
        </div>
        <div>
          <span className="font-bold text-xs">Entity legal form:</span>{" "}
          {company.entity_legal_form}
        </div>
        <div>
          <span className="font-bold text-xs">Latest filing date:</span>{" "}
          {company.latest_filing_date}
        </div>
        <div>
          <span className="font-bold text-xs">Inc country:</span>{" "}
          {company.inc_country}
        </div>
        <div>
          <span className="font-bold text-xs">Employees:</span>{" "}
          {company.employees}
        </div>
        <div>
          <span className="font-bold text-xs">Sector:</span> {company.sector}
        </div>
        <div>
          <span className="font-bold text-xs">Industry category:</span>{" "}
          {company.industry_category}
        </div>
        <div>
          <span className="font-bold text-xs">Industry group:</span>{" "}
          {company.industry_group}
        </div>
        <div>
          <span className="font-bold text-xs">Thea enabled:</span>{" "}
          {company.thea_enabled}
        </div>
        <div>
          <span className="font-bold text-xs">Legacy sector:</span>{" "}
          {company.legacy_sector}
        </div>
        <div>
          <span className="font-bold text-xs">Legacy industry category:</span>{" "}
          {company.legacy_industry_category}
        </div>
        <div>
          <span className="font-bold text-xs">Legacy industry group:</span>{" "}
          {company.legacy_industry_group}
        </div>
      </div>
    </div>
  );
};

export default InfoWidget;
