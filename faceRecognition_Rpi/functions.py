from gtts import gTTS

def createSoundFile(sentence, filename):
    sound_path = './sounds/{}.mp3'.format(filename)
    tts = gTTS(text=sentence, lang="en", tld="com")
    tts.save(sound_path)
