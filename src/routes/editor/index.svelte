<script lang="ts">
  import { onMount } from "svelte";
  import { loadUserNotes } from "../../domains/notes/noteDb";
  import EditorPage,{ type EditorPageProps } from "../../pages/editor/EditorPage.svelte";

  let props: EditorPageProps = {
    notes: [],
  };

  onMount(async () => {
    props.notes = await loadUserNotes();
  });
</script>

<EditorPage {props} />
