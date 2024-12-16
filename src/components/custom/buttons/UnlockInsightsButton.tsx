import { useCreateDomainInsight } from "@/api/insights/hooks";
import { useAuthContext } from "@/components/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { useNotify } from "@/hooks/useNotify";
import { FaLock } from "react-icons/fa";
import { LuActivity } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export const UpgradeButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate("/upgrade")}
      alignSelf="flex-start"
      width="auto"
      py={2}
    >
      <FaLock />
      Unlock Domain Insights from $10 per month
    </Button>
  );
};

export const UnlockInsightsButton = ({
  domainName,
}: {
  domainName: string;
}) => {
  const { user } = useAuthContext();
  const notify = useNotify();
  const insightsCredits = user?.user_settings?.premium_insights_api_calls || 0;
  const hasInsightCredits = insightsCredits > 0;
  const navigate = useNavigate();
  const { mutateAsync: createDomainInsight, isPending } =
    useCreateDomainInsight();

  const handleGetDomainInsights = async () => {
    const { id } = await createDomainInsight(domainName);
    console.log({ id });
    if (id) {
      navigate(`/account/insights/${id}`);
    } else {
      notify(
        "Failed to create domain insight",
        "Please try again later",
        "error"
      );
    }
  };

  if (!user) {
    return null;
  }

  if (hasInsightCredits) {
    return (
      <Button
        onClick={handleGetDomainInsights}
        loading={isPending}
        loadingText="Getting domain insights"
      >
        <LuActivity />
        Get Domain Insights ({insightsCredits} remaining)
      </Button>
    );
  }

  return <UpgradeButton />;
};
