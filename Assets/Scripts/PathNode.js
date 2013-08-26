#pragma strict


enum PathInstruction {moveLeft , moveRight , moveStop , JumpAir};
var pathInstruction = PathInstruction.moveStop;
function OnTriggerEnter (other : Collider){
    if(other.tag == "enemy")
    {
      print("Enemy is here");
    }
}