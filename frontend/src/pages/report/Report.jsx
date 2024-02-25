import { GET_READINGS_REPORT } from "../../graphql/queries";
import { useQuery } from "@apollo/client";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReportTable from "../../components/ReportTable";

const Report = () => {
  const { data, loading } = useQuery(GET_READINGS_REPORT);

  if (loading) {
    return <LoadingSpinner />;
  } else {
    console.log("DATA = ", data);
  }
  return <ReportTable data={data?.getReadingsReport || []} />;
};

export default Report;
