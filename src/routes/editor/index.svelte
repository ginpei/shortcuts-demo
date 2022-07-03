<script lang="ts">
  import { onMount } from "svelte";
  import { initEditorPageStateStore } from "../../pages/editor/editorPageStateStore";
  import EditorPage from "../../pages/editor/EditorPage.svelte";

  onMount(async () => {
    initEditorPageStateStore();
  });
</script>

<EditorPage />
