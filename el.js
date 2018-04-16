var elasticsearch = require('elasticsearch');
var esclient = new elasticsearch.Client({
    host: 'localhost:9200'
});
esclient.search({
    index: 'logstash-*',
    body: {
        query: {
            // match: {
            //     col: 15
            // },
            "constant_score": {
                "filter" : {
                  "range" : {
                    "@timestamp" : {
                      "gte" : 1523808000000,//或者"gt": "now-2m", "lt": "now"
                      "lte" : 1523894400000
                    }
                  }
                }
            }
        },
        size: 0,
        aggs: {
            "returntime": {
                "date_histogram": {
                    "field": "@timestamp",
                    "interval": "hour",
                    "time_zone":"+08:00",
                    "format": "yyyy-MM-dd'T'HH:mm:ss",
                },
                // "aggs": {
                //     "avg_line" : { "avg" : { "field" : "num" } }
                // }
            }
            
        }
    }
}).then(function (response) {
    var hits = response;
    console.log(hits.aggregations.returntime.buckets);
}).catch((e) => {
    console.log(e);
});

// time: {   
//     date_histogram: {
//         field: "@timestamp'",
//         interval: "1M",
//         format: "yyyy-MM-dd",
//     }

// }