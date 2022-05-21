<script>
  import { afterNavigate, beforeNavigate } from "$app/navigation";
  import { TransitionEngine } from "./";

  export let transitionAttributeName = 'sn-transition'
  export let transitionDuration = 500
  export let fadeDuration = 200
  export let loadTimeout = 3000

  $: TransitionEngine['transitionAttributeName'] = transitionAttributeName
  $: TransitionEngine['transitionDuration'] = transitionDuration
  $: TransitionEngine['fadeDuration'] = fadeDuration
  $: TransitionEngine['loadTimeout'] = loadTimeout

  beforeNavigate(TransitionEngine.beforeNavigate)
  afterNavigate(TransitionEngine.afterNavigate)
</script>