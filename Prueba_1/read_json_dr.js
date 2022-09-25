//browserify -t brfs practice_4/KNN/examples/mutable/read_json_dr.js  > practice_4/KNN/examples/mutable/read_json_dr_converted.js
//browserify -t brfs read_json_dr.js > read_json_dr_converted.js
//const fs = require('./fs');
//var fs = require("fs");

//import fs from 'fs';
import * as fs from 'fs' ; 

class SpamData {
    
    constructor() {
        
        this.c_spam_dr_2d_list = this.read_json_descriptor_dr();
    }

    read_json_descriptor_dr() {
        var array_embbeding = fs.readFileSync("final_offweets_2d.json").toString('utf-8');
        array_embbeding = JSON.parse(array_embbeding.toString())
        //console.log(array_embbeding);
        return array_embbeding

    }

}

global.SpamDataClass = SpamData;






