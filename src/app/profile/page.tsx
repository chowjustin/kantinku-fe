import Layout from "@/layouts/Layout";
import ProfileContainer from "@/app/profile/containers/Profile";

export default function ProfilePage() {
  return (
    <>
      <Layout withNavbar withFooter={false}>
        <ProfileContainer />
      </Layout>
    </>
  );
}
