class ThreeScene {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        
        this.init();
        this.createScene();
        this.animate();
    }

    init() {
        // Set up renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        document.getElementById('scene-container').appendChild(this.renderer.domElement);

        // Position camera
        this.camera.position.z = 5;

        // Add controls
        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;
        this.controls.enableZoom = false;

        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }

    createScene() {
        // Add ambient light
        this.scene.add(new THREE.AmbientLight(0xffffff, 0.5));

        // Add point light
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        this.scene.add(pointLight);

        // Create 3D elements
        this.createParticles();
        this.createFloatingObjects();
    }

    createParticles() {
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 5000;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 20;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.01,
            color: '#4a90e2'
        });

        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        this.scene.add(particlesMesh);
    }

    createFloatingObjects() {
        // Create floating cubes
        for (let i = 0; i < 10; i++) {
            const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
            const material = new THREE.MeshStandardMaterial({
                color: `hsl(${Math.random() * 360}, 50%, 50%)`
            });
            const cube = new THREE.Mesh(geometry, material);
            cube.position.set(
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10,
                (Math.random() - 0.5) * 10
            );
            cube.rotationSpeed = Math.random() * 0.01;
            this.scene.add(cube);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.controls.update();
        this.render();
    }

    render() {
        this.scene.traverse((obj) => {
            if (obj.isMesh && obj.rotationSpeed) {
                obj.rotation.y += obj.rotationSpeed;
                obj.rotation.x += obj.rotationSpeed;
            }
        });
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

// Initialize the scene when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ThreeScene();
});
