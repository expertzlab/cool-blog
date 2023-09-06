
async function abc1(){
    return new Promise((reject, resolve, cllback) => {
        
    })
}

async function abc2(){
    var value = await abc1();
    console.log('after abc1', value)
}

function xyz(){

}