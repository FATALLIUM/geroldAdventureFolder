    // setting up dialogue buttons, elements, display
    const storyOutput = document.getElementById("storyP");
    const npcDialogueOut = document.getElementById("npcDialogueP");

    const decisionButtonOut1 = document.getElementById("decisionB1");
    const decisionButtonOut2 = document.getElementById("decisionB2");
    const decisionButtonOut3 = document.getElementById("decisionB3");

    // decision buttons initialize
    let decisionButton1, decisionButton2, decisionButton3;

    // images
    const imageOut = document.getElementById("image");

    // decision arguments initialize
    let decisionIn1, decisionIn2, decisionIn3;

    // form PIN
    const pinInputObj = document.getElementById("pinInput");
    const pinInputButton = document.getElementById("inputButton");

    const hiddenWordObj = document.getElementById("hiddenWord");
   
    // story elements initialize
    let storySub, item, npcDialogue, story, storyProgress, gameOver;

/* NPC class with instance variables name and talk.
   talk is how the NPC's dialogue will be progressed.
   name is self-explanatory.
*/
class NPC {
    constructor(name, talk) {
        this.name = name;
        this.talk = talk;
    }

    /*  @param progress -> argument should be the global var storyProgress.
        @param npcNum -> argument should be an object NPC's property: name.
        the function changes the value of global var npcDialogue, global var story, and increments the NPC's talk property by 1.
    */
    displayNpcDialogue(progress, npcNum) {
        switch (npcNum) {
            case "shadowMan":
                switch (progress) {
                    case "bathroom":
                        switch (shadowMan.talk) {
                            case 0:
                                npcDialogue = "Shadow Man: ...? What do you want from me?";
                                story = "He seems... irked!";
                                shadowMan.talk++;
                                break;
                            case 1:
                                npcDialogue = "Shadow Man: Stop talking to me. It's... irritating.";
                                story = "Gerold... please stop talking to him...";
                                shadowMan.talk++;
                                break;
                            case 2:
                                npcDialogue = "Shadow Man: ............";
                                story = "Gerold...! Just go to the living room! Please!!!";
                                shadowMan.talk++;
                                break;  
                            default:
                                gameOver = true;
                                break;      
                        }
                        break;
                    case "masterBedroom":
                        switch (this.talk) {
                            case 0:
                                npcDialogue = "Shadow Man: Why are you here again? What do you want?";
                                shadowMan.talk++;
                                break;
                            case 1:
                                npcDialogue = "Shadow Man: If you're wondering about the lipstick puzzle, just think of... acronyms.";
                                story = "That sounds like a helpful hint, right, Gerold?";
                                shadowMan.talk++;
                                break;
                            case 2:
                                npcDialogue = "Shadow Man: You can leave now. Stop bothering me. I mean it.";
                                story = "Shadow man here is starting to get angry again... it's best if you leave, Gerold.";
                                shadowMan.talk++;
                                break;
                            case 3:
                                npcDialogue = "Shadow Man: I warned you...";
                                story = "Oh, no! Gerold!!! You have to stop bothering him...!";
                                shadowMan.talk++;
                                break;  
                            default:
                                gameOver = true;
                                break;      
                        }
                        break;
                    default:
                        break;            
                }


                break;
            case "cheeseMan":
                switch (progress) {
                    case "kitchen":
                        switch (cheeseMan.talk) {
                            case 0:
                                npcDialogue = "Cheese Man: AH! THOU HAST... SUMMONEDETH METH (me)!!! METH (me)!!! WHATETH DOSTETH THOU NEEDETH?";
                                cheeseMan.talk++;
                                break;
                            case 1:
                                npcDialogue = "Cheese Man: NEVERETH MINDETH! I WANTETH... CHEESE. GIVE ME............................ CHEESE.";
                                cheeseMan.talk++;
                                break;
                            case 2:
                                npcDialogue = "Cheese Man: ELSETH... I... KILLETH THEE!!!! Just kidding- there's no murder in this game. I'm following a script, so bear with me.";
                                cheeseMan.talk++;
                                break;  
                            case 3:
                                npcDialogue = "Cheese Man: Find me a block of golden cheese... specifically, THE CHEESE OF HELL. In return, I'll give you... something.";
                                break;    
                            case 4:
                                npcDialogue = "Cheese Man: I AM... LACTOSETH... INTOLERANTETH.......";
                                cheeseMan.talk++;
                                break;    
                            case 4:
                                npcDialogue = "Cheese Man: IF THY BRAIN IS STUMPED, JUST DON'T THINKETH!";
                                cheeseMan.talk++;
                                break;
                            case 4:
                                npcDialogue = "Cheese Man: *sneezes*";
                                break;        
                            default:
                                break;      
                        }
                        break;
                    default:
                        break;        
                }
               
                break;
            default:
                break;  
        }
        display();
    }
}    

    // set up NPCs with new obj
    const shadowMan = new NPC("shadowMan", 0);
    const cheeseMan = new NPC("cheeseMan", 0);

