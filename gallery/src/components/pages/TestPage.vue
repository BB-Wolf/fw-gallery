<template>
    <div class="viewport">
        <div class="pitch" ref="pitchEl">
            <div class="yaw" ref="yawEl">
                <div class="scene">
                    <!-- Cube -->
                    <div v-for="face in cubeFaces" :key="face.id" class="face" :style="face.style" />

                    <!-- Floor -->
                    <div v-for="face in floorFaces" :key="face.id" class="face" :style="face.style" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'

/* ---------------- CAMERA STATE ---------------- */

const camera = reactive({
    position: { x: 0, y: 0, z: 600 },
    rotation: { x: -20, y: 0 },
    velocity: { x: 0, z: 0 }
})

const keys = reactive({
    w: false,
    a: false,
    s: false,
    d: false
})

const accel = 0.9
const damping = 0.85

const yawEl = ref(null)
const pitchEl = ref(null)

/* ---------------- INPUT ---------------- */

let lastMouseX = 0
let lastMouseY = 0

function onMouseMove(e) {
    const dx = e.clientX - lastMouseX
    const dy = e.clientY - lastMouseY

    camera.rotation.y += dx * 0.3
    camera.rotation.x -= dy * 0.3

    camera.rotation.x = Math.max(-85, Math.min(85, camera.rotation.x))

    lastMouseX = e.clientX
    lastMouseY = e.clientY
}

function onKeyDown(e) {
    if (e.code === 'KeyW') keys.w = true
    if (e.code === 'KeyS') keys.s = true
    if (e.code === 'KeyA') keys.a = true
    if (e.code === 'KeyD') keys.d = true
}

function onKeyUp(e) {
    if (e.code === 'KeyW') keys.w = false
    if (e.code === 'KeyS') keys.s = false
    if (e.code === 'KeyA') keys.a = false
    if (e.code === 'KeyD') keys.d = false
}

/* ---------------- GAME LOOP ---------------- */

function update() {
    const yaw = camera.rotation.y * Math.PI / 180

    const forwardX = Math.sin(yaw)
    const forwardZ = Math.cos(yaw)
    const rightX = Math.cos(yaw)
    const rightZ = Math.sin(yaw)

    if (keys.w) {
        camera.velocity.x += forwardX * accel
        camera.velocity.z -= forwardZ * accel
    }
    if (keys.s) {
        camera.velocity.x -= forwardX * accel
        camera.velocity.z += forwardZ * accel
    }
    if (keys.a) {
        camera.velocity.x -= rightX * accel
        camera.velocity.z += rightZ * accel
    }
    if (keys.d) {
        camera.velocity.x += rightX * accel
        camera.velocity.z -= rightZ * accel
    }

    camera.velocity.x *= damping
    camera.velocity.z *= damping

    camera.position.x += camera.velocity.x
    camera.position.z += camera.velocity.z

    // Применяем вращение к pitch (вверх-вниз)
    pitchEl.value.style.transform = `rotateX(${camera.rotation.x}deg)`

    // Применяем вращение и позицию к yaw (влево-вправо) и перемещение
    yawEl.value.style.transform = `
        rotateY(${-camera.rotation.y}deg)
        translate3d(${-camera.position.x}px, ${-camera.position.y}px, ${-camera.position.z}px)
    `

    requestAnimationFrame(update)
}

/* ---------------- GEOMETRY ---------------- */

function createCube({ x, y, z, size, color }) {
    const s = size / 2
    return [
        face('front', size, size, x, y, z + s, 0, 0, 0, color),
        face('back', size, size, x, y, z - s, 0, 180, 0, color),
        face('right', size, size, x + s, y, z, 0, 90, 0, color),
        face('left', size, size, x - s, y, z, 0, -90, 0, color),
        face('top', size, size, x, y - s, z, 90, 0, 0, color),
        face('bottom', size, size, x, y + s, z, -90, 0, 0, color)
    ]
}

function createPlane({ x, y, z, width, depth, color }) {
    return [
        face('floor', width, depth, x, y, z, 90, 0, 0, color)
    ]
}

function face(id, w, h, x, y, z, rx, ry, rz, color) {
    return {
        id,
        style: {
            width: `${w}px`,
            height: `${h}px`,
            background: color,
            transform: `
        translate3d(${x}px, ${y}px, ${z}px)
        rotateX(${rx}deg)
        rotateY(${ry}deg)
        rotateZ(${rz}deg)
      `
        }
    }
}

/* ---------------- OBJECTS ---------------- */

const cubeFaces = createCube({
    x: 0,
    y: 0,
    z: 0,
    size: 120,
    color: '#4a90e2'
})

const floorFaces = createPlane({
    x: 0,
    y: 60,
    z: 0,
    width: 12000,
    depth: 6000,
    color: '#555'
})

/* ---------------- LIFECYCLE ---------------- */

onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    requestAnimationFrame(update)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('keydown', onKeyDown)
    window.removeEventListener('keyup', onKeyUp)
})
</script>

