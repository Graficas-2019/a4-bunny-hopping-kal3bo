function initControls(){
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement)

    $("#durationSlider").slider({min: 2, max: 10, value: duration, step: 0.1, animate: false})
    $("#durationSlider").on("slide", function(e, u) { duration = u.value ; $("#durationValue").html(duration + "s")})
    $("#durationSlider").on("slidechange", function(e, u) {duration = u.value; playAnimations()})
    
    $("#animateWavesCheckbox").click(
        function() {animateWaves = !animateWaves ; playAnimations()})
    $("#animateCrateCheckbox").click(
            function() { animateCrate = !animateCrate ; playAnimations()})
    $("#animateLightCheckbox").click(
            function() {animateLight = !animateLight ; playAnimations()})
    $("#loopCheckbox").click(
        function() {loopAnimation = !loopAnimation ; playAnimations()})
    $("#animateWaterCheckbox").click(
            function() {animateWater = !animateWater ; playAnimations()})    
}