import * as firebase from "firebase/app"
import "firebase/firestore"

var width = window.innerWidth;
var height = window.innerHeight;


const config = {
    // your firebase config
  
      apiKey: "AIzaSyCLuB5fKIO1n0070M9f5W5G199RYvS2rrA",
      authDomain: "no-harm-on-the-farm.firebaseapp.com",
      databaseURL: "https://no-harm-on-the-farm.firebaseio.com",
      projectId: "no-harm-on-the-farm",
      storageBucket: "no-harm-on-the-farm.appspot.com",
      messagingSenderId: "693625494685",
    
  }
  firebase.initializeApp(config)

export default class Scene1 extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    preload() {
        //images loaded
        this.load.image('gate', 'assets/gui/gate.png');
        this.load.image('guides', 'assets/gui/guides.png');
        this.load.image('quiz', 'assets/gui/quiz.png');
        this.load.image('menu','assets/gui/menu.png' );
        this.load.image('rpg','assets/gui/rpg.png' );
        this.load.image('play','assets/gui/play.png' );
        this.load.image('memory','assets/gui/memory.png' );
        this.load.image('dodge','assets/gui/dodge.png' );
        this.load.image('back','assets/gui/back.png' );
        
        this.load.image('suggest','assets/gui/suggest.png' );
        this.load.image('credits','assets/gui/credits.png' );
        this.load.image('settings','assets/gui/settings.png' );
        this.load.image('leaderboards','assets/gui/leaderboards.png' );
        
        this.load.image('embrace','assets/gui/embrace.png' );
        
        this.load.image('hsa','assets/gui/hsa.png' );

        this.load.image('ifa','assets/gui/ifa.png' );

