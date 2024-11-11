<script>
	import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
	import { T, useLoader, useTask } from '@threlte/core';
	import { TextureLoader } from 'three';
	import { OrbitControls } from '@threlte/extras';

	let rotation = 0;
	useTask((delta) => {
		rotation += delta;
	});
	const gltf = useLoader(GLTFLoader).load('/oldpc/oldpc.gltf');
	const texture = useLoader(TextureLoader).load('/oldpc/Untitled.png');
</script>

{#if $gltf}
	<T.PerspectiveCamera makeDefault position={[0, 2, 5]} rotation={[0, 0, 0]}>
		<OrbitControls />
	</T.PerspectiveCamera>
	<T.DirectionalLight position={[3, 10, 7]} intensity={Math.PI} />
	<T
		is={$gltf.scene}
		rotation={[0, -2, 0]}
		position={[0, -1, 0]}
		receiveShadow
		rotation.y={rotation}
	>
		<T.MeshStandardMaterial map={$texture} />
	</T>
{/if}
