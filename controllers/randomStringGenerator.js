function makeid(length){
    const s = "1234567890"; 
    const sz = s.length ;

    let ct = 0 ; 
    let result = "" ;

    while(ct < length){
    result += s.charAt(Math.floor(Math.random() * sz)) ; 
    ct++ ; 
    }

    return result ; 
}


module.exports = makeid ; 