// assigns respective value to each variable initialized before this function if needed.
function initialize(room) {
    // decision buttons' innerHTML
    decisionButton1 = "...";
    decisionButton2 = "...";
    decisionButton3 = "...";

    // decision arguments
    decisionIn1 = "";
    decisionIn2 = "";
    decisionIn3 = "";
   
    // hide image
    imageOut.style.display = 'none';

    // assigning story elements
    storySub = 0;
    item = "nothing";
    npcDialogue = "";
    story = "";

    storyProgress = (room === 1) ? "bathroom" : (room === 2) ? "masterBedroom" : "exit";

    hideElements();

    // misc story elements
    puzzle = 0;
}

/* @param decision -> what the player chooses
    interacts with surroundings and affects story outcomes.
*/
function chooseDecision(decision) {
    resetDecisions();
    switch (decision) {
        // PART ONE
        case "getAxe":
            if (item === "nothing") {
                item = " an axe";
               
                story = "Gerold took the axe. He is now an axe-wielder.";
                storySub++;
            }
            else {
                story = "Gerold is holding something already.";
            }
            break;
        case "stayInHallway":
            storySub = 0;

            story = "Gerold decides to stay in the hallway. There is a door to his left.";
            storyProgress = "bathroomHallway";
            break;;
        case "headToLivingRoom":
            storySub = 0;

            story = "Gerold walks to the living room. It is sparsely furnished with only a couch, table, and desk.\nCompared to the hallway, Gerold feels less comfortable.";
            storySub++;
            storyProgress = "livingRoom";

            break;      
        case "openDeathDoor":
            story = "Gerold opens the door... only to be strangled my a mass of shadow-like tendrils.\nHe meets his end...";
            // game resets
            break;
        case "don'tOpenDeathDoor":
            story = "Gerold decides to not open the door. Lucky for him, it was the right decision.";
            storySub++;
            break;
        case "stareAtShadowMan":
            story = "Gerold decides to stare at the shadowy man. How scandalous!\nThere's really nothing interesting about him... He's just shadow.";
            break;
        case "talkToShadowMan":
            resetDecisions();
            shadowMan.displayNpcDialogue(storyProgress, shadowMan.name);
            break;
        case "ignoreShadowMan":
            story = "Good thinking... mysterious, shadowy men shouldn't be trusted with...";
            storySub++;
            break;      
        case "investigateLR":
            story = "Should Gerold check the couch, the table, or the desk?";
            setUpDecisions("investigateLR1");
            break;
        case "checkCouch":
            story = "A battered old couch. Gerold sits on it. He rates it a 2 out of 10.";
            break;
        case "checkTable":
            story = "It's a wooden table. Two stacks of yellowed documents, four blue fountain pens, and sixteen thimbles sit on it.\nA house centipede is nestled in-between the documents.";
            break;
        case "checkDesk":
            if (puzzle !== 1) {
                story = "A wooden desk. Cobwebs and dust bunnies are flouncing about. There's a weathered box with a PIN.";
                puzzleSolve("pin");
            }
            else {
                story = "Wooden desk. Gerold can't find anything worth noting on it.";
            }
            break;
        case "headToMasterBedroom":
            if (puzzle !== 2) {
                story = "This door leads to the master bedroom. Gerold knocks, but no one answers.\n\nThere's a hollowed groove the size of a small gem."
            }
            else {
                story = "Gerold wonders if he should go in. It's the master bedroom, after all. The master of beds...";
                storySub++
            }
            break;
        case "bathroomHallway":
            if (item === "a gem") {
                story = "Gerold is back in the hallway. Though, there's nothing interesting here, so Gerold wanders back into the living room.";
            }
            else {
                story = "Before Gerold can walk into the hallway, an invisible wall with a padlock suddenly materializes.\nIt's definitely not scripted.";
                if (item === "a key") {
                    story = "Gerold uses the key he found and unlocks the invisible door. The key disintegrates. He is now back in the hallway.";
                    item = "nothing";
                    storySub++;
                }
            }
            
            break;
        case "pickUp!Gem":
            story = "Gerold picks up the odd gem. It shines with a luminosity of 1.5k lumens.";
            puzzle++;
            item = "a gem";
            setUpDecisions("livingRoomPuzzle");
            break;
        case "don'tPickUp!Gem":
            story = "For some reason, Gerold decides to leave the gem on the floor, as if hoping for someone else to pick it up for him.";
            setUpDecisions("bathroomHallway");
            break;        
        case "botherShadowMan":
            story = "Gerold decides to bother the shadow man.";
            shadowMan.displayNpcDialogue(shadowMan.name);
            break;
        case "useGem":
            story = "After much contemplation, Gerold finally uses the shiny gem and places it neatly inside the groove.";
            storySub++;        
            break;
        case "stareAtDoor":
            story = "For some reason, Gerold decides to admire the rancid spider eggs that adorn the door instead of progressing the story.";
            setUpDecisions("bathroomHallway1");
            break;
       
        // PART TWO
        case "investigateMB":
            story = "Where should Gerold check? The bed, mirror, or bookcase?";
            setUpDecisions("investigateMB1");
            break;
        case "livingRoom1":
            if (puzzle === 3) {
               story = "Gerold is in the living room once more. Still empty as ever. He can now enter the kitchen.";
            }
            else {story = "Gerold is in the living room once more. The door to the kitchen materializes itself. Unfortunately, it was heavily padlocked.";
            }
            setUpDecisions("livingRoom2");
            break;
        case "closeEyes":
            let rnd = Math.floor(Math.random() * 5);
            switch (rnd) {
                case 0:
                    story = "Gerold closes his eyes and thinks of his rabbit, Minnie. A cute, grey rabbit hops in his mind.";
                    break;
                case 1:
                    story = "Gerold closes his eyes, imagining himself at home, drinking pineapple-apple fruit punch.";
                    break;
                case 2:
                    story = "Gerold decides to close his eyes and imagines himself anywhere but here.";
                    break;
                case 3:
                    story = "Gerold closes his Gerold-like eyes and thinks about his unfinished bowl of oatmeal.";
                    break;
                case 4:
                    story = "Gerold simply closes his eyes for no particular reason.";
                    break;
                default:
                    break;                    
            }
            break;    
        case "checkBed":
            if (puzzle !== 3 && item !== "a knife") {
                story = "It's a queen-sized bed. There are blue-silk comforters that have seen better days. Other than that, there is a worn teddy-bear that has its stuffing spilling out of its chest.";
                setUpDecisions("teddyHorror");
            }
            else if (item === "a knife") {
                story = "Stab the teddy-bear how many times?";
                puzzleSolve("pin");
            }
            else {
                story = "It's a queen-sized bed. Gerold does not feel sleepy at all. It seems that the bed is doing a poor job at being an enticing bed. The teddy is shredded.";
            }
            break;
        case "checkMirror":
            if (item === "some lipstick") {
                story = "It seems that Gerold can draw something on the mirror using the special lipstick... What should he write?";
                puzzleSolve("pin");
            }
            else if (puzzle === 4) {
                story = "It's Gerold. The demon is now sleeping.";
            }
            else {
                story = "It's Gerold. And some demon that is hanging upside-down from the ceiling. It is holding up \'three fingers\'. And the mirror looks very lipstick-applicable.";
            }
            break;    
        case "checkBookcase":
            story = "An old bookcase full of weathered tomes, manuscripts, and charred documents. The words \'DO NOT FORGET\' is scribbled upon the wood.";
            break;
        case "bathroomHallway1":
            story = "Gerold is in the bathroom hallway once more. The shadow man is still here, as well as the mysterious door.";
            setUpDecisions("bathroomHallway3");
            break;
        case "daydream":
            story = "Gerold starts to daydream. This accomplished nothing.";
            break;        
        case "deathDoor1":
            story = "Gerold opens the door. He is consumed by flesh-colored maws, each incisor burying itself into Gerold's Gerold-like flesh.";
            gameOver = true;
            break;
        case "shadowManTalk1":
            story = "Gerold waves at the shadowy man. The man does not look pleased.";
            shadowMan.displayNpcDialogue(storyProgress, shadowMan.name);
            break;
        case "kitchenDoor":
            if (item === "a large key") {
                story = "Gerold uses the heavy key and unlocks the door to the kitchen. The kitchen is now available for Gerold to traverse.";
                storySub++;
            }
            else {
                story = "It's a large door with an equally large padlock that an equally large key would open."
            }
            break;    
        case "takeKnife":
            item = "a knife";
            story = "Gerold has a knife now.";
            break;    
        case "eatLipstick":
            story = "Gerold consumes the lipstick and dies of chemical poisoning. Poor Gerold. Look at what you've done.";
            gameOver = true;
            break;
        case "takeLipstick":
            story = "Gerold now has a very nice lipstick. Though, he's not sure what to use it for other than his eyebrows.";
            item = "some lipstick";
            break;    
        case "useKey":
            story = "Gerold uses the large key. It is now gone. The padlock is removed and the kitchen is now accessible.";
            item = "nothing";
            storyProgress = "kitchen";
            storySub = 0;
            break;
        case "notYet":
            story = "Gerold decides to linger a bit longer.";
            setUpDecisions("livingRoom2");
            break;
       
        case "checkRefrigerator":
            if (puzzle !== 5) {
                story = "It's a moldy refrigerator... whatever that's inside is... urgh... unsightly... Inside the fridge is a rat that is screaming: COS (60)!!!!!!!! [In decimal form, please.]";
                puzzleSolve("pin");
            }
            else {
                story = "Just a family of mice... living in the fridge...";
            }
            break;
        case "takeCheese":
            story = "Gerold gingerly grabs the atrocious wedge of cheese, his Gerold-like eyes watering from the stench.";
            storySub++;
            break;
        case "eatCheese":
            story = "Gerold closes his eyes... inhaling the rotten cheese in one hefty gulp... before.... dying........";
            gameOver = true;
            break;
        case "giveCheese":
            story = "Gerold hands the cheese to the Cheese Man. The Cheese Man salutes Gerold and a backdoor exit materializes itself...";
            storySub++;   
            break;       
        case "go1":
            window.location.href = "geroldAdventure2_JiaminZeng.html";
            break;     
        // PART THREE (FINAL)
        // nothing... but dust
        default:
            resetDecisions();
            break;    
    }
    display();
}

