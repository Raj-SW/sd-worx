import React from 'react'
import {
    CubeCamera,
    Environment,
    OrbitControls,
    PerspectiveCamera,
  } from "@react-three/drei";import { Canvas } from '@react-three/fiber'
  import './styles.css'
  import { Suspense } from 'react';
  import Ground from './Ground';
  import { Car } from './Car';
  import {Rings} from './Rings';
import { Container } from 'react-bootstrap';


  function CarShow(){
    return (
      <>
        <OrbitControls target={[0,0.35,0]} maxPolarAngle={1.45} enableZoom={false}/>
        <PerspectiveCamera makeDefault fov={40} position={[3,2,5]}/>\

         <color args={[0,0,0]} attach="background"/>
         <CubeCamera resolution={256} frames={Infinity}>
          {(texture) => (
            <>
              <Environment map={texture} />
              <Car />
            </>
          )}
        </CubeCamera>
          <Rings/>
         <spotLight
          color={[1, 0.25, 0.7]}
          intensity={100}
          angle={0.6}
          penumbra={0.5}
          position={[5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
        <spotLight
          color={[0.14, 0.5, 1]}
          intensity={100}
          angle={0.6}
          penumbra={0.5}
          position={[-5, 5, 0]}
          castShadow
          shadow-bias={-0.0001}
        />
         <Ground/>
      </>
    )
  }


export function Controller() {
  return (
    // <div className='controller-container'>
    // <div className='controller-wrapper'>
    <Suspense fallback={null} >
      <Canvas shadows  >
        <CarShow/>
      </Canvas>
    </Suspense>
    // </div>
    // </div>
  )
}

export default Controller