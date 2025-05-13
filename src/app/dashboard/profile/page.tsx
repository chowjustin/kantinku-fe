"use client";

import ProfileContainer from "@/app/profile/containers/Profile";
import withAuth from "@/components/hoc/withAuth";

export default withAuth(DashboardProfile, "tenant");

function DashboardProfile() {
  return <ProfileContainer />;
}