/* @param decisions -> setting up buttons and innerHTML using an argument and switch statement.
*/
function setUpDecisions(decisions) {
    switch (decisions) {
        // PART ONE
        case "axe":
            decisionButton1 = "Get axe";
            decisionIn1 = "getAxe";
            break;
        case "split1":
            decisionButton1 = "Stay in hallway";
            decisionButton2 = "Head to living room";


            decisionIn1 = "stayInHallway";
            decisionIn2 = "headToLivingRoom";
            break;
        case "deathDoor":
            decisionButton1 = "Open door";
            decisionButton2 = "Don't open door";
            decisionButton3 = "Head to living room";

            decisionIn1 = "openDeathDoor";
            decisionIn2 = "don'tOpenDeathDoor";
            decisionIn3 = "headToLivingRoom";
            break;
        case "shadowManMeet":
            decisionButton1 = "Stare at man";
            decisionButton2 = "Talk to man";
            decisionButton3 = "Ignore man";


            decisionIn1 = "stareAtShadowMan";
            decisionIn2 = "talkToShadowMan";
            decisionIn3 = "ignoreShadowMan";
            break;  
        case "hallwayMove":
            decisionButton1 = "Head to living room";
           
            decisionIn1 = "headToLivingRoom";
            break;
        case "livingRoomPuzzle":
            decisionButton1 = "Investigate surroundings";
            decisionButton2 = "Head to master bedroom";
            decisionButton3 = "Bathroom hallway";
           
            decisionIn1 = "investigateLR";
            decisionIn2 = "headToMasterBedroom";
            decisionIn3 = "bathroomHallway";
            break;
        case "investigateLR1":
            decisionButton1 = "Investigate couch";
            decisionButton2 = "Investigate table";
            decisionButton3 = "Investigate desk";
           
            decisionIn1 = "checkCouch";
            decisionIn2 = "checkTable";
            decisionIn3 = "checkDesk";
            break;
        case "bathroomHallway1":
            if (item !== "a gem") {
                decisionButton1 = "Pick up gem";
                decisionButton2 = "Leave gem";
                decisionButton3 = "Bother shadow man";
               
                decisionIn1 = "pickUp!Gem";
                decisionIn2 = "don'tPickUp!Gem";
                decisionIn3 = "botherShadowMan";
                
            }
            else {  
                decisionButton1 = "Leave";
                decisionButton2 = "Bother shadow man";
           
                decisionIn1 = "headToMasterBedroom";
                decisionIn2 = "botherShadowMan";
            }
            break;      
        case "bathroomHallway2":
            decisionButton1 = "Open door";
            decisionButton2 = "Talk to shadow man";

            decisionIn1 = "deatDoor1";
            decisionIn2 = "shadowManTalk1";
            break;
       
        // PART TWO
        case "masterBedroomPuzzle":
            if (puzzle < 2) {
                puzzle = 2;
            }
            decisionButton1 = "Investigate master bedroom";
            decisionButton2 = "Head to living room";
            decisionButton3 = "Close eyes";

            decisionIn1 = "investigateMB";
            decisionIn2 = "livingRoom1";
            decisionIn3 = "closeEyes";
            break;
        case "investigateMB1":
            decisionButton1 = "Check bed";
            decisionButton2 = "Check mirror";
            decisionButton3 = "Check bookcase";


            decisionIn1 = "checkBed";
            decisionIn2 = "checkMirror";
            decisionIn3 = "checkBookcase";
            break;
        case "livingRoom2":
            decisionButton1 = "Head to bathroom hallway";
            decisionButton2 = "Daydream";
            decisionButton3 = "Kitchen door";
           
            decisionIn1 = "bathroomHallway1";
            decisionIn2 = "daydream";    
            decisionIn3 = "kitchenDoor";
            break;    
        case "bathroomHallway3":
            decisionButton1 = "Talk to shadow man";
            decisionButton2 = "Enter door";

            decisionIn1 = "shadowManTalk1";
            decisionIn2 = "deathDoor1";
            break;
        case "teddyHorror":
            decisionButton1 = "Take knife on floor";
            
            decisionIn1 = "takeKnife";
            break;    
        case "eatLipstick1":
            decisionButton1 = "Eat lipstick";
            decisionButton2 = "Take lipstick";


            decisionIn1 = "eatLipstick";
            decisionIn2 = "takeLipstick";
            break;
        case "continue1":
            decisionButton1 = "Use key";
            decisionButton2 = "Not yet";


            decisionIn1 = "useKey";
            decisionIn2 = "notYet";
            break;
        case "kitchenPuzzle":
            decisionButton1 = "Check refrigerator";
            decisionButton2 = "Talk to Cheese Man";
           
            decisionIn2 = "cheeseManTalk";
            decisionIn1 = "checkRefrigerator";
            break;
        case "takeCheese1":
            decisionButton1 = "Take the cheese";

            decisionIn1 = "takeCheese";
            break;
        case "giveCheese1":
            decisionButton1 = "Eat cheese";
            decisionButton2 = "Give cheese";

            decisionIn1 = "eatCheese";
            decisionIn2 = "giveCheese";
            break;    
        case "leave":
            decisionButton2 = "Go";

            decisionIn2 = "go1";
            break;    
        // PART THREE (FINAL)
        // nothing... but dust    
        default:
            break;
    }
    display();
}