        this.load.audio('alexz','assets/music/alexz.mp3' );


    }
    create() {

        this.sound.play('alexz', { loop: true })

        
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");

        this.pauseBG = this.add.image(width/2, height/2, 'menu');

        this.home();

    }
    
    home(){
        this.guides = this.add.image(width/2, height/2 - 100, 'guides');

        this.play = this.add.image(width/2 , height/2 - 200, 'play' );

        
        this.settings = this.add.image(width/2 , height/2 , 'settings' );
        
        
        this.leaderboards= this.add.image(width/2 , height/2 + 100, 'leaderboards' );

        this.credits= this.add.image(width/2 , height/2 + 200, 'credits' );


        this.guides.once('pointerdown', ()=> {
            this.guidesfunc();
        });

        this.play.once('pointerdown', ()=> {
            this.games();
        });

        this.credits.once('pointerdown', ()=> {
            this.creditsfunc();

        });

        this.settings.once('pointerdown', ()=> {

           this.settingsfunc();
        });

        this.leaderboards.once('pointerdown', ()=> {
            this.leaderboardsfunc();

        });
                
        setTimeout(() => {
            this.play.setInteractive();
            this.guides.setInteractive();
            this.credits.setInteractive();
            this.settings.setInteractive();
            this.leaderboards.setInteractive();
        }, 200);

    }

    leaderboardsfunc(){

        this.newmenu();
    
        this.back = this.add.image(width/2, height/2 + 200, 'back');
    
        this.back.once('pointerdown', ()=> {
            this.home();

        });
        this.gate= this.add.image(width/2, height/2 - 200,'gate');

        this.quiz = this.add.image(width/2 , height/2, 'quiz' );

        this.memory = this.add.image(width/2, height/2 - 100, 'memory');

        this.dodge = this.add.image(width/2, height/2 + 100, 'dodge');

        setTimeout(() => {
            this.gate.setInteractive();
            this.quiz.setInteractive();
            this.memory.setInteractive();
            this.back.setInteractive();
            this.dodge.setInteractive();
        }, 200);


        this.quiz.once('pointerdown', ()=> {

            var scoreArr=[];
            this.ridofgames();
            var i =0;
            const db = firebase.firestore()
            db.collection("Leaderboards").doc('quiz').collection('scores').orderBy("score", "desc").limit(10).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    i++
                    console.log(i)
                    
                    const data = doc.data();
                    scoreArr.push(data);
                    if(i == 10)
                    {                
                        var starttext = this.add.text(width/2- 140, height/2 - 200, 'Name: ' + scoreArr[0].name + ' Score: ' + scoreArr[0].score, { fontSize: '12px', fill: '#000' });
                        var starttext2 = this.add.text(width/2- 140, height/2 - 175, 'Name: ' + scoreArr[1].name + ' Score: ' + scoreArr[1].score, { fontSize: '12px', fill: '#000' });
                        var starttext3 = this.add.text(width/2- 140, height/2 - 150, 'Name: ' + scoreArr[2].name + ' Score: ' + scoreArr[2].score, { fontSize: '12px', fill: '#000' });
                        var starttext4 = this.add.text(width/2- 140, height/2 - 125, 'Name: ' + scoreArr[3].name + ' Score: ' + scoreArr[3].score, { fontSize: '12px', fill: '#000' });
                        var starttext5 = this.add.text(width/2- 140, height/2 - 100, 'Name: ' + scoreArr[4].name + ' Score: ' + scoreArr[4].score, { fontSize: '12px', fill: '#000' });
                        var starttext6 = this.add.text(width/2- 140, height/2 - 75, 'Name: ' + scoreArr[5].name + ' Score: ' + scoreArr[5].score, { fontSize: '12px', fill: '#000' });
                        var starttext7 = this.add.text(width/2- 140, height/2 - 50, 'Name: ' + scoreArr[6].name + ' Score: ' + scoreArr[6].score, { fontSize: '12px', fill: '#000' });
                        var starttext8 = this.add.text(width/2- 140, height/2 - 25, 'Name: ' + scoreArr[7].name + ' Score: ' + scoreArr[7].score, { fontSize: '12px', fill: '#000' });
                        var starttext9 = this.add.text(width/2- 140, height/2, 'Name: ' + scoreArr[8].name + ' Score: ' + scoreArr[8].score, { fontSize: '12px', fill: '#000' });
                        var starttext10 = this.add.text(width/2- 140, height/2 + 25, 'Name: ' + scoreArr[9].name + ' Score: ' + scoreArr[9].score, { fontSize: '12px', fill: '#000' });

                    }
                });
            });

            this.back = this.add.image(width/2, height/2 + 200, 'back');

            this.back.once('pointerdown', ()=> {
                this.leaderboardsfunc();
                this.unprintlead();

            });
         
            setTimeout(() => {
                this.back.setInteractive();
            }, 200);


        });

        this.gate.once('pointerdown', async ()=> {

            var scoreArr=[];
            this.ridofgames();
            var i =0;
            const db = firebase.firestore()
            db.collection("Leaderboards").doc('LockThatGate').collection('scores').orderBy("score", "desc").limit(10).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    i++
                    console.log(i)
                    
                    const data = doc.data();
                    scoreArr.push(data);
                    if(i == 10)
                    {                
                        var starttext = this.add.text(width/2- 140, height/2 - 200, 'Name: ' + scoreArr[0].name + ' Score: ' + scoreArr[0].score, { fontSize: '12px', fill: '#000' });
                        var starttext2 = this.add.text(width/2- 140, height/2 - 175, 'Name: ' + scoreArr[1].name + ' Score: ' + scoreArr[1].score, { fontSize: '12px', fill: '#000' });
                        var starttext3 = this.add.text(width/2- 140, height/2 - 150, 'Name: ' + scoreArr[2].name + ' Score: ' + scoreArr[2].score, { fontSize: '12px', fill: '#000' });
                        var starttext4 = this.add.text(width/2- 140, height/2 - 125, 'Name: ' + scoreArr[3].name + ' Score: ' + scoreArr[3].score, { fontSize: '12px', fill: '#000' });
                        var starttext5 = this.add.text(width/2- 140, height/2 - 100, 'Name: ' + scoreArr[4].name + ' Score: ' + scoreArr[4].score, { fontSize: '12px', fill: '#000' });
                        var starttext6 = this.add.text(width/2- 140, height/2 - 75, 'Name: ' + scoreArr[5].name + ' Score: ' + scoreArr[5].score, { fontSize: '12px', fill: '#000' });
                        var starttext7 = this.add.text(width/2- 140, height/2 - 50, 'Name: ' + scoreArr[6].name + ' Score: ' + scoreArr[6].score, { fontSize: '12px', fill: '#000' });
                        var starttext8 = this.add.text(width/2- 140, height/2 - 25, 'Name: ' + scoreArr[7].name + ' Score: ' + scoreArr[7].score, { fontSize: '12px', fill: '#000' });
                        var starttext9 = this.add.text(width/2- 140, height/2, 'Name: ' + scoreArr[8].name + ' Score: ' + scoreArr[8].score, { fontSize: '12px', fill: '#000' });
                        var starttext10 = this.add.text(width/2- 140, height/2 + 25, 'Name: ' + scoreArr[9].name + ' Score: ' + scoreArr[9].score, { fontSize: '12px', fill: '#000' });

                    }
                });
            console.log(scoreArr);
            });
            console.log(scoreArr);
            
            this.back = this.add.image(width/2, height/2 + 200, 'back');

            this.back.once('pointerdown', ()=> {
                this.leaderboardsfunc();
                this.unprintlead();

            });
    
                    
            setTimeout(() => {
                this.back.setInteractive();
            }, 200);



        });
        this.memory.once('pointerdown', ()=> {
            var scoreArr=[];
            this.ridofgames();
            var i =0;
            const db = firebase.firestore()
            db.collection("Leaderboards").doc('Memorygame').collection('scores').orderBy("score", "desc").limit(10).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    i++
                    console.log(i)
                    
                    const data = doc.data();
                    scoreArr.push(data);
                    if(i == 10)
                    {                
                        var starttext = this.add.text(width/2- 140, height/2 - 200, 'Name: ' + scoreArr[0].name + ' Score: ' + scoreArr[0].score, { fontSize: '12px', fill: '#000' });
                        var starttext2 = this.add.text(width/2- 140, height/2 - 175, 'Name: ' + scoreArr[1].name + ' Score: ' + scoreArr[1].score, { fontSize: '12px', fill: '#000' });
                        var starttext3 = this.add.text(width/2- 140, height/2 - 150, 'Name: ' + scoreArr[2].name + ' Score: ' + scoreArr[2].score, { fontSize: '12px', fill: '#000' });
                        var starttext4 = this.add.text(width/2- 140, height/2 - 125, 'Name: ' + scoreArr[3].name + ' Score: ' + scoreArr[3].score, { fontSize: '12px', fill: '#000' });
                        var starttext5 = this.add.text(width/2- 140, height/2 - 100, 'Name: ' + scoreArr[4].name + ' Score: ' + scoreArr[4].score, { fontSize: '12px', fill: '#000' });
                        var starttext6 = this.add.text(width/2- 140, height/2 - 75, 'Name: ' + scoreArr[5].name + ' Score: ' + scoreArr[5].score, { fontSize: '12px', fill: '#000' });
                        var starttext7 = this.add.text(width/2- 140, height/2 - 50, 'Name: ' + scoreArr[6].name + ' Score: ' + scoreArr[6].score, { fontSize: '12px', fill: '#000' });
                        var starttext8 = this.add.text(width/2- 140, height/2 - 25, 'Name: ' + scoreArr[7].name + ' Score: ' + scoreArr[7].score, { fontSize: '12px', fill: '#000' });
                        var starttext9 = this.add.text(width/2- 140, height/2, 'Name: ' + scoreArr[8].name + ' Score: ' + scoreArr[8].score, { fontSize: '12px', fill: '#000' });
                        var starttext10 = this.add.text(width/2- 140, height/2 + 25, 'Name: ' + scoreArr[9].name + ' Score: ' + scoreArr[9].score, { fontSize: '12px', fill: '#000' });

                        
                    }
                });
            console.log(scoreArr);
            });
            console.log(scoreArr);
            
            this.back = this.add.image(width/2, height/2 + 200, 'back');

            this.back.once('pointerdown', ()=> {
                this.leaderboardsfunc();
                this.unprintlead();

            });
    
                    
            setTimeout(() => {
                this.back.setInteractive();
            }, 200);
        });

        this.dodge.once('pointerdown', ()=> {

            var scoreArr=[];
            this.ridofgames();
            var i =0;
            const db = firebase.firestore()
            db.collection("Leaderboards").doc('Dodge').collection('scores').orderBy("score", "desc").limit(10).get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                    i++
                    console.log(i)
                    
                    const data = doc.data();
                    scoreArr.push(data);
                    if(i == 10)
                    {                
                        var starttext = this.add.text(width/2- 150, height/2 - 200, 'Name: ' + scoreArr[0].name + ' Time: ' + scoreArr[0].score, { fontSize: '12px', fill: '#000' });
                        var starttext2 = this.add.text(width/2- 150, height/2 - 175, 'Name: ' + scoreArr[1].name + ' Time: ' + scoreArr[1].score, { fontSize: '12px', fill: '#000' });
                        var starttext3 = this.add.text(width/2- 150, height/2 - 150, 'Name: ' + scoreArr[2].name + ' Time: ' + scoreArr[2].score, { fontSize: '12px', fill: '#000' });
                        var starttext4 = this.add.text(width/2- 150, height/2 - 125, 'Name: ' + scoreArr[3].name + ' Time: ' + scoreArr[3].score, { fontSize: '12px', fill: '#000' });
                        var starttext5 = this.add.text(width/2- 150, height/2 - 100, 'Name: ' + scoreArr[4].name + ' Time: ' + scoreArr[4].score, { fontSize: '12px', fill: '#000' });
                        var starttext6 = this.add.text(width/2- 150, height/2 - 75, 'Name: ' + scoreArr[5].name + ' Time: ' + scoreArr[5].score, { fontSize: '12px', fill: '#000' });
                        var starttext7 = this.add.text(width/2- 150, height/2 - 50, 'Name: ' + scoreArr[6].name + ' Time: ' + scoreArr[6].score, { fontSize: '12px', fill: '#000' });
                        var starttext8 = this.add.text(width/2- 150, height/2 - 25, 'Name: ' + scoreArr[7].name + ' Time: ' + scoreArr[7].score, { fontSize: '12px', fill: '#000' });
                        var starttext9 = this.add.text(width/2- 150, height/2, 'Name: ' + scoreArr[8].name + ' Time: ' + scoreArr[8].score, { fontSize: '12px', fill: '#000' });
                        var starttext10 = this.add.text(width/2- 150, height/2 + 25, 'Name: ' + scoreArr[9].name + ' Time: ' + scoreArr[9].score, { fontSize: '12px', fill: '#000' });
                    }
                });
            console.log(scoreArr);
            });
            console.log(scoreArr);
            
            this.back = this.add.image(width/2, height/2 + 200, 'back');

            this.back.once('pointerdown', ()=> {
                this.leaderboardsfunc();
                this.unprintlead();

            });
    
                    
            setTimeout(() => {
                this.back.setInteractive();
            }, 200);

        });


        


    }

    settingsfunc(){
        this.newmenu();

        this.back = this.add.image(width/2, height/2 + 200, 'back');

        this.back.once('pointerdown', ()=> {
            this.home();

        });

                
        setTimeout(() => {
            this.back.setInteractive();
        }, 200);
    }

    creditsfunc(){
        this.newmenu();


        var starttext = this.add.text(width/2- 150, height/2 - 200, 'Games made by Mark McEneaney', { fontSize: '18px', fill: '#000' });
        var starttext2 = this.add.text(width/2- 150, height/2 - 150, 'Music by Eric taylor', { fontSize: '12px', fill: '#000' });
        var starttext3 = this.add.text(width/2- 150, height/2 - 125, 'Alex McCulloch and Alexandr Zhelanov', { fontSize: '12px', fill: '#000' });
        var starttext4 = this.add.text(width/2- 150, height/2 - 100, 'Sounds by Leszek_Szary ', { fontSize: '12px', fill: '#000' });

        this.back = this.add.image(width/2, height/2 + 200, 'back');

        this.back.once('pointerdown', ()=> {
            this.home();

            this.unprintlead();
        });

                
        setTimeout(() => {
            this.back.setInteractive();
        }, 200);
        

    }

    unprintlead(){
        
        starttext10.settext('');
        starttext9.settext('');
        starttext8.settext('');
        starttext7.settext('');
        starttext6.settext('');
        starttext5.settext('');
        starttext4.settext('');
        starttext3.settext('');
        starttext2.settext('');
        starttext.settext('');
    }

    //clear homescreen function

    guidesfunc(){
        this.newmenu();

        
        this.back = this.add.image(width/2, height/2 + 200, 'back');
        this.ifa = this.add.image(width/2, height/2, 'ifa');
        this.embrace = this.add.image(width/2, height/2 - 100, 'embrace');
        this.hsa = this.add.image(width/2, height/2 - 200, 'hsa');
        this.suggest = this.add.image(width/2, height/2  +100, 'suggest');



        
        setTimeout(() => {
            this.back.setInteractive();
            this.ifa.setInteractive();
            this.hsa.setInteractive();
            this.embrace.setInteractive();
            this.suggest.setInteractive();

        }, 200);

        this.back.once('pointerdown', ()=> {
            this.home();

            this.back.destroy();
            this.ifa.destroy();
            this.hsa.destroy();
            this.embrace.destroy();
            this.suggest.destroy();

        });
        this.suggest.once('pointerdown', ()=> {
            var url = 'https://docs.google.com/forms/d/e/1FAIpQLScCaF4fV-0g4gh-a_vsNLn5TxSiZptuJPJm7SQDRgRLyIk8Dw/viewform';
        
            var s = window.open(url, '_blank');
        
            if (s && s.focus)
            {
                s.focus();
            }
            else if (!s)
            {
                window.location.href = url;
            }

        });

        this.ifa.on('pointerdown', ()=> {

            var url = 'https://www.ifa.ie/wp-content/uploads/2013/10/Stay_safe_on_the_farm_with_jessy.pdf';
        
            var s = window.open(url, '_blank');
        
            if (s && s.focus)
            {
                s.focus();
            }
            else if (!s)
            {
                window.location.href = url;
            }
        });
        this.hsa.on('pointerdown', ()=> {

           // https://www.hsa.ie/eng/education/teacher_support_and_classroom_resources/farm_safety_presentation_-_primary/farm_safety_presentation.pdf

           var url = 'https://www.hsa.ie/eng/education/teacher_support_and_classroom_resources/farm_safety_presentation_-_primary/farm_safety_presentation.pdf';
        
           var s = window.open(url, '_blank');
       
           if (s && s.focus)
           {
               s.focus();
           }
           else if (!s)
           {
               window.location.href = url;
           }


        });
        this.embrace.on('pointerdown', ()=> {
            //https://embracefarm.com/farm-safety/

            var url = 'https://embracefarm.com/farm-safety/';
        
            var s = window.open(url, '_blank');
        
            if (s && s.focus)
            {
                s.focus();
            }
            else if (!s)
            {
                window.location.href = url;
            }

        });

    }



    games(){
        
        this.newmenu();
        
        this.leaderboards.destroy();

        this.gate= this.add.image(width/2, height/2 - 200,'gate');

        this.quiz = this.add.image(width/2 , height/2, 'quiz' );

        this.memory = this.add.image(width/2, height/2 - 100, 'memory');

        this.back = this.add.image(width/2, height/2 + 200, 'back');

        this.dodge = this.add.image(width/2, height/2 + 100, 'dodge');

        setTimeout(() => {
            this.gate.setInteractive();
            this.quiz.setInteractive();
            this.memory.setInteractive();
            this.back.setInteractive();
            this.dodge.setInteractive();
        }, 200);

        this.quiz.once('pointerdown', ()=> {
            location.href = "/quiz"
        });

        this.gate.once('pointerdown', ()=> {
            location.href = "/space"
        });

        this.memory.once('pointerdown', ()=> {
            location.href = "/memory"
        });

        this.dodge.once('pointerdown', ()=> {
            location.href = "/dodge"
        });

        this.back.once('pointerdown', ()=> {
            this.home();

        this.ridofgames();
        });
    }

    newmenu(){
        this.guides.destroy();
        this.play.destroy();
        this.settings.destroy();
        this.credits.destroy();
        this.leaderboards.destroy();
    }

    ridofgames(){
        this.gate.destroy();
        this.quiz.destroy();
        this.memory.destroy();
        this.back.destroy();
        this.dodge.destroy();
    }
}