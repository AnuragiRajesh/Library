// // console.log("test")
// // Combine two strings character wise like this
// // First String : 
// // Second String : “1234”
// // Final String : “a1b2c3d4efg

// var firstString = "abcdefg"
// var secondString = "1234"
// var result = ''

// for (let i = 0; i < firstString.length + secondString.length; i++) {
//     if (firstString[i] == undefined) {
//     } else {
//         result += firstString[i]
//     }
//     if (secondString[i] == undefined) {
//     } else {
//         result += secondString[i]

//     }

// }
// console.log(result)




// var A = [{ id: 10, status: true }, { id: 20, status: false }, { id: 30, status: true }]
// var B = [{ id: 10, value: "100" }, { id: 20, value: "200" }, { id: 30, value: "300" }]
// var C = []
// // Output:
// // C = [{id: 10, status: true, value:"100"}, {id: 20, status: false, value:"200"}, {id: 30, status:true, value:"300"}]
// // Join A & B to create new Array C , by using id as the matching key.


// for (let i = 0; i < A.length; i++) {
//     if (A[i].id == B[i].id) {
//         A[i].value = B[i].value
//         C.push(A[i])
//     }

// }
// console.log(C)



// Write a program to find and print duplicate characters in a string
// str = fhdghirtwhdkjgshfe;
// print the duplicate characters

// var str = 'fhdghirtwhdkjgshfe'
// var duplicateLetters = []
// for (let i = 0; i < str.length; i++) {
//     var count = 0
//     for (let k = 0; k < str.length; k++) {
//         if (str[i] == str[k]) {
//             count++
//             if (count == 2) {
//                 // count=0
//                 if (!duplicateLetters.includes(str[i])) {

//                     duplicateLetters.push(str[i])
//                 }
//                 break
//             }
//         }
//     }
// }
// console.log(duplicateLetters)



for(let i = 1; i < 31; i++){
    // console.log(i)
    if(i%3==0 && i%5==0){
console.log("AB")
    }else if(i%3==0){
        console.log("A")
    }else if(i%5==0){
console.log("B")
    }else{
        console.log(i)
    }
}
        