const express = require('express')
var router = express.Router()
const { tempwebapps } = require('../models/fruit')
const ClusterPoints = require('../models/cluster_points');
const kmeans = require('node-kmeans');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
    });

router.get('/', async (req, res) => {
    console.log('working')
    try {
        const fruits = await tempwebapps.find()
            .select('-_id fruit')

        let vectors = new Array();
        for (let i = 0; i < fruits[0].fruit.length; i++) {
            vectors[i] = [fruits[0].fruit[i]['tmp']];
        }
        kmeans.clusterize(vectors, { k: 6 }, (err, res) => {
            if (err) console.error(err);
            else console.log('%o', res);
        });
        const a = fruits[0].fruit

        res.send(a)
    } catch (err) {
        console.log(err)
    }
})

router.get('/delete_clusters', (req, res) => {
    ClusterPoints.remove().exec()
    res.status(200).json({
        msg:"Deleted"
    })
})

router.get('/clusterpoints',(req, response)=>{
    let kmeans_cluster_points;
    console.log("Apit hit $$$$$$$$$$$$$$$$$$$$$$")

    ClusterPoints.find({})
    .then(result=>{

        // KMEANS
console.log('after fetching@@@@@@@@@@@@@@@@');
        let vectors= new Array();
        console.log(result.length)
        if(result.length>30){
                    for(let i=(result.length-1); i>result.length-30 ;i--){
                        if ( isNaN(result[i].fruit_temp) ||  isNaN(result[i].room_temp)) {
                            console.log('YYYYYYY')
                            continue;
                        } else{
                            vectors[result.length-1-i] = [ parseInt(result[i].fruit_temp), parseInt(result[i].room_temp) ];
                            console.log(parseInt(result[i].fruit_temp), parseInt(result[i].room_temp))
                        }
        }

        }else{
             for(let i=0; i<result.length ;i++){
                if ( isNaN(result[i].fruit_temp) ||  isNaN(result[i].room_temp)) {
                    continue;
                } else{
            vectors[result.length-1-i] = [ parseInt(result[i].fruit_temp), parseInt(result[i].room_temp) ];
            console.log(parseInt(result[i].fruit_temp), parseInt(result[i].room_temp))
                }
        }
        }
        if(result.length>6){
console.log(vectors.length,'!!!!!!!!!!!!!!!')

            kmeans.clusterize(vectors, {k: 6}, (err, res)=>{
                if(err) {
                    console.log('hittttttt$$$$$$$$$$')
                    console.log(err)

                } else {
                    console.log(res,'8******************************')
                    kmeans_cluster_points= res;
                    response.status(200).json({
                        msg:"Cluster Points Fetch Susscessfully",
                        points:kmeans_cluster_points,
                        cluster_points:result
                    })
                }
            });
        }else{
            console.log('hittttt^^^^^^^^^^^^^')
            kmeans.clusterize(vectors, {k: result.length}, (err, res)=>{
                if(err) {
                    console.log(err)
                } else {
                    console.log(res,'8******************************')
                    kmeans_cluster_points= res;
                    response.status(200).json({
                        msg:"Cluster Points Fetch Susscessfully",
                        points:kmeans_cluster_points,
                        cluster_points:result
                    })
                }
            });
        }


    })
    .catch(err=>{
        response.status(400).json({
            msg:"Error in fetiching clustering points",
            error:err
        })
    })
})

router.post('/', async (req, res) => {
    try {
        var fruitTmp = {}
        var fruit1 = req.body
        var resp = res
        const fruits = await tempwebapps.find()
            .select('-_id fruit')
        for (let i = 0; i < fruits[0].fruit.length; i++) {
            if (req.body.fruit == fruits[0].fruit[i].name) {
                 fruitTmp = fruits[0].fruit[i]
              
            }

        }
console.log("Enter Custering&&&&&&&",fruitTmp)
        const cluster= new ClusterPoints({
            name:req.body.fruit,
            room_temp:req.body.room_temp,
            fruit_temp:fruitTmp.tmp
        })

        cluster.save()
        .then(result=>{
            console.log('Cluster Points Saved $$$$$$$',result);
        })
        .catch(err=> {
            console.log('Error in saving Cluster Points @@@@@@@',err);
        })

        response.status(200).json({
            msg:"saved"
        })

    } catch (err) {
        console.log(err)
    }

})


module.exports = router