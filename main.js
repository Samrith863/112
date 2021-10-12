 var prediction_1="";
var prediction_2="";

Webcam.set({
    width:300,
    height:250,
    image_format:"png",
    png_quality:90
});

camera=document.getElementById("cam");
Webcam.attach(camera);

function cam_view(){
    Webcam.snap(function(data_uri){
document.getElementById("result").innerHTML='<img id="capture_image" src="'+data_uri+'">';
    })
}
console.log("ml5 version",ml5.version);
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/c1vc9T020/model.json",modelLoaded);

function modelLoaded(){
console.log("model has loaded");
}

function talk(){
    var synth=window.speechSynthesis;
    speakdata_1="The First prediction is"+prediction_1;
    speakdata_2="and the Second Prediction is"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speakdata_1+speakdata_2);
    synth.speak(utterThis);
}

function predict_result(){
    var img=document.getElementById("capture_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        document.getElementById("emotion_name_1").innerHTML=results[0].label;
        document.getElementById("emotion_name_2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        talk();
        if(results[0].label=="happy"){
            document.getElementById("emoji_one").innerHTML="&#128522;";
        }
        if(results[0].label=="sad"){
            document.getElementById("emoji_one").innerHTML="&#128532;";
        }
        if(results[0].label=="angry"){
            document.getElementById("emoji_one").innerHTML="&#128548;";
        }
        if(results[0].label=="victory"){
            document.getElementById("emoji_one").innerHTML="&#129311;";
        }

        if(results[1].label=="happy"){
            document.getElementById("emoji_two").innerHTML="&#128522;";
        }
        if(results[1].label=="sad"){
            document.getElementById("emoji_two").innerHTML="&#128532;";
        }
        if(results[1].label=="angry"){
            document.getElementById("emoji_two").innerHTML="&#128548;";
        }
        if(results[1].label=="victory"){
            document.getElementById("emoji_two").innerHTML="&#129311;";
        }
    }
}