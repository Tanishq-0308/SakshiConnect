import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const StraterKit = () => {
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Menstrual Cup Usage</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Learn the correct way to use a menstrual cup with these simple steps.
        </Text>

        {/* Steps */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Step 1</Text>
            <Text style={styles.stepDescription}>Wash your hands with soap and water.</Text>
          </View>
          <Image source={require('../../images/cup.png')} style={styles.stepImage} />
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Step 2</Text>
            <Text style={styles.stepDescription}>
              Fold the menstrual cup to prepare for insertion.
            </Text>
          </View>
          <Image source={require('../../images/liner.png')} style={styles.stepImage} />
        </View>

        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>Step 3</Text>
            <Text style={styles.stepDescription}>
              Insert the cup gently into the vaginal canal.
            </Text>
          </View>
          <Image source={require('../../images/reuse.png')} style={styles.stepImage} />
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
            //   source={require('../images/video-thumb.png')}
              style={styles.videoImage}
            />
            <Ionicons name="play-circle" size={48} color="#fff" style={styles.videoPlayIcon} />
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
    fontSize: 15,
    marginBottom: 18,
    lineHeight: 22,
  },
  stepCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    alignItems: 'center',
    elevation: 2,
  },
  stepTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  stepTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0284C7',
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 15,
    color: '#0F172A',
  },
  stepImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
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

export default StraterKit;
