import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ReusablePads = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Reusable Pads Usage</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Learn the correct way to use, clean, and store reusable menstrual pads.
        </Text>

        {/* Step 1: How to Use */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Use</Text>

            <Text style={styles.stepDescription}>
              <Text style={{ fontWeight: '600' }}>Reusable pads</Text> are made of absorbent fabric layers that attach to your underwear with wings or snaps.{"\n\n"}
            </Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={styles.listText}>Place the soft, absorbent side facing up on your underwear.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={styles.listText}>Wrap the wings around the underside of the underwear and snap or Velcro them together.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={styles.listText}>Change every 4–6 hours, or sooner if the pad feels wet or heavy.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>4.</Text>
              <Text style={styles.listText}>Keep a wet bag if you’re outside — store used pads folded inside until you can wash them.</Text>
            </View>
          </View>
        </View>

        {/* Step 2: How to Clean */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Clean</Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={styles.listText}>Rinse immediately in cold water to prevent stains from setting.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={styles.listText}>Soak in cold water for 30 minutes if needed (add salt or baking soda for odor control).</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={styles.listText}>Hand wash or machine wash using mild, fragrance-free soap.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>4.</Text>
              <Text style={styles.listText}>Avoid hot water, bleach, or fabric softener — they damage fibers and reduce absorbency.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>5.</Text>
              <Text style={styles.listText}>Sun-dry completely — sunlight naturally disinfects and removes odor.</Text>
            </View>
          </View>
        </View>

        {/* Step 3: How to Store */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Store</Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Store completely dry pads in a clean cloth pouch or drawer.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Keep in a cool, dry place (avoid humid bathrooms).</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Wash and sun-dry once every few weeks even when unused to keep them fresh.</Text>
            </View>
          </View>
        </View>

        {/* Audio Section */}
        <View style={styles.audioCard}>
          <Text style={styles.audioTitle}>Listen (offline)</Text>
          <TouchableOpacity style={styles.playButton}>
            <Ionicons name="play" size={28} color="#fff" />
          </TouchableOpacity>
          <View style={styles.audioProgress}>
            <View style={styles.audioBar} />
          </View>
          <View style={styles.audioTime}>
            <Text style={styles.timeText}>1:05</Text>
            <Text style={styles.timeText}>4:20</Text>
          </View>
          <Text style={styles.offlineText}>Audio works offline</Text>
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
  audioCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginTop: 10,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  audioTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: '#06B6D4',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  audioProgress: {
    height: 4,
    width: '100%',
    backgroundColor: '#E2E8F0',
    borderRadius: 2,
    marginVertical: 10,
  },
  audioBar: {
    width: '30%',
    height: 4,
    backgroundColor: '#06B6D4',
    borderRadius: 2,
  },
  audioTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timeText: {
    fontSize: 12,
    color: '#475569',
  },
  offlineText: {
    fontSize: 12,
    color: '#94A3B8',
    marginTop: 6,
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

export default ReusablePads;
