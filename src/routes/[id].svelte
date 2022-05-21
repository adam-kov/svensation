<script lang="ts">
  import { page } from '$app/stores';

  $: name = $page.params.id

</script>

<h2>{name}</h2>
<a href="/">Back</a>
<div class="wrapper" sn-transition={name + '-background'}>
  <img width="300" height="300"
  sn-transition={name}
  src="https://via.placeholder.com/300"
  alt="placeholder">
  <div>
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quam error corporis natus obcaecati tempora officia tenetur
    vel eius expedita numquam, ipsam pariatur quo veritatis quia
    quibusdam eum at. Mollitia, provident.
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quam error corporis natus obcaecati tempora officia tenetur
    vel eius expedita numquam, ipsam pariatur quo veritatis quia
    quibusdam eum at. Mollitia, provident.
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quam error corporis natus obcaecati tempora officia tenetur
    vel eius expedita numquam, ipsam pariatur quo veritatis quia
    quibusdam eum at. Mollitia, provident.
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Quam error corporis natus obcaecati tempora officia tenetur
    vel eius expedita numquam, ipsam pariatur quo veritatis quia
    quibusdam eum at. Mollitia, provident.
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
		background-color: #e9e9e9;
  }

  .wrapper div {
    height: auto;
    width: 100%;
    max-width: 500px;
    margin: 2rem auto 0 auto;
    overflow: hidden;
  }
</style>