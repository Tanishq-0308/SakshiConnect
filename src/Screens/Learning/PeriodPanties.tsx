import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const PeriodPanties = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Period Panties Usage</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Learn how to use, clean, and store period panties effectively.
        </Text>

        {/* Step 1: How to Use */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Use</Text>
            <Text style={styles.stepDescription}>
              <Text style={{ fontWeight: '600' }}>Period panties</Text> look like normal underwear but have built-in absorbent and leak-proof layers.
            </Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={styles.listText}>Choose a size that fits snugly for leak protection.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={styles.listText}>Wear them directly — no extra pad or tampon is needed (unless your flow is very heavy).</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={styles.listText}>Depending on your flow, wear for 8–12 hours or change when feeling damp.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>4.</Text>
              <Text style={styles.listText}>Keep spare panties in a pouch for changing if needed.</Text>
            </View>
          </View>
        </View>

        {/* Step 2: How to Clean */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Clean</Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={styles.listText}>Rinse in cold water immediately after wearing until the water runs clear.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={styles.listText}>Hand wash or machine wash on gentle cycle using mild detergent.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={styles.listText}>Avoid bleach, hot water, or fabric softener — they damage the waterproof layer.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>4.</Text>
              <Text style={styles.listText}>Air dry in shade — avoid sunlight or dryers as heat weakens the elastic and waterproof fabric.</Text>
            </View>
          </View>
        </View>

        {/* Step 3: How to Store */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Store</Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Fold and store completely dry in a clean drawer or breathable bag.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Never store damp panties; moisture causes odor and bacterial growth.</Text>
            </View>
          </View>
        </View>

        {/* Step 4: General Hygiene Tips */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>General Hygiene Tips (for All Products)</Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Always wash your hands before and after handling menstrual products.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Replace reusable items every 2–5 years, depending on use and condition.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Inspect regularly for tears, discoloration, or odor — replace if noticed.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>If irritation or infection occurs, stop using and consult a gynecologist.</Text>
            </View>
          </View>
        </View>

        {/* Video Section */}
        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>Watch Video</Text>
          <View style={styles.videoBox}>
            <Image
              source={require('../../images/thum.png')}
              style={styles.videoImage}
            />
            <Ionicons
              name="play-circle"
              size={48}
              color="#fff"
              style={styles.videoPlayIcon}
            />
          </View>

          <TouchableOpacity style={styles.youtubeButton}>
            <Text style={styles.youtubeText}>Open on YouTube</Text>
          </TouchableOpacity>
          <Text style={styles.requireText}>Requires internet</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    marginTop: 20,
  },
  container: {
    padding: 20,
    paddingBottom: 120,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0F172A',
    marginLeft: 8,
  },
  description: {
    color: '#475569',
    fontSize: 13,
    marginBottom: 18,
    lineHeight: 20,
    textAlign: 'justify',
  },
  stepCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 18,
    marginVertical: 10,
    elevation: 3,
  },
  stepTextContainer: {
    width: '100%',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0284C7',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 15,
    color: '#0F172A',
    lineHeight: 24,
    textAlign: 'justify',
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 10,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 22,
    marginRight: 6,
  },
  listText: {
    flex: 1,
    fontSize: 15,
    lineHeight: 22,
    color: '#334155',
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    elevation: 2,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  videoBox: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoImage: {
    width: '100%',
    height: '100%',
  },
  videoPlayIcon: {
    position: 'absolute',
  },
  youtubeButton: {
    backgroundColor: '#0EA5E9',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginBottom: 6,
  },
  youtubeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  requireText: {
    fontSize: 12,
    color: '#94A3B8',
  },
});

export default PeriodPanties;
