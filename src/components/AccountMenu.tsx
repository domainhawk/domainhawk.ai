import { ColorModeButton } from "@/components/ui/color-mode";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useLoginLogout } from "@/hooks/useLoginLogout";
import {
  Heading,
  HStack,
  IconButton,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { BiChevronDown } from "react-icons/bi";
import { PiUserCircleDuotone } from "react-icons/pi";
import { TbAnalyze, TbEye, TbLogout, TbSettings } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@/components/auth/useAuthContext";
import { Button } from "@/components/ui/button";

const UserMenu = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const { logout } = useLoginLogout();
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton variant="ghost" aria-label="View watched domains">
          <PiUserCircleDuotone />
          <Heading size="xs">{user.nickname}</Heading>
          <BiChevronDown />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItem
          value="watched-domains"
          onClick={() => navigate("/account/watched")}
          cursor={"pointer"}
        >
          <TbEye /> Watched domains
        </MenuItem>
        <MenuItem
          value="insights"
          onClick={() => navigate("/account/insights")}
          cursor={"pointer"}
        >
          <TbAnalyze /> Insights
        </MenuItem>
        <MenuItem
          value="account-settings"
          onClick={() => navigate("/account/settings")}
          cursor={"pointer"}
        >
          <TbSettings /> Account settings
        </MenuItem>
        <Separator />
        <MenuItem value="logout" onClick={logout} cursor={"pointer"}>
          <TbLogout /> Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

const AccountControls = () => {
  const { user, isLoading, login, isAuthenticated } = useAuthContext();

  if (isLoading) {
    return <Spinner size={"sm"} />;
  }

  if (!isAuthenticated || !user) {
    return (
      <Button variant={"ghost"} size={"sm"} onClick={login}>
        Login
      </Button>
    );
  }

  return <UserMenu user={user} />;
};

export default function AccountMenu() {
  return (
    <HStack fontSize="sm" fontWeight="bold">
      <AccountControls />
      <ColorModeButton />
    </HStack>
  );
}
