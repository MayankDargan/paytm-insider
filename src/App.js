import React, {Component} from 'react';
import Resizer from 'react-image-file-resizer';
import { storage } from "./utils/Firebase";
import './App.css';

class App extends Component{
    constructor(props){
        super(props);   
        // this.onDrop = this.onDrop.bind(this);
        this.state =  {
            selectedFile: null,
            imagePreviewUrl: null,
          };
    }

    

    fileChangedHandler = event => {
        this.setState({
          selectedFile: event.target.files[0]
        })
     
        var reader = new FileReader();
        var flag = 0
        //Read the contents of Image File.
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function (e) {

            //Initiate the JavaScript Image object.
            var image = new Image();

            //Set the Base64 string return from FileReader as source.
            image.src = e.target.result;
            image.sizeArray = [
                [755,450],
                [365,450],
                [365,212],
                [380,380]
            ]
            console.log(image)
            

            //Validate the File Height and Width.
            image.onload = function (flag) {
                var height = this.height;
                var width = this.width;
                var src = this.src;
                var sizeArray = this.sizeArray;
                if (height === 1024 || width === 1024) {
                    
                    // Blog from the image
                    var byteString = atob(src.split(',')[1]);
                    var mimeString = src.split(',')[0].split(':')[1].split(';')[0];
                    var ab = new ArrayBuffer(byteString.length);
                    var ia = new Uint8Array(ab);
                    for (var i = 0; i < byteString.length; i++) {
                        ia[i] = byteString.charCodeAt(i);
                    }
                    var src = new Blob([ab], {type: mimeString});

                    // Resize
                    sizeArray.map(dim => {
                        Resizer.imageFileResizer(
                            src,dim[0],dim[1],'JPEG',100,0,
                            uri => {
                                console.log(uri)
                                var result = '';
                                var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                                var charactersLength = characters.length;
                                for ( var i = 0; i < 4; i++ ) {
                                result += characters.charAt(Math.floor(Math.random() * charactersLength));
                                }
                                let filename = result + dim[0] + 'x' + dim[1];
                                const uploadTask = storage.ref('images/' + filename).put(uri);
                                uploadTask.on('state_changed',
                                (snapshot)=>{
                                    // progress
                                },
                                (error)=>{
                                    console.log(error);
                                },()=>{
                                    // complete function 
                                    storage.ref('images').child(filename).getDownloadURL().then((url,filename) => {
                                        if(window.localStorage.getItem('images')){
                                            let currentLS = window.localStorage.getItem('images');
                                            currentLS = JSON.parse(currentLS);
                                            currentLS.push(url);
                                            window.localStorage.setItem('images',JSON.stringify(currentLS))   
                                        }else{
                                            window.localStorage.setItem('images',JSON.stringify([]));
                                            let currentLS = window.localStorage.getItem('images');
                                            currentLS = JSON.parse(currentLS);
                                            currentLS.push(url);
                                            window.localStorage.setItem('images',JSON.stringify(currentLS))   
                                        }
                                    });
                                });
                            },
                            'blob'
                        );
                    });
                }else{
                    console.log("File Cannot be uploaded")
                }
            };  
            
            
        }

        
    }

    handleResize = () =>{
        console.log(this.state.selectedFile)
    }
    
    render(){
        let images = localStorage.getItem('images');
        let imagePreview = [];
        if(images !== null){
          JSON.parse(images).map(image=>{
            imagePreview.push(
              <div className="image">
                <img src={image} alt=""/>
              </div>
            );
          });
        }
        
        return(
            <div>
            <div className="App">
                {/* could use better design and style  */}
                <input type="file" name="avatar" onChange={this.fileChangedHandler} />
                   <div className="image-container">
                    {imagePreview}
                   </div>
            </div>
            </div>
        )
    }; 
}

export default App;