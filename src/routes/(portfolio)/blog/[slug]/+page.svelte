<script lang="ts">
	import { page } from "$app/stores";
	import { LayoutStore } from "$lib/stores/LayoutStore.svelte";
	import { calculateReadingTime } from "$lib/utils/utils";
  import 'highlight.js/styles/github-dark.css';
	import { onMount } from "svelte";
	import { fade, scale } from "svelte/transition";

  const { data } = $page;
  const post = data.post;
  let isLiked = $state<boolean>(false);
  let viewCount = $state<number>(post.view_count);
  let likeCount = $state<number>(post.like_count);

  LayoutStore.backgroundImage = `https://directus.onursedef.dev/assets/${post.featured_image}/${post.slug}.png`;
  LayoutStore.title = post.title;

  const formattedDate = new Date(data.post.date_updated).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

  const timeToRead = calculateReadingTime(data.post.content);

  onMount(async () => {
    const req = await fetch(`/api/posts/${data.post.slug}/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        id: data.post.id
      })
    })

    if (req.ok) {
      viewCount += 1;
    }
  })

  const like = async () => {
    if (isLiked) return;
    const req = await fetch(`/api/posts/${data.post.slug}/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        id: data.post.id
      })
    })
    if (req.ok) {
      isLiked = true;
      likeCount += 1;
    }
  }
</script>


<svelte:head>
    <title>{post.seo.meta_title} | Onur Sedef</title>
    <meta name="description" content="{post.seo.meta_description}" />
    <meta name="keywords" content="{post.seo.meta_keywords}" />
    <meta name="canonical" content="https://onursedef.dev/blog/{post.slug}" />
    <meta property="og:title" content="Onur Sedef" />
    <meta property="og:description" content="Onur Sedef's personal website" />
    <meta property="og:image" content="/og_image.png" />
    <meta property="og:url" content="https://onursedef.dev" />
    <meta property="og:type" content="website" />
