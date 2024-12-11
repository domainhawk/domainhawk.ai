import { useAuth0 } from "@auth0/auth0-react";
import { Heading, HStack, IconButton, Spinner } from "@chakra-ui/react";
import { PiUserCircleDuotone } from "react-icons/pi";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const AccountControls = ({ user }: { user: any }) => {
  console.log({ user });
  const navigate = useNavigate();
  const { logout } = useAuth0();
  return (
    <>
      <IconButton
        variant="ghost"
        aria-label="View watched domains"
        onClick={() => navigate("/watched")}
      >
        <PiUserCircleDuotone />
        <Heading size="xs">{user.nickname}</Heading>
      </IconButton>
      <IconButton
        variant="ghost"
        aria-label="Logout"
        onClick={() =>
          logout({
            openUrl: (url) => {
              window.location.href = url;
            },
          })
        }
      >
        <TbLogout />
      </IconButton>
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
