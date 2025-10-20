import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Switch,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../../components/Button';
import InputField from '../../components/InputField';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { user, setUser } = useAuth();

  const [showEdit, setShowEdit] = useState(false);
  const [name, setName] = useState(user?.fullName || '');
  const [image, setImage] = useState(user?.avatar || null);

  // Pick user image
  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert('Permission Denied', 'Allow access to your gallery to upload a profile photo.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });
      if (!result.canceled) setImage(result.assets[0].uri);
    } catch (err) {
      console.log('Image picker error:', err);
    }
  };

  // Save edited info
  const handleSave = () => {
    const updatedUser = { ...user, fullName: name, avatar: image };
    setUser(updatedUser);
    setShowEdit(false);
  };

  // Logout confirmation and action
 
const handleLogout = () => {
  Alert.alert(
    'Logout',
    'Do you really want to log out?',
    [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => setUser(null), // automatically shows onboarding
      },
    ],
    { cancelable: true }
  );
};



  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View
              style={[
                styles.avatar,
                { backgroundColor: theme.lightGray, justifyContent: 'center', alignItems: 'center' },
              ]}
            >
              <Text style={{ color: theme.textMuted, fontSize: theme.FONTS.large }}>
                {user?.fullName ? user.fullName[0].toUpperCase() : 'U'}
              </Text>
            </View>
          )}
          <TouchableOpacity
            style={[styles.editIcon, { backgroundColor: theme.accent }]}
            onPress={() => setShowEdit(true)}
          >
            <Ionicons name="pencil" size={16} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={[styles.name, { color: theme.primary }]}>{user?.fullName || 'User'}</Text>
        <Text style={[styles.email, { color: theme.textMuted }]}>
          {user?.email || 'example@email.com'}
        </Text>
      </View>

      {/* Actions Section */}
      <View style={styles.actions}>
        {/* Escrow */}
        <TouchableOpacity
  style={[styles.row, { borderBottomColor: theme.border }]}
  onPress={() => navigation.navigate('EscrowStack', { screen: 'EscrowHome' })}
>
  <Ionicons name="shield-checkmark-outline" size={22} color={theme.primary} />
  <Text style={[styles.link, { color: theme.primary }]}>View Escrow</Text>
</TouchableOpacity>


        {/* Merchant Options */}
        {!user?.isMerchant ? (
          <TouchableOpacity
            style={[styles.row, { borderBottomColor: theme.border }]}
            onPress={() => navigation.navigate('UpgradeMerchantScreen')}
          >
            <Ionicons name="storefront-outline" size={22} color={theme.primary} />
            <Text style={[styles.link, { color: theme.primary }]}>Upgrade to Merchant</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.row, { borderBottomColor: theme.border }]}
            onPress={() => navigation.navigate('Merchant', { screen: 'MerchantDashboard' })}
          >
            <Ionicons name="speedometer-outline" size={22} color={theme.primary} />
            <Text style={[styles.link, { color: theme.primary }]}>Go to Merchant Dashboard</Text>
          </TouchableOpacity>
        )}

        {/* Theme toggle */}
        <View style={[styles.row, { borderBottomColor: theme.border }]}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name="moon-outline" size={22} color={theme.primary} />
            <Text style={[styles.link, { color: theme.primary }]}>Dark Mode</Text>
          </View>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>

        {/* Logout */}
        <TouchableOpacity style={styles.logoutRow} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color={theme.danger} />
          <Text style={[styles.logoutText, { color: theme.danger }]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Edit Profile Modal */}
      <Modal visible={showEdit} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.background }]}>
            <Text style={[styles.modalTitle, { color: theme.primary }]}>Edit Profile</Text>

            <TouchableOpacity onPress={pickImage}>
              {image ? (
                <Image source={{ uri: image }} style={styles.editAvatar} />
              ) : (
                <View
                  style={[
                    styles.editAvatar,
                    { backgroundColor: theme.lightGray, justifyContent: 'center', alignItems: 'center' },
                  ]}
                >
                  <Ionicons name="camera" size={28} color={theme.textMuted} />
                </View>
              )}
            </TouchableOpacity>

            <InputField
              label="Full Name"
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />

            <View style={{ marginTop: theme.SPACING.lg }}>
              <Button title="Save Changes" onPress={handleSave} />
              <Button
                title="Cancel"
                onPress={() => setShowEdit(false)}
                style={{ marginTop: theme.SPACING.sm }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { alignItems: 'center', marginTop: 40 },
  avatarContainer: { position: 'relative' },
  avatar: { width: 90, height: 90, borderRadius: 45 },
  editIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    padding: 6,
  },
  name: { fontSize: 18, fontWeight: '600', marginTop: 12 },
  email: { fontSize: 14, marginTop: 4 },
  actions: { marginTop: 40 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  link: { fontSize: 16, marginLeft: 12 },
  logoutRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14 },
  logoutText: { fontSize: 16, marginLeft: 12, fontWeight: '500' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  editAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 20,
  },
});

export default ProfileScreen;
