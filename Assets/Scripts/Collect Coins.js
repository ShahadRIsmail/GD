
var score = 0;
var soundCoin                    : AudioClip;
private var soundDelay   : float = 0.0;
private var soundRate    : float = 0.0;
  
  
  
  function playSound(soundName , soundDelay){

if(!audio.isPlaying && Time.time > soundRate){
soundRate =Time.time + soundDelay;
audio.clip=soundName;
audio.Play();
yield WaitForSeconds(audio.clip.length);
}

}

function OnTriggerEnter( other : Collider){
Debug.Log("OnTriggerEnter() was called");
if(other.tag == "coin")
     { 
    
    Debug.Log("Other object is a coin");
    playSound(soundCoin,0);
    score+= 5;
    Debug.Log("Score is now" + score);
    Destroy(other.gameObject);
    
    
     }

}

function OnGUI()
{
   GUILayout.Label("Score = " + score);

}

