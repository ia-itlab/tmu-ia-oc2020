var img_person = [];

class GridPerson {
    constructor(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
        this.id = int(random(18));
        this.color_palette = [
            [0x00, 0x81, 0xC5], //'#0081C5',
            [0x92, 0xBB, 0x44],//'#92BB44',
            [0xF4, 0xC5, 0x32],//'#F4C532',
            [0x00, 0x90, 0x4A],// '#00904A',
            [0xD9, 0x62, 0x98],//'#D96298',
            [0xDB, 0x5F, 0x30],//'#DB5F30',
            [0x7A, 0x53, 0x98],//'#7A5398',
            [0xCC, 0x3A, 0x27],//'#CC3A27',
            [0x3E, 0xB3, 0xE7]//'#3EB3E7'];
        ];
        this.bcolor = this.color_palette[int(random(this.color_palette.length))];
        this.life = random(180.0);
    }
    set(_x, _y, _w, _h) {
        this.x = _x;
        this.y = _y;
        this.w = _w;
        this.h = _h;
    }
    draw() {
        if (this.life > 0) {

            imageMode(CORNER);
            rectMode(CORNER);
            noStroke();
            fill(9);

            fill(this.bcolor[0], this.bcolor[1], this.bcolor[2],
                255 * sin(radians(this.life)));//, 255 * sin(radians(this.life)));
            rect(this.x, this.y, this.w, this.h);
            if (img_person.length > 0) {
                image(img_person[int(this.id)], this.x, this.y, this.w, this.h);
            }
            this.life -= 0.25;
        }
        else {
            this.life = 180;
            this.id = int(random(18));
        }
    }
}

class OC2020 {
    constructor(_grid_x, _grid_y, _grid_size) {
        this.grid_x = _grid_x;
        this.grid_y = _grid_y;
        this.grid_size = _grid_size;
        this.gp = [];
        for (let i = 0; i < (this.grid_x * this.grid_y); i++) {
            this.gp[i] = new GridPerson(
                int((i % this.grid_x) * this.grid_size),
                int(i / this.grid_x) * this.grid_size,
                this.grid_size, this.grid_size
            );
        }
    }
    set(_grid_size) {
        this.grid_size = _grid_size;
        for (let i = 0; i < this.gp.length; i++) {
            this.gp[i].set(
                int((i % this.grid_x) * this.grid_size),
                int(i / this.grid_x) * this.grid_size,
                this.grid_size, this.grid_size
            )
        }
    }
    draw(_x, _y, _w, _h) {
        //background(0xfffff0);
        background(255);
        for (let i = 0; i < this.gp.length; i++) {
            this.gp[i].draw();
        }
    }
}

var oc2020;

function preload() {
    for (let i = 1; i <= 18; i++) {
        img_person[i - 1] = loadImage('assets/images/oc2020/' + str(nf(i, 2)) + '.png');
    }
    //loop();
}

function setup() {
    var grid_size = windowWidth / 8;
    var canvas = createCanvas(windowWidth, grid_size * 5);
    canvas.parent('sketch-holder');

    var grid_size = width / 8;
    oc2020 = new OC2020(width / grid_size, 5, grid_size);
    frameRate(30);

}

function draw() {
    background(255, 0, 0);
    oc2020.draw(0, 0, width, height);
}

function windowResized() {
    var grid_size = windowWidth / 8;
    resizeCanvas(windowWidth, grid_size * 5);
    oc2020.set(grid_size);
}