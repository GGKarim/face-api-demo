document.getElementById("analyseButton").addEventListener("click", analyze);

function analyze(){
  var sourceURL = document.getElementById("input").value;
  
  let reqBody = {
     url: sourceURL
  };
  
  let myHeader =  new Headers({
    'Content-Type': 'application/json',
    'Ocp-Apim-Subscription-Key':'ACCESS_KEY'
  });
  
  let initObject = {
    method: 'POST',
    body: JSON.stringify(reqBody),
    headers: myHeader
  }
  
  let request = new Request('/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender,emotion', initObject);
  
  fetch(request).then(function(response){
    if(response.ok){
        return response.json();
    }
    else{
        return Promise.reject(new Error(response.statusText));
    }
  }).then(function(response){
      let imgDiv = document.getElementById('sourceImage');
      imgDiv.style.visibility = "visible";
      document.getElementById("output").innerHTML = "gender: " + response[0].faceAttributes.gender + "</br>" + "age: " + response[0].faceAttributes.age + "</br>" + "hapiness: " + response[0].faceAttributes.emotion.happiness  + "</br>" + "sadness: " + response[0].faceAttributes.emotion.sadness + "</br>" + "anger: " + response[0].faceAttributes.emotion.anger;
      imgDiv.src = sourceURL;
      imgDiv.classList.add('animateImage');
  }).catch(function(err){
      alert(err);  
      document.getElementById("output").innerHTML = "";
  });
}
