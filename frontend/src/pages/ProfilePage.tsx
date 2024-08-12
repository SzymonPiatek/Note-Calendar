import React from "react";
import { useUser } from "../contexts/UserContext";
import { ProfileCard } from "../stories/components/card/ProfileCard";
import { DateCard } from "../stories/components/card/DateCard";

const ProfilePage: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="profile">
      <div className="profile--side">
        {user && <ProfileCard user={user} />}
        <DateCard />
      </div>
    </div>
  );
};

export default ProfilePage;
