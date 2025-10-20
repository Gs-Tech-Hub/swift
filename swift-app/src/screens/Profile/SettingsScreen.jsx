import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/Button';

const SettingsScreen = () => {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const { setUser } = useAuth();

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.primary }]}>Settings</Text>

      {/* Theme Toggle */}
      <View style={styles.item}>
        <View style={styles.itemLeft}>
          <Ionicons name="moon" size={20} color={theme.primary} />
          <Text style={[styles.itemText, { color: theme.primary }]}>Dark Mode</Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: theme.border, true: theme.secondary }}
          thumbColor={isDarkMode ? theme.accent : theme.lightGray}
        />
      </View>

      {/* Account */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Ionicons name="person-circle-outline" size={20} color={theme.primary} />
          <Text style={[styles.itemText, { color: theme.primary }]}>Account</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
      </TouchableOpacity>

      {/* Security */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Ionicons name="lock-closed-outline" size={20} color={theme.primary} />
          <Text style={[styles.itemText, { color: theme.primary }]}>Security</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
      </TouchableOpacity>

      {/* Notifications */}
      <TouchableOpacity style={styles.item}>
        <View style={styles.itemLeft}>
          <Ionicons name="notifications-outline" size={20} color={theme.primary} />
          <Text style={[styles.itemText, { color: theme.primary }]}>Notifications</Text>
        </View>
        <Ionicons name="chevron-forward" size={18} color={theme.textMuted} />
      </TouchableOpacity>

      {/* Logout */}
      <View style={{ marginTop: theme.SPACING.xl }}>
        <Button
          title="Logout"
          onPress={handleLogout}
          style={{ backgroundColor: theme.danger }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: '#E5E5EA',
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
  },
});

export default SettingsScreen;
