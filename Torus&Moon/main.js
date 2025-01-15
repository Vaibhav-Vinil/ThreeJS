// Import necessary files and modules
import './style.css'; // Custom styles for the canvas
import * as THREE from 'three'; // Three.js library for 3D rendering

// Setup the scene, camera, and renderer
const scene = new THREE.Scene(); // The main container for all 3D objects

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); 
// Perspective camera with field of view 75, aspect ratio, and clipping planes

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'), // Link the renderer to the HTML canvas element
});

renderer.setPixelRatio(window.devicePixelRatio); // Ensure rendering matches the screen's pixel ratio
renderer.setSize(window.innerWidth, window.innerHeight); // Match the canvas size to the window size
camera.position.setZ(30); // Position the camera along the Z-axis (distance from objects)
camera.position.setX(-3); // Slightly offset the camera along the X-axis

// Load textures for materials
const textureLoader = new THREE.TextureLoader(); // Loader for external textures
const moonTexture = textureLoader.load('moon.jpg'); // Texture for the moon's surface
const moonNormalTexture = textureLoader.load('normal.jpg'); // Normal map for moon's surface bumps
const jeffTexture = textureLoader.load('jeff.png'); // Texture for the avatar box
const torusTexture = textureLoader.load('threed.png'); // Texture for the torus object

// Create materials for objects
const torusMaterial = new THREE.MeshStandardMaterial({
  map: torusTexture, // Apply torus texture
  normalMap: moonNormalTexture, // Add surface details using the normal map
  emissive: new THREE.Color(0x444444), // Emissive color for subtle glow
  emissiveIntensity: 0.8, // Intensity of the emissive color
  roughness: 0.7, // Makes the surface less shiny
  metalness: 0.1, // Low metallic property for the material
  side: THREE.DoubleSide, // Ensures texture is visible on both sides of the surface
});

const moonMaterial = new THREE.MeshStandardMaterial({
  map: moonTexture, // Apply moon surface texture
  normalMap: moonNormalTexture, // Add surface details using the normal map
  emissive: new THREE.Color(0x444444), // Emissive color for subtle glow
  emissiveIntensity: 0.8, // Intensity of the emissive color
  roughness: 0.7, // Makes the surface less shiny
  metalness: 0.1, // Low metallic property for the material
  side: THREE.DoubleSide, // Ensures texture is visible on both sides of the surface
});

// Create and add a torus to the scene
const torusGeometry = new THREE.TorusGeometry(10, 3, 16, 100); // Torus shape with radius, tube diameter, and segments
const torus = new THREE.Mesh(torusGeometry, torusMaterial); // Combine torus geometry and material
scene.add(torus); // Add the torus to the scene

// Add lights to illuminate the scene
const ambientLight = new THREE.AmbientLight(0xffffff, 1); // General soft lighting
scene.add(ambientLight); // Add ambient light to the scene

const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Simulates sunlight with a specific direction

directionalLight.position.set(10, 10, 10); // Position the directional light
scene.add(directionalLight); // Add directional light to the scene

// Create and add a moon to the scene
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32), // Sphere shape with radius and detail segments
  moonMaterial // Material with texture and normal map
);
scene.add(moon); // Add moon to the scene
moon.position.z = 30; // Position the moon along the Z-axis
moon.position.setX(-10); // Offset the moon along the X-axis

// Create and add an avatar (box) to the scene
const jeff = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3), // Cube shape with specified dimensions
  new THREE.MeshBasicMaterial({ map: jeffTexture }) // Basic material with avatar texture
);
scene.add(jeff); // Add avatar to the scene
jeff.position.z = -5; // Position the avatar closer to the camera
jeff.position.x = 2; // Offset the avatar slightly to the right

// Set the background of the scene
const spaceTexture = new THREE.TextureLoader().load('space.jpg'); // Load a space-themed background texture
scene.background = spaceTexture; // Set the background texture for the scene

// Scroll animation to adjust camera and rotate avatar
function moveCamera() {
  const t = document.body.getBoundingClientRect().top; // Get scroll position

  camera.position.z = t * -0.01; // Move the camera along Z-axis based on scroll
  camera.position.x = t * -0.0002; // Adjust X position slightly based on scroll
  camera.rotation.y = t * -0.0002; // Rotate the camera slightly based on scroll

  jeff.rotation.y += 0.01; // Rotate the avatar around the Y-axis
  jeff.rotation.z += 0.01; // Rotate the avatar around the Z-axis
}

document.body.onscroll = moveCamera; // Call moveCamera() when the user scrolls
moveCamera(); // Initial camera adjustment

// Animation loop for rendering dynamic updates
function animate() {
  requestAnimationFrame(animate); // Continuously call the animate function

  torus.rotation.x += 0.01; // Rotate the torus around the X-axis
  torus.rotation.z += 0.01; // Rotate the torus around the Z-axis

  moon.rotation.x += 0.005; // Rotate the moon slowly around the X-axis

  renderer.render(scene, camera); // Render the scene from the perspective of the camera
}

animate(); // Start the animation loop

// Custom cursor
// Use an inline SVG as the cursor, showing a small red circle

document.body.style.cursor = 'url(\'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10"><circle cx="5" cy="5" r="4" fill="red"/></svg>\'), auto';
