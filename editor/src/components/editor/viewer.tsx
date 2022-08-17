import React, { useEffect } from 'react'
import * as THREE from 'three'

interface Viewer3dProps {
  file: File
}

export default function Viewer3d(props: Viewer3dProps) {

  useEffect(() => {

    console.log(props.file.name)

    let scene = new THREE.Scene();
    let camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    let renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById('test-canvas') as HTMLCanvasElement
    });
    
    renderer.setSize( window.innerWidth, window.innerHeight );

    let url = URL.createObjectURL(props.file)
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );
    let material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(url)
    })
    let cube = new THREE.Mesh( geometry, material );
    
    scene.add( cube );
    camera.position.z = 5;
    
    let animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    };
    
    animate();
  }, [])

  return (
    <div>
      <canvas id="test-canvas" />
    </div>
  )
}
