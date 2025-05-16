import Layout from "@/layouts/Layout";
import ProfileContainer from "@/app/profile/containers/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil",
  description: "Profil User KantinKu",
};

export default function ProfilePage() {
  return (
    <>
      <Layout withNavbar withFooter>
        <ProfileContainer />
      </Layout>
    </>
  );
}
