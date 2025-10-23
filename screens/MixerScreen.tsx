import * as React from 'react';
import { View, FlatList } from 'react-native';
import { Appbar, Button, TextInput, List, Snackbar } from 'react-native-paper';
import { Audio, AVPlaybackStatusSuccess } from 'expo-av';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/context/AuthContext';

type Track = { id: string; name: string; url: string };

const MixerScreen: React.FC = () => {
  const { user } = useAuth();
  const [name, setName] = React.useState('Mi mezcla');
  const [tracks, setTracks] = React.useState<Track[]>([]);
  const [playingSound, setPlayingSound] = React.useState<Audio.Sound | null>(null);
  const [notice, setNotice] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetch = async () => {
      if (!user) return;
      const { data } = await supabase.from('sounds').select('id,name,url').eq('user_id', user.id).order('created_at', { ascending: false });
      setTracks((data as unknown as Track[]) || []);
    };
    fetch();
  }, [user]);

  const play = async (url: string) => {
    if (playingSound) {
      await playingSound.stopAsync();
      await playingSound.unloadAsync();
      setPlayingSound(null);
    }
    const { sound } = await Audio.Sound.createAsync({ uri: url });
    setPlayingSound(sound);
    await sound.playAsync();
  };

  const saveMix = async () => {
    if (!user) return;
    const ids = tracks.slice(0, 3).map((t) => t.id); // MVP: guardar selección simple
    const { error } = await supabase.from('mixes').insert({ name, sounds: ids, user_id: user.id });
    if (!error) setNotice('Mezcla guardada');
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Mixer" />
        <Appbar.Action icon="content-save" onPress={saveMix} />
      </Appbar.Header>
      <View style={{ padding: 12 }}>
        <TextInput label="Nombre de la mezcla" value={name} onChangeText={setName} />
      </View>
      <FlatList
        data={tracks}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <List.Item title={item.name} description={item.url} right={() => <Button onPress={() => play(item.url)}>Play</Button>} />
        )}
      />
      <Snackbar visible={!!notice} onDismiss={() => setNotice(null)}>{notice}</Snackbar>
    </View>
  );
};

export default MixerScreen;


