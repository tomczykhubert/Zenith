import { LuCircleUser, LuLogIn, LuLogOut, LuUserPlus } from "react-icons/lu";
import { routes } from "@/lib/routes/routes";
import { useDictionary } from "@/providers/dictionaryProvider";
import ActionIcon from "@/components/ui/actionIcon";
import User from "@/types/user";

interface UserActionsProps {
  user: User | null;
}

const UserActions = ({ user }: UserActionsProps) => {
  const { t } = useDictionary();

  return (
    <div className="flex gap-3 items-center">
      {!user ? (
        <>
          <ActionIcon
            href={routes.user.signIn}
            text={t("user.signIn")}
            Icon={LuLogIn}
            variant="slate"
          />
          <ActionIcon
            href={routes.user.register}
            text={t("user.signUp")}
            Icon={LuUserPlus}
            variant="blue"
          />
        </>
      ) : (
        <>
          <ActionIcon
            href={routes.user.profile}
            text={t("user.profile")}
            Icon={LuCircleUser}
          />
          <ActionIcon
            href={routes.user.signOut}
            text={t("user.signOut")}
            Icon={LuLogOut}
            variant="blue"
          />
        </>
      )}
    </div>
  );
};

export default UserActions;
