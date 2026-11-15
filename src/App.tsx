import { useState, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroStage } from './components/HeroStage';
import { ProfileSections } from './components/ProfileSections';
import { ProfileModal, type ProfileModalTab } from './components/ProfileModal';
import { playGlitchSFX, type GlitchIntensity } from './utils/sound';

export default function App() {
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<ProfileModalTab>('about');

  const handleTone = useCallback(
    (intensity: GlitchIntensity = 'medium') => {
      playGlitchSFX(audioEnabled, intensity);
    },
    [audioEnabled]
  );

  const handleToggleAudio = useCallback(() => {
    setAudioEnabled((prev) => {
      const next = !prev;
      if (next) {
        playGlitchSFX(true, 'heavy');
      }
      return next;
    });
  }, []);

  const handleOpenProfile = useCallback(
    (tab: ProfileModalTab = 'about') => {
      setModalTab(tab);
      setModalOpen(true);
      playGlitchSFX(audioEnabled, 'heavy');
    },
    [audioEnabled]
  );

  const handleCloseProfile = useCallback(() => {
    setModalOpen(false);
    playGlitchSFX(audioEnabled, 'light');
  }, [audioEnabled]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onOpenProfile={handleOpenProfile} onTone={handleTone} />

      <main>
        <HeroStage
          audioEnabled={audioEnabled}
          onToggleAudio={handleToggleAudio}
          onTone={handleTone}
          onOpenProfile={handleOpenProfile}
        />

        <ProfileSections onTone={handleTone} />
      </main>

      <ProfileModal
        isOpen={modalOpen}
        activeTab={modalTab}
        onTabChange={setModalTab}
        onClose={handleCloseProfile}
        onTone={handleTone}
      />
    </div>
  );
}
