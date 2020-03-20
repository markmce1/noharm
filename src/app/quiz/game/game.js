import * as Phaser from 'phaser';
var start;
var score = 0;
var round = 0;
var correct = 0;
var question;
var question2;
var roundText;
var scoreText;
export default class Scene1 extends Phaser.Scene {
    
    preload() {


        //sounds
        this.load.audio('correct', 'assets/quiz/sounds/correct.wav');
        this.load.audio('wrong', 'assets/quiz/sounds/wrong.wav');
        //images
        this.load.image('bg', 'assets/quiz/images/bg.jpg');
        this.load.image('true', 'assets/quiz/images/true.png');
        this.load.image('false', 'assets/quiz/images/false.png');
        this.load.image('fall', 'assets/quiz/images/couldfall.png');
        this.load.image('box', 'assets/quiz/images/box.png');
        this.load.image('quizbg', 'assets/quiz/images/quizbg.png');
        this.load.image('bg2', 'assets/space/bg3.png');
        this.load.image('start', 'assets/quiz/images/start.png');
        this.load.image('pause','assets/quiz/images/pause.png');
        this.load.image('resumeBut', 'assets/quiz/images/resume.png');
        this.load.image('homeBut', 'assets/quiz/images/homeBut.png');
        this.load.image('restartBut','assets/quiz/images/restart.png' );
        this.load.image('pauseBG','assets/gui/pauseBG.png' );
        this.load.image('continueBut', 'assets/quiz/images/continue.png');
        
        this.load.image('ans1', 'assets/quiz/images/ans1.png');
        this.load.image('ans2', 'assets/quiz/images/ans2.png');
        this.load.image('ans3', 'assets/quiz/images/ans3.png');
        this.load.image('ans4', 'assets/quiz/images/ans4.png');

        this.load.image('pto', 'assets/quiz/images/pto.jpg');
        this.load.image('ptoSmall', 'assets/quiz/images/ptoSmall.jpg');

        
        this.load.image('slurry', 'assets/quiz/images/slurry.jpg');
        this.load.image('slurrySmall', 'assets/quiz/images/slurrySmall.jpg');
               
        this.load.image('Q3ans1', 'assets/quiz/images/Q3ans1.png');
        this.load.image('Q3ans2', 'assets/quiz/images/Q3ans2.png');
        this.load.image('Q3ans3', 'assets/quiz/images/Q3ans3.png');
        this.load.image('Q3ans4', 'assets/quiz/images/Q3ans4.png');

        this.load.image('elecfence','assets/quiz/images/elecfence.png' );
        this.load.image('smallele','assets/quiz/images/smallele.png' );

        this.load.image('Q4ans1', 'assets/quiz/images/Q4ans1.png');
        this.load.image('Q4ans2', 'assets/quiz/images/Q4ans2.png');
        this.load.image('Q4ans3', 'assets/quiz/images/Q4ans3.png');
        this.load.image('Q4ans4', 'assets/quiz/images/Q4ans4.png');

        this.load.image('Q5ans1', 'assets/quiz/images/Q5ans1.png');
        this.load.image('Q5ans2', 'assets/quiz/images/Q5ans2.png');
        this.load.image('Q5ans3', 'assets/quiz/images/Q5ans3.png');
        this.load.image('Q5ans4', 'assets/quiz/images/Q5ans4.png');

        
        this.load.image('accident', 'assets/quiz/images/accident.jpg');


    }

    create()
    {
        //this.add.image(300, 200, 'bg');
        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#3498db");
        this.add.image(200,45,'bg2');
        
        this.add.image(width/2, height/2, 'quizbg');


        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        roundText = this.add.text(16 ,48 ,'Round: ' + round, { fontSize: '32px', fill: '#000' });

        score = 0;
        round = 0;

        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);

