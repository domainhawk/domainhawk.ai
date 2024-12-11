import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Heading,
  HStack,
  IconButton,
  Separator,
  Spinner,
} from "@chakra-ui/react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { TbEye, TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { ColorModeButton } from "./ui/color-mode";
import { BiChevronDown } from "react-icons/bi";

const UserMenu = ({ user }: { user: any }) => {
  const navigate = useNavigate();
  const { logout } = useAuth0();
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
          onClick={() => navigate("/watched")}
          cursor={"pointer"}
        >
          <TbEye /> Watched domains..
        </MenuItem>
        <Separator />
        <MenuItem value="logout" onClick={() => logout()} cursor={"pointer"}>
          <TbLogout /> Logout
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
};

const AccountControls = ({ user }: { user: any }) => {
  return (
    <>
      <UserMenu user={user} />
      <ColorModeButton />
    </>
  );
};

export default function AccountMenu() {
  const { isAuthenticated, user, loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return <Spinner size={"sm"} />;
  }

  if (!isAuthenticated) {
    return (
      <IconButton variant={"ghost"} onClick={() => loginWithRedirect()}>
        <PiUserCircleDuotone />
        Login
      </IconButton>
    );
  }

  return (
    <HStack fontSize="sm" fontWeight="bold">
      <AccountControls user={user} />
    </HStack>
  );
}
