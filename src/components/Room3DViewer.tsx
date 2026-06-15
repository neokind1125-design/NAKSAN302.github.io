import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Room3DViewerProps {
  angle: number;
  onChangeAngle?: (newAngle: number) => void;
  isInteractive?: boolean; // Can drag to rotate camera
}

export const Room3DViewer: React.FC<Room3DViewerProps> = ({
  angle,
  onChangeAngle,
  isInteractive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  // For dragging interaction
  const isDragging = useRef(false);
  const prevMouseX = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  // We convert the angle to radians for smooth rendering updates
  const targetAngleRef = useRef(angle);

  useEffect(() => {
    targetAngleRef.current = angle;
  }, [angle]);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 300;
    const height = containerRef.current.clientHeight || 200;

    // 1. Create Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Ambiance: dark dusty brown-charcoal fog
    scene.background = new THREE.Color('#0b0907');
    scene.fog = new THREE.FogExp2('#0b0907', 0.12);

    // 2. Create Camera
    const camera = new THREE.PerspectiveCamera(48, width / height, 0.1, 100);
    cameraRef.current = camera;

    // 3. Create WebGLRenderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // 4. Procedural Textures to avoid missing resources!
    
    // Floor texture: procedural cozy dark timber planks
    const floorCanvas = document.createElement('canvas');
    floorCanvas.width = 512;
    floorCanvas.height = 512;
    const fctx = floorCanvas.getContext('2d');
    if (fctx) {
      fctx.fillStyle = '#17110c'; // Very deep warm timber base
      fctx.fillRect(0, 0, 512, 512);
      
      // Plank grains
      fctx.strokeStyle = '#0a0805';
      fctx.lineWidth = 4;
      for (let i = 0; i < 512; i += 64) {
        fctx.beginPath();
        fctx.moveTo(0, i);
        fctx.lineTo(512, i);
        fctx.stroke();

        // Grain noise inside plank
        fctx.strokeStyle = '#1b140f';
        fctx.lineWidth = 1;
        for (let j = 0; j < 3; j++) {
          fctx.beginPath();
          fctx.moveTo(0, i + 15 + j * 10);
          fctx.quadraticCurveTo(256, i + 10 + j * 12, 512, i + 20 + j * 8);
          fctx.stroke();
        }
        fctx.strokeStyle = '#0a0805';
        fctx.lineWidth = 4;
      }

      // Ends of boards
      fctx.lineWidth = 2;
      for (let i = 0; i < 512; i += 64) {
        const offset = (i / 64) % 2 === 0 ? 0 : 128;
        for (let j = offset; j < 512; j += 256) {
          fctx.beginPath();
          fctx.moveTo(j, i);
          fctx.lineTo(j, i + 64);
          fctx.stroke();
        }
      }
    }
    const floorTexture = new THREE.CanvasTexture(floorCanvas);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(2, 2);

    // Blackboard texture: Procedural glowing chalk drawings & diagrams
    const boardCanvas = document.createElement('canvas');
    boardCanvas.width = 512;
    boardCanvas.height = 256;
    const bctx = boardCanvas.getContext('2d');
    if (bctx) {
      bctx.fillStyle = '#101d14'; // chalkboard deep green
      bctx.fillRect(0, 0, 512, 256);

      // Grid helper on chalkboard
      bctx.strokeStyle = 'rgba(238, 218, 183, 0.04)';
      bctx.lineWidth = 1;
      for (let i = 0; i < 512; i += 32) {
        bctx.beginPath(); bctx.moveTo(i, 0); bctx.lineTo(i, 256); bctx.stroke();
      }
      for (let i = 0; i < 256; i += 32) {
        bctx.beginPath(); bctx.moveTo(0, i); bctx.lineTo(512, i); bctx.stroke();
      }

      // Draw white/amber chalk diagrams
      bctx.strokeStyle = '#dfc491';
      bctx.fillStyle = '#dfc491';
      bctx.lineWidth = 2;
      bctx.font = '10px "Special Elite", monospace';

      // Compass dial logic sketch
      bctx.beginPath();
      bctx.arc(80, 110, 50, 0, Math.PI * 2);
      bctx.stroke();
      
      bctx.lineWidth = 1;
      bctx.beginPath();
      bctx.arc(80, 110, 30, 0, Math.PI * 2);
      bctx.stroke();

      bctx.beginPath(); bctx.moveTo(80, 50); bctx.lineTo(80, 170); bctx.stroke();
      bctx.beginPath(); bctx.moveTo(20, 110); bctx.lineTo(140, 110); bctx.stroke();

      // Highlight red wedge angular displacement vector
      bctx.strokeStyle = '#c44541';
      bctx.lineWidth = 3;
      bctx.beginPath();
      bctx.arc(80, 110, 40, -Math.PI/2, -Math.PI/2 + (14 * Math.PI / 180));
      bctx.stroke();

      bctx.font = 'bold 12px "Special Elite", monospace';
      bctx.fillStyle = '#dfc491';
      bctx.fillText('ANGLE_CAL : 14°', 150, 65);
      
      bctx.font = '9px monospace';
      bctx.fillStyle = 'rgba(238, 220, 190, 0.7)';
      bctx.fillText('L-LATITUDE RECTIFIED MATCH', 150, 100);
      bctx.fillText('TILE INDEX (3, 4) FOUND', 150, 120);
      bctx.fillText('EASTING_COORDS : 85°', 150, 140);
      
      bctx.font = 'bold 13px "Special Elite", monospace';
      bctx.fillStyle = '#dc3e3a';
      bctx.fillText('KEY: 4 0 2 (DOORLOCK)', 150, 185);

      bctx.strokeStyle = 'rgba(238,218,183,0.25)';
      bctx.strokeRect(144, 45, 340, 160);
    }
    const boardTexture = new THREE.CanvasTexture(boardCanvas);

    // Paper note texture (for desk files)
    const noteCanvas = document.createElement('canvas');
    noteCanvas.width = 128;
    noteCanvas.height = 128;
    const nctx = noteCanvas.getContext('2d');
    if (nctx) {
      nctx.fillStyle = '#eedcb3';
      nctx.fillRect(0, 0, 128, 128);
      nctx.strokeStyle = 'rgba(0,0,0,0.15)';
      nctx.lineWidth = 1;
      for (let i = 16; i < 128; i += 16) {
        nctx.beginPath(); nctx.moveTo(8, i); nctx.lineTo(120, i); nctx.stroke();
      }
      nctx.fillStyle = '#8d2522';
      nctx.font = '9px monospace';
      nctx.fillText('CONFIDENTIAL', 20, 15);
      
      // Draw signature
      nctx.strokeStyle = '#1a110a';
      nctx.beginPath();
      nctx.moveTo(35, 105);
      nctx.quadraticCurveTo(50, 95, 75, 108);
      nctx.quadraticCurveTo(90, 90, 110, 105);
      nctx.stroke();
    }
    const noteTexture = new THREE.CanvasTexture(noteCanvas);

    // ================= 5. Geometries & Meshes Construction =================

    // Room Shell Walls
    const roomMaterial = new THREE.MeshStandardMaterial({
      color: '#1d1712', // dusty brown concrete walls
      roughness: 0.9,
      metalness: 0.1,
    });

    // Floor Mesh
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.MeshStandardMaterial({
      map: floorTexture,
      roughness: 0.7,
      metalness: 0.25,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = 0;
    scene.add(floorMesh);

    // Back wall
    const wallBackGeo = new THREE.PlaneGeometry(12, 6);
    const wallBack = new THREE.Mesh(wallBackGeo, roomMaterial);
    wallBack.position.set(0, 3, -6);
    scene.add(wallBack);

    // Left wall
    const wallLeftGeo = new THREE.PlaneGeometry(12, 6);
    const wallLeft = new THREE.Mesh(wallLeftGeo, roomMaterial);
    wallLeft.rotation.y = Math.PI / 2;
    wallLeft.position.set(-6, 3, 0);
    scene.add(wallLeft);

    // Right wall
    const wallRightGeo = new THREE.PlaneGeometry(12, 6);
    const wallRight = new THREE.Mesh(wallRightGeo, roomMaterial);
    wallRight.rotation.y = -Math.PI / 2;
    wallRight.position.set(6, 3, 0);
    scene.add(wallRight);

    // CEILING CHALK-BOARD / BLACKBOARD on back wall
    const blackboardFrameGeo = new THREE.BoxGeometry(4.2, 2.2, 0.1);
    const woodFrameMat = new THREE.MeshStandardMaterial({ color: '#321f11', roughness: 0.85 });
    const chalkboardFrame = new THREE.Mesh(blackboardFrameGeo, woodFrameMat);
    chalkboardFrame.position.set(0, 3.2, -5.9);
    scene.add(chalkboardFrame);

    const blackboardSlateGeo = new THREE.PlaneGeometry(4.0, 2.0);
    const blackboardSlateMat = new THREE.MeshStandardMaterial({ map: boardTexture, roughness: 0.95 });
    const blackboardSlate = new THREE.Mesh(blackboardSlateGeo, blackboardSlateMat);
    blackboardSlate.position.set(0, 3.2, -5.84); // slightly offset to prevent z-fighting
    scene.add(blackboardSlate);

    // ================= THE CORE SAFE (최종 자물쇠 중량 금고) =================
    // Safe Pedestal Base
    const pedestalGeo = new THREE.BoxGeometry(1.6, 0.15, 1.6);
    const pedestalMat = new THREE.MeshStandardMaterial({ color: '#161311', roughness: 0.9 });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.set(0, 0.075, 0);
    scene.add(pedestal);

    // Heavy Metal Safe Main body
    const safeBodyGeo = new THREE.BoxGeometry(1.3, 1.6, 1.3);
    const safeBodyMat = new THREE.MeshStandardMaterial({
      color: '#262423', // Dark, worn slate grey
      roughness: 0.78,
      metalness: 0.88,
    });
    const safeBody = new THREE.Mesh(safeBodyGeo, safeBodyMat);
    safeBody.position.set(0, 0.8 + 0.15, 0);
    scene.add(safeBody);

    // Gold brass accents / framing around safe door
    const safeAccentsGeo = new THREE.BoxGeometry(1.32, 0.05, 1.32);
    const brassMat = new THREE.MeshStandardMaterial({
      color: '#9e7539', // Brushed heavy brass
      roughness: 0.45,
      metalness: 0.86,
    });
    const accentTop = new THREE.Mesh(safeAccentsGeo, brassMat);
    accentTop.position.set(0, 1.74, 0);
    scene.add(accentTop);

    const accentBottom = new THREE.Mesh(safeAccentsGeo, brassMat);
    accentBottom.position.set(0, 0.16 + 0.05, 0);
    scene.add(accentBottom);

    // Safe Door (positive Z side of the safe cube)
    const safeDoorGeo = new THREE.BoxGeometry(1.1, 1.4, 0.06);
    const doorMat = new THREE.MeshStandardMaterial({
      color: '#1a1817', // slightly darker metal door
      roughness: 0.7,
      metalness: 0.92,
    });
    const safeDoor = new THREE.Mesh(safeDoorGeo, doorMat);
    safeDoor.position.set(0, 0.8 + 0.15, 0.64);
    scene.add(safeDoor);

    // Safe Rotary Dial Lock
    const dialOuterGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 32);
    dialOuterGeo.rotateX(Math.PI / 2);
    const dialOuter = new THREE.Mesh(dialOuterGeo, brassMat);
    dialOuter.position.set(0, 1.05, 0.69);
    scene.add(dialOuter);

    const dialInnerGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.08, 24);
    dialInnerGeo.rotateX(Math.PI / 2);
    const dialInnerMat = new THREE.MeshStandardMaterial({ color: '#090807', roughness: 0.5, metalness: 0.9 });
    const dialInner = new THREE.Mesh(dialInnerGeo, dialInnerMat);
    dialInner.position.set(0, 1.05, 0.7);
    scene.add(dialInner);

    // Spinning Safe Handle bars
    const barGeo = new THREE.BoxGeometry(0.5, 0.05, 0.03);
    const barMat = new THREE.MeshStandardMaterial({ color: '#bca279', roughness: 0.4, metalness: 0.9 });
    const handleBar1 = new THREE.Mesh(barGeo, barMat);
    handleBar1.position.set(0, 1.05, 0.75);
    scene.add(handleBar1);

    const barGeoVert = new THREE.BoxGeometry(0.05, 0.5, 0.03);
    const handleBar2 = new THREE.Mesh(barGeoVert, barMat);
    handleBar2.position.set(0, 1.05, 0.75);
    scene.add(handleBar2);

    // Glowing LED status on safe
    const ledGeo = new THREE.SphereGeometry(0.024, 12, 12);
    const ledRedMat = new THREE.MeshBasicMaterial({ color: '#fa3232' });
    const ledGreenMat = new THREE.MeshBasicMaterial({ color: '#32fa5a' });

    const ledRed = new THREE.Mesh(ledGeo, ledRedMat);
    ledRed.position.set(-0.35, 1.45, 0.68);
    scene.add(ledRed);

    const ledGreen = new THREE.Mesh(ledGeo, ledGreenMat);
    ledGreen.position.set(-0.25, 1.45, 0.68);
    scene.add(ledGreen);

    // ================= THE WOODEN READING DESK =================
    // Desk Top (standing to the left-front -3.5, 0, 1.5)
    const deskTopGeo = new THREE.BoxGeometry(1.6, 0.08, 1.0);
    const deskWoodMat = new THREE.MeshStandardMaterial({ color: '#563821', roughness: 0.8 });
    const deskTop = new THREE.Mesh(deskTopGeo, deskWoodMat);
    deskTop.position.set(-3.5, 0.72, 1.5);
    deskTop.rotation.y = Math.PI / 4; // slight angled placement
    scene.add(deskTop);

    // Desk Legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.03, 0.72, 12);
    const legMat = new THREE.MeshStandardMaterial({ color: '#2b1b10', roughness: 0.9 });
    
    // Helper to position legs relative to the rotated desk
    const addDeskLeg = (relX: number, relZ: number) => {
      const leg = new THREE.Mesh(legGeo, legMat);
      // rotate coordinates
      const angleRot = Math.PI / 4;
      const rX = relX * Math.cos(angleRot) - relZ * Math.sin(angleRot);
      const rZ = relX * Math.sin(angleRot) + relZ * Math.cos(angleRot);
      leg.position.set(-3.5 + rX, 0.36, 1.5 + rZ);
      scene.add(leg);
    };

    addDeskLeg(-0.7, -0.4);
    addDeskLeg(0.7, -0.4);
    addDeskLeg(-0.7, 0.4);
    addDeskLeg(0.7, 0.4);

    // Paper sheets/Confidential document on desk
    const paperGeo = new THREE.PlaneGeometry(0.3, 0.4);
    const paperMat = new THREE.MeshStandardMaterial({ map: noteTexture, roughness: 0.9 });
    const paperMesh = new THREE.Mesh(paperGeo, paperMat);
    paperMesh.rotation.x = -Math.PI / 2;
    paperMesh.rotation.z = Math.PI / 4 + 0.15;
    paperMesh.position.set(-3.4, 0.77, 1.4);
    scene.add(paperMesh);

    // Retro Lamp on the desk
    const lampBaseGeo = new THREE.CylinderGeometry(0.1, 0.1, 0.02, 16);
    const lampMat = new THREE.MeshStandardMaterial({ color: '#162b1a', roughness: 0.4, metalness: 0.6 });
    const lampBase = new THREE.Mesh(lampBaseGeo, lampMat);
    lampBase.position.set(-3.9, 0.77, 1.1);
    scene.add(lampBase);

    const lampStemGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.35, 12);
    const lampStem = new THREE.Mesh(lampStemGeo, barMat);
    lampStem.position.set(-3.9, 0.92, 1.1);
    scene.add(lampStem);

    const lampShadeGeo = new THREE.CylinderGeometry(0.14, 0.18, 0.14, 16);
    const lampShade = new THREE.Mesh(lampShadeGeo, lampMat);
    lampShade.position.set(-3.9, 1.1, 1.1);
    lampShade.rotation.x = 0.3; // tilt to light the desk note
    scene.add(lampShade);

    // Warm mini light bulb inside the lamp
    const bulbGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const bulbMat = new THREE.MeshBasicMaterial({ color: '#ffd073' });
    const bulb = new THREE.Mesh(bulbGeo, bulbMat);
    bulb.position.set(-3.85, 1.05, 1.12);
    scene.add(bulb);

    const deskSpotLight = new THREE.SpotLight('#ffe0a3', 4, 3, Math.PI / 5, 0.5, 1);
    deskSpotLight.position.set(-3.85, 1.05, 1.12);
    deskSpotLight.target = paperMesh;
    scene.add(deskSpotLight);

    // ================= CLASSIC BOOKSHELF =================
    // Wooden Cabinet Shell (standing against positive Z & Right wall)
    const cabinetGeo = new THREE.BoxGeometry(0.8, 4.0, 2.4);
    const cabinetMat = new THREE.MeshStandardMaterial({ color: '#2a1a0f', roughness: 0.9 });
    const cabinet = new THREE.Mesh(cabinetGeo, cabinetMat);
    cabinet.position.set(5.5, 2.0, -1.5);
    scene.add(cabinet);

    // Book rows represented as colorful blocks inside shelves
    const booksGroup = new THREE.Group();
    booksGroup.position.set(5.08, 0, -1.5);

    const bookColors = ['#8d2522', '#c49c5e', '#263f45', '#164223', '#2a241f', '#d2c2ad'];
    for (let shelfValue = 0.6; shelfValue < 4.0; shelfValue += 0.8) {
      let runZ = -1.0;
      while (runZ < 1.0) {
        const bookWidth = 0.05 + Math.random() * 0.06;
        const bookHeight = 0.45 + Math.random() * 0.25;
        const bookDepth = 0.35 + Math.random() * 0.15;
        const bookColor = bookColors[Math.floor(Math.random() * bookColors.length)];

        const bookGeo = new THREE.BoxGeometry(bookDepth, bookHeight, bookWidth);
        const bookMat = new THREE.MeshStandardMaterial({ color: bookColor, roughness: 0.8 });
        const bookMesh = new THREE.Mesh(bookGeo, bookMat);
        
        // Random tilt offset
        if (Math.random() > 0.7) {
          bookMesh.rotation.z = (Math.random() - 0.5) * 0.2;
        }

        bookMesh.position.set(0, shelfValue, runZ);
        booksGroup.add(bookMesh);
        runZ += bookWidth + 0.01;
      }
    }
    scene.add(booksGroup);

    // ================= 6. Lighting Configuration =================
    // Subtle mystery ambient light
    const ambientLight = new THREE.AmbientLight('#292019', 0.6);
    scene.add(ambientLight);

    // Direct yellow spotlight hanging above our central heavy safe
    const ceilingSpotLight = new THREE.SpotLight('#ffefcc', 14, 15, Math.PI / 4, 0.4, 1.2);
    ceilingSpotLight.position.set(0, 5.0, 0);
    ceilingSpotLight.target = safeBody;
    scene.add(ceilingSpotLight);

    // Faint greenish CCTV feedback point light to catch metallic edges of the room
    const pointLightScn = new THREE.PointLight('#52fd77', 1.1, 10);
    pointLightScn.position.set(3, 4, 3);
    scene.add(pointLightScn);

    // Subtle blue twilight pointlight from side window (imaginary)
    const fillerBlueLight = new THREE.PointLight('#3b82f6', 1.5, 12);
    fillerBlueLight.position.set(-3, 3, -4);
    scene.add(fillerBlueLight);

    // ================= 7. Animation & Render loop =================
    let animId: number;
    let clock = new THREE.Clock();

    const animateLoop = () => {
      animId = requestAnimationFrame(animateLoop);

      // Rotate dial bar slowly for clockwork feel
      if (dialInner && handleBar1 && handleBar2) {
        const timeVal = clock.getElapsedTime();
        const twist = Math.sin(timeVal * 0.4) * 0.2;
        handleBar1.rotation.z = twist;
        handleBar2.rotation.z = twist + Math.PI / 2;
      }

      // Add a slight flicker to the surveillance camera point light
      if (pointLightScn) {
        pointLightScn.intensity = 0.8 + Math.sin(clock.getElapsedTime() * 12) * 0.15 + (Math.random() * 0.06);
      }

      // Dynamic Camera Path depending on angle prop
      if (cameraRef.current) {
        // Ensure standard coordinate calculations match target angle
        const curAngleRad = (targetAngleRef.current * Math.PI) / 180;
        const radius = 6.8;
        const camHeight = 3.2;

        // Camera sweeps in 3D orbit around the central safe (0, 0.9, 0)
        cameraRef.current.position.x = Math.sin(curAngleRad) * radius;
        cameraRef.current.position.z = Math.cos(curAngleRad) * radius;
        cameraRef.current.position.y = camHeight + Math.sin(curAngleRad * 2) * 0.4; // subtle wave

        cameraRef.current.lookAt(new THREE.Vector3(0, 0.8, 0));
      }

      renderer.render(scene, camera);
    };

    animateLoop();

    // Resize handling using ResizeObserver
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries || entries.length === 0) return;
      const { width: newWidth, height: newHeight } = entries[0].contentRect;
      
      if (rendererRef.current && cameraRef.current) {
        cameraRef.current.aspect = newWidth / newHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(newWidth, newHeight);
      }
    });

    resizeObserver.observe(containerRef.current);

    // ================= 8. Drag to adjust camera angle (Interactive) =================
    const handleMouseDown = (e: MouseEvent) => {
      if (!isInteractive) return;
      isDragging.current = true;
      prevMouseX.current = e.clientX;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current || !isInteractive) return;
      const deltaX = e.clientX - prevMouseX.current;
      prevMouseX.current = e.clientX;

      // Translate dragging horizontal delta into angle rotation (degree mapping)
      // Dragging left decreases angle, dragging right increases angle
      let nextAngle = targetAngleRef.current + deltaX * 0.6;
      
      // Bound the angle between 0 and 180 as per CCTV requirements, or allow loop
      nextAngle = Math.max(0, Math.min(180, nextAngle));

      targetAngleRef.current = nextAngle;
      if (onChangeAngle) {
        onChangeAngle(Math.round(nextAngle));
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    // Touch support for mobile clients
    const handleTouchStart = (e: TouchEvent) => {
      if (!isInteractive || e.touches.length === 0) return;
      isDragging.current = true;
      prevMouseX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || !isInteractive || e.touches.length === 0) return;
      const deltaX = e.touches[0].clientX - prevMouseX.current;
      prevMouseX.current = e.touches[0].clientX;

      let nextAngle = targetAngleRef.current + deltaX * 0.6;
      nextAngle = Math.max(0, Math.min(180, nextAngle));

      targetAngleRef.current = nextAngle;
      if (onChangeAngle) {
        onChangeAngle(Math.round(nextAngle));
      }
    };

    // Register canvas listeners
    const canvasElement = canvasRef.current;
    canvasElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    
    canvasElement.addEventListener('touchstart', handleTouchStart);
    canvasElement.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleMouseUp);

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      
      canvasElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);

      canvasElement.removeEventListener('touchstart', handleTouchStart);
      canvasElement.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);

      // Recursive disposal of meshes, materials & textures to bypass webgl leaks
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        object.geometry.dispose();

        if (object.material.isMaterial) {
          cleanMaterial(object.material);
        } else if (Array.isArray(object.material)) {
          object.material.forEach((m) => cleanMaterial(m));
        }
      });

      renderer.dispose();
    };

    function cleanMaterial(mat: THREE.Material) {
      mat.dispose();
      // Dispose any texture mapped inside
      for (const key of Object.keys(mat)) {
        const item = (mat as any)[key];
        if (item && typeof item.dispose === 'function') {
          item.dispose();
        }
      }
    }
  }, [onChangeAngle, isInteractive]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden rounded cursor-grab active:cursor-grabbing bg-[#050505] border border-slate-900 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        isDragging.current = false;
      }}
    >
      {/* ThreeJS WebGL view */}
      <canvas ref={canvasRef} className="w-full h-full block" />

      {/* Screen CRT Scanline and Flicker layers */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.08] mix-blend-overlay bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px]" />
      
      {/* Lens Vignette Shadow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.72)_100%)]" />

      {/* Retro VHS noise effect overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-noise" />

      {/* Interaction tip overlay */}
      {isInteractive && (
        <div className={`absolute bottom-2.5 right-3 px-2 py-0.5 bg-black/75 border border-stone-800 text-[8px] font-mono tracking-wider rounded text-stone-400 pointer-events-none transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}>
          ◀  화면 드래그로 직접 앵글 조작 가능  ▶
        </div>
      )}
    </div>
  );
};
