import { useGetDomainInsight } from "@/api/insights/hooks";
import { useParams } from "react-router-dom";

export const Insights = () => {
  const { id, domainName } = useParams();
  const { data, isPending } = useGetDomainInsight(id!);

  console.log({ data, isPending });

  return (
    <div>
      Insights {id} {domainName}
    </div>
  );
};
