





   var walkSpeed 					: float 	= 4.0;			
   var walkJump 					: float 	= 6.2;		
   var startPos 					: float 	= 0.0;											// location of start postion 
   var moveDirection 				: int 		= 1;											// direction player facing 
   var fallSpeed 					: float 	= 2.0;											// speed of falling down 
   var gravity 					    : float 	= 20.0;											// force applied on the character 
   var soundJump                    : AudioClip;
  private var dead = false;

  private var soundDelay   : float = 0.0;
  private var soundRate    : float = 0.0;
  


   var particaleJump 				: Transform;		
   
   
   private var velocity 	    	: Vector3 	= Vector3.zero;	
   private var jumpEnable 			: boolean 	= false ; 										// toggle for jump standard 
   private var afterHitForceDown 	: float   	= 1.0   ;										// force the player down if he hits anything 
   
   
   function OnControllerColliderHit(hit : ControllerColliderHit)
   {
    if(hit.gameObject.tag == "fallout"){
    
    dead = true;
   }
}


function playSound(soundName , soundDelay){

if(!audio.isPlaying && Time.time > soundRate){
soundRate =Time.time + soundDelay;
audio.clip=soundName;
audio.Play();
yield WaitForSeconds(audio.clip.length);
}

}
 
function Update () {

	var aniPlay = GetComponent("aniSpriteMine");

	var particalePlacement : Vector3 = Vector3 (transform.position.x,transform.position.y-.5,transform.position.z);	// partical at the base of the sprite 

	var controller : CharacterController = GetComponent (CharacterController);				// set the character controller 


if (controller.isGrounded)		
														// if the charcater is on the ground 
		    	{
		
		 	velocity = Vector3 (Input.GetAxis("Horizontal"),0,0);

		    		
		    		//---------------------------------------------------------------------------------
		    		
		    	  //function aniSpriteMine (columnSize, rowSize, colFrameStart, rowFrameStart, totalFrames, framesPerSecond)// function for animating sprites

		    	//-------------------------------------------------------------------------------------
		    		
																    		
																    			
																    	if (velocity.x == 0 && moveDirection == 0 ) 										         //idle left 
																	    	{
																	    	
																	    	 	aniPlay.aniSpriteMine(12,2,1,1,12,0);												// animation call to sprite sheet 
																	    	 
																	    	}
																    	
																    	
																    		if (velocity.x == 0 && moveDirection == 1)  								        	// idle right 
																    	    {	
																    	
																    	 	aniPlay.aniSpriteMine(12,2,1,2,12,0);												// animation call to sprite sheet 
																    	 	
																    	 	}
		    	 	
		    	 	
								    	 	
																	    	if (velocity.x < 0)
																	    	{
																	    	velocity*=walkSpeed;
																	    	aniPlay.aniSpriteMine (12,2,1,1,12,12);												//walk left
																	    	}
																	    	
																	    	
																	    	if (velocity.x > 0)
																	    	{
																	    	velocity*=walkSpeed;
																	    	aniPlay.aniSpriteMine (12,2,0,2,12,12);												//walk right
																	    	} 
																	
																	    	    	
		    	
		    	 if (Input.GetButtonDown("Jump")&&( !Input.GetButton("Fire1")||Input.GetButton("Fire1")&& velocity.x==0)&& Input.GetAxis("Vertical")>=0)		    	
            	{
		    	
		    	velocity.y=walkJump;																// set the y value to walkJump						
		  	  	Instantiate(particaleJump ,particalePlacement,transform.rotation);
		  		playSound(soundJump,0);														// play sound for jump 
		  		jumpEnable = true ; 																// enable jump standard 
		    	
		    	} 
		    	
		    	}
		    	
		    	
		    		//---------if not grounded-------------- 
		      	
		      	
		      	
		      	if (!controller.isGrounded)		
		      													                                 	// if player is in the air 
		      	{	
		      	
		      	velocity.x=Input.GetAxis("Horizontal");												// set the horizontal speed from input 
		      	
		      	if (Input.GetButtonUp("Jump"))														// jump controller hieght 
		      	{
		      	velocity.y = velocity.y-fallSpeed;													// substract current height from 1 if the jump button is up 
		      	}
		      	
		      	if (moveDirection == 0) {															// left
		      	if (jumpEnable)																		// jump standard 
		      	{
		      	velocity.x*=walkSpeed;																// walk speed times curreny move speed 
		        aniPlay.aniSpriteMine (12,2,1,1,12,0);			
		      	}
		      	
		      	}

                 }
                 
                 	    	if (velocity.x < 0 )														// get lest moveDirection to left
				    	{
				    		moveDirection = 0 ;														// set moveDirection to left
				    	}
				    	
				    	if (velocity.x > 0 )														// get lest moveDirection to right 
				    	{
				    		moveDirection = 1 ;														// set moveDirection to right 
				    	}
				    	
				    	if (controller.collisionFlags==CollisionFlags.Above)
				    	{
							velocity.y = 0 ; 														// set velocity on y to 0 
							velocity.y -= afterHitForceDown;										// applying a force downward so the player won't be hanging in the air 

				    	}
		    	velocity.y-=gravity*Time.deltaTime;													// apply gravity 
		    	controller.Move(velocity*Time.deltaTime);											// move the controller 
		    	


}

function LateUpdate(){

if(dead){
 transform.position = Vector3(0.4,0);
 
 dead=false;
}
}