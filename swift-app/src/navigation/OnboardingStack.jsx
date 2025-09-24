import React, { useRef, useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, Dimensions, Animated, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Button from '../components/Button';
import SignupScreen from '../screens/Auth/SignupScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import VerifyPhoneScreen from '../screens/Auth/VerifyPhoneScreen';
import CreatePasscodeScreen from '../screens/Auth/CreatePasscodeScreen';
import CreateTxnPinScreen from '../screens/Auth/CreateTxnPinScreen';

import { ThemeContext } from '../contexts/ThemeContext';
import walletImg from '../assets/images/wallet.png';
import shieldImg from '../assets/images/shield.png';
import shoppingImg from '../assets/images/shopping.png';
import sunIcon from '../assets/images/sun.png';
import moonIcon from '../assets/images/moon.png';


const Stack = createNativeStackNavigator();
const { width, height } = Dimensions.get('window');

const slides = [
  { key: '1', title: 'Welcome to Swift', subtitle: 'Your all-in-one financial companion', description: 'Wallet + Marketplace + Escrow protection', image: walletImg },
  { key: '2', title: 'Shop with Confidence', subtitle: 'Every transaction is protected', description: 'Our escrow system keeps your money safe until you receive your goods', image: shieldImg },
  { key: '3', title: 'Swift Marketplace', subtitle: 'Buy and sell with ease', description: 'Discover amazing products from verified sellers worldwide', image: shoppingImg },
];

function Onboarding({ navigation }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const logoScale = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const introOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(logoScale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 1, duration: 600, useNativeDriver: true }),
    ]).start();

    const timer = setTimeout(() => {
      Animated.timing(introOpacity, { toValue: 0, duration: 500, useNativeDriver: true }).start(() =>
        setShowIntro(false)
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!showIntro) {
      const autoScroll = setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }, 3500);

      return () => clearInterval(autoScroll);
    }
  }, [currentIndex, showIntro]);

  const renderSlide = ({ item }) => (
    <View style={[styles.slide, { backgroundColor: theme.background }]}>
      <View style={[styles.iconContainer, { backgroundColor: theme.lightGray }]}>
        <Image source={item.image} style={{ width: 120, height: 120, resizeMode: 'contain' }} />
      </View>
      <View style={styles.content}>
        <Text style={[styles.title, { color: theme.primary }]}>{item.title}</Text>
        <Text style={[styles.subtitle, { color: theme.primary }]}>{item.subtitle}</Text>
        <Text style={[styles.description, { color: theme.textMuted }]}>{item.description}</Text>
      </View>
    </View>
  );

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  if (showIntro) {
    return (
      <Animated.View style={[styles.introContainer, { opacity: introOpacity, backgroundColor: theme.secondary }]}>
        <Animated.View style={[styles.logoContainer, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}>
          <Text style={[styles.logoText, { color: theme.background }]}>Swift</Text>
          <Text style={[styles.logoSubtext, { color: theme.secondary }]}>Financial Freedom</Text>
        </Animated.View>
      </Animated.View>
    );
  }



  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
<TouchableOpacity
  onPress={toggleTheme}
  style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}
>
  <Image
    source={theme.mode === 'light' ? moonIcon : sunIcon}
    style={{ width: 28, height: 28, resizeMode: 'contain' }}
  />
</TouchableOpacity>


      <FlatList
        ref={flatListRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        extraData={currentIndex}
      />

      {/* Indicators */}
      <View style={styles.indicatorContainer}>
        {slides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const scale = scrollX.interpolate({ inputRange, outputRange: [0.8, 1.2, 0.8], extrapolate: 'clamp' });
          const opacity = scrollX.interpolate({ inputRange, outputRange: [0.4, 1, 0.4], extrapolate: 'clamp' });

          return (
            <Animated.View
              key={i.toString()}
              style={[
                styles.indicator,
                {
                  opacity,
                  transform: [{ scale }],
                  backgroundColor: i === currentIndex ? theme.primary : theme.textMuted,
                },
              ]}
            />
          );
        })}
      </View>

      {/* Auth Buttons */}
      <View style={styles.authButtonsContainer}>
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
          style={{ flex: 1, backgroundColor: theme.primary }}
        />
        <Button
          title="Sign Up"
          onPress={() => navigation.navigate('Signup')}
          style={{ flex: 1, backgroundColor: theme.primary }}
        />
      </View>
    </View>
  );
}

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
      <Stack.Screen name="CreatePasscode" component={CreatePasscodeScreen} />
      <Stack.Screen name="CreateTxnPin" component={CreateTxnPinScreen} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  introContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logoContainer: { alignItems: 'center' },
  logoText: { fontSize: 48, fontWeight: '800', letterSpacing: 2 },
  logoSubtext: { fontSize: 16, marginTop: 8, letterSpacing: 1 },
  container: { flex: 1 },
  slide: { width, flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24, paddingTop: height * 0.12, paddingBottom: 20 },
  iconContainer: { height: 140, width: 140, borderRadius: 70, justifyContent: 'center', alignItems: 'center', marginBottom: 40 },
  content: { alignItems: 'center', paddingHorizontal: 20, marginTop: 30 },
  title: { fontSize: 24, fontWeight: '700', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 18, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  description: { fontSize: 16, textAlign: 'center', lineHeight: 24 },
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 20 },
  indicator: { height: 8, width: 8, borderRadius: 4, marginHorizontal: 6 },
  authButtonsContainer: { flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 40, gap: 15 },
});
