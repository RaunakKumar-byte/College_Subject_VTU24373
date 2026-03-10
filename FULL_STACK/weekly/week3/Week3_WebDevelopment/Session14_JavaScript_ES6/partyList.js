const collegeFriends=["Rahul","Aman"];
const workFriends=["Riya","Neha"];

const partyList=["Me",...collegeFriends,...workFriends];

console.log(partyList);

function showFriends(first,...others){
console.log(first);
console.log(others);
}

showFriends("Me","Rahul","Aman","Riya");