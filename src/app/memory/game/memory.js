var width = window.innerWidth;
var height = window.innerHeight;
var scoreText;
var roundText;
var score;
var round;
var counter = 0;
var checkone;
var checktwo;
var clicked;
var checker = [0,0,0,0,0,0,0,0,0,0,0,0];//0 means covered, 1 means uncovered, 2 means its been finished with
var arr = [1,1,2
    ,2,3,3
    ,4,4,5
    ,5,6,6]
var i;

export default class Scene1 extends Phaser.Scene {

    constructor(config) {
        super(config);
    }

    preload() {
        //images loaded
        this.load.image('one', 'assets/memory/images/1.png');
        this.load.image('two', 'assets/memory/images/2.png');
        this.load.image('three', 'assets/memory/images/3.png');
        this.load.image('four', 'assets/memory/images/4.png');
        this.load.image('five', 'assets/memory/images/5.png');
        this.load.image('six', 'assets/memory/images/6.png');
        this.load.image('card', 'assets/memory/images/card.png');
        this.load.image('bg', 'assets/space/bg3.png');

    }
    create() {

        this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor("#00FF00" );

        this.add.image(200,45,'bg');

        const frames = ['','one', 'two', 'three', 'four', 'five', 'six'];
        //make onecard, two card array
        this.shuffle(arr);
        score = 0;
        round = 0;
        scoreText = this.add.text(16, 16, 'Score: ' + score, { fontSize: '32px', fill: '#000' });
        roundText = this.add.text(16 ,48 ,'Round: ' + round, { fontSize: '32px', fill: '#000' });
        var w = width /4;
        var h = height/4 - height/8 + 50;

        for(i=0; i < 7; i++)
        {
            if(arr[0] == i)
            {
                this.onecard = this.add.image(w, h, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[1] == i)
            {
                this.twocard = this.add.image(w*2, h, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[2] == i)
            {
                this.threecard = this.add.image(w*3, h, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[3] == i)
            {
                this.fourcard = this.add.image(w, h*2, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[4] == i)
            {
                this.fivecard = this.add.image(w*2, h*2, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[5] == i)
            {
                this.sixcard = this.add.image(w*3, h*2, frames[i]);
            }
        }

        for(i=0; i < 7; i++)
        {
            if(arr[6] == i)
            {
                this.sevencard = this.add.image(w*1, h*3, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[7] == i)
            {
                this.eightcard = this.add.image(w*2, h*3, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[8] == i)
            {
                this.ninecard = this.add.image(w*3, h*3, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[9] == i)
            {
                this.tencard = this.add.image(w*1, h*4, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[10] == i)
            {
                this.elevencard = this.add.image(w*2, h*4, frames[i]);
            }
        }
        for(i=0; i < 7; i++)
        {
            if(arr[11] == i)
            {
                this.twelvecard = this.add.image(w*3, h*4, frames[i]);
            }
        }

        this.one = this.add.image(w,h, 'card');

        this.two = this.add.image(w*2, h , 'card');


        this.three = this.add.image(w*3,h, 'card');

        this.four = this.add.image(w, h*2, 'card');


        this.five = this.add.image(w*2,h*2, 'card');

        this.six = this.add.image(w*3, h*2, 'card');

        
        this.seven = this.add.image(w,h*3, 'card');

        this.eight = this.add.image(w*2 , h*3, 'card');
    
        this.nine = this.add.image(w*3,h*3, 'card');

        this.ten = this.add.image(w * 1, h*4 , 'card');
        this.eleven = this.add.image(w*2,h*4, 'card');

        this.twelve = this.add.image(w*3, h*4, 'card');


        this.setinter();



        this.one.on('pointerdown',()=>{
            this.one.setVisible(false);
            counter ++;
            checker[0]= 1;
            clicked = 0;
        });
        this.two.on('pointerdown',()=>{
            this.two.setVisible(false);
            counter++;
            checker[1]= 1;
            clicked = 1;
        });
        this.three.on('pointerdown',()=>{
            this.three.setVisible(false);
            counter++;
            checker[2]= 1;
            clicked= 2;

        });
        this.four.on('pointerdown',()=>{
            this.four.setVisible(false);
            counter++;
            checker[3]=1;
            clicked = 3;
        });
        this.five.on('pointerdown',()=>{
            this.five.setVisible(false);
            counter++;
            checker[4]=1;
            clicked = 4;
        });
        this.six.on('pointerdown',()=>{
            this.six.setVisible(false);
            counter++;
            checker[5]=1;
            clicked = 5;
        });
        this.seven.on('pointerdown',()=>{
            this.seven.setVisible(false);
            counter++;
            checker[6]=1;
            clicked = 6;
        });
        this.eight.on('pointerdown',()=>{
            this.eight.setVisible(false);
            counter++;
            checker[7]=1;
            clicked = 7;
        });
        this.nine.on('pointerdown',()=>{
            this.nine.setVisible(false);
            counter++;
            checker[8]=1;
            clicked = 8;
        });
        this.ten.on('pointerdown',()=>{
            this.ten.setVisible(false);
            counter++;
            checker[9]=1;
            clicked = 9;
        });
        this.eleven.on('pointerdown',()=>{
            this.eleven.setVisible(false);
            counter++;
            checker[10]=1;
            clicked = 10;
        });
        this.twelve.on('pointerdown',()=>{
            this.twelve.setVisible(false);
            counter++;
            checker[11]=1;
            clicked = 11;
        });

    }

    update() {
        if(counter == 1)
        {
            checkone = arr[clicked];
            console.log(checkone);
        }
        
        if(counter == 2)
        {
            checktwo = arr[clicked];
            this.counterflip();
            counter = 0;
        }
        //add in loop of gameplay

    }

    counterflip()
    {
        this.one.disableInteractive();
        this.two.disableInteractive();
        this.three.disableInteractive();
        this.four.disableInteractive();
        this.five.disableInteractive();
        this.six.disableInteractive();
        this.seven.disableInteractive();
        this.eight.disableInteractive();
        this.nine.disableInteractive();
        this.ten.disableInteractive();
        this.eleven.disableInteractive();
        this.twelve.disableInteractive();
        if(checktwo != checkone)
        {
            
            setTimeout(() => {
                if(checker[0]== 1)
                {
                    this.one.setVisible(true);
                    checker[0]= 0;
                }
                if(checker[1] == 1)
                {
                    this.two.setVisible(true);
                    checker[1] = 0;
                }
                if(checker[2] == 1)
                {
                    this.three.setVisible(true);
                    checker[2] = 0;    
                }
                if(checker[3] == 1)
                {
                    this.four.setVisible(true);
                    checker[3] = 0;    
                }
                if(checker[4] == 1)
                {
                    this.five.setVisible(true);
                    checker[4] = 0;    
                }
                if(checker[5] == 1)
                {
                    this.six.setVisible(true);
                    checker[5] = 0;    
                }
                if(checker[6] == 1)
                {
                    this.seven.setVisible(true);
                    checker[6] = 0;    
                }
                if(checker[7] == 1)
                {
                    this.eight.setVisible(true);
                    checker[7] = 0;    
                }
                if(checker[8] == 1)
                {
                    this.nine.setVisible(true);
                    checker[8] = 0;    
                }
                if(checker[9] == 1)
                {
                    this.ten.setVisible(true);
                    checker[9] = 0;    
                }
                if(checker[10] == 1)
                {
                    this.eleven.setVisible(true);
                    checker[10] = 0;    
                }
                if(checker[11] == 1)
                {
                    this.twelve.setVisible(true);
                    checker[11] = 0;    
                }

                this.setinter();

            }, 1000);
            

        }else if(checktwo == checkone)
        {
            //do the things man
            score = score + 100;
            //do a for to make all ones in checker to 2
            scoreText.setText('score: ' + score );
            for(i=0; i < 13; i++){
                if(checker[i] == 1)
                {
                    checker[i] = 2;
                    console.log(checker[i]);
                    console.log('bruh')
                }

            }
            this.setinter();

        }

    }

    shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }
    setinter()
    {
        
        this.one.setInteractive();
        this.two.setInteractive();
        this.three.setInteractive();
        this.four.setInteractive();
        this.five.setInteractive();
        this.six.setInteractive();
        this.seven.setInteractive();
        this.eight.setInteractive();
        this.nine.setInteractive();
        this.ten.setInteractive();
        this.eleven.setInteractive();
        this.twelve.setInteractive();

    }



}