</svelte:head>
<div class="flex flex-col gap-2 w-full">
  <p class="text-sm text-neutral-400">{formattedDate} • {timeToRead} • {viewCount} views</p>
  <img src="https://directus.onursedef.dev/assets/{post.featured_image}/{post.slug}.png" alt="{post.title}" class="w-full aspect-auto object-cover rounded-lg" />
  <div class="flex justify-between items-center mt-2 h-fit">
    <div class="flex gap-2 items-center w-fit">
      <img src="https://directus.onursedef.dev/assets/{post.author.avatar}" alt="{post.author.name}" class="size-16 rounded-full object-cover" />
      <div class="flex flex-col justify-between h-max">
        <p class="text-base text-white">{post.author.first_name} {post.author.last_name}</p>
        <div class="flex flex-col gap-1">
          <p class="text-sm text-neutral-400">Software Developer</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center gap-2">
      <button class="p-3 {isLiked ? 'bg-neutral-700' : 'bg-neutral-800'} rounded-full hover:bg-neutral-700 transition-colors" disabled={isLiked} onclick={like}>
        {#if isLiked}
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="size-8" in:scale={{ duration: 200, delay: 200 }}>
          <g fill="none">
            <path fill="#f59f00" d="m24.262 22.448l-.154-9.39c-.1-.892-.588-2.089-2.259-2.089c-1.95.093-2.026 2.089-2.026 2.089l-2.97-5.306c-.743-1.13-1.961-1.208-2.723-.743c-.763.465-.929 1.408-.929 1.408l-.618-.805c-.466-.762-1.858-.85-2.568-.417c-1.179.719-1.35 2.209-.588 3.032c-.05-.054-.632-.256-1.609.34c-.762.465-.998 1.856-.572 2.645c.425.79.487.913.487.913s-.657-.31-1.694.387c-.741.498-1.007 1.976-.541 2.738l2.496 4.209l3.435 5.613c2.02 2.863 6.326 3.851 9.455 1.95c2.134-1.296 3.581-4.034 3.378-6.574" />
            <path fill="#d67d00" d="m13.293 8.564l-.091-.148c.003-.017.109-.591.518-1.06l.423.68l1.261 2.028a428 428 0 0 0 2.324 3.703a.5.5 0 1 1-.84.544a426 426 0 0 1-2.332-3.719zm-3.915 1.635a2 2 0 0 0-.226-.046a.8.8 0 0 1 .226.046" />
            <path fill="#d67d00" d="M9.41 10.208c.28.082.615.252.992.588c.029.025.096.1.203.251q.152.214.352.54c.266.43.575.97.89 1.534c.167.296.336.6.5.898c.454.818.879 1.585 1.14 1.987a.5.5 0 0 0 .839-.543c-.24-.372-.637-1.086-1.081-1.888l-.525-.943a46 46 0 0 0-.912-1.57a11 11 0 0 0-.388-.594a2.6 2.6 0 0 0-.353-.42c-.796-.707-1.53-.903-2.097-.908c.027.396.175.773.44 1.068m-1.72 3.901a3 3 0 0 0-.314-.052c.152.005.26.033.314.051m.04.009l.094.024c.326.087.626.225.828.405q.155.135.452.555c.192.271.403.6.622.953c.178.286.362.591.542.89c.255.421.501.828.703 1.14a.5.5 0 0 0 .84-.543a44 44 0 0 1-.671-1.089c-.18-.299-.37-.613-.564-.925a21 21 0 0 0-.654-1.002c-.202-.286-.411-.554-.605-.727c-.36-.32-.824-.514-1.235-.623a3.8 3.8 0 0 0-.914-.13q.035.086.078.167c.37.687.465.87.483.905" />
            <path fill="#ffc83d" d="M29.953 22.372v-9.485c-.1-.9-.75-2.11-2.437-2.11c-1.97.095-2.047 2.11-2.047 2.11l-3-5.36c-.75-1.14-1.98-1.22-2.75-.75S18.78 8.2 18.78 8.2l-.625-.813c-.47-.77-1.876-.86-2.593-.422c-1.191.727-1.364 2.232-.594 3.063c-.05-.055-.639-.258-1.625.344c-.77.47-1.008 1.875-.578 2.672c.43.796.492.921.492.921s-.664-.312-1.711.391c-.749.503-1.017 1.996-.547 2.766l2.521 4.25l3.47 5.67c2.04 2.892 6.39 3.89 9.55 1.97c2.155-1.309 3.617-4.075 3.412-6.64" />
            <path fill="#d67d00" d="m18.785 8.183l.012.021l1.263 2.03a426 426 0 0 0 2.333 3.717a.5.5 0 1 0 .84-.543a406 406 0 0 1-2.324-3.704c-.475-.761-.928-1.49-1.262-2.028l-.34-.548a2.5 2.5 0 0 0-.522 1.055M14.889 9.99a2 2 0 0 0-.397-.035c.184-.014.318.009.397.034m1.287.657A2.7 2.7 0 0 0 14.944 10a1.8 1.8 0 0 1-.435-1.046c.598-.006 1.496.203 2.331.945c.206.183.467.549.725.94c.272.414.583.922.894 1.44c.232.387.462.778.677 1.143c.37.627.695 1.18.909 1.51a.5.5 0 1 1-.84.543a57 57 0 0 1-.95-1.577c-.212-.361-.435-.74-.654-1.105a40 40 0 0 0-.871-1.403c-.274-.416-.465-.664-.554-.744m-2.802 3.34l-.131-.05a79 79 0 0 0-.477-.893a1.6 1.6 0 0 1-.102-.234c.333-.004.733.107 1.087.25a4.2 4.2 0 0 1 1.175.708c.202.18.415.472.615.777c.208.318.431.697.653 1.084c.135.235.269.472.399.702a30 30 0 0 0 .827 1.414a.5.5 0 1 1-.84.543c-.252-.39-.563-.942-.877-1.5l-.376-.662c-.22-.383-.432-.741-.623-1.033q-.302-.455-.442-.578a3.2 3.2 0 0 0-.888-.528m13.029.554c-.172-.297-.519-.916-.934-1.662a2.66 2.66 0 0 1 .44-1.268c.598 1.078 1.134 2.04 1.36 2.428a.5.5 0 0 1-.866.502" />
            <path fill="#46a4fb" d="m8.052 4.817l-1.22-1.651a.468.468 0 0 1 .23-.723l1.36-.423c.3-.093.6.155.58.475l-.14 2.074c-.04.424-.56.589-.81.248M5.692 6.44l-1.86-.78a.443.443 0 0 1-.15-.72l.97-1.03a.45.45 0 0 1 .73.11l.89 1.81c.17.37-.2.77-.58.61M2.52 9.359l2.071-.27c.425-.052.56-.602.207-.85l-1.73-1.163a.472.472 0 0 0-.714.28l-.342 1.432a.463.463 0 0 0 .508.571" />
          </g>
        </svg>
        {:else}
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="size-8" out:fade={{ duration: 200 }}>
          <path fill="currentColor" d="M8.052 4.817a.45.45 0 0 0 .81-.248L9 2.5a.457.457 0 0 0-.58-.475l-1.36.423a.468.468 0 0 0-.23.723zm-2.36 1.622l-1.86-.78a.443.443 0 0 1-.15-.72l.97-1.03a.45.45 0 0 1 .73.11l.89 1.81a.452.452 0 0 1-.58.61m24.122 4.137a3.3 3.3 0 0 1 1.139 2.311v9.445a8.4 8.4 0 0 1-3.892 7.533a7.9 7.9 0 0 1-4.121 1.121a8.7 8.7 0 0 1-2.86-.486a8 8 0 0 1-2.744.491a8.28 8.28 0 0 1-6.724-3.343l-3.471-5.667l-2.5-4.22a3.305 3.305 0 0 1 .844-4.079q.338-.23.715-.389a3.16 3.16 0 0 1 1.1-3.58q.33-.203.69-.343q-.048-.39.007-.779a3.15 3.15 0 0 1 1.5-2.25a3.21 3.21 0 0 1 3.546.277q.254-.269.569-.463a2.87 2.87 0 0 1 2.147-.329a3.5 3.5 0 0 1 1.323-.095a2.83 2.83 0 0 1 1.539.666q.258-.274.579-.473a3.005 3.005 0 0 1 4.108 1.053l2.072 3.7a2.97 2.97 0 0 1 2.091-.9a3.3 3.3 0 0 1 2.343.8m-11.848 3.77h-.006l-.037.025l.026-.016zM11.144 7.94a1.2 1.2 0 0 0-.608.113v-.004a1.13 1.13 0 0 0-.561.818a.85.85 0 0 0 .117.556l1.484 2.255a2.85 2.85 0 0 1 1.247-2.159c.048-.03.096-.051.143-.073q.048-.021.098-.047a1 1 0 0 1-.655-.372l-.619-.8a1 1 0 0 1-.061-.089a1.2 1.2 0 0 0-.585-.198m-2.288 3.25a2 2 0 0 0-.52.235l.003-.004a1.31 1.31 0 0 0-.208 1.318c.127.244.221.42.293.556l.007.012l1.405 2.112c.11-.581.378-1.121.774-1.56zm-.005 9.765l3.428 5.6l.003-.004a6.18 6.18 0 0 0 5.147 2.438a7.4 7.4 0 0 1-1.256-1.367l-3.506-5.723l-1.481-2.5a.99.99 0 0 1-1.3-.31L7.2 15.063a1.7 1.7 0 0 0-.6.278a1.44 1.44 0 0 0-.249 1.392zm12.77 7.933a6.3 6.3 0 0 0 4.397-.725l.003-.004a6.42 6.42 0 0 0 2.937-5.705V12.95a1.3 1.3 0 0 0-1.437-1.17a1.045 1.045 0 0 0-1.02.947c.388.697.71 1.271.869 1.546a1 1 0 0 1-1.73 1a149 149 0 0 1-.939-1.67l-.071-.127v-.06l-.015-.02q-.01-.01-.018-.023l-3-5.359a.937.937 0 0 0-1.71.038l1.024 1.644l.111.18a396 396 0 0 0 2.318 3.7a1 1 0 0 1-1.679 1.086a456 456 0 0 1-2.337-3.726l-.857-1.376l-.406-.653l-.013-.02l-.029-.048q-.006-.007-.014-.012l-.016-.016l-.625-.813a1 1 0 0 1-.06-.089a.74.74 0 0 0-.478-.193a1.26 1.26 0 0 0-.742.1a1.16 1.16 0 0 0-.571.833a.87.87 0 0 0 .1.537a4.3 4.3 0 0 1 1.267.78q.463.473.81 1.04c.279.421.594.937.906 1.457c.233.39.464.781.679 1.146l.081.137c.34.573.628 1.058.819 1.354a1 1 0 1 1-1.679 1.091c-.229-.354-.575-.942-.948-1.573l-.139-.236l-.001-.001c-.173-.293-.35-.593-.525-.884c-.308-.515-.606-1-.86-1.385a7 7 0 0 0-.427-.604h-.001l-.037-.042a2.3 2.3 0 0 0-.754-.456a1 1 0 0 1-.217-.056c-.258.03-.505.125-.718.274a1.34 1.34 0 0 0-.219 1.344l.317.59c.421.179.813.421 1.162.718q.405.396.7.878c.216.33.446.72.669 1.108c.134.233.266.467.393.693l.007.012l.04.072c.293.518.555.981.769 1.312a1 1 0 1 1-1.679 1.086a31 31 0 0 1-.893-1.524l-.375-.66a20 20 0 0 0-.607-1.009a7 7 0 0 0-.239-.34a1.4 1.4 0 0 0-.117-.138a2.7 2.7 0 0 0-.742-.437a1 1 0 0 1-.214-.06a1.8 1.8 0 0 0-.737.311a1.47 1.47 0 0 0-.25 1.416l2.524 4.267l3.463 5.658a6.3 6.3 0 0 0 3.78 2.362M3.069 7.076L4.8 8.238a.469.469 0 0 1-.209.851l-2.071.27a.464.464 0 0 1-.508-.571l.342-1.432a.473.473 0 0 1 .715-.28" />
        </svg>
        {/if}
      </button>
      <p class="text-sm text-neutral-400">{likeCount} likes</p>
    </div>
  </div>
  <article class="prose prose-invert max-w-3xl w-max prose-pre:h-fit prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent prose-pre:font-jetbrains prose-code:h-fit prose-code:m-0 prose-code:p-0 font-nunito">
    {@html post.content}
  </article>
</div>