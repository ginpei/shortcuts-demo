<script lang="ts">
  import { onMount } from "svelte";
  import { loadUserNotes } from "../../domains/notes/userNotesStore";
  import EditorPage from "../../pages/editor/EditorPage.svelte";

  onMount(async () => {
    loadUserNotes();
  });
</script>

<EditorPage />
