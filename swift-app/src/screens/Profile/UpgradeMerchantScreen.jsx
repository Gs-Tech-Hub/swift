import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import InputField from '../../components/InputField';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const UpgradeMerchantScreen = () => {
  const { theme } = useTheme();
  const { user, setUser } = useAuth();
  const navigation = useNavigation();

  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [cacNumber, setCacNumber] = useState('');
  const [logo, setLogo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // New state

  const pickImage = async () => {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) return;

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) setLogo(result.assets[0].uri);
    } catch (error) {
      console.log('Image picker error:', error);
    }
  };

  const handleUpgrade = async () => {
    if (!businessName || !category || !cacNumber) return;

    setUploading(true);

    const merchantProfile = { businessName, category, description, logo, cacNumber };

    setTimeout(() => {
      setUser({ ...user, isMerchant: true, merchantProfile });
      setUploading(false);
      setSubmitted(true); // Mark as submitted
    }, 1500);
  };

  if (submitted) {
    // Show confirmation screen
    return (
      <View style={[styles.container, { backgroundColor: theme.background, justifyContent: 'center', alignItems: 'center' }]}>
        <Ionicons name="checkmark-circle-outline" size={80} color={theme.primary} />
        <Text style={[styles.title, { color: theme.primary, marginTop: 20 }]}>Submitted!</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted, textAlign: 'center', marginVertical: 10 }]}>
          Your merchant application has been submitted. You will be verified soon.
        </Text>
        <Button title="Go Back to Profile" onPress={() => navigation.goBack()} style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Close button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={28} color={theme.textMuted} />
      </TouchableOpacity>

      <Text style={[styles.title, { color: theme.primary }]}>Upgrade to Merchant</Text>
      <Text style={[styles.subtitle, { color: theme.textMuted }]}>
        Fill in your business details to become a verified merchant.
      </Text>

      <TouchableOpacity style={styles.logoUpload} onPress={pickImage}>
        {logo ? (
          <Image source={{ uri: logo }} style={styles.logoPreview} />
        ) : (
          <View style={[styles.logoPlaceholder, { backgroundColor: theme.lightGray }]}>
            <Ionicons name="camera" size={30} color={theme.textMuted} />
            <Text style={{ color: theme.textMuted, marginTop: 5 }}>Upload Logo</Text>
          </View>
        )}
      </TouchableOpacity>

      <InputField
        label="Business Name"
        value={businessName}
        onChangeText={setBusinessName}
        placeholder="Enter your business name"
      />

      <InputField
        label="Category"
        value={category}
        onChangeText={setCategory}
        placeholder="E.g. Electronics, Fashion, etc."
      />

      <InputField
        label="CAC Number"
        value={cacNumber}
        onChangeText={setCacNumber}
        placeholder="Enter your CAC registration number"
      />

      <InputField
        label="Description"
        value={description}
        onChangeText={setDescription}
        placeholder="Briefly describe your business"
        multiline
      />

      <View style={{ marginTop: theme.SPACING.lg }}>
        <Button
          title={uploading ? 'Submitting...' : 'Submit Application'}
          onPress={handleUpgrade}
          disabled={uploading}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  closeButton: { position: 'absolute', right: 20, top: 20, zIndex: 10 },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 50, marginBottom: 10 },
  subtitle: { fontSize: 14, marginBottom: 20 },
  logoUpload: { alignSelf: 'center', marginBottom: 20 },
  logoPlaceholder: { width: 100, height: 100, borderRadius: 50, justifyContent: 'center', alignItems: 'center' },
  logoPreview: { width: 100, height: 100, borderRadius: 50 },
});

export default UpgradeMerchantScreen;
