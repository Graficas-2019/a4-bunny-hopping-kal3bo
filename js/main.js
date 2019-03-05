var renderer = null,
    scene = null,
    camera = null,
    root = null,
    group = null,
    littleBunny = null,
    directionalLight = null,
    duration = 10,
    crateAnimator = null,
    lightAnimator = null,
    loopAnimation = true,
    objLoader = null,
    animateCrate = true,
    nowTime = Date.now(),
    times = [17]

// Loading obj into the scene
function bunnyLoader() {
    if (!objLoader)
        objLoader = new THREE.OBJLoader()
    // Bunny: 
    objLoader.load('Stanford_Bunny_OBJ-JPG/20180310_KickAir8P_UVUnwrapped_Stanford_Bunny.obj',
        function (object) {
            var texture = new THREE.TextureLoader().load('Stanford_Bunny_OBJ-JPG/bunnystanford_res1_UVmapping3072_g005c.jpg')
            var normalMap = new THREE.TextureLoader().load('Stanford_Bunny_OBJ-JPG/bunnystanford_res1_UVmapping3072_TerraCotta_g001c.jpg')
            object.traverse(function (child) {
                if (child instanceof THREE.Mesh) {
                    child.material.map = texture
                    child.castShadow = true
                    child.material.normalMap = normalMap
                    child.receiveShadow = true
                }
            })

            littleBunny = object
            littleBunny.scale.set(10, 10, 10)
            littleBunny.position.z = 0
            littleBunny.position.x = 0
            littleBunny.rotation.x = 0
            littleBunny.rotation.y = Math.PI / 2
            group.add(littleBunny)
        },

        function (x) {console.log((x.loaded / x.total * 100) + '% loaded')},
        function (error) {console.log('An error happened')})
}

// Same methods as seen in class: 
function run() {
    requestAnimationFrame(function () { run()})
    renderer.render(scene, camera)
    KF.update()
    orbitControls.update()
}

function createScene(canvas) {
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height)
    // Create a new Three.js scene
    scene = new THREE.Scene()
    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera(45, canvas.width / canvas.height, 1, 4000)
    camera.position.set(20, 10, 0)
    scene.add(camera)


    // Homework: 
    root = new THREE.Object3D
    // Light:
    directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(0, 1, 2)
    root.add(directionalLight)
    ambientLight = new THREE.AmbientLight(0x888888)
    root.add(ambientLight)
    
    group = new THREE.Object3D
    root.add(group)
    // Background:
    var floor = new THREE.TextureLoader().load("images/background.jpg")
    var color = 0xffffff
    geometry = new THREE.PlaneGeometry(200, 200, 50, 50)
    var ground = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({ color: color, map: floor, side: THREE.DoubleSide }))
    ground.rotation.x = -Math.PI / 2
    scene.add(ground);                      // Adding the mesh
    // Loop:
    floor.wrapS = floor.wrapT = THREE.RepeatWrapping
    floor.repeat.set(5, 5)
    
    // Updating:
    bunnyLoader()
    scene.add(root)
}

// Loop time:
function lock() {
    var temp = 1 / 16
    for (i = 0; i < 17; i++) {
        if (i == 0) 
            times[i] = 0
        else if (i == 16)
            times[i] = 1
        else{ 
            times[i] = temp
            temp += 1 / 16
        }
    }
}

// Animations: 
function playAnimations() {
    lock()
    if (crateAnimator)
        crateAnimator.stop()

    group.position.set(0, 0, 0)
    group.rotation.set(0, 0, 0)

    // Movement
    if (animateCrate) {
        crateAnimator = new KF.KeyFrameAnimator
        crateAnimator.init({
            interps:
                [
                    {
                        keys: times,
                        values: [
                            { x: 0, y: 0, z: 0 },
                            { x: 3, y: 3, z: 4.5 },
                            { x: 6, y: 0, z: 6 },
                            { x: 9, y: 3, z: 4.5 },
                            { x: 12, y: 0, z: 0 },
                            { x: 9, y: 3, z: -4.5 },
                            { x: 6, y: 0, z: -6 },
                            { x: 3, y: 3, z: -4.5 },
                            { x: 0, y: 0, z: 0 },
                            { x: -3, y: 3, z: 4.5 },
                            { x: -6, y: 0, z: 6 },
                            { x: -9, y: 3, z: 4.5 },
                            { x: -12, y: 0, z: 0 },
                            { x: -9, y: 3, z: -4.5 },
                            { x: -6, y: 0, z: -6 },
                            { x: -3, y: 3, z: -4.5 },
                            { x: 0, y: 0, z: 0 },

                        ],
                        target: group.position
                    },
                    {
                        keys: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1],
                        values: [
                            { y: 0 },
                            { y: Math.PI / 2 },
                            { y: 2 * Math.PI / 2 },
                            { y: 3 * Math.PI / 2 },
                            { y: 4 * Math.PI / 2 },
                            { y: 3 * Math.PI / 2 },
                            { y: 2 * Math.PI / 2 },
                            { y: 1 * Math.PI / 2 },
                            { y: 0 * Math.PI / 2 },
                        ],
                        target: group.rotation
                    }
                ],

            loop: loopAnimation,
            duration: duration * 1000,
            easing: TWEEN.Easing.Linear.None,
        })
        crateAnimator.start()
    }
}