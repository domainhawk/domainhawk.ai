import { useCreateDomainInsight } from "@/api/insights/hooks";
import { useAuthContext } from "@/components/auth/useAuthContext";
import { Button } from "@/components/ui/button";
import { toaster } from "@/components/ui/toaster";
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
  const insightsCredits = user?.user_settings?.premium_insights_api_calls || 0;
  const hasInsightCredits = insightsCredits > 0;
  const navigate = useNavigate();
  const { mutateAsync: createDomainInsight, isPending } =
    useCreateDomainInsight();

  const handleGetDomainInsights = async () => {
    const { id } = await createDomainInsight(domainName);
    console.log({ id });
    if (id) {
      navigate(`/insights/${id}`);
    } else {
      toaster.create({
        title: "Failed to create domain insight",
        description: "Please try again later",
        type: "error",
      });
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
        Get Domain Insights for {domainName} ({insightsCredits} remaining)
      </Button>
    );
  }

  return <UpgradeButton />;
};
