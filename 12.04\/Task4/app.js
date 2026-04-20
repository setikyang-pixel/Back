const app = (f,obj)=>{
    let str = f;
    let i = 0
    while(str.indexOf("{{") !== -1){
        let x = str.indexOf("{{")
        let y = str.indexOf("}}")
        let n = str.slice(x + 2,y)
        let val = obj[n];        
        str = str.slice(0,x) + val + str.slice(y + 2)
    }
    return str
}
module.exports = {app}