        this.pauseBut = this.add.image(300,25, 'pause');
        this.pauseBut.setInteractive();

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();
            this.resume.on('pointerdown', () => {
                this.resume1();

            });
        
        });
        this.play = this.add.image(200, 350, 'start');
        this.play.setInteractive();
        this.play.on('pointerdown', () => {
            this.round1();
        });
    }
    disableinter(){
        if(round != 0)
        {
            this.box1.disableInteractive();
            this.box2.disableInteractive();
            this.box3.disableInteractive();
            this.box4.disableInteractive();

        }
    }
    destroy()
    {
        this.box1.destroy(true);
        this.box2.destroy(true);
        this.box3.destroy(true);
        this.box4.destroy(true);
    }

    interactive(){    
        if(round != 0){

        
        this.box1.setInteractive();
        this.box2.setInteractive();
        this.box3.setInteractive();
        this.box4.setInteractive();
        }

    }

    pause1()
    {

        this.disableinter();

        this.pauseBG = this.add.image(200,  350, 'pauseBG');

        this.resume = this.add.image(200, 275, 'resumeBut');
        this.resume.setInteractive();

        this.restart = this.add.image(200, 350, 'restartBut');
        this.restart.setInteractive();

        this.restart.on('pointerdown', ()=> {
            this.scene.restart();
        });

        this.home = this.add.image(200,425, 'homeBut' );
        this.home.setInteractive();

        this.home.on('pointerdown', ()=> {
            location.href = "/home"
        });

    }
    resume1()
    {
        this.resume.setVisible(false);
        this.home.setVisible(false);
        this.restart.setVisible(false);
        this.pauseBG.setVisible(false);
        
        this.pauseBG.setVisible(false);

        this.pauseBut.once('pointerdown',()=>{
            this.pause1();

            this.resume.on('pointerdown', () => {
                this.resume1();
            });
        });
    }


    round1()
    {
        round++;
        
        roundText.setText('Round: ' + round);
        this.play.destroy(true);

        question = this.add.text(75, 140, 'What is the danger?', { fontSize: '22px', fill: '#000' });

        this.fall = this.add.image(200, 325, 'fall');
        this.box1 = this.add.image(100, 450, 'ans1');
        this.box2 = this.add.image(300, 450, 'ans2');
        this.box3 = this.add.image(100, 550, 'ans3');
        this.box4 = this.add.image(300, 550, 'ans4');

        this.box1.setInteractive();
        this.box2.setInteractive();
        this.box3.setInteractive();
        this.box4.setInteractive();

        this.box1.once('pointerdown', () => {

            //right answers
            console.log('correct');
            score = score + 100;
            round++;
            correct = 1;
            this.round1inter();
            this.sound.play('correct');
        });
            
        this.box2.once('pointerdown', () => {
    
                //wrong answers
                console.log('wrong1');
                round++;
                this.round1inter();
    
            });
            
            this.box3.once('pointerdown', () => {
    
                //wrong answers
                round++;
                console.log('wrong2');
                this.round1inter();
                
    
            });
            
            this.box4.once('pointerdown', () => {
    
                //wrong answers
                round++;
                console.log('wrong3');
                this.round1inter();
                
    
            });

    }

    round1inter(){
    
        this.fall.destroy(true);
        this.pauseBG = this.add.image(200,  350, 'pauseBG');
        question.setText('');
        this.fall = this.add.image(200, 325, 'fall');
        this.destroy();
        var ansText = this.add.text(120, 400, 'This is man', { fontSize: '12px', fill: '#000' });
        var ansText2 = this.add.text(120, 425, 'could fall.', { fontSize: '12px', fill: '#000' });
        this.continue = this.add.image(190, 500, 'continueBut');
        
        if(correct == 1){
            var rightORwrong = this.add.text(145, 200, 'Correct!', { fontSize: '32px', fill: '#000' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(145, 200, 'Wrong!', { fontSize: '32px', fill: '#000' });
            this.sound.play('wrong');
        }

        this.continue.setInteractive();

        this.continue.once('pointerdown', () => {
            this.round2();
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }

    round2()
    {
        
        question.setText('');
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        this.slurry = this.add.image(200, 325, 'slurry');
        question = this.add.text(35, 120, 'Is spreading slurry allowed', { fontSize: '22px', fill: '#000' });
        question2 = this.add.text(100, 145, 'in the rain?', { fontSize: '22px', fill: '#000' });
        this.fall.destroy(true);
        this.destroy();
        //create more boxes
        this.box1 = this.add.image(100, 450, 'true');
        this.box2 = this.add.image(300, 450, 'false');
        this.box1.setInteractive();
        this.box2.setInteractive();
        this.box1.once('pointerdown', () => {
            //wrong answers
            console.log('wrong1');
            round++;
            this.round2inter();
        });  
        this.box2.once('pointerdown', () => {  
            correct = 1;
            score = score + 100;
            round++;
            this.round2inter();
            this.sound.play('correct');
        });
    }

    round2inter(){
        

        this.pauseBG = this.add.image(200,  350, 'pauseBG');
        this.slurry.destroy(true);
        this.slurrySmall = this.add.image(200, 325, 'slurrySmall');
        this.destroy();
        question.setText('');//change to a question
        question2.setText('');
        var ansText = this.add.text(120, 350, '', { fontSize: '12px', fill: '#000' });
        var ansText2 = this.add.text(120, 375, 'You should never spread', { fontSize: '12px', fill: '#000' });
        var ansText3 = this.add.text(120, 400, 'slurry in the rain', { fontSize: '12px', fill: '#000' });
        var ansText4 = this.add.text(120, 425, 'especially near lakes.  ', { fontSize: '12px', fill: '#000' });
        var ansText5 = this.add.text(120, 450, '', { fontSize: '12px', fill: '#000' });
        this.continue = this.add.image(190, 500, 'continueBut');
        
        if(correct == 1){
            var rightORwrong = this.add.text(145, 200, 'Correct!', { fontSize: '32px', fill: '#000' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(145, 200, 'Wrong!', { fontSize: '32px', fill: '#000' });
            this.sound.play('wrong');
        }

        this.continue.setInteractive();

        this.continue.once('pointerdown', () => {
            this.round3();
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            ansText3.setText('');
            ansText4.setText('');
            ansText5.setText('');
            rightORwrong.setText('');
            this.slurrySmall.destroy(true);
            this.continue.destroy(true);
        });

        
    }
    round3()
    {
        question.setText('');
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        this.destroy();
        question = this.add.text(75, 120, 'What is this?', { fontSize: '22px', fill: '#000' });
        question2.setText('');

        this.pto = this.add.image(200, 325, 'pto');

        this.box1 = this.add.image(100, 450, 'Q3ans1');
        this.box2 = this.add.image(300, 450, 'Q3ans2');
        this.box3 = this.add.image(100, 550, 'Q3ans3');
        this.box4 = this.add.image(300, 550, 'Q3ans4');

        this.interactive();
        this.box1.once('pointerdown', () => {
            round++;
            this.round3inter();
        });  
        this.box2.once('pointerdown', () => {
            round++;
            this.round3inter();
        });
        this.box3.once('pointerdown', () => {
            console.log('correct');
            score = score + 100;
            round++;
            correct = 1;
            this.sound.play('correct');
            this.round3inter();
        });
        this.box4.once('pointerdown', () => {
            round++;
            this.round3inter();
        });


    }

    round3inter(){

        question.setText('');
        this.pauseBG = this.add.image(200,  350, 'pauseBG');
        this.ptoSmall = this.add.image(200,295, 'ptoSmall');
        this.pto.destroy(true);
        this.destroy();
        question.setText('');//change to a question
        var ansText = this.add.text(120, 350, 'This is a', { fontSize: '12px', fill: '#000' });
        var ansText2 = this.add.text(120, 375, 'Power Take off shaft.', { fontSize: '12px', fill: '#000' });
        var ansText3 = this.add.text(120, 400, 'It is usually on the ', { fontSize: '12px', fill: '#000' });
        var ansText4 = this.add.text(120, 425, 'back of a tractor.', { fontSize: '12px', fill: '#000' });
        var ansText5 = this.add.text(120, 450, 'It should be covered', { fontSize: '12px', fill: '#000' });
        this.continue = this.add.image(190, 500, 'continueBut');

        if(correct == 1){
            var rightORwrong = this.add.text(145, 200, 'Correct!', { fontSize: '32px', fill: '#000' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(145, 200, 'Wrong!', { fontSize: '32px', fill: '#000' });

        }

        this.continue.setInteractive();

        this.continue.once('pointerdown', () => {
            this.round4();
            this.ptoSmall.destroy(true);
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            ansText3.setText('');
            ansText4.setText('');
            ansText5.setText('');
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }
    round4()
    {
        question.setText('');
        this.pto.destroy(true);
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        this.destroy();
        question = this.add.text(55, 120, 'What does this sign mean?', { fontSize: '22px', fill: '#000' });

        this.elecfence = this.add.image(200, 325, 'elecfence');

        this.box1 = this.add.image(100, 450, 'Q4ans1');
        this.box2 = this.add.image(300, 450, 'Q4ans2');
        this.box3 = this.add.image(100, 550, 'Q4ans3');
        this.box4 = this.add.image(300, 550, 'Q4ans4');

        this.interactive();
        this.box1.once('pointerdown', () => {
            this.round4inter();
            this.sound.play('wrong');
        });  
        this.box2.once('pointerdown', () => {
            this.round4inter();
            this.sound.play('wrong');
            
        });
        this.box3.once('pointerdown', () => {
            score = score + 100;
            this.sound.play('correct');
            correct = 1;
            this.round4inter();
        });
        this.box4.once('pointerdown', () => {
            this.round4inter();
            this.sound.play('wrong');
        });
        

    }
    round4inter(){
        question.setText('');
        this.pauseBG = this.add.image(200,  350, 'pauseBG');
        this.smallele = this.add.image(200, 325, 'smallele');
        this.elecfence.destroy(true);
        this.destroy();
        question.setText('');
        var ansText = this.add.text(120, 400, 'This sign means that', { fontSize: '12px', fill: '#000' });
        var ansText2 = this.add.text(120, 425, 'the fence is electrified', { fontSize: '12px', fill: '#000' });
        this.continue = this.add.image(190, 500, 'continueBut');
        if(correct == 1){
            var rightORwrong = this.add.text(145, 200, 'Correct!', { fontSize: '32px', fill: '#000' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(145, 200, 'Wrong!', { fontSize: '32px', fill: '#000' });
            this.sound.play('wrong');
        }


        this.continue.setInteractive();

        this.continue.once('pointerdown', () => {
            this.round5();
            this.smallele.destroy(true);
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }
    round5()
    {
        
        question.setText('');
        
        question2.setText('');
        this.destroy();
        round ++;
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        this.elecfence.destroy(true);        
        question = this.add.text(35, 120, 'What is the most common', { fontSize: '22px', fill: '#000' });
        question2 = this.add.text(35, 140, 'accident on a farm', { fontSize: '22px', fill: '#000' });

        //this. = this.add.image(200, 325, '');
        //insert something here
        

        this.box1 = this.add.image(100, 450, 'Q5ans1');
        this.box2 = this.add.image(300, 450, 'Q5ans2');
        this.box3 = this.add.image(100, 550, 'Q5ans3');
        this.box4 = this.add.image(300, 550, 'Q5ans4');

        this.interactive();
        this.box1.once('pointerdown', () => {
            round++;
            this.round5inter();
            this.sound.play('wrong');
            
        });  
        this.box2.once('pointerdown', () => {
            console.log('correct');
            score = score + 100;
            this.sound.play('correct');
            round++;
            correct=1;
            this.round5inter();
        });
        this.box3.once('pointerdown', () => {
            round++;
            this.round5inter();
            this.sound.play('wrong');
        });
        this.box4.once('pointerdown', () => {
            round++;
            this.round5inter();
            this.sound.play('wrong');
        });

    }

    round5inter(){

        question.setText('');
        
        question2.setText('');  
        this.pauseBG = this.add.image(200,  350, 'pauseBG');
        this.destroy();
        question.setText('');
        var ansText = this.add.text(120, 400, 'Vechicular accidents are', { fontSize: '12px', fill: '#000' });
        var ansText2 = this.add.text(120, 425, 'the most common accident ', { fontSize: '12px', fill: '#000' });
        var ansText3 = this.add.text(120, 450, 'on a farm', { fontSize: '12px', fill: '#000' });
        this.continue = this.add.image(190, 500, 'continueBut');
        
        if(correct == 1){
            var rightORwrong = this.add.text(145, 200, 'Correct!', { fontSize: '32px', fill: '#000' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(145, 200, 'Wrong!', { fontSize: '32px', fill: '#000' });
        }

        this.continue.setInteractive();

        this.continue.once('pointerdown', () => {
            this.round6();
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            ansText3.setText('')
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }

    round6()
    {
        
        
        question.setText('');
        
        question2.setText('');
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        //this..destroy(true);
        this.destroy();

        question = this.add.text(35, 120, 'Are farm accidents', { fontSize: '22px', fill: '#000' });
        question2 = this.add.text(35, 140, 'on the rise?', { fontSize: '22px', fill: '#000' });

        this.accident = this.add.image(200, 325, 'accident');

        this.box3 = this.add.image(100, 450, 'true');
        this.box4 = this.add.image(300, 450, 'false');

        this.box3.setInteractive();
        this.box4.setInteractive();

        this.box3.once('pointerdown', () => {
            score = score +100;  
            this.sound.play('correct');
            this.accident.destroy(true);
            correct = 1;
            this.box3.destroy(true);
            this.box4.destroy(true);
            this.round6inter();
        });
        this.box4.once('pointerdown', () => {
            this.round6inter();
        });
    }

    round6inter(){

        this.accident.destroy(true);
        
        
        question.setText('');
        question2.setText('');
        this.pauseBG = this.add.image(200,  350, 'pauseBG');
        //show an aul pie chart here
        this.box3.destroy(true);
        this.box4.destroy(true);
        question.setText('');
        var ansText = this.add.text(120, 400, 'Farm accidents have', { fontSize: '12px', fill: '#000' });
        var ansText2 = this.add.text(120, 425, 'risen by 5%', { fontSize: '12px', fill: '#000' });
        this.continue = this.add.image(190, 500, 'continueBut');
        
        if(correct == 1){
            var rightORwrong = this.add.text(145, 200, 'Correct!', { fontSize: '32px', fill: '#000' });
            correct = 0;
        }else{
            var rightORwrong = this.add.text(145, 200, 'Wrong!', { fontSize: '32px', fill: '#000' });
            this.sound.play('wrong');
        }

        this.continue.setInteractive();
        this.continue.once('pointerdown', () => {
            this.finish();
            this.smallele.destroy(true);
            this.pauseBG.destroy(true);
            ansText.setText('');
            ansText2.setText('');
            rightORwrong.setText('');
            this.continue.destroy(true);
        });

        
    }

    finish()
    {
        question.setText('');
        question2.setText('');
        scoreText.setText('Score: ' + score);
        roundText.setText('Round: ' + round);
        //this..destroy(true);

        question.setText('Congrats you got : ' + score);


        this.home = this.add.image(200,450, 'homeBut' );
        this.home.setInteractive();

        this.home.on('pointerdown', ()=> {
            location.href = "/home"
        });

        this.restart = this.add.image(200, 350, 'restartBut');
        this.restart.setInteractive();

        this.restart.on('pointerdown', ()=> {
            this.scene.restart();
        });
    }
}