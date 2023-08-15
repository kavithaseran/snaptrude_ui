import React, { useEffect, useRef } from "react";
import {
    ArcRotateCamera,
    Color4,
    Engine,
    HemisphericLight,
    MeshBuilder,
    Scene,
    StandardMaterial,
    Texture,
    Vector3,
  } from "@babylonjs/core";
  
const Cube = ({ src }) => {
    const canvasRef = useRef();
  
    const createScene = (engine, canvas) => {
      const scene = new Scene(engine);
  
      scene.clearColor = new Color4(0, 0, 0, 0);
  
      const camera = new ArcRotateCamera(
        "Camera",
        Math.PI / 2,
        Math.PI / 3,
        4,
        Vector3.Zero(),
        scene
      );
      camera.attachControl(canvas, true);
      const light = new HemisphericLight("light", new Vector3(1, 1, 0), scene);
      light.intensity = 1.6;
  
      const mat = new StandardMaterial("mat", scene);
      const texture = new Texture(src, scene);
      mat.diffuseTexture = texture;
  
      const options = {
        wrap: true,
        width: (window.innerWidth / 80) * 0.2,
        height: (window.innerHeight / 60) * 0.2,
        depth: 0.5,
      };
  
      const box = MeshBuilder.CreateBox("box", options);
      box.material = mat;
  
      return scene;
    };
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const engine = new Engine(canvas, true);
      const scene = createScene(engine, canvas);
  
      engine.runRenderLoop(() => {
        scene.render();
      });
  
      window.addEventListener("resize", () => {
        createScene(engine, canvas);
      });

      return () => {
        window.removeEventListener("resize", () => {
            createScene(engine, canvas);
        })
      }
    }, []);
  
    return (
      <canvas className="cube-canvas" ref={canvasRef} />
    );
  };
  
  export default Cube;
  