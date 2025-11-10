import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenstrualCup = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={22} color="#0F172A" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Menstrual Cup Usage</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Learn the correct way to use a menstrual cup with these simple steps.
        </Text>

        {/* How to Use */}
        {/* How to Use */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Use</Text>

            <Text style={styles.stepDescription}>
              <Text style={{ fontWeight: '600' }}>Menstrual Cup</Text>{"\n\n"}
              A menstrual cup is a small, bell-shaped cup made of medical-grade silicone or rubber that collects menstrual fluid rather than absorbing it.
            </Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>1.</Text>
              <Text style={styles.listText}>Wash your hands thoroughly with soap and water.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>2.</Text>
              <Text style={styles.listText}>Fold the cup — use the “C-fold” (press sides together to make a C shape) or “punch-down fold.”</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>3.</Text>
              <Text style={styles.listText}>Relax and insert the folded cup into the vagina — it should sit low in the vaginal canal, not as deep as a tampon.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>4.</Text>
              <Text style={styles.listText}>Once inside, let it open fully to form a seal against the vaginal walls (you can gently rotate it to ensure it’s open).</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>5.</Text>
              <Text style={styles.listText}>You can wear it for 6–12 hours, depending on your flow.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>6.</Text>
              <Text style={styles.listText}>To remove, pinch the base of the cup to release the suction, then gently pull it out.</Text>
            </View>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>7.</Text>
              <Text style={styles.listText}>Empty the contents into the toilet, rinse, and reinsert.</Text>
            </View>
          </View>
        </View>


        {/* How to Clean */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Clean</Text>

            {/* During menstruation */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>• During menstruation:</Text>

              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Rinse the cup with cold or lukewarm water every time you empty it.
                </Text>
              </View>

              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  If water isn’t available, wipe with clean tissue and reinsert — but wash properly later.
                </Text>
              </View>
            </View>

            {/* After your period */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>• After your period:</Text>

              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Boil the cup in water for 5–10 minutes to sterilize it.
                </Text>
              </View>

              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Use a dedicated pot (not one used for cooking).
                </Text>
              </View>

              <View style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listText}>
                  Let it cool and dry completely before storing.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* How to Store */}
        <View style={styles.stepCard}>
          <View style={styles.stepTextContainer}>
            <Text style={styles.stepTitle}>How to Store</Text>

            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Keep it in a cotton or breathable pouch (not plastic or airtight).</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Store in a cool, dry place away from sunlight.</Text>
            </View>
            <View style={styles.bulletRow}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>Avoid storing it while it’s damp — moisture encourages bacteria growth.</Text>
            </View>
          </View>
          <Image source={require('../../images/MenstrualCup.png')} style={styles.stepImage} />
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

          <TouchableOpacity
            style={styles.youtubeButton}
            onPress={() => Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
          >
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
    fontSize: 12,
    marginBottom: 18,
    lineHeight: 20,
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
  section: {
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0F172A',
    marginBottom: 4,
  },
  bulletRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 4,
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
  stepImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginTop: 8,
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

export default MenstrualCup;
