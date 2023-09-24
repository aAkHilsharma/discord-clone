import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { initialProfile } from "@/lib/initail-profile";
import InitialModal from "@/components/modals/initial-modal";

const SetupPage = async () => {
  const profile = await initialProfile();

  // search all the members in the servers and find the first one that has the profile id in one of the members of that server

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <InitialModal />;
};

export default SetupPage;
