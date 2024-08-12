import React from "react";
import { useUser } from "../contexts/UserContext";
import { ProfileCard } from "../stories/components/profileCard/ProfileCard";

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="profile">
      {user && <ProfileCard user={user} />}
      <hr />
    </div>
  );
};

export default ProfilePage;
