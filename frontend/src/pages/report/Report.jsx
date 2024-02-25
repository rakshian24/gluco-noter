import { GET_READINGS_REPORT } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReportTable from "../../components/ReportTable";
import { getFormattedTimeStamp } from "../../utils";
import { useEffect, useState } from "react";

const Report = () => {
  const { data, loading } = useQuery(GET_READINGS_REPORT);
  const [formattedData, setFormattedData] = useState();

  useEffect(() => {
    if (!loading && data?.getReadingsReport?.length > 0) {
      const transformedData = data?.getReadingsReport?.map((item) => {
        if (item.date.includes("time")) {
          return {
            ...item,
            bb: getFormattedTimeStamp(item.bb),
            breakfast: getFormattedTimeStamp(item.breakfast),
            ab: getFormattedTimeStamp(item.ab),
            bl: getFormattedTimeStamp(item.bl),
            lunch: getFormattedTimeStamp(item.lunch),
            al: getFormattedTimeStamp(item.al),
            bd: getFormattedTimeStamp(item.bd),
            dinner: getFormattedTimeStamp(item.dinner),
            ad: getFormattedTimeStamp(item.ad),
            morningInsulinUnits: getFormattedTimeStamp(
              item.morningInsulinUnits
            ),
            afternoonInsulinUnits: getFormattedTimeStamp(
              item.afternoonInsulinUnits
            ),
            eveningInsulinUnits: getFormattedTimeStamp(
              item.eveningInsulinUnits
            ),
            nightInsulinUnits: getFormattedTimeStamp(item.nightInsulinUnits),
          };
        }
        return item;
      });
      setFormattedData(transformedData);
    }
  }, [data?.getReadingsReport, loading]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return <ReportTable data={formattedData || []} />;
};

export default Report;
