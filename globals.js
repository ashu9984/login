// console.log(__dirname)

// console.log(__filename)


// var someExpress = require('express')

// console.log(someExpress)

// var anyAWS = require('aws-sdk')

// console.log(anyAWS)


// console.log(process)

var globalScope1 = 'GLOBAL'
var add = function(a,b){
    var localScoope = 'LOCAL'
    return a  + b + globalScope1 + localScoope
}


console.log(add(1,2))
console.log(add('abc','def') )


var globalScope2 = "SOME CHANGED GLOBAL"

console.log(globalScope2)