import * as React from 'react';
import { FlatList, View } from 'react-native';
import { Appbar, Button, List } from 'react-native-paper';
import { Audio } from 'expo-av';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { supabase } from '@/services/supabase';
import { useAuth } from '@/context/AuthContext';
import { decode } from 'base64-arraybuffer';

type SoundItem = {
  id: string;
  name: string;
  url: string;
};

const HomeScreen: React.FC = () => {
  const { user } = useAuth();
  const [recording, setRecording] = React.useState<Audio.Recording | null>(null);
  const [sounds, setSounds] = React.useState<SoundItem[]>([]);

  const loadSounds = React.useCallback(async () => {
    if (!user) return;
    const { data, error } = await supabase.from('sounds').select('id,name,url').eq('user_id', user.id).order('created_at', { ascending: false });
    if (!error && data) setSounds(data as unknown as SoundItem[]);
  }, [user]);

  React.useEffect(() => {
    loadSounds();
  }, [loadSounds]);

  const startRecording = async () => {
    await Audio.requestPermissionsAsync();
    await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });
    const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
    setRecording(recording);
  };

  const stopRecording = async () => {
    if (!recording || !user) return;
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    if (!uri) return;
    const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    const fileName = `rec_${Date.now()}.m4a`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('sounds')
      .upload(`${user.id}/${fileName}`, decodeBase64ToArrayBuffer(base64), { contentType: 'audio/m4a', upsert: true });
    if (storageError) return;
    const { data: urlData } = supabase.storage.from('sounds').getPublicUrl(storageData.path);
    await supabase.from('sounds').insert({ name: fileName, url: urlData.publicUrl, user_id: user.id });
    setRecording(null);
    loadSounds();
  };

  const pickAndUpload = async () => {
    if (!user) return;
    const res = await DocumentPicker.getDocumentAsync({ type: 'audio/*', multiple: false });
    if (res.canceled || res.assets.length === 0) return;
    const asset = res.assets[0];
    const base64 = await FileSystem.readAsStringAsync(asset.uri, { encoding: FileSystem.EncodingType.Base64 });
    const ext = (asset.name?.split('.').pop() || 'wav').toLowerCase();
    const fileName = `upload_${Date.now()}.${ext}`;
    const { data: storageData, error: storageError } = await supabase.storage
      .from('sounds')
      .upload(`${user.id}/${fileName}`, decodeBase64ToArrayBuffer(base64), { contentType: `audio/${ext}`, upsert: true });
    if (storageError) return;
    const { data: urlData } = supabase.storage.from('sounds').getPublicUrl(storageData.path);
    await supabase.from('sounds').insert({ name: asset.name || fileName, url: urlData.publicUrl, user_id: user.id });
    loadSounds();
  };

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Tus sonidos" />
        {recording ? (
          <Appbar.Action icon="stop" onPress={stopRecording} />
        ) : (
          <Appbar.Action icon="microphone" onPress={startRecording} />
        )}
        <Appbar.Action icon="upload" onPress={pickAndUpload} />
      </Appbar.Header>
      <FlatList
        data={sounds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.url}
            right={(props) => <Button {...props} onPress={() => {}} icon="play">Reproducir</Button>}
          />
        )}
      />
    </View>
  );
};

export default HomeScreen;

function decodeBase64ToArrayBuffer(b64: string) {
  return decode(b64);
}


