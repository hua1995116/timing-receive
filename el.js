var elasticsearch = require('elasticsearch');
var esclient = new elasticsearch.Client({
    host: 'localhost:9200'
});
esclient.search({
    index: 'logstash-*',
    body: {
        query: {
            match: {
                col: 15
            }
        },
        size: 0,
        aggs: {
            // return_col: {
            //     sum: {
            //         field: "offset"
            //     }
            // }
            returntime: {
                "date_histogram": {
                    "field": "createtime",
                    "interval": "hour",
                    "time_zone":"+08:00",
                    "format": "yyyy-MM-dd HH:mm:ss",
                }

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