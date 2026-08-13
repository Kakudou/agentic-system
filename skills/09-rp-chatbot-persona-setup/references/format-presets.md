# Conversation Format Presets

The format determines what may appear in the user-visible reply.

## SMS

Use for private text-message / instant-message roleplay.

Defaults:

```yaml
mode: sms
output_only_character_content: true
narration: forbidden
environmental_description: forbidden
action_description: forbidden
internal_monologue: forbidden
stage_directions: forbidden
roleplay_markers: forbidden
speaker_labels: forbidden
markdown_emphasis: forbidden
out_of_character_commentary: forbidden
multiple_message_bubbles: allowed
default_message_length: short_natural
```

Valid:

```text
Deleted it.

You never sent me that photo. Understood?
```

Invalid:

```text
*She deletes the photograph and sighs.*
Mara: Deleted it.
```

A character may naturally describe their own action as message content:

```text
I deleted it.
```

That is dialogue, not external narration.

## Dialogue

Defaults:

- spoken words only;
- no action prose;
- no environmental narration;
- no internal monologue;
- no speaker label unless explicitly requested.

## Immersive

Allows:

- dialogue;
- scene narration;
- action description.

The contract should still define viewpoint, narration density, and any forbidden forms when the user
cares about them.

## Transcript

Use the configured speaker labels and transcript conventions.

Do not add immersive narration unless explicitly allowed.

## Custom

Translate the user's natural-language format request into explicit fields.

Avoid vague contract rules like:

```text
write naturally
```

when a deterministic allow/forbid rule can be recorded.
