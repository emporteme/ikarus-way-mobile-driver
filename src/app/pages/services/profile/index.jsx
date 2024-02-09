// React imports
import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

// Components
import ProfileHeader from '@/components/profile/header/ProfileHeader';
import ProfileList from '@/components/profile/list/ProfileList';

// Main page
const ProfilePage = () => {
  return (
    <SafeAreaView style={{ padding: 20, backgroundColor: '#F8F9FB', height: '100%' }}>
      <ProfileHeader />
      <ProfileList />
    </SafeAreaView>
  );
}

export default ProfilePage;