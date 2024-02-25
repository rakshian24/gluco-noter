import { GET_READINGS_REPORT } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReportTable from "../../components/ReportTable";
import { getFormattedReportCells } from "../../utils";
import { useEffect, useState } from "react";

const Report = () => {
  const { data, loading } = useQuery(GET_READINGS_REPORT);
  const [formattedData, setFormattedData] = useState();

  useEffect(() => {
    if (!loading && data?.getReadingsReport?.length > 0) {
      const transformedData = data?.getReadingsReport?.map((item) =>
        getFormattedReportCells(item)
      );
      setFormattedData(transformedData);
    }
  }, [data?.getReadingsReport, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <ReportTable data={formattedData || []} />;
};

export default Report;
