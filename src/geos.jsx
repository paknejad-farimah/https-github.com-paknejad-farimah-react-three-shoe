import {useGLTF,Stage, OrbitControls } from "@react-three/drei";
// import { useLoader } from "@react-three/fiber";
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import {useControls} from 'leva'
 import {useMemo,useState, useEffect,useRef } from "react";
 import { useThree } from '@react-three/fiber';
 

export default function Geos(){
const { size } = useThree();
const isMobile = size.width <= 600;

const shoeScale = isMobile ? 0.78 : 1;
const model=useGLTF('./shoe.glb')
const part2=model.scene.children[4]
const part3=model.scene.children[3]
const material2=part2.material
const material3=part3.material

model.scene.children[20].material.color.set('black')
const savedSettings = useMemo(() => {
    try {
      if (typeof window === 'undefined') return {}
      const saved = localStorage.getItem('shoeSettings')
      return saved ? JSON.parse(saved) : {}
    } catch (error) {
      console.error('خطا در دسترسی به localStorage:', error)
      return {}
    }
  }, [])
const {Aroundshoe,NikeLogo}=useControls({

    Aroundshoe:{
        value: savedSettings.Aroundshoe ||'#FFFFFF',
        onChange:(v)=> material2.color.set(v)
        },
        NikeLogo:{
            value:savedSettings.NikeLogo || '#FFFFFF',
            onChange:(v)=>material3.color.set(v)
            }
    
})
useEffect(() => {
    try {
      localStorage.setItem('shoeSettings', JSON.stringify({ Aroundshoe, topshoe }))
    } catch (error) {
      console.error('خطا در ذخیره تنظیمات:', error)
    }
  }, [Aroundshoe, NikeLogo])

  // اعمال تنظیمات ذخیره شده هنگام بارگذاری اولیه
  useEffect(() => {
    if (savedSettings.Aroundshoe) material2.color.set(savedSettings.Aroundshoe)
    if (savedSettings.NikeLogo) material3.color.set(savedSettings.NikeLogo)
  }, [material2, material3, savedSettings])
//3 alamate nike
// const draco=new DRACOLoader()
// draco.setDecoderPath('./draco/')
// const model=useLoader(GLTFLoader,
//     './shoej.gltf',
//     (shoe)=>{
//         shoe.setDRACOLoader(draco)
//     }
// )
// model.scene.children[2].material.color.set('white')=useControls({
//     kaf:'#FFFFFF'
// })
{/* <leva position='top-left'> */}
 
return (
  <>
    <OrbitControls
      minDistance={1}
      maxDistance={10}
      enablePan={false}
      enableZoom={false}
      enableDamping
      dampingFactor={0.8}
      rotateSpeed={0.5}
      makeDefault
    />

<Stage
  adjustCamera
  intensity={0.5}
>
  <primitive
    object={model.scene}
    position={isMobile ? [0, -0.35, 0] : [0, 0, 0]}
    scale={isMobile ? 0.78 : 1}
  />
</Stage>
  </>
);
        }