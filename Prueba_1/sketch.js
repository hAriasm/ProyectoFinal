var data = [];
var pointP = [140 ,90];
var root;
function setup(){
    graficarKdtree();
    //console.log(root); 
    //console.log("digraph G { \n" + generate_dot(root)+ "}");
    //console.log("Altura del arbol: "+getHeight(root));   
    //console.log("Closet point brute force: "+closest_point_brute_force(data, point));
    //console.log("naive closest point: "+naive_closest_point(root, point));
    //console.log("la mejor distancia: "+closest_point(root,point).distance);
}
function graficarKdtree(){
    var width = 900; var height = 600; 
    createCanvas(width,height);
    background(0);
    fill(255, 255, 255);
    textSize(8);
    circle(pointP[0],height-pointP[1],3);
    text(140+ ',' + 90, 140+ 5, height - 90);//200-y para q se dibuje aproximadamente 
    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke(125, 125, 125); 
            strokeWeight(0.5); 
            line(x,0,x,height);
            line(0,y,width,y);
        }
    }
    var cantidadNodos= document.getElementById("cantidadNodos").value;
    //console.log(cantidadNodos);
    data = [];
    for(let i=0; i<cantidadNodos;i++){
        var x = Math.floor(Math.random() * width);
        var y = Math.floor(Math.random() * height); 
        data.push([x,y]);
        fill(255, 255, 255);
        circle(x,height-y,3); //200-y para q se dibuje apropiadamente 
        textSize(8);
        //text(x + ',' + y, x + 5, height - y);//200-y para q se dibuje aproximadamente        
    }
    //console.log(data);
    root = build_kdtree(data);
    document.getElementById("alturaKdTree").value= getHeight(root);
}
function graficarclosetPoint(){
    var nearestPoint=closest_point(root,pointP).node.point;
    fill(222, 15, 15);
    circle(nearestPoint[0],height-nearestPoint[1],5);
    console.log("El nodo mas cercano es: "+nearestPoint);
}
function graficarKNN(){
    var cantidadK= document.getElementById("cantidadK").value;
    var knn=findKNN(root,pointP,parseInt(cantidadK)).nearestNodes;
    for(let i=0;i<knn.length;i++){
        colorMode(HSB);
        fill(222, 204, 100);
        circle(knn[i].point[0],height-knn[i].point[1],6); //200-y para q se dibuje apropiadamente 
        console.log(knn[i].point);
    }
}
function leerData(){
    // call points from spam descriptor with dimensional reduction
    var spam_data = new SpamDataClass();
    var spam_dr_2d_list = spam_data.c_spam_dr_2d_list;
    var constScal=3300;
    //console.log(spam_dr_2d_list);
    var data=[];
    for (let index = 0; index < spam_dr_2d_list.length; index++) {
        data.push([Math.abs(spam_dr_2d_list[index][1]*constScal),Math.abs(spam_dr_2d_list[index][2]*constScal)]);
        fill(255, 255, 255);
        circle(spam_dr_2d_list[index][1]*constScal,height-spam_dr_2d_list[index][2]*constScal,3); //200-y para q se dibuje apropiadamente 
    }
    console.log(data);
    var shuffledData=data;
    var train = shuffledData.slice(0, 259);
    //console.log(train);
    var node = build_kdtree(train);
    //console.log(node);
    var x=0.02641380436087745*constScal;
    var y=0.019325203344133426*constScal;
    var pointToPredict= [x,y];
    console.log(pointToPredict);
    fill(222, 15, 15);
    //circle(x,height-y,7); //200-y para q se dibuje apropiadamente 
    var cantidadK= document.getElementById("cantidadK").value;
    var knn=findKNN(node,pointToPredict,parseInt(cantidadK)).nearestNodes;
    console.log(knn);
    for(let i=0;i<knn.length;i++){
        fill(222, 15, 15);
        circle(knn[i].point[0],height-knn[i].point[1],7); //200-y para q se dibuje apropiadamente 
        console.log(knn[i].point);
    }
}
function limpiarCuadro(){
    var width = 900; var height = 600; 
    createCanvas(width,height);
    background(0);
    fill(255, 255, 255);
    textSize(8);
    for (var x = 0; x < width; x += width / 10) {
        for (var y = 0; y < height; y += height / 5) {
            stroke(125, 125, 125); 
            strokeWeight(0.5); 
            line(x,0,x,height);
            line(0,y,width,y);
        }
    }
}

