#pragma strict

var moveSpeed       : float = 20.0;    // set the speed of the enemy
var attackMoveSpeed : float = 35.0;    // set the speed of the attacker
var jumpSpeed       : float = 3.0;     // set the jump hieght
enum EnemyState{
 moveLeft=0 , moveRight=1 , moveStop=2 , jumpE=3 , enemyDie=4 , goHome=5}
var enemyState = EnemyState.moveLeft;    //set the starting state
var attackRange     : float = 1.0;      // set the range for speed increase
var searchRange     : float = 3.0;     // set the range for finding the player
var retunHomeRange  : float = 4.0;     // set the rnge for the enemy to retun to start
var chaseTarget     : Transform;      // load up the player target
var homeTraget      : Transform;      // load the home position
var deathForce      : float = 3.0;    // when the player jump on me force him off "x" amount
var gismoToggle     : boolean = true; // toggle the display of dubg radius
var changeDircDist  : float =1.0;     //set distance to move past target
var getPathInstruction : int;

private var violcety         : Vector3 =Vector3.zero; //store the enemy movemnt in violcty (x,y,z)
private var gravity           : float = 20.0;             // waight of the wrold
private var currentState;                               // hold on the current state for sitting later
private var aniPlay;                                    // get thhe compnent for animation  
private var isRight          : boolean =false;          // sitting the dirction
private var myTransform      : Vector3;                 // store initial postion
private var reSetMoveSpeed   : float = 0.0;            // store the initial move speed
private var distanceTohome   : float = 0.0;            // get the distance for the home positon 
private var distanceTotarget : float = 0.0;              // get the distance for the target postion
private var controller       : CharacterController;      // get controller
private var linkToPlayerProperties;

function Start() {
  myTransform = transform.position;
  reSetMoveSpeed = moveSpeed;
  linkToPlayerProperties = GetComponent(move);
  controller = GetComponent(CharacterController);
  aniPlay=GetComponent(aniSpriteMine);
  
}

function Update () {
   distanceTotarget= Vector3.Distance(chaseTarget.transform.position, transform.position);
   if(distanceTotarget <= searchRange)
   {
       chasePlayer();
     if(distanceTotarget <= attackRange)
     {
        chasePlayer();
        moveSpeed = attackMoveSpeed;
     }
     else
     {
        chasePlayer();
        moveSpeed = reSetMoveSpeed;
     }
   }
   else
   {
      distanceTohome = Vector3.Distance(homeTraget.position, transform.position);
      if(distanceTohome > retunHomeRange)
      {
         goHome();
      }
   }
   if(controller.isGrounded)
   {
   switch(enemyState)
     {
       case EnemyState.moveLeft :
       PortalLeft();
       break;
       case EnemyState.moveRight :
       PortalRight();
       break;
       case EnemyState.moveStop :
       if(isRight)
         idleRight();
       else
         idleLeft();
       break;
       case EnemyState.jumpE :
       if(isRight)
         jumpRight();
       else
         jumpLeft();
       break;
       case EnemyState.enemyDie :
       if(isRight)
        dieRight();
       else
        dieLeft();
       break;
       case EnemyState.goHome :
       goHome();
       break;
     }
   }
   //apply gravity
   violcety.y -=gravity*Time.deltaTime;   // applying the gravity
   //move tge controller
   controller.Move(violcety*Time.deltaTime); //move the controller
}
function OnTriggerEnter( other : Collider){
 
 if(other.tag == "pathNode")
 {
 var linkToPathNode = other.GetComponent(PathNode);
  getPathInstruction = linkToPathNode.pathInstruction;
  enemyState=getPathInstruction;
 
 }
 
 
}
//move the enemy right
function PortalRight(){
 violcety.x =moveSpeed*Time.deltaTime;
 isRight=true;
}
//move the enemy left
function PortalLeft(){
  violcety.x =-moveSpeed*Time.deltaTime;    //move the controller to the left
  isRight=false;
}
//set movemnt to 0 and face right
function idleRight(){
violcety.x = 0;
isRight=true;
}
// set movemnt to 0 and face left
function idleLeft(){
 violcety.x = 0;
 isRight=false;
}
//jump in the air to right
function jumpRight(){

  violcety.y = jumpSpeed;
  isRight=true;
}
//jump in the air to left
function jumpLeft(){
violcety.y = jumpSpeed;

  isRight=false;
}
//kill enemy right
function dieRight(){
 violcety.x =0;
 yield WaitForSeconds(0.4);
 Destroy(gameObject);
}
//kill enemy left
function dieLeft(){
violcety.x =0;
 yield WaitForSeconds(0.4);
 Destroy(gameObject);
 
}
// check where the player is in relation to our postion
function chasePlayer(){
 if(transform.position.x <= chaseTarget.position.x - changeDircDist)
 {
 enemyState = EnemyState.moveRight;
 }
 if(transform.position.x >= chaseTarget.position.x - changeDircDist)
 {
 enemyState = EnemyState.moveLeft;
 }
}
//find the home node and return to it
function goHome(){
if(transform.position.x <= homeTraget.position.x){
    enemyState = EnemyState.moveRight;
}
if(transform.position.x >= homeTraget.position.x){
   enemyState = EnemyState.moveLeft;
}




}
//toggle the gizmo for the deigner to the range
function OnDrawgizmos()
{
 Gizmos.color = Color.red;
 Gizmos.DrawWireSphere(transform.position, attackRange);
 Gizmos.color = Color.black;
 Gizmos.DrawWireSphere(transform.position, searchRange);
 Gizmos.color = Color.green;
 Gizmos.DrawWireSphere(homeTraget.position, retunHomeRange);
 }