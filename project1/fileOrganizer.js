let fs = require('fs')
let path = require('path')
let folderPath = process.argv[2]


// console.log(folderPath)

let folderExists = fs.existsSync(folderPath)

let extensions = {
    Audio : ['.mp3'],
    Video : ['.mp4', '.mkv'],
    Image : ['.png', '.jpg', '.jpeg', '.gif'],
    Document : ['.doc', '.pdf', '.xls', '.txt'],
    Applications : ['.exe']
};

if(folderExists){
    // we will code
    // console.log('Path is Valid.');
    let files = fs.readdirSync(folderPath)
    
    for(let i = 0; i<files.length; i++){
        let ext = path.extname(files[i])    
        let nameOfFolder = giveFolderName(ext)
        // console.log('Ext-->', ext, 'Folder-->', nameOfFolder)
        let pathOfFolder = path.join(folderPath, nameOfFolder)
        let exist = fs.existsSync(pathOfFolder)
        if(exist){
            
            moveFile(folderPath, pathOfFolder, files[i])
        }
        else{
            fs.mkdirSync(pathOfFolder);
            moveFile(folderPath, pathOfFolder, files[i])
        }
    }
}

else{

        console.log('Please Enter A Valid Code!!!!!')
    
}
    
    
    function giveFolderName(ext){
        
        for(let key in extensions){ 
            let extArr = extensions[key]
            for(let i = 0; i<extArr.length; i++){
                if(extArr[i] == ext){
                    return key
                }
            }
        }
        return 'Others'
    }
    



function moveFile(folderPath, pathOfFolder, filename){
    let sourcePath = path.join(folderPath, filename)
    let destPath = path.join(pathOfFolder, filename)
    fs.copyFileSync(sourcePath, destPath)
    fs.unlinkSync(sourcePath)
}


 