//
function resetDecisions() {
    decisionIn1 = "";
    decisionIn2 = "";
    decisionIn3 = "";
    decisionButton1 = "...";
    decisionButton2 = "...";
    decisionButton3 = "...";

    npcDialogue = "";
}

/* @param progress -> global var storyProgress
    this is where the majority of the text is printed out using a massive nested switch statement.
*/
function displayStory(progress) {
    changeImage(storyProgress);
    if (gameOver) {window.location.href = "geroldAdventure_JiaminZeng.html";}
    else {
        hideElements();
        switch (progress) {
            // page one
            case "bathroom":
                switch (storySub) {
                    case 0:
                        story = "Gerold stands in the bathroom. It is cold, dark, and damp inside. Gerold wants to go home. Also, who starts a text-adventure in the bathroom?\nGerold is holding " + item + ".\nThe bathroom door is locked so Gerold cannot escape. It smells like mold here.";
                        storySub++;
                        break;
                    case 1:
                        story = "There is a bloody axe sitting on the floor. Should Gerold take it?";
                       
                        setUpDecisions("axe");
                        break;
                    case 2:
                        story = "Because Gerold has an axe, he uses it to break the door. Unfortunately, Gerold lost the axe in this process.";
                        storySub++;
                       
                        item = "nothing";
                        break;
                    case 3:
                        story = "Gerold is now outside of the bathroom. He is standing in a hallway."
                        storySub++;
                        break;
                    case 4:
                        story = "He can go to the living room, or investigate the hallway he is in now.";
                       
                        setUpDecisions("split1");
                        break;
                    default:
                        story = "Gerold is in the bathroom. What will he do?";
                        break;
                }
                break;
            case "bathroomHallway":
                switch (storySub) {
                    case 0:
                        story = "The door is layered with (spiderwebs). Do you want to go in?"
                       
                        setUpDecisions("deathDoor");
                        break;
                    case 1:
                        story = "Looking around, there doesn't really seem to be anything in the hallway. It's just yellow mold, crumbling walls, and peeling wallpaper.";
                        storySub++;
                        break;
                    case 2:
                        story = "There's only a shiny gem on the floor, but we don't really need it right now. Gerold nods at this thought and pretends that the item does not exist.";
                        storySub++;
                        break;
                    case 3:
                        story = "Considering that there is nothing interesting in the hallway other than a shadowy man staring into the house through a window, Gerold deems that he should move on.";
                        storySub++;
                        break;
                    case 4:
                        story = "Unless... Gerold wants to talk to the shadow man?";
                       
                        setUpDecisions("shadowManMeet");
                        break;
                    case 5:
                        story = "What should Gerold do now? Again, nothing interesting in this dreary old hallway...\nGerold should head on to the next area...";
                       
                        setUpDecisions("hallwayMove");
                        break;
                    default:
                        story = "There's nothing here.";
                        break;                      
                }
                break;  
            case "livingRoom":
                switch (storySub) {
                    case 0:
                        story = "Gerold feels sleepy... he wants to go home so badly. But no, no, he must stay awake. Gerold must leave this old house.";
                        storySub++;
                        break;
                    case 1:
                        story = "What should Gerold do now?";
    
                        setUpDecisions("livingRoomPuzzle");
                        break;
                    case 2:
                        story = "Gerold successfully unlocks the old box and obtains a key.";
                        storySub++;
                        break;
                    case 3:
                        setUpDecisions("livingRoomPuzzle");
                        break;
                    case 4:
                        story = "The gem from before is still there. And... so is the shadow-like man.";
                        setUpDecisions("bathroomHallway1");
                        break;
                    case 5:
                        story = "Hmm...";
                        setUpDecisions("livingRoomPuzzle");
                        break;
                    case 6:
                        storySub++;
                        story = "Gerold walks into the master bedroom, his heart suplexing itself against his ribcage.";
                        item = "nothing";
                        break;    
                    default:
                        window.location.href = "geroldAdventure1_JiaminZeng.html";
                        break;
                }
                break;
    
    
            // page two
            case "masterBedroom":
                switch (storySub) {
                    case 0:
                        item = "nothing";
                        story = "A bloody-red substance plop-plops onto the floor, the only sounds filling the air. It smells of rotting flesh and feces.";
                        storySub++;
                        break;
                    case 1:
                        story = "Gerold is not too fond of this area. For a master bedroom, it is rather poor and uninhabitable. There is a queen-sized bed, a mirror, and a bookcase.";
                        storySub++;
                        break;
                    case 2:
                        story = "Gerold looks back at the living room, wondering if he should just stay outside. He shakes his head and steels his Gerold-like nerves.";
                        storySub++;
                        break;
                    case 3:
                        story = "It seems that Gerold has to investigate yet another area... but, perhaps the shadow man in the bathroom hallway might be of aid, somehow.";
                        setUpDecisions("masterBedroomPuzzle");
                        break;
                    case 4:
                        story = "After stabbing the teddy-bear approximately three times, a blood-red stick of lipstick falls out.";
                        storySub++;
                        break;
                    case 5:
                        if (item !== "some lipstick") {
                            story = "Gerold loves eating lipstick, especially the SUPER-DUPER-DELICIOUS-ULTRA-SHEEN-RED-MAUVE-HOT-SMEXY lipstick brand, Cheese.";
                            setUpDecisions("eatLipstick1");
                        }
                        else {
                            story = "Gerold is working hard...";
                            setUpDecisions("investigateMB1");
                        }
                        break;
                    case 6:
                        story = "A large key materializes in front of Gerold; he catches it before it reaches the floor. The lipstick magically disappears, as if it were... scripted.";
                        item = "a large key";
                        setUpDecisions("livingRoom2");
                        break;
                    case 7:
                        story = "Should Gerold use the large key to open the kitchen door?";
                        setUpDecisions("continue1");
                        break;
                    default:
                        break;
                }
                break;
            case "kitchen":
                switch (storySub) {
                    case 0:
                        story = "Gerold walks into the kitchen. The doorway to the living room disappears. He is now trapped.";
                        storySub++;
                        break;
                    case 1:
                        story = "The stench of rotting flesh and banquets for maggots is strongest here. Pots, pans, ladles and knives line the wall. Slabs of strange meat hang from the wall.";
                        storySub++;
                        break;
                    case 2:
                        story = "Also... please don't go clicking the VERY OBVIOUS, VERY GREEN WORD at the BOTTOM-LEFT of the SCREEN."
                        puzzleSolve("hiddenWord");
                        break;
                    case 3:
                        story = "...";
                        storySub++
                        break;
                    case 4:
                        story = "Of course you clicked the word... of course... Now look at what you've done, Gerold- you summoned the CHEESE MAN!";
                        cheeseMan.displayNpcDialogue(cheeseMan.name);
                        storySub++;
                        break;
                    case 5:
                        story = "Oh, no...";
                        cheeseMan.displayNpcDialogue(cheeseMan.name);
                        storySub++;        
                        break;
                    case 6:
                        story = "HE'S BREAKING THE FOURTH WALL!";
                        cheeseMan.displayNpcDialogue(cheeseMan.name);
                        storySub++;
                        break;
                    case 7:
                        story = "Where will Gerold find cheese...? The kitchen has nothing edible! Unless... no, nevermind.";
                        cheeseMan.displayNpcDialogue(cheeseMan.name);
                        storySub++;
                        break;
                    case 8:
                        story = "Okay... okay... Right; the kitchen. Gerold should investigate for any backdoor exits as well as cheese... and beware of... well, of the Cheese Man.";
                        setUpDecisions("kitchenPuzzle");
                        break;
                    case 9:
                        story = "Egads, Gerold! That is SOME CHEESE... Take it and give it to the Cheese Man, Gerold!";
                        setUpDecisions("takeCheese1");
                        break;
                    case 10:
                        story = "To the Cheese Man!";
                        setUpDecisions("giveCheese1");
                        break;
                    case 11:
                        story = "It's there, Gerold! The exit! Go on; go!";
                        setUpDecisions("leave");        
                        break;        
                    default:
                        break;
                }
                break;
    
            // page three
            case "exit":                                                                                                                                                      
                switch (storySub) {
                    case 0:
                        story = "Gerold can see the exit now- it's beautiful dim neon-red glow illuminates his Gerold-like face.";
                        storySub++;
                        break;
                    case 1:
                        story = "The end is here. Gerold is ready to go home.";
                        storySub++;
                        break;
                    case 2:
                        story = "It has been a wild adventure for Gerold. His little heart is full, near bursting.";
                        storySub++;
                        break;
                    case 3:
                        story = "Thanks to your guidance, Gerold can now go home.";
                        storySub++;
                        break;
                    case 4:
                        story = "...";
                        storySub++;
                        break;
                    case 5:
                        story = "But that's not how Gerold's story ends, no.\n\n\nA suffocating darkness slowly drags Gerold back into the house.";
                        storySub++;
                        break;
                    case 6:
                        story = "Back. Back, back.";
                        storySub++;
                        break;
                    case 7:
                        story = "Back into the void.";
                        storySub++;
                        break;        
                    default:
                        story = "THE END.";
                        imageOut.src = "ending1.png";
                        gameOver = true;
                        break;                    
                }
                break;                  
            default:
                break;
        }
        display();  
    }
}

