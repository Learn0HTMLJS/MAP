var agents = [];
var createDefaultEngine = function () { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true, disableWebGL2Support: false }); };

var startRenderLoop = function (engine, canvas) {
  engine.runRenderLoop(function () {
    if (sceneToRender && sceneToRender.activeCamera) {
      sceneToRender.render();
    }
  });
};
//**************************************************************************************** */
function createScene() {
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  var scene = new BABYLON.Scene(engine);
  var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(20, 20, 20), scene);
  camera.setTarget(BABYLON.Vector3.Zero());
  camera.attachControl(canvas, true);
  var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);
  light.intensity = 0.7;
  BABYLON.STLFileLoader.DO_NOT_ALTER_FILE_COORDINATES = true;
  //  let ground = AddGround(GroundWidtch, GroundHeight);
  assetsManager = new BABYLON.AssetsManager(scene);
  // Добавление модели
  const pointerDown_ModelAdding = (vect) => {
    if (ModelAdding) {
      AddModel(vect);
      AddModelCancel();
    }
  }
  //  Взаимодействие с моделью  
  const pointerDown_ModelSelect = (mesh, vect) => {
    if (SelectedModel == null) {
      if (mesh == ground)
        return;
      SelectModel(mesh, vect);
    }
    else
    {
      if(mesh == SelectedModel)
      {
        ModelMoveEnd();
        return;
      }
      ModelMove(vect);
      ModelMoveEnd();
    }
  }

  const pointerDown_ModelMoove = (vect) => {}

  scene.onPointerObservable.add((pointerInfo) => {
    switch (pointerInfo.type) {
      case BABYLON.PointerEventTypes.POINTERDOWN:
        if (pointerInfo.pickInfo.hit) {
          if (ModelAdding)
            pointerDown_ModelAdding(pointerInfo.pickInfo.pickedPoint)
          else
            pointerDown_ModelSelect(pointerInfo.pickInfo.pickedMesh, 
            pointerInfo.pickInfo.pickedPoint);
        }
        break;
      /*      case BABYLON.PointerEventTypes.POINTERMOVE:
              if (pointerInfo.pickInfo.hit) {
                if(!ModelAdding && ModelMooving)
                  pointerDown_ModelMoove(pointerInfo.pickInfo.pickedPoint);
              }
              break;*/
    }
  });



  return scene;
};

//**************************************************************************************** */

window.initFunction = async function () {
  var asyncEngineCreation = async function () {
    try {
      return createDefaultEngine();
    } catch (e) {
      console.log("the available createEngine function failed. Creating the default engine instead");
      return createDefaultEngine();
    }
  }
  window.engine = await asyncEngineCreation();
  if (!engine) throw 'engine should not be null.';
  startRenderLoop(engine, canvas);
  window.scene = createScene();
};
initFunction().then(() => {
  sceneToRender = scene
});

window.addEventListener("resize", function () {
  engine.resize();
});