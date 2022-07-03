<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { saveUserNotes } from "../../domains/notes/noteDb";
  import EditorPage from "../../pages/editor/EditorPage.svelte";
  import { editorPageStateStore,initEditorPageStateStore } from "../../pages/editor/editorPageStateStore";

  let initialized = false;
  
  onMount(async () => {
    initEditorPageStateStore();
    initialized = true;
  });

  onDestroy(() => unsubscribe());

  const unsubscribe = editorPageStateStore.subscribe((values) => {
    if (!initialized) {
      return;
    }

    saveUserNotes(values.notes);
  });
</script>

<EditorPage />