// changes the value of buttons and output.
const display = () => {    
    npcDialogueOut.innerHTML = npcDialogue;
    storyOutput.innerHTML = story;

    decisionButtonOut1.innerHTML = decisionButton1;
    decisionButtonOut2.innerHTML = decisionButton2;
    decisionButtonOut3.innerHTML = decisionButton3;
}

/* @param puzzleIn -> parameter specifies what sort of puzzle is being solved, e.g. "pin" for PIN puzzles and
   hides the form (text field and button) of it.
*/
function puzzleSolve (puzzleIn) {
    switch (puzzleIn) {
        case "pin":
            pinInputObj.style.display  = 'block';
            pinInputButton.style.display = 'block';
            break;
        case "hiddenWord":
            hiddenWordObj.style.display = 'block';
        default:
            break;    
    }
}

/* function is called when the 'Enter' button of type-PIN puzzle forms is clicked.
   first checks what part the player is by looking at the global var storyProgress.
   then, check whether the value in the text field is correct.
*/
const checkValue = () => {
    switch (storyProgress) {
        case "livingRoom":
            if (pinInputObj.value == 2416) {
                item = "a key";
                puzzle++;
                storySub++;
            }
            break;
        case "masterBedroom":
            // ternary
            if (puzzle === 3) {
                if (pinInputObj.value === "DNF") {
                    item = "a large key";
                    puzzle++;
                    storySub++;
                }
            }
            else if (puzzle === 2) {
                if (pinInputObj.value == 3) {
                    puzzle++;
                    storySub++;
                }
            }
            else {}
            break;
        case "kitchen":
            if (pinInputObj.value == .5) {
                puzzle++;
                storySub++;
            }
            break;        
        default:
            break;
    }
    hideElements();
}

// function is to hide certain input elements (buttons, text fields).
const hideElements = () => {
    pinInputObj.style.display = 'none';
    pinInputButton.style.display = 'none';
    pinInputObj.value = "";

    hiddenWordObj.style.display = 'none';
}

function reset() {
    window.location.href = "geroldAdventure_JiaminZeng.html";
}

const clicked = () => {
    hideElements();
    storySub++;
}

const changeImage = (progress) => {
    switch (progress) {
        case "bathroom":
            imageOut.style.display = 'none';
            break;
        case "bathroomHallway":
            imageOut.style.display = 'block';
            imageOut.src = "bathroomHallway.jpg";
            break;
        case "livingRoom":
            imageOut.style.display = 'block';
            imageOut.src = "livingRoom.jpg";
            break;
        case "masterBedroom":
            imageOut.style.display = 'block';
            imageOut.src = "bedroom.jpg";
            break;
        case "kitchen":
            imageOut.style.display = 'block';
            imageOut.src = "kitchen.jpg";
            break;
        case "exit":
            imageOut.style.display = 'block';
            imageOut.src = "ending0.png";
            break;
        default:
            imageOut.style.display = 'none';
            break;                        
    }
}