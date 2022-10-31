let Add_scene_button = document.getElementById('ADD_SCENE');
Add_scene_button.addEventListener('click', ADD_SCENE_Click);
let Add_model_button = document.getElementById('ADD_MODEL');
Add_model_button.addEventListener('click', ADD_MODEL_Click);
let Create_file_button = document.getElementById('CREATE_MAP_FILE');
Create_file_button.addEventListener('click', Create_file_button_Click);
//let RenderCanvas = document.getElementById('renderCanvas');
//RenderCanvas.addEventListener('click', renderCanvas_Click);

function ADD_SCENE_Click() {
  GroundWidtch = document.getElementById('width').value;
  GroundHeight = document.getElementById('height').value;
  AddGround(GroundWidtch, GroundHeight);
  //    window.location.reload();
}

function AddGround(width, height) {
  if (width <= 0 || height <= 0)
    return;
  if (ground)
    ground.dispose();
  ground = new BABYLON.MeshBuilder.CreateGround("ground",
    { width: width, height: height },
    scene);
  return ground;
}

function ADD_MODEL_Click() {
  if(!ModelLable.files[0]['name'])
    return;
  ModelAdding = !ModelAdding;
  if (ModelAdding) {
    Add_model_button.style.backgroundColor = 'blue';
  }
  else {
    Add_model_button.style.backgroundColor = 'white';
  }
}

function Create_file_button_Click() {
//console.log(ModelsArray.length);
/*  if (ModelsArray == 0 || !ModelsArray){
    console.log('!!!!');
    return null;
  }*/
  const formData = new FormData();
  formData.append('SceneWidtch', ground._width);
  formData.append('SceneHeight', ground._height);

console.log(formData.get('SceneWidtch'));
//  formData.append('Models', ModelsArray);

  fetch('http://localhost:3000/api/models', {
    method: 'POST',
    body: formData
  })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => console.log(err));
}