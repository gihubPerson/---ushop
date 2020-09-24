export default {
    totime:function(val){
        
        return new Date(parseInt(val)).toLocaleString()
    },
    tofixed:function(val) {
        return (val * 1).toFixed(2)
    }
}