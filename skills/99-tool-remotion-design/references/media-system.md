# Media System

Use for images, audio, video, fonts, captions, voice, or external media.

## Asset ledger
Track asset, source, status (`final`/`placeholder`/`missing`), verified dimensions/duration, usage, and risk. Never blur placeholder/final status.

## Images/video
Verify real path, dimensions, orientation/transparency/crop; for video also codec/container readability, duration, frame rate where relevant, audio presence, trim range, playback rate, alpha. Do not assume every browser decodes every file. Follow current Remotion multimedia guidance.

## Audio
Define track start/end, gain, fades, overlap, priority, ducking, loop, source. Avoid clipping and arbitrary impacts. Do not invent copyrighted music assets; use verified user-provided or properly sourced material, or clearly disclose a placeholder requirement.

## Voiceover
Before generation/integration: approved/source-grounded script, language/pronunciation, authorized voice source, available method/provider, available credentials, compatible output. Do not impersonate a real person's voice without explicit authorization.

## Captions
When speech exists, plan captions unless excluded. Captions follow actual transcript, semantic phrase boundaries, safe areas, mobile readability, correct names/terms, and final audio timing. Do not guess timing when derivation is available.

## Fonts
Verify availability, loading method, weights, licensing where relevant, deterministic rendering. Avoid machine-only fonts unless environment guarantees them.

## Remote media
Prefer stable local copies when appropriate/permitted. If remote, verify URL, network failure handling, credential safety, and deterministic access.

## Preprocessing
Use official Remotion/Mediabunny/FFmpeg guidance; write converted media to new paths, never destructively overwrite source.

## Audio-reactive
Derive reactivity from real audio data. Do not fake a waveform as if it represented the track unless explicitly decorative.
